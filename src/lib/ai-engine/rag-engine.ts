/**
 * RAG Engine Implementation with ElysiaJS
 * High-performance Retrieval Augmented Generation system
 * Designed to reduce hallucinations and improve accuracy
 */

import { Elysia, t } from 'elysia'
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { Document } from '@langchain/core/documents'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAI } from 'openai'
import { getElysiaConfig } from '@/lib/config/elysia-config'
import { 
  RAGQuerySchema, 
  RAGResponseSchema, 
  RAGSourceSchema,
  DocumentSchema,
  type RAGQuery,
  type RAGResponse,
  type RAGSource
} from './types'

// Initialize configuration
const config = getElysiaConfig()

export class RAGEngineCore {
  private vectorStore: MemoryVectorStore | null = null
  private embeddings: OpenAIEmbeddings
  private textSplitter: RecursiveCharacterTextSplitter
  private openai: OpenAI
  private cache: Map<string, { result: RAGResponse; timestamp: number }> = new Map()
  private readonly CACHE_TTL = 300000 // 5 minutes

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: config.ai.openaiApiKey,
      modelName: config.rag.embeddingModel
    })

    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: config.rag.chunkSize,
      chunkOverlap: config.rag.chunkOverlap
    })

    this.openai = new OpenAI({
      apiKey: config.ai.openaiApiKey
    })
  }

  async initialize(documents: Document[] = []) {
    try {
      // Load default documents if none provided
      if (documents.length === 0) {
        documents = await this.loadDefaultDocuments()
      }

      // Split documents into chunks
      const splitDocs = await this.textSplitter.splitDocuments(documents)
      
      // Create vector store with embeddings
      this.vectorStore = await MemoryVectorStore.fromDocuments(
        splitDocs, 
        this.embeddings
      )

      console.log(`✅ RAG Engine initialized with ${splitDocs.length} document chunks`)
      return true
    } catch (error) {
      console.error('❌ Failed to initialize RAG Engine:', error)
      return false
    }
  }

  async query(query: RAGQuery): Promise<RAGResponse> {
    const startTime = Date.now()
    
    try {
      // Check cache first
      if (query.options?.useCache !== false) {
        const cached = this.getCachedResult(query.query)
        if (cached) {
          return {
            ...cached,
            retrievalStats: {
              ...cached.retrievalStats,
              cacheHit: true
            }
          }
        }
      }

      if (!this.vectorStore) {
        throw new Error('RAG Engine not initialized. Call initialize() first.')
      }

      // Retrieve relevant documents
      const relevantDocs = await this.vectorStore.similaritySearchWithScore(
        query.query,
        query.options?.maxResults || config.rag.maxResults
      )

      // Filter by similarity threshold
      const filteredDocs = relevantDocs.filter(
        ([_, score]) => score >= config.rag.similarityThreshold
      )

      if (filteredDocs.length === 0) {
        return this.createNoResultsResponse(query, startTime)
      }

      // Convert to RAG sources
      const sources: RAGSource[] = filteredDocs.map(([doc, score], index) => ({
        id: `doc_${index}_${Date.now()}`,
        content: doc.pageContent,
        metadata: {
          title: doc.metadata.title || 'Unknown Document',
          url: doc.metadata.url,
          lastModified: new Date(doc.metadata.lastModified || Date.now()),
          category: doc.metadata.category || 'general',
          sourceType: doc.metadata.sourceType || 'documentation',
          author: doc.metadata.author,
          tags: doc.metadata.tags
        },
        relevanceScore: score,
        chunkIndex: index,
        verified: false,
        crossReferenceCount: 0
      }))

      // Generate answer using retrieved context
      const answer = await this.generateAnswer(query, sources)
      
      // Calculate confidence and hallucination risk
      const confidence = this.calculateConfidence(sources, answer)
      const hallucinationRisk = this.assessHallucinationRisk(confidence, sources)

      const response: RAGResponse = {
        answer: answer,
        sources: sources,
        confidence: confidence,
        processingTime: Date.now() - startTime,
        model: config.ai.defaultModel,
        retrievalStats: {
          documentsSearched: await this.getDocumentCount(),
          chunksAnalyzed: relevantDocs.length,
          averageRelevance: filteredDocs.reduce((sum, [_, score]) => sum + score, 0) / filteredDocs.length,
          cacheHit: false
        },
        hallucinationRisk: hallucinationRisk,
        verificationLevel: 'standard'
      }

      // Cache the result
      if (query.options?.useCache !== false) {
        this.cacheResult(query.query, response)
      }

      return response

    } catch (error) {
      console.error('❌ RAG Query failed:', error)
      throw new Error(`RAG query failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async addDocuments(documents: Document[]): Promise<{ added: number; errors: string[] }> {
    try {
      if (!this.vectorStore) {
        throw new Error('RAG Engine not initialized')
      }

      const splitDocs = await this.textSplitter.splitDocuments(documents)
      await this.vectorStore.addDocuments(splitDocs)
      
      return { 
        added: splitDocs.length, 
        errors: [] 
      }
    } catch (error) {
      return { 
        added: 0, 
        errors: [error instanceof Error ? error.message : 'Unknown error'] 
      }
    }
  }

  private async loadDefaultDocuments(): Promise<Document[]> {
    // Load disaster recovery documentation and knowledge base
    return [
      new Document({
        pageContent: `
          Emergency Water Damage Response Protocol:
          1. Safety first - ensure electrical safety and structural stability
          2. Stop water source if possible
          3. Document damage with photos and notes
          4. Contact emergency restoration team within 1 hour
          5. Begin water extraction immediately to prevent mold growth
          6. Set up dehumidifiers and air movers for drying
          7. Monitor moisture levels daily
          Response time target: 15-30 minutes for emergency calls
        `,
        metadata: {
          title: 'Water Damage Emergency Protocol',
          category: 'emergency_procedures',
          sourceType: 'emergency_protocol',
          lastModified: new Date().toISOString()
        }
      }),
      new Document({
        pageContent: `
          Fire Damage Restoration Process:
          Fire damage requires specialized cleaning and restoration techniques.
          Soot and smoke damage can be more extensive than visible fire damage.
          Key steps: 1) Safety assessment, 2) Structural evaluation, 3) Soot removal,
          4) Smoke odor elimination, 5) Content cleaning, 6) Reconstruction planning.
          Professional equipment required: HEPA vacuums, ozone generators, thermal foggers.
          Timeline: Emergency response within 1 hour, full restoration 2-8 weeks.
        `,
        metadata: {
          title: 'Fire Damage Restoration Guide',
          category: 'restoration_procedures',
          sourceType: 'training_material',
          lastModified: new Date().toISOString()
        }
      }),
      new Document({
        pageContent: `
          Mould Remediation Standards and Procedures:
          Mould growth begins within 24-48 hours of water intrusion.
          Classification: Category 1 (clean water), Category 2 (grey water), Category 3 (black water).
          Containment is critical to prevent cross-contamination.
          Personal protective equipment mandatory: N95 respirators, gloves, eye protection.
          HEPA filtration required during remediation process.
          Post-remediation verification through air quality testing.
          Documentation required for insurance claims and health compliance.
        `,
        metadata: {
          title: 'Mould Remediation Standards',
          category: 'health_safety',
          sourceType: 'knowledge_base',
          lastModified: new Date().toISOString()
        }
      })
    ]
  }

  private async generateAnswer(query: RAGQuery, sources: RAGSource[]): Promise<string> {
    const context = sources.map(source => 
      `Source: ${source.metadata.title}\n${source.content}`
    ).join('\n\n---\n\n')

    const systemPrompt = `
