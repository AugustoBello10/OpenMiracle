import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json({ limit: '1mb' }));

// In-memory Rate Limiter para proteção contra spam / DDoS em APIs
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 60; // máx 60 requisições por minuto por IP

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  record.count += 1;
  if (record.count > RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Muitas requisições. Aguarde um minuto antes de tentar novamente.',
      retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
    });
  }

  next();
}

// Limpeza periódica do mapa de rate limit a cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// In-memory cache for Who is Online
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 20 * 1000; // 20s cache

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/['’`]/g, "'").replace(/\s+/g, ' ').trim();
}

function parseCharactersFromHtml(html: string) {
  const characters: Array<{ name: string; level?: number; vocation?: string }> = [];
  const seen = new Set<string>();

  const rowRegex = /<tr[^>]*>\s*<td[^>]*>.*?<a[^>]*subtopic=characters&name=([^&"'>]+)[^>]*>(.*?)<\/a>.*?<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>/gis;
  let match;

  while ((match = rowRegex.exec(html)) !== null) {
    const rawName = match[2].replace(/<[^>]*>/g, '').trim();
    const rawLevel = match[3].replace(/<[^>]*>/g, '').trim();
    const rawVoc = match[4].replace(/<[^>]*>/g, '').trim();

    const lowerKey = normalizeName(rawName);
    if (rawName && !seen.has(lowerKey)) {
      seen.add(lowerKey);
      characters.push({
        name: rawName,
        level: parseInt(rawLevel, 10) || undefined,
        vocation: rawVoc || undefined,
      });
    }
  }

  if (characters.length === 0) {
    const simpleRegex = /subtopic=characters&name=([^&"'>]+)/gi;
    let sMatch;
    while ((sMatch = simpleRegex.exec(html)) !== null) {
      const name = decodeURIComponent(sMatch[1].replace(/\+/g, ' ')).trim();
      const lowerKey = normalizeName(name);
      if (name && !seen.has(lowerKey)) {
        seen.add(lowerKey);
        characters.push({ name, level: 0, vocation: 'Unknown' });
      }
    }
  }

  return characters;
}

// API endpoint for Who is Online proxy com proteção de Rate Limit e Cache
app.get('/api/whoisonline', rateLimiter, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=15, s-maxage=30, stale-while-revalidate=60');

  const now = Date.now();
  if (cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return res.json(cachedData);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('https://miracle74.com/?subtopic=whoisonline', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Upstream Miracle response status: ${response.status}`);
    }

    const html = await response.text();
    const characters = parseCharactersFromHtml(html);

    const brtDate = new Date(now + (new Date().getTimezoneOffset() * 60000) - (3600000 * 3));
    const serverTimeBRT = brtDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    cachedData = {
      characters,
      total: characters.length,
      timestamp: now,
      serverTimeBRT,
    };
    lastFetchTime = now;

    res.json(cachedData);
  } catch (error: any) {
    console.error('Error fetching Who is Online:', error.message);
    if (cachedData) {
      return res.json(cachedData);
    }
    res.status(502).json({
      error: 'Não foi possível carregar a lista de Who is Online do Miracle.',
      details: error.message
    });
  }
});

// Health check para monitoramento na VPS
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// Dev or Production Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // In dev: mount Vite dev middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In prod: serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, {
      maxAge: '1d', // Cache estático de 1 dia para arquivos compilados
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`OpenMiracle Server listening on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
