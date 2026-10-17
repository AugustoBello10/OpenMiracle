// Vercel Serverless Function handler for /api/whoisonline

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

let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 20 * 1000;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const now = Date.now();
  if (cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return res.status(200).json(cachedData);
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

    return res.status(200).json(cachedData);
  } catch (error: any) {
    console.error('Error fetching Who is Online:', error.message);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }
    return res.status(502).json({
      error: 'Não foi possível carregar a lista de Who is Online do Miracle.',
      details: error.message,
    });
  }
}
