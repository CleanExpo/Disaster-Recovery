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

// Fault switches so tests can make one IndexedDB operation fail on purpose.
const faults = { delete: false, getAll: false, put: false };

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
                      if (faults.put) throw new Error('put failed');
                      const key = value[store.keyPath] as string;
                      store.data.set(key, value);
                      return key;
                    });
                  },
                  delete(key: string) {
                    return makeRequest(() => {
                      if (faults.delete) throw new Error('delete failed');
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
                  get(key: string) {
                    return makeRequest(() => store.data.get(key));
                  },
                  getAll() {
                    return makeRequest(() => {
                      if (faults.getAll) throw new Error('read failed');
                      return Array.from(store.data.values());
                    });
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
  faults.delete = false;
  faults.getAll = false;
  faults.put = false;
  localStorage.clear();
  // Fresh IDB per test — drops every store.
  (globalThis as unknown as { indexedDB: unknown }).indexedDB = createIdbStub();
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

// Claims queued after 02/11/2026 carry the call-out fee acknowledgement.
const ACK = { calloutFeeAcknowledged: true } as const;

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
    await mod.enqueueClaim({ fullName: 'First', ...ACK });
    await new Promise((r) => setTimeout(r, 5)); // ensure different queuedAt
    await mod.enqueueClaim({ fullName: 'Second', ...ACK });

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
    await mod.enqueueClaim({ fullName: 'BadPayload', ...ACK });
    const fetchImpl = vi.fn().mockResolvedValue(new Response('bad', { status: 400 }));
    const result = await mod.replayQueue({ fetchImpl });
    expect(result.deadLettered).toBe(1);
    expect(await mod.getQueueSize()).toBe(0);
    expect(await mod.getDeadLetterSize()).toBe(1);
  });

  it('replayQueue keeps items in the pending queue on 5xx / network error', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'TransientCase', ...ACK });

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
    await mod.enqueueClaim({ fullName: 'Casey Morgan', ...ACK });
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
    await mod.enqueueClaim({ fullName: 'Retry Me', ...ACK });
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

  it('holds a claim queued without the call-out fee acknowledgement: never sent, never dead-lettered', async () => {
    const mod = await loadQueue();
    // Shape the pre-02/11/2026 claim form queued: no calloutFeeAcknowledged.
    await mod.enqueueClaim({ fullName: 'Legacy Claim', paymentConfirmed: false, paymentAmount: 0 });
    await mod.enqueueClaim({ fullName: 'Acknowledged Claim', ...ACK });
    const events: string[] = [];
    const off = mod.onQueueEvent((e) => events.push(e.type));
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

    const result = await mod.replayQueue({ fetchImpl });
    off();

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).fullName).toBe('Acknowledged Claim');
    expect(result).toMatchObject({ successes: 1, deadLettered: 0, held: 1 });
    expect(events).toContain('replay-held');
    expect(await mod.getDeadLetterSize()).toBe(0);
    const held = await mod.readHeldClaims();
    expect(held.ok && held.items).toHaveLength(1);
    expect(held.ok && held.items[0]?.payload).toMatchObject({ fullName: 'Legacy Claim' });

    // A second replay still does not send or dead-letter it.
    const again = await mod.replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(again.held).toBe(1);
    expect(await mod.getQueueSize()).toBe(1);
  });

  it('removeQueuedClaim deletes a held claim and reports it', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Legacy Claim' });
    const held = await mod.readHeldClaims();
    const id = held.ok ? held.items[0]?.id : undefined;
    expect(id).toBeDefined();
    expect(await mod.removeQueuedClaim(id!)).toBe(true);
    expect(await mod.getQueueSize()).toBe(0);
    expect(await mod.readHeldClaims()).toEqual({ ok: true, items: [] });
  });

  it('R2 a claim the server accepted is never sent again when deleting it fails', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
    faults.delete = true;
    const first = await mod.replayQueue({ fetchImpl });
    expect(first.successes).toBe(1);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    // Still on the device (delete failed) but accepted: not counted as waiting, not held.
    expect(await mod.getQueueSize()).toBe(0);
    expect(await mod.readHeldClaims()).toEqual({ ok: true, items: [] });

    const second = await mod.replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(second.successes).toBe(0);

    // Once IndexedDB recovers, the next replay finishes the cleanup without sending.
    faults.delete = false;
    await mod.replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(await mod.getQueueSize()).toBe(0);
  });

  it('R2 an accepted claim is not sent again after a reload when both cleanup writes failed', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
    faults.delete = true;
    faults.put = true;
    expect((await mod.replayQueue({ fetchImpl })).successes).toBe(1);
    expect(fetchImpl).toHaveBeenCalledTimes(1);

    // Same page: still not resent.
    faults.put = false;
    await mod.replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);

    // Page reload (fresh module, same device storage), IndexedDB recovered.
    faults.delete = false;
    vi.resetModules();
    const reloaded = await loadQueue();
    await reloaded.replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(await reloaded.getQueueSize()).toBe(0);
    // The marker is dropped only once the delete is confirmed.
    expect(localStorage.getItem('dr-offline-queue-accepted')).toBeNull();
  });

  it('R2 an accepted claim is not sent again in the same page even when no storage works', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
    faults.delete = true;
    faults.put = true;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    await mod.replayQueue({ fetchImpl });
    await mod.replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('R2 an accepted marker survives a failed delete and a failed read', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
    faults.delete = true;
    faults.put = true;
    await mod.replayQueue({ fetchImpl });
    faults.getAll = true;
    await mod.replayQueue({ fetchImpl }).catch(() => undefined);
    faults.getAll = false;
    await mod.replayQueue({ fetchImpl });
    expect(localStorage.getItem('dr-offline-queue-accepted')).not.toBeNull();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('R6 removing a claim that is not on the device reports false', async () => {
    const mod = await loadQueue();
    expect(await mod.removeQueuedClaim('does-not-exist')).toBe(false);
  });

  it('R4 a failed queue read is reported as a failure, not as no held claims', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Legacy Claim' });
    faults.getAll = true;
    const result = await mod.readHeldClaims();
    expect(result.ok).toBe(false);
    faults.getAll = false;
    const recovered = await mod.readHeldClaims();
    expect(recovered.ok && recovered.items).toHaveLength(1);
  });

  it('R4 readHeldClaims reports failure when IndexedDB is unavailable', async () => {
    const mod = await loadQueue();
    (globalThis as unknown as { indexedDB: unknown }).indexedDB = undefined;
    expect((await mod.readHeldClaims()).ok).toBe(false);
  });

  it('R6 queue writes report false when IndexedDB is unavailable or the write fails', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Legacy Claim' });
    const held = await mod.readHeldClaims();
    const id = held.ok ? held.items[0]!.id : '';

    faults.delete = true;
    expect(await mod.removeQueuedClaim(id)).toBe(false);
    faults.delete = false;
    faults.put = true;
    expect(await mod.acknowledgeHeldClaim(id)).toBe(false);
    faults.put = false;

    const saved = (globalThis as unknown as { indexedDB: unknown }).indexedDB;
    (globalThis as unknown as { indexedDB: unknown }).indexedDB = undefined;
    expect(await mod.removeQueuedClaim(id)).toBe(false);
    expect(await mod.acknowledgeHeldClaim(id)).toBe(false);
    (globalThis as unknown as { indexedDB: unknown }).indexedDB = saved;

    // Nothing was lost: the held claim is still there.
    expect(await mod.getQueueSize()).toBe(1);
    expect(await mod.acknowledgeHeldClaim('missing-id')).toBe(false);
  });

  it('R10 acknowledging a held claim makes the next replay send it, with the tick and no fee', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({
      fullName: 'Legacy Claim',
      paymentConfirmed: false,
      paymentAmount: 2750,
    });
    const held = await mod.readHeldClaims();
    const id = held.ok ? held.items[0]!.id : '';
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));

    expect(await mod.acknowledgeHeldClaim(id)).toBe(true);
    expect(await mod.readHeldClaims()).toEqual({ ok: true, items: [] });
    const result = await mod.replayQueue({ fetchImpl });

    expect(result).toMatchObject({ successes: 1, held: 0 });
    const body = JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(body).toMatchObject({ fullName: 'Legacy Claim', calloutFeeAcknowledged: true });
    expect(body.paymentAmount).toBe(0);
    expect(JSON.stringify(body)).not.toMatch(/2750/);
    expect(await mod.getQueueSize()).toBe(0);
    // Acknowledging twice is refused: it is no longer held.
    expect(await mod.acknowledgeHeldClaim(id)).toBe(false);
  });

  it('R10 overlapping replays post each claim once, and a call during a run is not lost', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'First', ...ACK });
    let release: () => void = () => {};
    const gate = new Promise<void>((r) => {
      release = r;
    });
    const fetchImpl = vi.fn().mockImplementation(async () => {
      await gate;
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    });

    const a = mod.replayQueue({ fetchImpl });
    const b = mod.replayQueue({ fetchImpl });
    const c = mod.replayQueue({ fetchImpl });
    // Queued while the first run is in flight: must still be sent.
    await mod.enqueueClaim({ fullName: 'Second', ...ACK });
    release();
    await Promise.all([a, b, c]);

    const names = fetchImpl.mock.calls.map((call) => JSON.parse(call[1].body).fullName);
    expect(names.sort()).toEqual(['First', 'Second']);
    expect(await mod.getQueueSize()).toBe(0);
  });

  it('isOfflineQueueEnabled reflects the feature flag', async () => {
    const mod = await loadQueue();
    expect(mod.isOfflineQueueEnabled()).toBe(true);
  });
});
