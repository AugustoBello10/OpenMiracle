/**
 * Service to fetch and match Miracle 7.4 Who is Online characters against letter queues.
 */

export interface OnlineCharacter {
  name: string;
  level?: number;
  vocation?: string;
}

export interface ParsedQueueItem {
  rawLine: string;
  originalIndex: number;
  primaryName: string;
  makerName?: string;
  note?: string;
  isOnline: boolean;
  primaryOnline: boolean;
  makerOnline: boolean;
  onlineCharType?: 'main' | 'maker' | 'both';
  onlineCharName?: string;
  copyName: string;
  matchedName?: string;
  matchedLevel?: number;
  matchedVocation?: string;
}

export interface LetterParseResult {
  headerNote?: string;
  totalParsed: number;
  onlineCount: number;
  offlineCount: number;
  onlineList: ParsedQueueItem[];
  offlineList: ParsedQueueItem[];
  allItems: ParsedQueueItem[];
}

export interface WhoIsOnlineResult {
  characters: OnlineCharacter[];
  total: number;
  timestamp: number;
  serverTimeBRT: string;
  source: 'api' | 'proxy' | 'cached';
}

const NON_MAKER_KEYWORDS = new Set([
  'print', 'afk', 'depot', 'dp', 'claimed', 'claim', 'leave', 'saiu', 'done', 
  'pago', 'pagou', 'morreu', 'solado', 'cave', 'respawn', 'solo', 'duo', 'trio',
  'th', 'ed', 'ms', 'ek', 'rp', 'maker', 'ok', 'yes', 'no'
]);

const CLIENT_CACHE_KEY = 'miracle_whoisonline_cache_v2';
const CLIENT_CACHE_TTL = 30 * 1000; // 30 seconds

let clientCache: WhoIsOnlineResult | null = null;
let lastClientFetch = 0;

/**
 * Returns currently cached data synchronously (0ms delay) from memory or localStorage.
 */
export function getCachedWhoIsOnline(): WhoIsOnlineResult | null {
  if (clientCache && Date.now() - lastClientFetch < CLIENT_CACHE_TTL) {
    return clientCache;
  }
  try {
    const raw = localStorage.getItem(CLIENT_CACHE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.characters) && data.characters.length > 0) {
        clientCache = data;
        lastClientFetch = data.timestamp || Date.now();
        return data;
      }
    }
  } catch (e) {}
  return clientCache;
}

function saveToClientCache(data: WhoIsOnlineResult) {
  clientCache = data;
  lastClientFetch = Date.now();
  try {
    localStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify(data));
  } catch (e) {}
}

/**
 * Normalizes player name for reliable case-insensitive lookup.
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’`]/g, "'") // normalize apostrophes
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fetches the live list of online players from Miracle 7.4.
 * Uses persistent cache and Vercel Edge CDN for instant 0ms/fast response.
 */
export async function fetchWhoIsOnline(forceRefresh = false): Promise<WhoIsOnlineResult> {
  const cached = getCachedWhoIsOnline();
  const now = Date.now();

  if (!forceRefresh && cached && now - lastClientFetch < CLIENT_CACHE_TTL) {
    return cached;
  }

  // 1. Try internal Node/Vercel API route (/api/whoisonline) with Vercel Edge CDN caching
  try {
    const res = await fetch('/api/whoisonline');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.characters) && data.characters.length > 0) {
        const result: WhoIsOnlineResult = {
          characters: data.characters,
          total: data.total || data.characters.length,
          timestamp: data.timestamp || now,
          serverTimeBRT: data.serverTimeBRT || getBrasiliaTime(),
          source: 'api',
        };
        saveToClientCache(result);
        return result;
      }
    }
  } catch (err) {
    // Continue to PHP fallback
  }

  // 2. Try PHP proxy (/api/whoisonline.php) for cPanel / Apache / Nginx setups
  try {
    const phpRes = await fetch('/api/whoisonline.php');
    if (phpRes.ok) {
      const data = await phpRes.json();
      if (data && Array.isArray(data.characters) && data.characters.length > 0) {
        const result: WhoIsOnlineResult = {
          characters: data.characters,
          total: data.total || data.characters.length,
          timestamp: data.timestamp || now,
          serverTimeBRT: data.serverTimeBRT || getBrasiliaTime(),
          source: 'api',
        };
        saveToClientCache(result);
        return result;
      }
    }
  } catch (err) {
    // Continue
  }

  // If network failed but we have any cached data (even slightly older), return it immediately!
  if (clientCache) {
    return clientCache;
  }

  const stored = getCachedWhoIsOnline();
  if (stored) return stored;

  if (clientCache) return clientCache;

  throw new Error('Não foi possível carregar a lista de Who is Online do Miracle. Tente novamente em alguns segundos.');
}

