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
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED === 'true';

export interface QueuedClaim {
  id: string;
  payload: Record<string, unknown>;
  queuedAt: number;
  attempts: number;
  lastError?: string;
  /**
   * Set when the server accepted this item but deleting it afterwards failed.
   * Replay never sends an accepted item again; it only retries the delete.
   */
  acceptedAt?: number;
}

export type QueueEvent =
  | { type: 'enqueued'; id: string; size: number }
  | { type: 'replay-start'; size: number }
  | { type: 'replay-success'; id: string; remaining: number }
  | { type: 'replay-retry'; id: string; error: string }
  | { type: 'replay-deadletter'; id: string; error: string }
  | { type: 'replay-held'; id: string; reason: 'callout-fee-acknowledgement-missing' }
  | { type: 'removed'; id: string; remaining: number }
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

/**
 * Run one request in its own transaction. Resolves only when the transaction
 * COMMITS (oncomplete), never at request success: a write whose transaction
 * then aborts has not happened, and must not be reported as done (DR-966).
 */
function tx<T>(
  storeName: string,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(storeName, mode);
        const request = run(t.objectStore(storeName));
        t.oncomplete = () => resolve(request.result);
        t.onabort = () => reject(t.error ?? request.error ?? new Error('IDB transaction aborted'));
        t.onerror = () => reject(t.error ?? request.error ?? new Error('IDB transaction failed'));
      }),
  );
}

async function putItem(storeName: string, item: QueuedClaim): Promise<void> {
  await tx<IDBValidKey>(storeName, 'readwrite', (s) => s.put(item));
}

async function deleteItem(storeName: string, id: string): Promise<void> {
  await tx<undefined>(storeName, 'readwrite', (s) => s.delete(id));
}

/**
 * Delete one item only if it exists, in one transaction. Resolves true only
 * once the delete has committed; false when the item was not there.
 */
function deleteExisting(storeName: string, id: string): Promise<boolean> {
  return openDb().then(
    (db) =>
      new Promise<boolean>((resolve, reject) => {
        const t = db.transaction(storeName, 'readwrite');
        const store = t.objectStore(storeName);
        let found = false;
        const get = store.get(id);
        get.onsuccess = () => {
          if (get.result === undefined) return;
          found = true;
          store.delete(id);
        };
        t.oncomplete = () => resolve(found);
        t.onabort = () => reject(t.error ?? new Error('IDB transaction aborted'));
        t.onerror = () => reject(t.error ?? new Error('IDB transaction failed'));
      }),
  );
}

// ── Accepted-claim markers ──────────────────────────────────────────────
// When the server accepts a replayed claim but IndexedDB cannot delete or
// mark it, the claim must still never be sent again. The marker is written
// BEFORE the delete, to storage independent of IndexedDB (localStorage, plus
// memory for this page), and removed only after a delete is confirmed or a
// successful read shows the item gone. A failed read never removes a marker.

const ACCEPTED_KEY = 'dr-offline-queue-accepted';
const acceptedThisPage = new Set<string>();

function readAccepted(): Set<string> {
  const ids = new Set(acceptedThisPage);
  try {
    const raw = localStorage.getItem(ACCEPTED_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      parsed.forEach((id) => {
        if (typeof id === 'string') ids.add(id);
      });
    }
  } catch {
    /* localStorage unavailable or corrupt: the memory set still applies */
  }
  return ids;
}

function writeAccepted(ids: Set<string>): void {
  try {
    if (ids.size === 0) localStorage.removeItem(ACCEPTED_KEY);
    else localStorage.setItem(ACCEPTED_KEY, JSON.stringify([...ids]));
  } catch {
    /* best effort; the memory set still guards this page */
  }
}

function markAccepted(id: string): void {
  acceptedThisPage.add(id);
  const ids = readAccepted();
  ids.add(id);
  writeAccepted(ids);
}

function forgetAccepted(remove: string[]): void {
  if (remove.length === 0) return;
  remove.forEach((id) => acceptedThisPage.delete(id));
  const ids = readAccepted();
  remove.forEach((id) => ids.delete(id));
  writeAccepted(ids);
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
    // A claim the server already accepted is not waiting to send.
    const accepted = readAccepted();
    return items.filter((i) => i.acceptedAt === undefined && !accepted.has(i.id)).length;
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

/**
 * A queued claim saved before the call-out fee acknowledgement existed
 * (02/11/2026) lacks `calloutFeeAcknowledged: true`. The server refuses it
 * with 400, which would dead-letter it and lose the homeowner's claim, and
 * consent must never be inferred. Such items are held in the pending store
 * (never sent, never dead-lettered) until the homeowner ticks the box in the
 * claim form and resubmits.
 */
export function needsCalloutFeeAcknowledgement(item: QueuedClaim): boolean {
  return item.payload?.calloutFeeAcknowledged !== true;
}

function isHeld(item: QueuedClaim): boolean {
  return item.acceptedAt === undefined && needsCalloutFeeAcknowledgement(item);
}

/**
 * Pending items held for the homeowner's call-out fee acknowledgement, oldest
 * first. A failed read is reported as `{ ok: false }`, never as an empty list,
 * so the caller can tell "none saved" apart from "could not check".
 */
export async function readHeldClaims(): Promise<
  { ok: true; items: QueuedClaim[] } | { ok: false; reason: string }
> {
  if (!FLAG_ENABLED) return { ok: true, items: [] };
  if (!hasIDB()) return { ok: false, reason: 'no-idb' };
  try {
    const items = await listItems(STORE_PENDING);
    return { ok: true, items: items.filter(isHeld).sort((a, b) => a.queuedAt - b.queuedAt) };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'idb-read-failed' };
  }
}

