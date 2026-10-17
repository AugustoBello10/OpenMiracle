import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';

function whoIsOnlinePlugin(): Plugin {
  let cachedData: any = null;
  let lastFetch = 0;
  const CACHE_TTL = 20 * 1000; // 20s cache

  return {
    name: 'who-is-online-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && (req.url === '/api/whoisonline' || req.url.startsWith('/api/whoisonline?'))) {
          try {
            const now = Date.now();
            if (cachedData && (now - lastFetch < CACHE_TTL)) {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify(cachedData));
              return;
            }

            const response = await fetch('https://miracle74.com/?subtopic=whoisonline', {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MiracleWikiTools/1.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml'
              }
            });

            if (!response.ok) {
              throw new Error(`Miracle server responded with ${response.status}`);
            }

            const html = await response.text();
            
            // Regex match character links
            // Pattern in HTML: <A HREF="?subtopic=characters&name=Character+Name">Character Name<TD WIDTH=10%>Level</TD><TD WIDTH=20%>Vocation</TD>
            const charRegex = /<A HREF="[^"]*subtopic=characters&name=([^"&]+)">([^<]+)<(?:TD|td)[^>]*>(\d+)<\/(?:TD|td)><(?:TD|td)[^>]*>([^<]+)<\/(?:TD|td)>/gi;
            const characters: Array<{ name: string; level: number; vocation: string }> = [];
            const seen = new Set<string>();

            let match;
            while ((match = charRegex.exec(html)) !== null) {
              const rawName = decodeURIComponent(match[1].replace(/\+/g, ' ')).trim();
              const name = match[2].trim() || rawName;
              const level = parseInt(match[3], 10) || 0;
              const vocation = match[4].trim();

              const lowerKey = name.toLowerCase();
              if (!seen.has(lowerKey)) {
                seen.add(lowerKey);
                characters.push({ name, level, vocation });
              }
            }

            // Fallback simpler regex if table layout varies
            if (characters.length === 0) {
              const simpleRegex = /subtopic=characters&name=([^"&]+)/gi;
              let sMatch;
              while ((sMatch = simpleRegex.exec(html)) !== null) {
                const name = decodeURIComponent(sMatch[1].replace(/\+/g, ' ')).trim();
                const lowerKey = name.toLowerCase();
                if (name && !seen.has(lowerKey)) {
                  seen.add(lowerKey);
                  characters.push({ name, level: 0, vocation: 'Unknown' });
                }
              }
            }

            cachedData = {
              success: true,
              total: characters.length,
              timestamp: now,
              serverTimeBRT: new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
              characters
            };
            lastFetch = now;

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify(cachedData));
            return;
          } catch (err: any) {
            console.error('Error in /api/whoisonline:', err);
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ 
              success: false, 
              error: err?.message || 'Failed to fetch Who is Online from miracle74.com',
              cached: cachedData 
            }));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), whoIsOnlinePlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
