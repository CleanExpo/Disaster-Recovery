/**
 * ElysiaJS Configuration for AI Engine
 * Provides type-safe configuration for RAG and AI operations
 */

import { t } from 'elysia'

export const ElysiaConfig = t.Object({
  port: t.Number({ default: 3001 }),
  cors: t.Object({
    origin: t.Array(t.String()),
    credentials: t.Boolean({ default: true })
  }),
  ai: t.Object({
    openaiApiKey: t.String(),
    anthropicApiKey: t.String(),
    defaultModel: t.String({ default: 'gpt-4-turbo-preview' }),
    maxTokens: t.Number({ default: 4096 }),
    temperature: t.Number({ default: 0.1, minimum: 0, maximum: 2 })
  }),
  rag: t.Object({
    vectorStoreType: t.Union([t.Literal('memory'), t.Literal('pinecone')]),
    embeddingModel: t.String({ default: 'text-embedding-3-small' }),
    maxDocumentSize: t.Number({ default: 4096 }),
    similarityThreshold: t.Number({ default: 0.7, minimum: 0, maximum: 1 }),
    maxResults: t.Number({ default: 10, minimum: 1, maximum: 100 }),
    chunkSize: t.Number({ default: 1000 }),
    chunkOverlap: t.Number({ default: 200 })
  }),
  monitoring: t.Object({
    enableMetrics: t.Boolean({ default: true }),
    enableLogging: t.Boolean({ default: true }),
    logLevel: t.Union([
      t.Literal('error'),
      t.Literal('warn'),
      t.Literal('info'),
      t.Literal('debug')
    ])
  })
})

export type ElysiaConfigType = typeof ElysiaConfig.static

// Environment-based configuration
export const getElysiaConfig = (): ElysiaConfigType => ({
  port: Number(process.env.ELYSIA_PORT) || 3001,
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    defaultModel: process.env.AI_DEFAULT_MODEL || 'gpt-4-turbo-preview',
    maxTokens: Number(process.env.AI_MAX_TOKENS) || 4096,
    temperature: Number(process.env.AI_TEMPERATURE) || 0.1
  },
  rag: {
    vectorStoreType: (process.env.RAG_VECTOR_STORE_TYPE as any) || 'memory',
    embeddingModel: process.env.RAG_EMBEDDING_MODEL || 'text-embedding-3-small',
    maxDocumentSize: Number(process.env.RAG_MAX_DOCUMENT_SIZE) || 4096,
    similarityThreshold: Number(process.env.RAG_SIMILARITY_THRESHOLD) || 0.7,
    maxResults: Number(process.env.RAG_MAX_RESULTS) || 10,
    chunkSize: Number(process.env.RAG_CHUNK_SIZE) || 1000,
    chunkOverlap: Number(process.env.RAG_CHUNK_OVERLAP) || 200
  },
  monitoring: {
    enableMetrics: process.env.NODE_ENV === 'production',
    enableLogging: true,
    logLevel: (process.env.LOG_LEVEL as any) || 'info'
  }
})

// Validation helper
export const validateElysiaConfig = (config: any): ElysiaConfigType => {
  return ElysiaConfig.static.default(config)
}