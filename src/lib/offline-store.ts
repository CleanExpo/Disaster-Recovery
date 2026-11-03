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
  owner?: string; // page that last wrote the slot (absent on drafts saved before DR-966)
}

/**
 * Which page a saved draft belongs to. Drafts saved before owners existed are
 * identified by their save time.
 */
export function draftOwner(draft: ClaimDraft): string {
  return draft.owner ?? `legacy:${draft.savedAt}`;
}

/**
 * How a page proves the slot is still the one it read. `me` is this page's own
 * id; `expect()` is the owner the page believes holds the slot (null: the slot
 * was empty when this page took it). Read inside the write's own transaction,
 * so another tab's write in between is always seen (review round 7).
 */
export interface DraftGuard {
  me: string;
  expect: () => string | null;
}

/** The slot no longer holds what this page read: another tab changed it. */
export class DraftConflictError extends Error {
  constructor() {
    super('the saved claim was changed in another tab');
    this.name = 'DraftConflictError';
  }
}

function mayWrite(current: ClaimDraft | undefined, guard: DraftGuard): boolean {
  const holder = current ? draftOwner(current) : null;
  const expected = guard.expect();
  if (holder === null) return expected === null;
  return holder === guard.me || holder === expected;
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

/**
 * Save the draft only if the slot still holds what this page read (see
 * DraftGuard), checked and written in one readwrite transaction. Rejects with
 * DraftConflictError, writing nothing, when another tab has saved over or
 * cleared it, so a stale page can never overwrite a newer claim or bring back
 * one that was sent.
 */
export function saveDraft(
  draft: Partial<ClaimDraft> & { formData: Record<string, unknown>; step: number },
  guard: DraftGuard,
): Promise<void> {
  return serialise(() => writeDraft(draft, guard));
}

async function writeDraft(
  draft: Partial<ClaimDraft> & { formData: Record<string, unknown>; step: number },
  guard: DraftGuard,
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    let conflict = false;

    const record: ClaimDraft = {
      id: draft.id ?? 'current',
      formData: draft.formData,
      step: draft.step,
      savedAt: draft.savedAt ?? Date.now(),
      synced: draft.synced ?? false,
      owner: guard.me,
    };

    const get = store.get('current');
    get.onsuccess = () => {
      if (!mayWrite(get.result as ClaimDraft | undefined, guard)) {
        conflict = true;
        return;
      }
      store.put(record);
    };
    // Resolve on commit, not request success: an aborted write has not happened.
    tx.oncomplete = () => {
      db.close();
      if (conflict) reject(new DraftConflictError());
      else resolve();
    };
    tx.onabort = tx.onerror = () => {
      db.close();
      reject(tx.error ?? get.error ?? new Error('draft save failed'));
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

/**
 * Which saved draft a clear may remove: one owned by `me` or by `expect()`, or
 * with `expect: 'any'` whatever is there (the homeowner chose to replace a
 * claim the page could not read).
 */
export interface ClearGuard {
  me: string;
  expect: () => string | null | 'any';
}

/**
 * Remove the saved draft, checked and deleted in one readwrite transaction.
 * Resolves 'removed' once the slot is empty (deleted now, or already gone),
 * 'changed' when it now holds another tab's claim, which is left in place.
 * Rejects if storage cannot be opened or the transaction aborts, so a caller
 * never reports a draft as deleted when it is still on the device.
 */
export function clearDraft(guard: ClearGuard): Promise<'removed' | 'changed'> {
  return serialise(() => removeDraft(guard));
}

async function removeDraft(guard: ClearGuard): Promise<'removed' | 'changed'> {
  const db = await openDB();
  return new Promise<'removed' | 'changed'>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    let outcome: 'removed' | 'changed' = 'removed';

    const get = store.get('current');
    get.onsuccess = () => {
      const current = get.result as ClaimDraft | undefined;
      if (!current) return;
      const expected = guard.expect();
      const holder = draftOwner(current);
      if (expected !== 'any' && holder !== guard.me && holder !== expected) {
        outcome = 'changed';
        return;
      }
      store.delete('current');
    };
    tx.oncomplete = () => {
      db.close();
      resolve(outcome);
    };
    tx.onabort = tx.onerror = () => {
      db.close();
      reject(tx.error ?? get.error ?? new Error('draft clear failed'));
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
