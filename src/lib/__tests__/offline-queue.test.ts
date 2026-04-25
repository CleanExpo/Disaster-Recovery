/**
 * Offline queue tests — iOS App Store Phase 2 PR #5 (RA-1633).
 *
 * Uses a hand-rolled in-memory IndexedDB stub (happy-dom does not ship
 * IDB, and `fake-indexeddb` is not in the deps — justification: keeps
 * the test scope tight, no new package lands).
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ── Minimal in-memory IDB stub ──────────────────────────────────────────
// Supports the exact surface `src/lib/offline-queue.ts` uses:
//   indexedDB.open, upgradeneeded createObjectStore,
//   transaction(..).objectStore(..).put / delete / clear / getAll.

interface StubStore {
  keyPath: string;
  data: Map<string, unknown>;
}

function createIdbStub() {
  const stores = new Map<string, StubStore>();

  function makeRequest<T = unknown>(
    run: () => T,
  ): IDBRequest<T> & { onsuccess: null | (() => void); onerror: null | (() => void) } {
    const req = {
      onsuccess: null as null | (() => void),
      onerror: null as null | (() => void),
      result: undefined as T,
      error: null as unknown,
    };
    queueMicrotask(() => {
      try {
        req.result = run();
        req.onsuccess?.();
      } catch (err) {
        req.error = err;
        req.onerror?.();
      }
    });
    return req as unknown as IDBRequest<T> & {
      onsuccess: null | (() => void);
      onerror: null | (() => void);
    };
  }

  return {
    open(_name: string, _version?: number) {
      const req = {
        onsuccess: null as null | (() => void),
        onerror: null as null | (() => void),
        onupgradeneeded: null as null | (() => void),
        result: null as unknown,
        error: null as unknown,
      };
      queueMicrotask(() => {
        const db = {
          objectStoreNames: {
            contains: (n: string) => stores.has(n),
          },
          createObjectStore(name: string, opts: { keyPath: string }) {
            stores.set(name, { keyPath: opts.keyPath, data: new Map() });
            return {};
          },
          transaction(storeName: string, _mode: string) {
            const store = stores.get(storeName);
            if (!store) throw new Error(`Unknown store: ${storeName}`);
            return {
              objectStore() {
                return {
                  put(value: Record<string, unknown>) {
                    return makeRequest(() => {
                      const key = value[store.keyPath] as string;
                      store.data.set(key, value);
                      return key;
                    });
                  },
                  delete(key: string) {
                    return makeRequest(() => {
                      store.data.delete(key);
                      return undefined;
                    });
                  },
                  clear() {
                    return makeRequest(() => {
                      store.data.clear();
                      return undefined;
                    });
                  },
                  getAll() {
                    return makeRequest(() => Array.from(store.data.values()));
                  },
                };
              },
            };
          },
        };
        req.result = db;
        req.onupgradeneeded?.();
        req.onsuccess?.();
      });
      return req as unknown as IDBOpenDBRequest;
    },
  };
}

// ── Setup ───────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED', 'true');
  // Fresh IDB per test — drops every store.
  (globalThis as unknown as { indexedDB: unknown }).indexedDB = createIdbStub();
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

// Helper — dynamic import so module picks up the stubbed env var.
async function loadQueue() {
  return await import('../offline-queue');
}

describe('offline-queue', () => {
  it('enqueueClaim returns flag-off when the feature flag is disabled', async () => {
    vi.stubEnv('NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED', 'false');
    vi.resetModules();
    const mod = await loadQueue();
    const res = await mod.enqueueClaim({ fullName: 'Alex Taylor' });
    expect(res).toEqual({ ok: false, reason: 'flag-off' });
    expect(await mod.getQueueSize()).toBe(0);
  });

  it('enqueueClaim persists a payload and increments the queue size', async () => {
    const mod = await loadQueue();
    const res = await mod.enqueueClaim({ fullName: 'Jordan Lee', suburb: 'Brisbane' });
    expect(res.ok).toBe(true);
    expect(await mod.getQueueSize()).toBe(1);
    const items = await mod.peekQueue();
    expect(items).toHaveLength(1);
    expect(items[0]?.payload).toMatchObject({ fullName: 'Jordan Lee' });
  });

  it('replayQueue drains pending items in FIFO order on 2xx', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'First' });
    await new Promise((r) => setTimeout(r, 5)); // ensure different queuedAt
    await mod.enqueueClaim({ fullName: 'Second' });

    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

    const result = await mod.replayQueue({ fetchImpl });
    expect(result.successes).toBe(2);
    expect(result.failures).toBe(0);
    expect(result.deadLettered).toBe(0);
    expect(await mod.getQueueSize()).toBe(0);

    // FIFO — first call carries the oldest payload.
    const firstCallBody = JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(firstCallBody.fullName).toBe('First');
    expect(firstCallBody._offlineMeta.deferred_submit).toBe(true);
    expect(typeof firstCallBody._offlineMeta.offline_queued_at).toBe('number');
    expect(typeof firstCallBody._offlineMeta.replayed_at).toBe('number');
  });

  it('replayQueue moves items to dead-letter on persistent 4xx', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'BadPayload' });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response('bad', { status: 400 }));
    const result = await mod.replayQueue({ fetchImpl });
    expect(result.deadLettered).toBe(1);
    expect(await mod.getQueueSize()).toBe(0);
    expect(await mod.getDeadLetterSize()).toBe(1);
  });

  it('replayQueue keeps items in the pending queue on 5xx / network error', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'TransientCase' });

    const fetch5xx = vi.fn().mockResolvedValue(new Response('nope', { status: 503 }));
    const r1 = await mod.replayQueue({ fetchImpl: fetch5xx });
    expect(r1.failures).toBe(1);
    expect(await mod.getQueueSize()).toBe(1);
    expect(await mod.getDeadLetterSize()).toBe(0);

    const fetchNet = vi.fn().mockRejectedValue(new Error('offline'));
    const r2 = await mod.replayQueue({ fetchImpl: fetchNet });
    expect(r2.failures).toBe(1);
    expect(await mod.getQueueSize()).toBe(1);
  });

  it('emits events for enqueue / replay-success / replay-complete', async () => {
    const mod = await loadQueue();
    const events: string[] = [];
    const off = mod.onQueueEvent((e) => events.push(e.type));
    await mod.enqueueClaim({ fullName: 'Casey Morgan' });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    await mod.replayQueue({ fetchImpl });
    off();
    expect(events).toContain('enqueued');
    expect(events).toContain('replay-start');
    expect(events).toContain('replay-success');
    expect(events).toContain('replay-complete');
  });

  it('retryDeadLetter moves an item back to pending', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Retry Me' });
    const fetchImpl = vi.fn().mockResolvedValue(new Response('bad', { status: 422 }));
    await mod.replayQueue({ fetchImpl });
    expect(await mod.getDeadLetterSize()).toBe(1);

    // Read the dead-letter id via peek + retry.
    const dead = await mod.getDeadLetterSize();
    expect(dead).toBe(1);

    // We can't peek dead-letter publicly; instead, retrying by id requires
    // knowing it. Emit a replay-deadletter event in a prior run is the
    // shipped surface. For this unit test we'll walk IDB directly.
    const db: IDBDatabase = await new Promise((resolve, reject) => {
      const req = indexedDB.open('dr-offline-queue');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    const items: Array<{ id: string }> = await new Promise((resolve, reject) => {
      const t = db.transaction('deadletter', 'readonly').objectStore('deadletter').getAll();
      t.onsuccess = () => resolve(t.result as Array<{ id: string }>);
      t.onerror = () => reject(t.error);
    });
    expect(items).toHaveLength(1);
    const ok = await mod.retryDeadLetter(items[0]!.id);
    expect(ok).toBe(true);
    expect(await mod.getDeadLetterSize()).toBe(0);
    expect(await mod.getQueueSize()).toBe(1);
  });

  it('isOfflineQueueEnabled reflects the feature flag', async () => {
    const mod = await loadQueue();
    expect(mod.isOfflineQueueEnabled()).toBe(true);
  });
});
