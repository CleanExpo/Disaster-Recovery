// IndexedDB utility for offline claim form persistence
// No external library — uses native IndexedDB API

const DB_NAME = 'dr-australia-offline';
const DB_VERSION = 1;
const STORE_NAME = 'claim-drafts';

export interface ClaimDraft {
  id: string; // 'current' for active draft
  formData: Record<string, unknown>;
  step: number;
  savedAt: number; // unix timestamp ms
  synced: boolean;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    req.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
    req.onerror = () => reject(req.error);
  });
}

// Draft writes run strictly in call order. Each call opens its own connection,
// so without this a save issued before a clear could commit after it and put a
// sent claim back in the slot (DR-966).
let writeChain: Promise<unknown> = Promise.resolve();

function serialise<T>(run: () => Promise<T>): Promise<T> {
  const next = writeChain.then(run, run);
  writeChain = next.catch(() => undefined);
  return next;
}

export function saveDraft(
  draft: Partial<ClaimDraft> & { formData: Record<string, unknown>; step: number },
): Promise<void> {
  return serialise(() => writeDraft(draft));
}

async function writeDraft(
  draft: Partial<ClaimDraft> & { formData: Record<string, unknown>; step: number },
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record: ClaimDraft = {
      id: draft.id ?? 'current',
      formData: draft.formData,
      step: draft.step,
      savedAt: draft.savedAt ?? Date.now(),
      synced: draft.synced ?? false,
    };

    const req = store.put(record);
    // Resolve on commit, not request success: an aborted write has not happened.
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onabort = tx.onerror = () => {
      db.close();
      reject(tx.error ?? req.error ?? new Error('draft save failed'));
    };
  });
}

// Resolves null only when there is truly no draft: no IndexedDB on this device
// (so nothing can have been saved) or an empty slot. A failed open or read
// rejects, so a caller never mistakes "could not check" for "nothing saved".
export async function loadDraft(): Promise<ClaimDraft | null> {
  if (typeof window === 'undefined' || !window.indexedDB) return null;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get('current');

    req.onsuccess = () => {
      db.close();
      resolve((req.result as ClaimDraft) ?? null);
    };
    req.onerror = () => {
      db.close();
      reject(req.error ?? new Error('draft read failed'));
    };
  });
}

export function clearDraft(): Promise<void> {
  return serialise(removeDraft);
}

// Resolves only once the delete has committed; rejects if storage cannot be
// opened or the transaction aborts, so a caller never reports a draft as
// deleted when it is still on the device.
async function removeDraft(): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete('current');

    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onabort = tx.onerror = () => {
      db.close();
      reject(tx.error ?? req.error ?? new Error('draft clear failed'));
    };
  });
}

export async function getUnsynced(): Promise<ClaimDraft[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        db.close();
        const all = (req.result as ClaimDraft[]) ?? [];
        resolve(all.filter((d) => !d.synced));
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  } catch {
    return [];
  }
}

export async function markSynced(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(id);

      getReq.onsuccess = () => {
        const draft = getReq.result as ClaimDraft | undefined;
        if (!draft) {
          db.close();
          resolve();
          return;
        }
        draft.synced = true;
        const putReq = store.put(draft);
        putReq.onsuccess = () => {
          db.close();
          resolve();
        };
        putReq.onerror = () => {
          db.close();
          reject(putReq.error);
        };
      };
      getReq.onerror = () => {
        db.close();
        reject(getReq.error);
      };
    });
  } catch {
    // Best-effort
  }
}
