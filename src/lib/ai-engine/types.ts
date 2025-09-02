/**
 * ElysiaJS AI Engine Types and Schemas
 * Type-safe definitions for RAG operations and AI agent interactions
 */

import { t } from 'elysia'

// RAG Query and Response Schemas
export const RAGQuerySchema = t.Object({
  query: t.String({ 
    minLength: 1, 
    maxLength: 1000,
    description: 'The question or query to be answered using RAG' 
  }),
  filters: t.Optional(t.Object({
    dateRange: t.Optional(t.Object({
      start: t.Date(),
      end: t.Date()
    })),
    categories: t.Optional(t.Array(t.String())),
    confidenceThreshold: t.Optional(t.Number({ 
      minimum: 0, 
      maximum: 1,
      description: 'Minimum confidence score for results' 
    })),
    sourceTypes: t.Optional(t.Array(t.Union([
      t.Literal('documentation'),
      t.Literal('knowledge_base'),
      t.Literal('training_material'),
      t.Literal('emergency_protocol')
    ])))
  })),
  options: t.Optional(t.Object({
    maxResults: t.Number({ 
      minimum: 1, 
      maximum: 100, 
      default: 10,
      description: 'Maximum number of results to return' 
    }),
    includeMetadata: t.Boolean({ 
      default: true,
      description: 'Include source metadata in response' 
    }),
    rerank: t.Boolean({ 
      default: false,
      description: 'Apply semantic re-ranking to results' 
    }),
    useCache: t.Boolean({ 
      default: true,
      description: 'Use cached results if available' 
    }),
    streaming: t.Boolean({ 
      default: false,
      description: 'Stream the response in real-time' 
    })
  }))
})

export const RAGSourceSchema = t.Object({
  id: t.String({ description: 'Unique identifier for the source document' }),
  content: t.String({ description: 'The relevant content excerpt' }),
  metadata: t.Object({
    title: t.String(),
    url: t.Optional(t.String()),
    lastModified: t.Date(),
    category: t.String(),
    sourceType: t.Union([
      t.Literal('documentation'),
      t.Literal('knowledge_base'), 
      t.Literal('training_material'),
      t.Literal('emergency_protocol')
    ]),
    author: t.Optional(t.String()),
    tags: t.Optional(t.Array(t.String()))
  }),
  relevanceScore: t.Number({ 
    minimum: 0, 
    maximum: 1,
    description: 'Relevance score from vector similarity search' 
  }),
  chunkIndex: t.Number({ description: 'Index of the chunk within the source document' }),
  verified: t.Optional(t.Boolean({ description: 'Whether the source has been cross-verified' })),
  crossReferenceCount: t.Optional(t.Number({ description: 'Number of cross-references found' }))
})

export const RAGResponseSchema = t.Object({
  answer: t.String({ description: 'The generated answer based on retrieved sources' }),
  sources: t.Array(RAGSourceSchema),
  confidence: t.Number({ 
    minimum: 0, 
    maximum: 1,
    description: 'Overall confidence in the answer based on source quality' 
  }),
  processingTime: t.Number({ description: 'Time taken to process the query (ms)' }),
  model: t.String({ description: 'AI model used for generation' }),
  retrievalStats: t.Object({
    documentsSearched: t.Number({ description: 'Total documents in search space' }),
    chunksAnalyzed: t.Number({ description: 'Number of chunks analyzed' }),
    averageRelevance: t.Number({ description: 'Average relevance score of returned sources' }),
    cacheHit: t.Boolean({ description: 'Whether result was served from cache' })
  }),
  hallucinationRisk: t.Union([
    t.Literal('low'),
    t.Literal('medium'),
    t.Literal('high')
  ]),
  verificationLevel: t.Union([
    t.Literal('basic'),
    t.Literal('standard'),
    t.Literal('strict')
  ])
})

// AI Agent Task Schemas
export const AgentTaskSchema = t.Object({
  id: t.Optional(t.String()),
  type: t.Union([
    t.Literal('research'),
    t.Literal('analysis'),
    t.Literal('planning'),
    t.Literal('emergency_response'),
    t.Literal('rag_query')
  ]),
  description: t.String({ minLength: 1 }),
  priority: t.Union([
    t.Literal('low'),
    t.Literal('medium'),
    t.Literal('high'),
    t.Literal('emergency')
  ]),
  context: t.Optional(t.Object({}, { additionalProperties: true })),
  useRAG: t.Optional(t.Boolean({ default: true })),
  requiresHumanApproval: t.Optional(t.Boolean({ default: false })),
  deadline: t.Optional(t.Date()),
  accuracyRequired: t.Optional(t.Union([
    t.Literal('standard'),
    t.Literal('high'),
    t.Literal('critical')
  ]))
})

export const AgentResponseSchema = t.Object({
  taskId: t.String(),
  result: t.Object({}, { additionalProperties: true }),
  confidence: t.Number({ minimum: 0, maximum: 1 }),
  sources: t.Optional(t.Array(RAGSourceSchema)),
  processingTime: t.Number(),
  model: t.String(),
  hallucinationRisk: t.Union([
    t.Literal('low'),
    t.Literal('medium'),
    t.Literal('high')
  ]),
  requiresFollowUp: t.Boolean(),
  nextActions: t.Optional(t.Array(t.String())),
  metadata: t.Object({
    tokensUsed: t.Number(),
    apiCalls: t.Number(),
    cacheHits: t.Number(),
    errors: t.Optional(t.Array(t.String()))
  })
})

// Document Management Schemas  
export const DocumentSchema = t.Object({
  id: t.Optional(t.String()),
  title: t.String(),
  content: t.String(),
  metadata: t.Object({
    author: t.Optional(t.String()),
    created: t.Date(),
    modified: t.Date(),
    category: t.String(),
    tags: t.Optional(t.Array(t.String())),
    sourceUrl: t.Optional(t.String()),
    language: t.Optional(t.String({ default: 'en' })),
    wordCount: t.Optional(t.Number())
  }),
  embeddingStatus: t.Optional(t.Union([
    t.Literal('pending'),
    t.Literal('processing'),
    t.Literal('complete'),
    t.Literal('failed')
  ]))
})

// Error Response Schema
export const ErrorResponseSchema = t.Object({
  error: t.String(),
  message: t.String(),
  code: t.String(),
  details: t.Optional(t.Object({}, { additionalProperties: true })),
  timestamp: t.Date(),
  requestId: t.Optional(t.String())
})

// Streaming Response Schema
export const StreamingEventSchema = t.Object({
  type: t.Union([
    t.Literal('start'),
    t.Literal('chunk'),
    t.Literal('source'),
    t.Literal('complete'),
    t.Literal('error')
  ]),
  data: t.Object({}, { additionalProperties: true }),
  timestamp: t.Date()
})

// Type exports for use in application
export type RAGQuery = typeof RAGQuerySchema.static
export type RAGResponse = typeof RAGResponseSchema.static
export type RAGSource = typeof RAGSourceSchema.static
export type AgentTask = typeof AgentTaskSchema.static
export type AgentResponse = typeof AgentResponseSchema.static
export type Document = typeof DocumentSchema.static
export type ErrorResponse = typeof ErrorResponseSchema.static
export type StreamingEvent = typeof StreamingEventSchema.static

// Utility type for API responses
export type APIResponse<T> = {
  success: boolean
  data?: T
  error?: ErrorResponse
  metadata?: {
    requestId: string
    timestamp: Date
    processingTime: number
  }
}