/**
 * Record the homeowner's call-out fee acknowledgement on one held item. The
 * item then becomes an ordinary queued claim and the next replay sends it.
 * Returns false (and changes nothing) if the item is not held or the write
 * fails. Consent is only ever set here, from an explicit tick.
 */
export async function acknowledgeHeldClaim(id: string): Promise<boolean> {
  if (!FLAG_ENABLED || !hasIDB()) return false;
  try {
    const item = (await listItems(STORE_PENDING)).find((i) => i.id === id);
    if (!item || !isHeld(item)) return false;
    await putItem(STORE_PENDING, {
      ...item,
      payload: {
        ...item.payload,
        // A legacy payload may carry the old platform fee; never send it.
        paymentConfirmed: false,
        paymentAmount: 0,
        calloutFeeAcknowledged: true,
      },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove one pending item (the homeowner chose to delete a held claim).
 * Returns true only when the item was deleted.
 */
export async function removeQueuedClaim(id: string): Promise<boolean> {
  if (!FLAG_ENABLED || !hasIDB()) return false;
  try {
    if (!(await deleteExisting(STORE_PENDING, id))) return false;
  } catch {
    return false;
  }
  emit({ type: 'removed', id, remaining: await getQueueSize() });
  return true;
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
export type ReplayResult = {
  successes: number;
  failures: number;
  deadLettered: number;
  held: number;
};

let replayRunning: Promise<ReplayResult> | null = null;
let replayFollowUp: Promise<ReplayResult> | null = null;

// One replay at a time across every tab of this site, not just this page:
// two tabs replaying together would each post the same claim. The Web Locks
// API queues the second tab until the first has finished; it then reads the
// queue afresh and finds the claim gone or marked accepted. Where the API is
// missing, replay is single-flight within the page only (plan doc rule 3).
const REPLAY_LOCK = 'dr-offline-queue-replay';

function acrossTabs<T>(run: () => Promise<T>): Promise<T> {
  const locks =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & { locks?: LockManager }).locks
      : undefined;
  if (!locks || typeof locks.request !== 'function') return run();
  return locks.request(REPLAY_LOCK, { mode: 'exclusive' }, () => run()) as Promise<T>;
}

/**
 * Single-flight: only one replay runs at a time, so overlapping callers
 * (page load, the online event, the banner retry, the held-claim panel) never
 * post the same item twice. A call made during a run waits for it and then
 * runs once more, so an item acknowledged mid-run is still sent.
 */
export function replayQueue(deps: ReplayDeps = {}): Promise<ReplayResult> {
  if (!replayRunning) {
    replayRunning = acrossTabs(() => runReplay(deps)).finally(() => {
      replayRunning = null;
    });
    return replayRunning;
  }
  if (!replayFollowUp) {
    replayFollowUp = replayRunning
      .catch(() => undefined)
      .then(() => {
        replayFollowUp = null;
        return replayQueue(deps);
      });
  }
  return replayFollowUp;
}

async function runReplay(deps: ReplayDeps): Promise<ReplayResult> {
  if (!FLAG_ENABLED) return { successes: 0, failures: 0, deadLettered: 0, held: 0 };
  if (!hasIDB()) return { successes: 0, failures: 0, deadLettered: 0, held: 0 };

  const fetchImpl = deps.fetchImpl ?? fetch;
  const now = deps.now ?? Date.now;

  let all: QueuedClaim[];
  try {
    all = (await listItems(STORE_PENDING)).sort((a, b) => a.queuedAt - b.queuedAt);
  } catch {
    // Could not read the queue: send nothing, and leave every marker alone.
    return { successes: 0, failures: 0, deadLettered: 0, held: 0 };
  }
  const acceptedIds = readAccepted();
  const isAccepted = (item: QueuedClaim) =>
    item.acceptedAt !== undefined || acceptedIds.has(item.id);
  // A successful read shows these markers' items are gone: drop the markers.
  const present = new Set(all.map((item) => item.id));
  forgetAccepted([...acceptedIds].filter((id) => !present.has(id)));
  // Accepted by the server earlier but not yet deleted: retry the delete only.
  for (const item of all) {
    if (!isAccepted(item)) continue;
    await deleteItem(STORE_PENDING, item.id).then(
      () => forgetAccepted([item.id]),
      () => undefined,
    );
  }
  const items = all.filter((item) => !isAccepted(item) && !isHeld(item));
  const heldItems = all.filter(isHeld);
  const held = heldItems.length;
  for (const item of heldItems) {
    emit({ type: 'replay-held', id: item.id, reason: 'callout-fee-acknowledgement-missing' });
  }
  if (items.length === 0) return { successes: 0, failures: 0, deadLettered: 0, held };

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
          // Stable per queued claim, so the server can refuse a repeat once it
          // records this key (follow-up: server-side idempotency).
          'x-offline-claim-id': item.id,
          'x-offline-queued-at': String(item.queuedAt),
          'x-offline-replayed-at': String(replayedAt),
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        // The server has the claim. Mark it accepted before cleanup, so no
        // later replay sends it again whatever the delete does.
        markAccepted(item.id);
        await deleteItem(STORE_PENDING, item.id).then(
          () => forgetAccepted([item.id]),
          () => putItem(STORE_PENDING, { ...item, acceptedAt: replayedAt }).catch(() => undefined),
        );
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
  return { successes, failures, deadLettered, held };
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