export function parseCharactersFromHtml(html: string): OnlineCharacter[] {
  const characters: OnlineCharacter[] = [];
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

export function getBrasiliaDate(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc - (3600000 * 3));
}

export function getBrasiliaTime(): string {
  return getBrasiliaDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function getTimeUntilServerSave(): { hours: number; minutes: number; text: string } {
  const brt = getBrasiliaDate();
  const nextSave = new Date(brt);
  nextSave.setHours(5, 0, 0, 0);

  if (brt.getTime() >= nextSave.getTime()) {
    nextSave.setDate(nextSave.getDate() + 1);
  }

  const diffMs = nextSave.getTime() - brt.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours: diffHours,
    minutes: diffMinutes,
    text: `${diffHours}h ${diffMinutes}m`
  };
}

/**
 * Parses raw text from in-game letter and compares with online map.
 * Thoroughly verifies both primary character name AND makers in parentheses.
 */
export function parseLetterQueue(
  rawText: string,
  onlineCharacters: OnlineCharacter[]
): LetterParseResult {
  const onlineMap = new Map<string, OnlineCharacter>();
  for (const c of onlineCharacters) {
    onlineMap.set(normalizeName(c.name), c);
  }

  const rawLines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const items: ParsedQueueItem[] = [];
  const headerLines: string[] = [];

  let queuePosition = 1;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const isSectionHeader = line.endsWith(':') && !line.toLowerCase().startsWith('n:') && !line.toLowerCase().startsWith('next:');
    
    if (isSectionHeader) {
      headerLines.push(line);
    }

    // Clean common prefixes used in letters (N:, Next:, 1-, #1, etc.)
    const cleaned = line
      .replace(/^(?:n\s*:|next\s*:|next\s+|-|\*|•|#?\d+[\.\-\)]\s*)\s*/i, '')
      .trim();

    if (!cleaned) continue;

    let primaryName = cleaned;
    let makerName = '';
    let note = '';

    // Handle parentheses: e.g. "harlom third (Santiago God abascal)" or "Kravorn ( Print"
    const parenMatch = cleaned.match(/\((.*?)(?:\)|$)/);
    if (parenMatch) {
      const content = parenMatch[1].trim();
      primaryName = cleaned.substring(0, parenMatch.index).trim();
      
      const lowerContent = content.toLowerCase();
      if (NON_MAKER_KEYWORDS.has(lowerContent)) {
        note = content;
      } else {
        makerName = content;
      }
    }

    if (!primaryName && !makerName) continue;

    const normPrimary = normalizeName(primaryName);
    const normMaker = makerName ? normalizeName(makerName) : '';

    const primaryChar = normPrimary ? onlineMap.get(normPrimary) : undefined;
    const makerChar = normMaker ? onlineMap.get(normMaker) : undefined;

    const primaryOnline = !!primaryChar;
    const makerOnline = !!makerChar;
    const isOnline = primaryOnline || makerOnline;

    let onlineCharType: 'main' | 'maker' | 'both' | undefined = undefined;
    let onlineCharName: string | undefined = undefined;
    let copyName = primaryName;
    let matchedName: string | undefined = undefined;
    let matchedLevel: number | undefined = undefined;
    let matchedVocation: string | undefined = undefined;

    if (primaryOnline && makerOnline) {
      onlineCharType = 'both';
      onlineCharName = primaryChar!.name;
      matchedName = primaryChar!.name;
      copyName = primaryChar!.name;
      matchedLevel = primaryChar!.level;
      matchedVocation = primaryChar!.vocation;
    } else if (makerOnline && !primaryOnline) {
      onlineCharType = 'maker';
      onlineCharName = makerChar!.name;
      matchedName = makerChar!.name;
      copyName = makerChar!.name; // Copy the maker because they are the one currently in-game!
      matchedLevel = makerChar!.level;
      matchedVocation = makerChar!.vocation;
    } else if (primaryOnline && !makerOnline) {
      onlineCharType = 'main';
      onlineCharName = primaryChar!.name;
      matchedName = primaryChar!.name;
      copyName = primaryChar!.name;
      matchedLevel = primaryChar!.level;
      matchedVocation = primaryChar!.vocation;
    }

    items.push({
      rawLine: line,
      originalIndex: queuePosition++,
      primaryName,
      makerName: makerName || undefined,
      note: note || undefined,
      isOnline,
      primaryOnline,
      makerOnline,
      onlineCharType,
      onlineCharName,
      copyName,
      matchedName,
      matchedLevel,
      matchedVocation,
    });
  }

  const onlineList = items.filter(it => it.isOnline);
  const offlineList = items.filter(it => !it.isOnline);

  return {
    headerNote: headerLines.join(' | ') || undefined,
    totalParsed: items.length,
    onlineCount: onlineList.length,
    offlineCount: offlineList.length,
    onlineList,
    offlineList,
    allItems: items,
  };
}

/**
 * Builds a clean, neutral audit proof text suitable for pasting anywhere (Discord, WhatsApp, Notepad).
 */
export function generateAuditProof(
  parseResult: LetterParseResult,
  serverTimeBRT: string,
  rawText: string
): string {
  const localTime = new Date().toLocaleString('pt-BR');
  const serverSaveInfo = getTimeUntilServerSave();

  let text = `=====================================\n`;
  text += `[Miracle 7.4 - Consulta de Fila]\n`;
  text += `Horario Local: ${localTime}\n`;
  text += `Horario Servidor (BRT): ${serverTimeBRT} (Server Save em ${serverSaveInfo.text})\n`;
  if (parseResult.headerNote) {
    text += `Identificacao: ${parseResult.headerNote}\n`;
  }
  text += `Total na Fila: ${parseResult.totalParsed} | Online: ${parseResult.onlineCount} | Offline: ${parseResult.offlineCount}\n`;
  text += `-------------------------------------\n`;

  if (parseResult.onlineList.length > 0) {
    text += `JOGADORES ONLINE (Ordem de Chamada):\n`;
    parseResult.onlineList.forEach((p, idx) => {
      const rankLabel = idx === 0 ? '1º DA VEZ' : `${idx + 1}º na fila`;
      const details = p.matchedLevel ? ` (Lvl ${p.matchedLevel} ${p.matchedVocation || ''})` : '';
      
      let statusDesc = '';
      if (p.onlineCharType === 'maker') {
        statusDesc = `${p.onlineCharName} [ONLINE - Maker de ${p.primaryName}]`;
      } else if (p.onlineCharType === 'both') {
        statusDesc = `${p.primaryName} [ONLINE] e Maker ${p.makerName} [ONLINE]`;
      } else {
        statusDesc = `${p.primaryName} [ONLINE]${p.makerName ? ` (Maker ${p.makerName}: offline)` : ''}`;
      }

      text += `  [${rankLabel}] Posicao na carta: #${p.originalIndex} - ${statusDesc}${details}\n`;
    });
  } else {
    text += `Nenhum jogador da fila esta online no momento da consulta.\n`;
  }

  if (parseResult.offlineList.length > 0) {
    text += `\nJOGADORES OFFLINE (Verificados no Who is Online do site):\n`;
    const offlineDescList = parseResult.offlineList.map(p => {
      if (p.makerName) {
        return `#${p.originalIndex} ${p.primaryName} + Maker: ${p.makerName} (ambos verificados offline)`;
      }
      return `#${p.originalIndex} ${p.primaryName}`;
    });
    text += `  ${offlineDescList.join('\n  ')}\n`;
  }

  text += `-------------------------------------\n`;
  text += `Registro auditado via Who is Online oficial do Miracle 7.4.\n`;
  text += `=====================================`;

  return text;
}
