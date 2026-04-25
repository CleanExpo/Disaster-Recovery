/**
 * Offline claim submission queue — iOS App Store Phase 2 PR #5 (RA-1633).
 *
 * When the user submits `/claim` while offline (detected via
 * `isOnline()` from `src/lib/native-bridge.ts`), the payload is
 * serialised and queued in IndexedDB. When the network returns, the
 * queue is replayed in FIFO order to the existing `/api/claims/submit`
 * endpoint.
 *
 * Feature-gated behind `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED`. When
 * the flag is off (default), `enqueueClaim()` returns `{ ok: false,
 * reason: 'flag-off' }` and callers must fall back to the normal
 * online POST path — zero runtime footprint on the web surface.
 *
 * APP 3 note: we only persist what the user already typed into the
 * form. No extra fields collected. Payload lives on-device only until
 * replay succeeds (or the dead-letter store for a persistent 4xx).
 *
 * No npm deps — hand-rolled IDB wrapper below (~40 lines).
 */

const DB_NAME = 'dr-offline-queue';
const DB_VERSION = 1;
const STORE_PENDING = 'pending';
const STORE_DEAD = 'deadletter';
const CLAIM_SUBMIT_URL = '/api/claims/submit';

const FLAG_ENABLED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED === 'true';

export interface QueuedClaim {
  id: string;
  payload: Record<string, unknown>;
  queuedAt: number;
  attempts: number;
  lastError?: string;
}

export type QueueEvent =
  | { type: 'enqueued'; id: string; size: number }
  | { type: 'replay-start'; size: number }
  | { type: 'replay-success'; id: string; remaining: number }
  | { type: 'replay-retry'; id: string; error: string }
  | { type: 'replay-deadletter'; id: string; error: string }
  | { type: 'replay-complete'; successes: number; failures: number };

type EventListener = (event: QueueEvent) => void;
const listeners = new Set<EventListener>();

function emit(event: QueueEvent): void {
  listeners.forEach((cb) => {
    try {
      cb(event);
    } catch {
      /* ignore listener errors */
    }
  });
}

/** Subscribe to queue events. Returns an unsubscribe fn. */
export function onQueueEvent(cb: EventListener): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// ── IndexedDB wrapper ───────────────────────────────────────────────────

function hasIDB(): boolean {
  return typeof indexedDB !== 'undefined';
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!hasIDB()) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_PENDING)) {
        db.createObjectStore(STORE_PENDING, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_DEAD)) {
        db.createObjectStore(STORE_DEAD, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IDB open failed'));
  });
}

function tx<T>(
  storeName: string,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(storeName, mode);
        const store = t.objectStore(storeName);
        const result = run(store);
        if (result instanceof Promise) {
          result.then(resolve, reject);
          return;
        }
        result.onsuccess = () => resolve(result.result);
        result.onerror = () => reject(result.error);
      }),
  );
}

async function putItem(storeName: string, item: QueuedClaim): Promise<void> {
  await tx<IDBValidKey>(storeName, 'readwrite', (s) => s.put(item));
}

async function deleteItem(storeName: string, id: string): Promise<void> {
  await tx<undefined>(storeName, 'readwrite', (s) => s.delete(id));
}

async function listItems(storeName: string): Promise<QueuedClaim[]> {
  return tx<QueuedClaim[]>(storeName, 'readonly', (s) => s.getAll() as IDBRequest<QueuedClaim[]>);
}

// ── Public API ──────────────────────────────────────────────────────────

