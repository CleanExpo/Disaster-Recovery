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
const faults = { delete: false, getAll: false, put: false, abort: false };
// When set, the next put waits for this promise before it runs, holding its
// transaction open: how a slow write from another tab looks.
let holdNextPut: Promise<void> | null = null;

function createIdbStub() {
  const stores = new Map<string, StubStore>();

  // Transactional like real IndexedDB: a transaction works on a copy of the
  // store, commits it when its last request settles, and on abort discards
  // every write it made. faults.abort makes the next transaction abort AFTER
  // its requests have succeeded, which is how a commit failure looks.
  function makeTransaction(store: StubStore) {
    const working = new Map(store.data);
    let pending = 0;
    let done = false;
    let failed: unknown = null;
    const t = {
      oncomplete: null as null | (() => void),
      onabort: null as null | (() => void),
      onerror: null as null | (() => void),
      error: null as unknown,
    };
    function settle() {
      setTimeout(() => {
        if (done || pending > 0) return;
        done = true;
        // A failed request aborts its transaction, as in real IndexedDB.
        if (failed !== null || faults.abort) {
          if (failed === null) faults.abort = false;
          t.error = failed ?? new Error('transaction aborted');
          t.onabort?.();
          return;
        }
        store.data = working;
        t.oncomplete?.();
      }, 0);
    }
    function request<T>(run: () => T, wait: Promise<void> | null = null) {
      const req = {
        onsuccess: null as null | (() => void),
        onerror: null as null | (() => void),
        result: undefined as T,
        error: null as unknown,
      };
      pending += 1;
      const go = () => {
        try {
          req.result = run();
          req.onsuccess?.();
        } catch (err) {
          req.error = err;
          failed = err;
          req.onerror?.();
        }
        pending -= 1;
        settle();
      };
      if (wait) void wait.then(go);
      else queueMicrotask(go);
      return req as unknown as IDBRequest<T>;
    }
    const objectStore = {
      put(value: Record<string, unknown>) {
        const wait = holdNextPut;
        holdNextPut = null;
        return request(() => {
          if (faults.put) throw new Error('put failed');
          const key = value[store.keyPath] as string;
          working.set(key, value);
          return key;
        }, wait);
      },
      delete(key: string) {
        return request(() => {
          if (faults.delete) throw new Error('delete failed');
          working.delete(key);
          return undefined;
        });
      },
      clear() {
        return request(() => {
          working.clear();
          return undefined;
        });
      },
      get(key: string) {
        return request(() => working.get(key));
      },
      getAll() {
        return request(() => {
          if (faults.getAll) throw new Error('read failed');
          return Array.from(working.values());
        });
      },
    };
    return Object.assign(t, { objectStore: () => objectStore });
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
            if (!store) throw new Error('Unknown store: ' + storeName);
            return makeTransaction(store);
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
  faults.abort = false;
  holdNextPut = null;
  localStorage.clear();
  // Fresh IDB per test — drops every store.
  (globalThis as unknown as { indexedDB: unknown }).indexedDB = createIdbStub();
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// localStorage that refuses every write, as in a full or blocked store.
const brokenStorage = {
  getItem: () => null,
  setItem: () => {
    throw new Error('quota');
  },
  removeItem: () => {},
  clear: () => {},
};

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
    const res = await mod.enqueueClaim({ fullName: 'Jordan Lee', suburb: 'Brisbane', ...ACK });
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
    // Not counted as waiting to send: OfflineQueueBanner promises automatic
    // sending for every claim in this count, and a held claim waits for a tick.
    expect(await mod.getQueueSize()).toBe(0);
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
    vi.stubGlobal('localStorage', brokenStorage);
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

  it('R6 a removal whose transaction aborts after the delete request succeeded reports false', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Legacy Claim' });
    const held = await mod.readHeldClaims();
    const id = held.ok ? held.items[0]!.id : '';
    faults.abort = true;
    expect(await mod.removeQueuedClaim(id)).toBe(false);
    const after = await mod.readHeldClaims();
    expect(after.ok && after.items.map((i) => i.id)).toEqual([id]);
  });

  it('R2 an accepted claim whose delete transaction aborts after success is not sent again', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
    // The fetch resolves, then the delete's transaction aborts; the acceptedAt
    // fallback put commits normally.
    fetchImpl.mockImplementationOnce(async () => {
      faults.abort = true;
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    });
    expect((await mod.replayQueue({ fetchImpl })).successes).toBe(1);
    await mod.replayQueue({ fetchImpl });
    vi.resetModules();
    await (await loadQueue()).replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('R2 an accepted claim is not sent again when every cleanup transaction aborts', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    let abortAll = false;
    const fetchImpl = vi.fn().mockImplementation(async () => {
      abortAll = true;
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    });
    // Re-arm the abort before every transaction once the server has accepted.
    const realSetTimeout = globalThis.setTimeout;
    vi.spyOn(globalThis, 'setTimeout').mockImplementation(((fn: () => void, ms?: number) => {
      if (abortAll) faults.abort = true;
      return realSetTimeout(fn, ms);
    }) as typeof setTimeout);
    await mod.replayQueue({ fetchImpl });
    abortAll = false;
    faults.abort = false;
    vi.restoreAllMocks();
    vi.resetModules();
    await (await loadQueue()).replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('R2 an accepted claim is not sent again after a reload when localStorage and the delete both fail', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Accepted Claim', ...ACK });
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
    faults.delete = true;
    vi.stubGlobal('localStorage', brokenStorage);
    await mod.replayQueue({ fetchImpl });
    vi.unstubAllGlobals();
    // Reload: page memory is gone, localStorage never held the marker; only
    // the acceptedAt mark written to IndexedDB remains.
    vi.resetModules();
    await (await loadQueue()).replayQueue({ fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
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

    // Nothing was lost: the held claim is still there, and still held.
    const after = await mod.readHeldClaims();
    expect(after.ok && after.items.map((i) => i.id)).toEqual([id]);
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

  it('R2 two tabs replaying at once post each claim once', async () => {
    // A shared exclusive lock, as navigator.locks gives every tab of a site.
    let tail: Promise<unknown> = Promise.resolve();
    const locks = {
      request: (_name: string, _opts: unknown, cb: () => Promise<unknown>) => {
        const run = tail.then(() => cb());
        tail = run.catch(() => undefined);
        return run;
      },
    };
    Object.defineProperty(navigator, 'locks', { value: locks, configurable: true });
    try {
      const tabA = await loadQueue();
      await tabA.enqueueClaim({ fullName: 'One Claim', ...ACK });
      vi.resetModules();
      const tabB = await loadQueue();
      expect(tabB).not.toBe(tabA);
      let release: () => void = () => {};
      const gate = new Promise<void>((r) => {
        release = r;
      });
      const fetchImpl = vi.fn().mockImplementation(async () => {
        await gate;
        return new Response(JSON.stringify({ success: true }), { status: 201 });
      });

      const a = tabA.replayQueue({ fetchImpl });
      const b = tabB.replayQueue({ fetchImpl });
      await new Promise((r) => setTimeout(r, 20));
      release();
      await Promise.all([a, b]);

      expect(fetchImpl).toHaveBeenCalledTimes(1);
      expect(fetchImpl.mock.calls[0][1].headers['x-offline-claim-id']).toEqual(expect.any(String));
      expect(await tabB.getQueueSize()).toBe(0);
    } finally {
      delete (navigator as unknown as { locks?: unknown }).locks;
    }
  });

  // A shared exclusive lock, as navigator.locks gives every tab of a site.
  function installLocks() {
    let tail: Promise<unknown> = Promise.resolve();
    const locks = {
      request: (_name: string, _opts: unknown, cb: () => Promise<unknown>) => {
        const run = tail.then(() => cb());
        tail = run.catch(() => undefined);
        return run;
      },
    };
    Object.defineProperty(navigator, 'locks', { value: locks, configurable: true });
  }

  async function twoTabsWithOneHeldClaim() {
    const tabA = await loadQueue();
    await tabA.enqueueClaim({ fullName: 'Held Claim', paymentConfirmed: false });
    const held = await tabA.readHeldClaims();
    const id = held.ok ? held.items[0]!.id : '';
    vi.resetModules();
    const tabB = await loadQueue();
    return { tabA, tabB, id };
  }

  it('R2 a slow acknowledgement in another tab never brings back a claim already sent', async () => {
    installLocks();
    try {
      const { tabA, tabB, id } = await twoTabsWithOneHeldClaim();
      const fetchImpl = vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
      let releaseB: () => void = () => {};
      holdNextPut = new Promise<void>((r) => {
        releaseB = r;
      });
      // Tab B's acknowledgement is slow to write; tab A acknowledges and sends.
      const b = tabB.acknowledgeHeldClaim(id);
      const a = tabA.acknowledgeHeldClaim(id).then(() => tabA.replayQueue({ fetchImpl }));
      await new Promise((r) => setTimeout(r, 20));
      releaseB();
      await Promise.all([a, b]);
      await tabB.replayQueue({ fetchImpl });
      await tabA.replayQueue({ fetchImpl });

      expect(fetchImpl).toHaveBeenCalledTimes(1);
      expect(await tabA.getQueueSize()).toBe(0);
    } finally {
      delete (navigator as unknown as { locks?: unknown }).locks;
    }
  });

  it('R6 a removal never reports success for a claim another tab is sending', async () => {
    installLocks();
    try {
      const { tabA, tabB, id } = await twoTabsWithOneHeldClaim();
      const fetchImpl = vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 201 }));
      let releaseB: () => void = () => {};
      holdNextPut = new Promise<void>((r) => {
        releaseB = r;
      });
      // Tab B ticks and is slow to write; tab A, still showing it held, removes it.
      const b = tabB.acknowledgeHeldClaim(id);
      const removed = tabA.removeQueuedClaim(id);
      await new Promise((r) => setTimeout(r, 20));
      releaseB();
      const [acknowledged, wasRemoved] = await Promise.all([b, removed]);
      await tabB.replayQueue({ fetchImpl });

      // Exactly one of the two choices took effect, and the page told the truth.
      expect(acknowledged).toBe(true);
      expect(wasRemoved).toBe(false);
      expect(fetchImpl).toHaveBeenCalledTimes(1);
      expect(await tabA.getQueueSize()).toBe(0);
    } finally {
      delete (navigator as unknown as { locks?: unknown }).locks;
    }
  });

  it('R10 the offline banner never promises to send a held claim automatically', async () => {
    const mod = await loadQueue();
    await mod.enqueueClaim({ fullName: 'Legacy Claim', paymentConfirmed: false });
    const { render, screen, waitFor, cleanup } = await import('@testing-library/react');
    const { createElement } = await import('react');
    const { default: OfflineQueueBanner } = await import('@/components/claim/OfflineQueueBanner');
    try {
      render(createElement(OfflineQueueBanner));
      // Let the banner read the queue, then confirm it said nothing.
      await new Promise((r) => setTimeout(r, 30));
      expect(screen.queryByText(/send (it|them) automatically/)).not.toBeInTheDocument();

      // Positive control: a claim with its tick is announced.
      await mod.enqueueClaim({ fullName: 'Ticked Claim', ...ACK });
      await waitFor(() => expect(screen.getByText(/1 claim queued offline/)).toBeVisible());
    } finally {
      cleanup();
    }
  });

  it('isOfflineQueueEnabled reflects the feature flag', async () => {
    const mod = await loadQueue();
    expect(mod.isOfflineQueueEnabled()).toBe(true);
  });
});
