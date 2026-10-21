/**
 * Storage helper for saving and retrieving generated Lyria music tracks via IndexedDB
 */

export interface SavedTrack {
  id: string;
  title: string;
  prompt: string;
  model: 'lyria-3-clip-preview' | 'lyria-3-pro-preview';
  sectionTarget?: string; // 'all' | 'hero' | 'about' | 'projects' | etc.
  audioUrl: string; // Object URL or base64 data URL
  createdAt: number;
}

const DB_NAME = 'natalia_portfolio_music_db';
const STORE_NAME = 'tracks';
const DB_VERSION = 1;

function openMusicDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Window not available'));
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveTrack(track: SavedTrack): Promise<void> {
  try {
    const db = await openMusicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(track);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not save track to IndexedDB', err);
  }
}

export async function getAllTracks(): Promise<SavedTrack[]> {
  try {
    const db = await openMusicDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.warn('Could not load tracks from IndexedDB', err);
    return [];
  }
}

export async function deleteTrack(id: string): Promise<void> {
  try {
    const db = await openMusicDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not delete track from IndexedDB', err);
  }
}
