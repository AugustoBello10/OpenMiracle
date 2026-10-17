import { collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { normalizeName } from './whoIsOnlineService';

export interface LetterBackup {
  id: string;
  rawText: string;
  headerNote?: string;
  firstQueueName?: string;
  totalParsed: number;
  onlineCount: number;
  createdAt: number; // local timestamp
  serverTimeBRT: string;
  searchNicks: string[]; // for anti-griefing lookup
  isLocalOnly?: boolean;
}

const LOCAL_STORAGE_KEY = 'miracle_letter_backups_v1';
const MAX_LOCAL_BACKUPS = 25;

/**
 * Loads recent personal backups from localStorage.
 */
export function getLocalBackups(): LetterBackup[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Failed to load local backups', e);
    return [];
  }
}

/**
 * Saves a backup to localStorage.
 */
export function saveLocalBackup(backup: LetterBackup): void {
  try {
    const current = getLocalBackups();
    // Prepend new backup, filter out duplicates by text
    const filtered = [backup, ...current.filter(b => b.rawText.trim() !== backup.rawText.trim())].slice(0, MAX_LOCAL_BACKUPS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to save local backup', e);
  }
}

/**
 * Saves a backup to Firestore in the background for community recovery.
 */
export async function saveRemoteBackup(
  rawText: string,
  headerNote: string | undefined,
  firstQueueName: string | undefined,
  totalParsed: number,
  onlineCount: number,
  serverTimeBRT: string,
  allNames: string[]
): Promise<string | null> {
  // Normalize search nicks (up to 40 nicks)
  const searchNicks = Array.from(
    new Set(allNames.map(n => normalizeName(n)).filter(n => n.length > 1))
  ).slice(0, 40);

  const localBackup: LetterBackup = {
    id: 'local_' + Date.now(),
    rawText,
    headerNote,
    firstQueueName,
    totalParsed,
    onlineCount,
    createdAt: Date.now(),
    serverTimeBRT,
    searchNicks,
    isLocalOnly: true,
  };

  // Always save locally first
  saveLocalBackup(localBackup);

  // Then try Firestore in background
  try {
    const docRef = await addDoc(collection(db, 'letterBackups'), {
      rawText: rawText.slice(0, 4000), // safety limit
      headerNote: headerNote || '',
      firstQueueName: firstQueueName || '',
      totalParsed,
      onlineCount,
      serverTimeBRT,
      searchNicks,
      createdAt: serverTimestamp(),
      clientTimestamp: Date.now(),
    });
    return docRef.id;
  } catch (err) {
    console.warn('Firestore backup failed, saved locally only:', err);
    return null;
  }
}

/**
 * Searches for a lost letter backup by character nick.
 */
export async function searchLetterByNick(nick: string): Promise<LetterBackup[]> {
  const norm = normalizeName(nick);
  if (!norm || norm.length < 2) return [];

  const results: LetterBackup[] = [];

  // Check local backups first
  const locals = getLocalBackups().filter(b => 
    b.searchNicks.some(sn => sn.includes(norm) || norm.includes(sn)) ||
    (b.headerNote && normalizeName(b.headerNote).includes(norm))
  );
  results.push(...locals);

  // Query Firestore
  try {
    const q = query(
      collection(db, 'letterBackups'),
      where('searchNicks', 'array-contains', norm),
      limit(5)
    );
    const snap = await getDocs(q);
    snap.forEach(docSnap => {
      const data = docSnap.data();
      // Avoid duplicate with local results
      if (!results.some(r => r.rawText.trim() === (data.rawText || '').trim())) {
        let ts = Date.now();
        if (data.createdAt instanceof Timestamp) {
          ts = data.createdAt.toMillis();
        } else if (data.clientTimestamp) {
          ts = data.clientTimestamp;
        }

        results.push({
          id: docSnap.id,
          rawText: data.rawText || '',
          headerNote: data.headerNote || '',
          firstQueueName: data.firstQueueName || '',
          totalParsed: data.totalParsed || 0,
          onlineCount: data.onlineCount || 0,
          createdAt: ts,
          serverTimeBRT: data.serverTimeBRT || '',
          searchNicks: data.searchNicks || [],
          isLocalOnly: false,
        });
      }
    });
  } catch (err) {
    console.warn('Firestore search failed, returning local matches:', err);
  }

  // Sort newest first
  return results.sort((a, b) => b.createdAt - a.createdAt);
}