You are an expert disaster recovery and emergency restoration consultant. 
Provide accurate, actionable answers based ONLY on the provided context.
If the context doesn't contain enough information to answer the question, clearly state this.
Always prioritize safety and follow established protocols.
Focus on practical, implementable advice for emergency situations.

Context:
${context}
`

    const response = await this.openai.chat.completions.create({
      model: config.ai.defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query.query }
      ],
      temperature: config.ai.temperature,
      max_tokens: config.ai.maxTokens
    })

    return response.choices[0]?.message?.content || 'Unable to generate response'
  }

  private calculateConfidence(sources: RAGSource[], answer: string): number {
    if (sources.length === 0) return 0

    // Base confidence on source quality and relevance
    const avgRelevance = sources.reduce((sum, source) => sum + source.relevanceScore, 0) / sources.length
    const sourceCount = Math.min(sources.length / 3, 1) // Diminishing returns after 3 sources
    const answerLength = Math.min(answer.length / 200, 1) // Reasonable answer length
    
    return Math.min((avgRelevance * 0.6 + sourceCount * 0.3 + answerLength * 0.1), 1)
  }

  private assessHallucinationRisk(confidence: number, sources: RAGSource[]): 'low' | 'medium' | 'high' {
    if (confidence >= 0.8 && sources.length >= 2) return 'low'
    if (confidence >= 0.6 && sources.length >= 1) return 'medium'
    return 'high'
  }

  private getCachedResult(query: string): RAGResponse | null {
    const cacheKey = Buffer.from(query).toString('base64')
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.result
    }
    
    if (cached) {
      this.cache.delete(cacheKey) // Remove expired cache
    }
    
    return null
  }

  private cacheResult(query: string, result: RAGResponse): void {
    const cacheKey = Buffer.from(query).toString('base64')
    this.cache.set(cacheKey, {
      result,
      timestamp: Date.now()
    })
  }

  private async getDocumentCount(): Promise<number> {
    // Simplified document count - in production, this would query the vector store
    return this.vectorStore ? 100 : 0 // Placeholder
  }

  private createNoResultsResponse(query: RAGQuery, startTime: number): RAGResponse {
    return {
      answer: "I don't have enough information in my knowledge base to answer this question accurately. Please provide more context or rephrase your question.",
      sources: [],
      confidence: 0,
      processingTime: Date.now() - startTime,
      model: config.ai.defaultModel,
      retrievalStats: {
        documentsSearched: 0,
        chunksAnalyzed: 0,
        averageRelevance: 0,
        cacheHit: false
      },
      hallucinationRisk: 'high',
      verificationLevel: 'basic'
    }
  }
}

// ElysiaJS Plugin for RAG Engine
export const RAGEngine = new Elysia({ name: 'rag-engine' })
  .state('ragCore', new RAGEngineCore())
  .derive({ as: 'global' }, async ({ store }) => {
    // Initialize RAG engine if not already done
    if (!store.ragCore) {
      store.ragCore = new RAGEngineCore()
      await store.ragCore.initialize()
    }
    
    return {
      ragService: {
        async query(query: RAGQuery): Promise<RAGResponse> {
          return await store.ragCore.query(query)
        },
        
        async addDocuments(documents: Document[]) {
          return await store.ragCore.addDocuments(documents)
        },
        
        async healthCheck() {
          return {
            status: 'healthy',
            initialized: store.ragCore !== null,
            timestamp: new Date()
          }
        }
      }
    }
  })
  .post('/query', async ({ body, ragService }) => {
    try {
      const result = await ragService.query(body)
      return {
        success: true,
        data: result,
        metadata: {
          requestId: `rag_${Date.now()}`,
          timestamp: new Date(),
          processingTime: result.processingTime
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          error: 'RAG_QUERY_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'RAG_500',
          timestamp: new Date()
        }
      }
    }
  }, {
    body: RAGQuerySchema,
    response: {
      200: t.Object({
        success: t.Boolean(),
        data: t.Optional(RAGResponseSchema),
        error: t.Optional(t.Object({
          error: t.String(),
          message: t.String(),
          code: t.String(),
          timestamp: t.Date()
        })),
        metadata: t.Optional(t.Object({
          requestId: t.String(),
          timestamp: t.Date(),
          processingTime: t.Number()
        }))
      })
    },
    detail: {
      tags: ['RAG'],
      summary: 'Query RAG system',
      description: 'Submit a query to the Retrieval Augmented Generation system for accurate, source-backed answers'
    }
  })
  .post('/documents', async ({ body, ragService }) => {
    try {
      const documents = body.documents.map(doc => new Document({
        pageContent: doc.content,
        metadata: doc.metadata
      }))
      
      const result = await ragService.addDocuments(documents)
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: {
          error: 'DOCUMENT_ADD_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'DOC_500',
          timestamp: new Date()
        }
      }
    }
  }, {
    body: t.Object({
      documents: t.Array(DocumentSchema)
    }),
    detail: {
      tags: ['RAG'],
      summary: 'Add documents to RAG system',
      description: 'Add new documents to the knowledge base for improved query responses'
    }
  })
  .get('/health', async ({ ragService }) => {
    return await ragService.healthCheck()
  }, {
    detail: {
      tags: ['RAG'],
      summary: 'RAG system health check',
      description: 'Check the health and status of the RAG system'
    }
  })