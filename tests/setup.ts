// Jest Test Setup File
// Global configuration and setup for all tests

process.env.NODE_ENV = 'test';
jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllTimers();
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
    status: 200
  })
) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

const testDataFactory = {
  createMessage: (overrides = {}) => ({
    id: 'msg-' + Math.random().toString(36).substr(2, 9),
    roomId: 'room-1',
    userId: 'user-1',
    content: 'Test message',
    metadata: {},
    createdAt: new Date().toISOString(),
    reactions: [],
    isEdited: false,
    ...overrides
  })
};

(global as any).testDataFactory = testDataFactory;
export {};
