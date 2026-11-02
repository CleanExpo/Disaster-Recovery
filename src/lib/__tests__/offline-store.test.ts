/**
 * Draft slot ordering (DR-966). Each saveDraft / clearDraft call opens its own
 * IndexedDB connection, so without serialisation a save issued before a clear
 * can commit after it and put a sent claim back in the slot.
 *
 * The stub below lets each open() answer after a chosen delay, so a slow first
 * open and a fast second open reproduce the reordering deterministically.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function createDraftIdbStub(openDelays: number[]) {
  const state = { data: new Map<string, unknown>(), abortNext: false };
  let opens = 0;

  // Writes land on a copy that is committed when the transaction completes and
  // discarded if it aborts, as in real IndexedDB.
  function transaction() {
    const working = new Map(state.data);
    const t = {
      oncomplete: null as null | (() => void),
      onabort: null as null | (() => void),
      onerror: null as null | (() => void),
      error: null as unknown,
    };
    function request<T>(run: () => T) {
      const req = {
        onsuccess: null as null | (() => void),
        onerror: null as null | (() => void),
        result: undefined as T | undefined,
        error: null as unknown,
      };
      queueMicrotask(() => {
        req.result = run();
        req.onsuccess?.();
        setTimeout(() => {
          if (state.abortNext) {
            state.abortNext = false;
            t.error = new Error('transaction aborted');
            t.onabort?.();
            return;
          }
          state.data = working;
          t.oncomplete?.();
        }, 0);
      });
      return req;
    }
    return Object.assign(t, {
      objectStore: () => ({
        put: (value: { id: string }) => request(() => working.set(value.id, value)),
        delete: (key: string) => request(() => working.delete(key)),
        get: (key: string) => request(() => working.get(key)),
        getAll: () => request(() => Array.from(working.values())),
      }),
    });
  }

  const db = {
    objectStoreNames: { contains: () => true },
    createObjectStore: () => ({}),
    close: () => {},
    transaction,
  };

  return {
    state,
    get data() {
      return state.data;
    },
    open() {
      const delay = openDelays[opens] ?? 0;
      opens += 1;
      const req = {
        onsuccess: null as null | ((e: { target: unknown }) => void),
        onerror: null as null | (() => void),
        onupgradeneeded: null as null | ((e: { target: unknown }) => void),
        result: db,
        error: null as unknown,
      };
      setTimeout(() => req.onsuccess?.({ target: req }), delay);
      return req;
    },
  };
}

let stub: ReturnType<typeof createDraftIdbStub>;

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('offline-store draft slot', () => {
  it('R1 a clear issued after a save always wins, even when the save opens slowly', async () => {
    stub = createDraftIdbStub([30, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');

    const save = store.saveDraft({ formData: { fullName: 'Sent Claim' }, step: 4 });
    const clear = store.clearDraft();
    await Promise.all([save, clear]);

    expect(stub.data.has('current')).toBe(false);
    expect(await store.loadDraft()).toBeNull();
  });

  it('R1 a draft save whose transaction aborts is reported as failed and changes nothing', async () => {
    stub = createDraftIdbStub([0, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');
    stub.state.abortNext = true;
    await expect(store.saveDraft({ formData: { fullName: 'Typed' }, step: 1 })).rejects.toThrow(
      'transaction aborted',
    );
    expect(await store.loadDraft()).toBeNull();
  });

  it('R1 a failed save does not block the clear behind it', async () => {
    stub = createDraftIdbStub([0, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');
    stub.data.set('current', { id: 'current', formData: {}, step: 1, savedAt: 1, synced: false });
    const original = stub.open.bind(stub);
    let first = true;
    stub.open = () => {
      if (first) {
        first = false;
        throw new Error('open failed');
      }
      return original();
    };

    await expect(store.saveDraft({ formData: {}, step: 1 })).rejects.toThrow('open failed');
    await store.clearDraft();
    expect(stub.data.has('current')).toBe(false);
  });
});
