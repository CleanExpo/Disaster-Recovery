/**
 * Draft slot ordering and ownership (DR-966). Each saveDraft / clearDraft call
 * opens its own IndexedDB connection, so without serialisation a save issued
 * before a clear can commit after it and put a sent claim back in the slot.
 * Two tabs share one slot, so every save and clear also checks, in its own
 * transaction, that the slot still holds what its page read.
 *
 * The stub below lets each open() answer after a chosen delay, so a slow first
 * open and a fast second open reproduce the reordering deterministically. Like
 * real IndexedDB, readwrite transactions run one after another, and writes land
 * on a copy committed when the transaction completes or discarded on abort.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function createDraftIdbStub(openDelays: number[]) {
  const state = { data: new Map<string, unknown>(), abortNext: false };
  let opens = 0;
  let readwriteTail: Promise<void> = Promise.resolve();

  function transaction(_name: string, mode: string = 'readonly') {
    const t = {
      oncomplete: null as null | (() => void),
      onabort: null as null | (() => void),
      onerror: null as null | (() => void),
      error: null as unknown,
    };
    const readwrite = mode === 'readwrite';
    let release: () => void = () => {};
    const before = readwrite ? readwriteTail : Promise.resolve();
    if (readwrite) {
      readwriteTail = new Promise<void>((r) => {
        release = r;
      });
    }
    let working = new Map<string, unknown>();
    const ready = before.then(() => {
      working = new Map(state.data);
    });
    let pending = 0;
    let done = false;

    function settle() {
      setTimeout(() => {
        if (done || pending > 0) return;
        done = true;
        if (readwrite && state.abortNext) {
          state.abortNext = false;
          t.error = new Error('transaction aborted');
          t.onabort?.();
          release();
          return;
        }
        if (readwrite) state.data = working;
        t.oncomplete?.();
        release();
      }, 0);
    }

    function request<T>(run: () => T) {
      const req = {
        onsuccess: null as null | (() => void),
        onerror: null as null | (() => void),
        result: undefined as T | undefined,
        error: null as unknown,
      };
      pending += 1;
      void ready.then(() => {
        req.result = run();
        req.onsuccess?.();
        pending -= 1;
        settle();
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

// A page that started from an empty slot; after its first save it owns it.
function pageGuard(me: string) {
  let expected: string | null = null;
  return {
    me,
    expect: () => expected,
    own: () => {
      expected = me;
    },
    holds: (owner: string | null) => {
      expected = owner;
    },
  };
}

const ANY = { me: 'page-any', expect: () => 'any' as const };

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
    const page = pageGuard('page-a');

    const save = store.saveDraft({ formData: { fullName: 'Sent Claim' }, step: 4 }, page);
    const clear = store.clearDraft(page);
    await Promise.all([save, clear]);

    expect(stub.data.has('current')).toBe(false);
    expect(await store.loadDraft()).toBeNull();
  });

  it('R1 a draft save whose transaction aborts is reported as failed and changes nothing', async () => {
    stub = createDraftIdbStub([0, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');
    stub.state.abortNext = true;
    await expect(
      store.saveDraft({ formData: { fullName: 'Typed' }, step: 1 }, pageGuard('page-a')),
    ).rejects.toThrow('transaction aborted');
    expect(await store.loadDraft()).toBeNull();
  });

  it('R1 a draft clear whose transaction aborts is reported as failed and keeps the draft', async () => {
    stub = createDraftIdbStub([0, 0, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');
    const page = pageGuard('page-a');
    await store.saveDraft({ formData: { fullName: 'Saved' }, step: 1 }, page);
    stub.state.abortNext = true;
    await expect(store.clearDraft(page)).rejects.toThrow('transaction aborted');
    expect((await store.loadDraft())?.formData).toMatchObject({ fullName: 'Saved' });
  });

  it('R4 a draft read that fails rejects instead of reporting no draft', async () => {
    stub = createDraftIdbStub([0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');
    stub.open = () => {
      throw new Error('open failed');
    };
    await expect(store.loadDraft()).rejects.toThrow('open failed');
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

    await expect(store.saveDraft({ formData: {}, step: 1 }, pageGuard('page-a'))).rejects.toThrow(
      'open failed',
    );
    await store.clearDraft(ANY);
    expect(stub.data.has('current')).toBe(false);
  });
});

// Two tabs are two module instances over one IndexedDB (review round 7).
describe('offline-store draft slot across tabs', () => {
  async function twoTabs() {
    stub = createDraftIdbStub([]);
    vi.stubGlobal('indexedDB', stub);
    const tabA = await import('../offline-store');
    vi.resetModules();
    const tabB = await import('../offline-store');
    expect(tabB).not.toBe(tabA);
    return { tabA, tabB };
  }

  it('R1 a late save from another tab never brings back a claim that was sent', async () => {
    const { tabA, tabB } = await twoTabs();
    const a = pageGuard('page-a');
    const b = pageGuard('page-b');
    // Both tabs resumed the same saved claim.
    await tabA.saveDraft({ formData: { fullName: 'Shared Claim' }, step: 4 }, a);
    a.own();
    b.holds('page-a');
    // Tab B sends it and clears the slot.
    expect(await tabB.clearDraft(b)).toBe('removed');
    // Tab A's autosave lands afterwards: refused, and nothing is written.
    await expect(
      tabA.saveDraft({ formData: { fullName: 'Shared Claim' }, step: 4 }, a),
    ).rejects.toMatchObject({ name: 'DraftConflictError' });
    expect(await tabA.loadDraft()).toBeNull();
  });

  it('R3 a stale "start a new claim" never deletes a newer claim saved in another tab', async () => {
    const { tabA, tabB } = await twoTabs();
    const first = pageGuard('page-first');
    await tabA.saveDraft({ formData: { fullName: 'Earlier Claim' }, step: 1 }, first);
    const offered = await tabA.loadDraft();
    // Tab A offered the earlier claim; tab B resumed it and saved newer typing.
    const b = pageGuard('page-b');
    b.holds(tabB.draftOwner(offered!));
    await tabB.saveDraft({ formData: { fullName: 'Newer Claim' }, step: 2 }, b);
    // Tab A's homeowner now chooses "Start a new claim" on the earlier one.
    const a = { me: 'page-a', expect: () => tabA.draftOwner(offered!) };
    expect(await tabA.clearDraft(a)).toBe('changed');
    expect((await tabA.loadDraft())?.formData).toMatchObject({ fullName: 'Newer Claim' });
  });

  it('R5 a page that started from an empty slot never overwrites a claim another tab saved', async () => {
    const { tabA, tabB } = await twoTabs();
    const a = pageGuard('page-a');
    const b = pageGuard('page-b');
    await tabB.saveDraft({ formData: { fullName: 'Tab B Claim' }, step: 1 }, b);
    await expect(
      tabA.saveDraft({ formData: { fullName: 'Tab A Claim' }, step: 1 }, a),
    ).rejects.toMatchObject({ name: 'DraftConflictError' });
    expect((await tabA.loadDraft())?.formData).toMatchObject({ fullName: 'Tab B Claim' });
  });

  it('R10 a page opening over a draft too old to offer saves only when it expects that draft', async () => {
    const { tabA } = await twoTabs();
    stub.data.set('current', {
      id: 'current',
      formData: { fullName: 'Old' },
      step: 1,
      savedAt: Date.now() - 25 * 60 * 60 * 1000,
      synced: false,
      owner: 'page_old',
    });
    const expired = (await tabA.loadDraft())!;
    // Expecting an empty slot (the round-8 bug) is refused and writes nothing.
    const blind = pageGuard('page-a');
    await expect(
      tabA.saveDraft({ formData: { fullName: 'New' }, step: 1 }, blind),
    ).rejects.toMatchObject({ name: 'DraftConflictError' });
    expect((await tabA.loadDraft())?.formData).toMatchObject({ fullName: 'Old' });
    // Expecting the draft that is still there replaces it.
    const a = pageGuard('page-a');
    a.holds(tabA.draftOwner(expired));
    await tabA.saveDraft({ formData: { fullName: 'New' }, step: 1 }, a);
    expect((await tabA.loadDraft())?.formData).toMatchObject({ fullName: 'New' });
  });

  it('R1 a claim saved before owners existed can still be resumed, saved and cleared', async () => {
    const { tabA } = await twoTabs();
    stub.data.set('current', {
      id: 'current',
      formData: { fullName: 'Old Claim' },
      step: 1,
      savedAt: 1234,
      synced: false,
    });
    const legacy = (await tabA.loadDraft())!;
    // Two legacy claims saved at different times are never mistaken for each other.
    expect(tabA.draftOwner(legacy)).not.toBe(tabA.draftOwner({ ...legacy, savedAt: 5678 }));
    const a = pageGuard('page-a');
    a.holds(tabA.draftOwner(legacy));
    await tabA.saveDraft({ formData: { fullName: 'Old Claim, edited' }, step: 2 }, a);
    a.own();
    expect(await tabA.clearDraft(a)).toBe('removed');
    expect(await tabA.loadDraft()).toBeNull();
  });
});
