import { faker } from '@faker-js/faker';

export interface MockAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface MockAgentResponse {
  success: boolean;
  agentId: string;
  action: string;
  result: any;
  metadata: Record<string, any>;
}

export const createMockAIResponse = (content: string = ''): MockAIResponse => ({
  id: `chatcmpl-${faker.string.alphanumeric(29)}`,
  object: 'chat.completion',
  created: Math.floor(Date.now() / 1000),
  model: 'gpt-4-turbo-preview',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: content || faker.lorem.paragraph(),
      },
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: faker.number.int({ min: 50, max: 500 }),
    completion_tokens: faker.number.int({ min: 100, max: 1000 }),
    total_tokens: faker.number.int({ min: 150, max: 1500 }),
  },
});

export const createMockAgentResponse = (overrides: Partial<MockAgentResponse> = {}): MockAgentResponse => ({
  success: true,
  agentId: faker.string.uuid(),
  action: 'process_request',
  result: { message: faker.lorem.sentence() },
  metadata: {
    executionTime: faker.number.int({ min: 100, max: 5000 }),
    tokensUsed: faker.number.int({ min: 100, max: 2000 }),
  },
  ...overrides,
});

// Mock OpenAI client
export const mockOpenAI = {
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue(createMockAIResponse()),
    },
  },
  embeddings: {
    create: jest.fn().mockResolvedValue({
      data: [
        {
          embedding: Array.from({ length: 1536 }, () => Math.random()),
          index: 0,
          object: 'embedding',
        },
      ],
      model: 'text-embedding-ada-002',
      usage: {
        prompt_tokens: 10,
        total_tokens: 10,
      },
    }),
  },
  images: {
    generate: jest.fn().mockResolvedValue({
      created: Math.floor(Date.now() / 1000),
      data: [
        {
          url: faker.image.url(),
          revised_prompt: faker.lorem.sentence(),
        },
      ],
    }),
  },
};

// Mock AI Agent responses for specific agent types
export const mockAgentResponses = {
  customerService: createMockAgentResponse({
    action: 'handle_inquiry',
    result: {
      response: 'Thank you for contacting us. How can I help you today?',
      suggestedActions: ['schedule_callback', 'create_ticket', 'escalate'],
    },
  }),
  fraudDetection: createMockAgentResponse({
    action: 'analyze_transaction',
    result: {
      riskScore: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
      flags: [],
      recommendation: 'approve',
    },
  }),
  scheduling: createMockAgentResponse({
    action: 'find_available_slots',
    result: {
      availableSlots: [
        { date: faker.date.future().toISOString(), time: '09:00' },
        { date: faker.date.future().toISOString(), time: '14:00' },
      ],
    },
  }),
  estimator: createMockAgentResponse({
    action: 'generate_estimate',
    result: {
      laborCost: faker.number.float({ min: 1000, max: 10000, fractionDigits: 2 }),
      materialsCost: faker.number.float({ min: 500, max: 5000, fractionDigits: 2 }),
      totalEstimate: faker.number.float({ min: 1500, max: 15000, fractionDigits: 2 }),
    },
  }),
  qualityAssurance: createMockAgentResponse({
    action: 'review_work',
    result: {
      qualityScore: faker.number.float({ min: 70, max: 100, fractionDigits: 1 }),
      issues: [],
      approved: true,
    },
  }),
};

// Mock LangChain components
export const mockLangChain = {
  ChatOpenAI: jest.fn().mockImplementation(() => ({
    call: jest.fn().mockResolvedValue({ text: faker.lorem.paragraph() }),
    invoke: jest.fn().mockResolvedValue({ content: faker.lorem.paragraph() }),
  })),
  PromptTemplate: {
    fromTemplate: jest.fn().mockImplementation((template: string) => ({
      format: jest.fn().mockImplementation((values: any) => template),
    })),
  },
  ConversationChain: jest.fn().mockImplementation(() => ({
    call: jest.fn().mockResolvedValue({ response: faker.lorem.paragraph() }),
  })),
};

export const setupAIMocks = () => {
  jest.mock('openai', () => ({
    default: jest.fn().mockImplementation(() => mockOpenAI),
  }));

  jest.mock('@langchain/openai', () => mockLangChain);

  return { mockOpenAI, mockLangChain };
};

export const clearAIMocks = () => {
  Object.values(mockOpenAI.chat.completions).forEach(mock => {
    if (jest.isMockFunction(mock)) mock.mockClear();
  });
  jest.clearAllMocks();
};