function genId(): string {
  // Not cryptographic — an IDB key. Avoids pulling crypto in SSR paths.
  return `q_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Enqueue a claim submission for later replay. Safe to call even when
 * the flag is off — returns `{ ok: false, reason: 'flag-off' }` and
 * caller should fall back to the normal online POST.
 */
export async function enqueueClaim(
  payload: Record<string, unknown>,
): Promise<{ ok: true; id: string } | { ok: false; reason: string }> {
  if (!FLAG_ENABLED) return { ok: false, reason: 'flag-off' };
  if (!hasIDB()) return { ok: false, reason: 'no-idb' };
  const item: QueuedClaim = {
    id: genId(),
    payload,
    queuedAt: Date.now(),
    attempts: 0,
  };
  try {
    await putItem(STORE_PENDING, item);
    const size = await getQueueSize();
    emit({ type: 'enqueued', id: item.id, size });
    return { ok: true, id: item.id };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : 'idb-write-failed',
    };
  }
}

/** Count of pending items waiting to replay. */
export async function getQueueSize(): Promise<number> {
  if (!FLAG_ENABLED || !hasIDB()) return 0;
  try {
    const items = await listItems(STORE_PENDING);
    return items.length;
  } catch {
    return 0;
  }
}

/** Count of items in the dead-letter store (persistent 4xx). */
export async function getDeadLetterSize(): Promise<number> {
  if (!FLAG_ENABLED || !hasIDB()) return 0;
  try {
    const items = await listItems(STORE_DEAD);
    return items.length;
  } catch {
    return 0;
  }
}

/** Returns all pending items — used for UI rendering / tests. */
export async function peekQueue(): Promise<QueuedClaim[]> {
  if (!FLAG_ENABLED || !hasIDB()) return [];
  try {
    const items = await listItems(STORE_PENDING);
    return items.sort((a, b) => a.queuedAt - b.queuedAt);
  } catch {
    return [];
  }
}

/** Test-only helper — wipes both stores. */
export async function __clearAllForTests(): Promise<void> {
  if (!hasIDB()) return;
  try {
    await tx<undefined>(STORE_PENDING, 'readwrite', (s) => s.clear());
    await tx<undefined>(STORE_DEAD, 'readwrite', (s) => s.clear());
  } catch {
    /* ignore */
  }
}

interface ReplayDeps {
  fetchImpl?: typeof fetch;
  now?: () => number;
}

/**
 * Replay every queued submission in FIFO order. Returns summary counts.
 * On HTTP 4xx (persistent client error), moves the item to the
 * dead-letter store. On network error or 5xx, leaves the item in the
 * queue for the next replay cycle.
 *
 * Each replay tags the body with `_offlineMeta` — the server-side
 * `compliance_events` logger on `/api/claims/submit` can honour
 * `deferred_submit=true`, `offline_queued_at`, `replayed_at` without
 * any schema change. If the server ignores the field, the metadata
 * is still available in the response audit trail.
 */
export async function replayQueue(
  deps: ReplayDeps = {},
): Promise<{ successes: number; failures: number; deadLettered: number }> {
  if (!FLAG_ENABLED) return { successes: 0, failures: 0, deadLettered: 0 };
  if (!hasIDB()) return { successes: 0, failures: 0, deadLettered: 0 };

  const fetchImpl = deps.fetchImpl ?? fetch;
  const now = deps.now ?? Date.now;

  const items = await peekQueue();
  if (items.length === 0) return { successes: 0, failures: 0, deadLettered: 0 };

  emit({ type: 'replay-start', size: items.length });

  let successes = 0;
  let failures = 0;
  let deadLettered = 0;

  for (const item of items) {
    const replayedAt = now();
    const body = {
      ...item.payload,
      _offlineMeta: {
        deferred_submit: true,
        offline_queued_at: item.queuedAt,
        replayed_at: replayedAt,
        attempts: item.attempts + 1,
      },
    };

    try {
      const res = await fetchImpl(CLAIM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-offline-replay': '1',
          'x-offline-queued-at': String(item.queuedAt),
          'x-offline-replayed-at': String(replayedAt),
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await deleteItem(STORE_PENDING, item.id);
        successes += 1;
        const remaining = await getQueueSize();
        emit({ type: 'replay-success', id: item.id, remaining });
        continue;
      }

      // Persistent 4xx → dead-letter. The payload is malformed or the
      // request will never succeed as-is; the user will be prompted to
      // retry manually on next app open.
      if (res.status >= 400 && res.status < 500) {
        await putItem(STORE_DEAD, {
          ...item,
          attempts: item.attempts + 1,
          lastError: `HTTP ${res.status}`,
        });
        await deleteItem(STORE_PENDING, item.id);
        deadLettered += 1;
        emit({ type: 'replay-deadletter', id: item.id, error: `HTTP ${res.status}` });
        continue;
      }

      // 5xx or unexpected — transient, keep for next cycle.
      await putItem(STORE_PENDING, {
        ...item,
        attempts: item.attempts + 1,
        lastError: `HTTP ${res.status}`,
      });
      failures += 1;
      emit({ type: 'replay-retry', id: item.id, error: `HTTP ${res.status}` });
    } catch (err) {
      // Network failure — keep in queue, do not dead-letter.
      const msg = err instanceof Error ? err.message : 'network-error';
      await putItem(STORE_PENDING, {
        ...item,
        attempts: item.attempts + 1,
        lastError: msg,
      });
      failures += 1;
      emit({ type: 'replay-retry', id: item.id, error: msg });
    }
  }

  emit({ type: 'replay-complete', successes, failures });
  return { successes, failures, deadLettered };
}

/** Clear a single dead-letter item (used when the user taps "discard"). */
export async function discardDeadLetter(id: string): Promise<void> {
  if (!FLAG_ENABLED || !hasIDB()) return;
  await deleteItem(STORE_DEAD, id);
}

/** Move a dead-letter item back into the pending queue for another go. */
export async function retryDeadLetter(id: string): Promise<boolean> {
  if (!FLAG_ENABLED || !hasIDB()) return false;
  try {
    const dead = await listItems(STORE_DEAD);
    const item = dead.find((d) => d.id === id);
    if (!item) return false;
    await putItem(STORE_PENDING, { ...item, attempts: 0, lastError: undefined });
    await deleteItem(STORE_DEAD, id);
    return true;
  } catch {
    return false;
  }
}

/** Public flag check — lets callers mirror the gating cheaply. */
export function isOfflineQueueEnabled(): boolean {
  return FLAG_ENABLED;
}
