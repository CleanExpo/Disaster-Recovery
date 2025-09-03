/**
 * ElysiaJS High-Performance Bot Engine
 * Main server with agent orchestration, MCP tools, and real-time WebSocket
 */

import { Elysia, t, ws } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { stream } from '@elysiajs/stream'
import { redis } from '@elysiajs/redis'
import { jwt } from '@elysiajs/jwt'
import { MasterOrchestrator } from '../orchestration/agent-hierarchy'
import { MCPToolsManager } from './mcp-tools-manager'
import { ClientBotHandler } from './client-bot-handler'
import { ContractorBotHandler } from './contractor-bot-handler'
import { QdrantVectorStore } from './vector-store'
import { MetricsCollector } from './metrics'
import { BullQueue } from './queue-manager'

// ============================================
// CONFIGURATION
// ============================================

const config = {
  port: process.env.PORT || 3001,
  wsPort: process.env.WS_PORT || 3002,
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
  },
  database: {
    url: process.env.DATABASE_URL
  },
  ai: {
    openaiKey: process.env.OPENAI_API_KEY,
    anthropicKey: process.env.ANTHROPIC_API_KEY,
    defaultModel: 'gpt-4-turbo-preview',
    temperature: 0.1
  },
  qdrant: {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    collectionName: 'nrp_knowledge_base'
  },
  mcp: {
    playwrightEnabled: process.env.MCP_PLAYWRIGHT_ENABLED === 'true',
    ideEnabled: process.env.MCP_IDE_ENABLED === 'true',
    context7Enabled: process.env.MCP_CONTEXT7_ENABLED === 'true'
  }
}

// ============================================
// INITIALIZE SERVICES
// ============================================

const orchestrator = new MasterOrchestrator()
const mcpTools = new MCPToolsManager(config.mcp)
const vectorStore = new QdrantVectorStore(config.qdrant)
const metricsCollector = new MetricsCollector()
const taskQueue = new BullQueue('bot-tasks', config.redis.url)

// ============================================
// MAIN ELYSIA APP
// ============================================

const app = new Elysia({ 
  name: 'bot-engine',
  prefix: '/api/v1'
})
  // Plugins
  .use(cors({
    origin: ['http://localhost:3000', 'https://disaster-recovery-seven.vercel.app'],
    credentials: true
  }))
  .use(swagger({
    documentation: {
      info: {
        title: 'NRP Bot Engine API',
        version: '1.0.0',
        description: 'High-performance bot engine with agent orchestration'
      },
      tags: [
        { name: 'Client', description: 'Client bot operations' },
        { name: 'Contractor', description: 'Contractor bot operations' },
        { name: 'Orchestration', description: 'Agent orchestration' },
        { name: 'MCP', description: 'MCP tools integration' },
        { name: 'Health', description: 'System health and monitoring' }
      ]
    },
    path: '/docs'
  }))
  .use(redis(config.redis))
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET || 'bot-engine-secret-key'
  }))
  
  // State management
  .state('orchestrator', orchestrator)
  .state('mcpTools', mcpTools)
  .state('vectorStore', vectorStore)
  .state('metrics', metricsCollector)
  .state('queue', taskQueue)
  
  // Decorators
  .decorate('processClientMessage', ClientBotHandler.processMessage)
  .decorate('processContractorAction', ContractorBotHandler.processAction)
  
  // ============================================
  // CLIENT BOT ENDPOINTS
  // ============================================
  
  .group('/client', app => app
    // Process client message
    .post('/message', async ({ body, processClientMessage, orchestrator, metrics }) => {
      const startTime = Date.now()
      
      try {
        const result = await processClientMessage(body, orchestrator)
        
        metrics.recordRequest('client.message', Date.now() - startTime, true)
        
        return {
          success: true,
          data: result,
          metadata: {
            processingTime: Date.now() - startTime,
            timestamp: new Date()
          }
        }
      } catch (error) {
        metrics.recordRequest('client.message', Date.now() - startTime, false)
        throw error
      }
    }, {
      body: t.Object({
        message: t.String({ minLength: 1 }),
        sessionId: t.String(),
        channel: t.Union([
          t.Literal('web'),
          t.Literal('sms'),
          t.Literal('whatsapp'),
          t.Literal('email')
        ]),
        metadata: t.Optional(t.Object({}, { additionalProperties: true }))
      }),
      detail: {
        tags: ['Client'],
        summary: 'Process client message',
        description: 'Handle incoming message from client through any channel'
      }
    })
    
    // Emergency response
    .post('/emergency', async ({ body, orchestrator, queue }) => {
      const task = {
        id: `emergency_${Date.now()}`,
        type: 'emergency_response',
        priority: 10, // Highest priority
        data: body,
        requiredAgents: ['emergency_response', 'contractor_matching']
      }
      
      // Queue for immediate processing
      await queue.add('emergency', task, { 
        priority: 10,
        attempts: 3
      })
      
      const result = await orchestrator.processClientRequest(
        body.situation,
        {
          sessionId: body.sessionId,
          urgency: 'critical',
          conversationHistory: [],
          metadata: { location: body.location }
        }
      )
      
      return {
        success: true,
        data: result,
        emergencyId: task.id
      }
    }, {
      body: t.Object({
        situation: t.String(),
        location: t.Object({
          address: t.String(),
          coordinates: t.Optional(t.Object({
            lat: t.Number(),
            lng: t.Number()
          }))
        }),
        sessionId: t.String(),
        contactInfo: t.Object({
          phone: t.String(),
          email: t.Optional(t.String())
        })
      }),
      detail: {
        tags: ['Client'],
        summary: 'Emergency response',
        description: 'Handle emergency situations with immediate contractor dispatch'
      }
    })
    
    // Insurance claim
    .post('/insurance/claim', async ({ body, orchestrator, vectorStore }) => {
      // Retrieve relevant insurance information from RAG
      const relevantDocs = await vectorStore.search(
        `insurance claim ${body.insurer} ${body.damageType}`,
        5
      )
      
      const result = await orchestrator.processClientRequest(
        `Process insurance claim: ${JSON.stringify(body)}`,
        {
          sessionId: body.sessionId,
          urgency: 'medium',
          conversationHistory: [],
          metadata: { 
            ragContext: relevantDocs,
            claimData: body 
          }
        }
      )
      
      return {
        success: true,
        data: result,
        claimId: `CLM-${Date.now()}`
      }
    }, {
      body: t.Object({
        sessionId: t.String(),
        insurer: t.String(),
        policyNumber: t.String(),
        damageType: t.String(),
        description: t.String(),
        estimatedValue: t.Optional(t.Number()),
        documents: t.Optional(t.Array(t.String()))
      }),
      detail: {
        tags: ['Client'],
        summary: 'Submit insurance claim',
        description: 'Process insurance claim with automated validation'
      }
    })
  )
  
  // ============================================
  // CONTRACTOR BOT ENDPOINTS
  // ============================================
  
  .group('/contractor', app => app
    // Onboard contractor
    .post('/onboard', async ({ body, processContractorAction, orchestrator, mcpTools }) => {
      // Use MCP tools for document verification if available
      let verificationResult = null
      if (mcpTools.isAvailable('playwright')) {
        verificationResult = await mcpTools.verifyDocuments(body.documents)
      }
      
      const result = await processContractorAction('onboard', {
        ...body,
        verificationResult
      }, orchestrator)
      
      return {
        success: true,
        data: result,
        contractorId: `CTR-${Date.now()}`
      }
    }, {
      body: t.Object({
        businessName: t.String(),
        abn: t.String(),
        email: t.String(),
        phone: t.String(),
        territories: t.Array(t.String()),
        services: t.Array(t.String()),
        certifications: t.Array(t.Object({
          type: t.String(),
          number: t.String(),
          expiry: t.String()
        })),
        documents: t.Optional(t.Array(t.String()))
      }),
      detail: {
        tags: ['Contractor'],
        summary: 'Onboard new contractor',
        description: 'Complete contractor onboarding with verification'
      }
    })
    
    // Job assignment
    .post('/job/assign', async ({ body, orchestrator, redis }) => {
      // Check contractor availability in Redis cache
      const availability = await redis.get(`contractor:availability:${body.contractorId}`)
      
      if (!availability) {
        return {
          success: false,
          error: 'Contractor not available'
        }
      }
      
      const result = await orchestrator.processContractorRequest('assign_job', body, {
        sessionId: `job_${body.jobId}`,
        urgency: body.priority === 'emergency' ? 'critical' : 'normal',
        conversationHistory: [],
        metadata: { availability: JSON.parse(availability) }
      })
      
      // Update Redis with assignment
      await redis.set(
        `job:assignment:${body.jobId}`,
        JSON.stringify({ contractorId: body.contractorId, timestamp: Date.now() }),
        'EX',
        86400 // 24 hours
      )
      
      return {
        success: true,
        data: result
      }
    }, {
      body: t.Object({
        jobId: t.String(),
        contractorId: t.String(),
        priority: t.Union([
          t.Literal('emergency'),
          t.Literal('urgent'),
          t.Literal('standard')
        ]),
        details: t.Object({
          location: t.String(),
          serviceType: t.String(),
          estimatedDuration: t.Number()
        })
      }),
      detail: {
        tags: ['Contractor'],
        summary: 'Assign job to contractor',
        description: 'Assign a job to a specific contractor with availability check'
      }
    })
    
    // Performance tracking
    .get('/performance/:contractorId', async ({ params, orchestrator, metrics }) => {
      const performanceData = await metrics.getContractorMetrics(params.contractorId)
      
      const result = await orchestrator.processContractorRequest(
        'track_performance',
        { contractorId: params.contractorId, metrics: performanceData },
        {
          sessionId: `perf_${params.contractorId}`,
          urgency: 'low',
          conversationHistory: [],
          metadata: {}
        }
      )
      
      return {
        success: true,
        data: {
          ...result,
          metrics: performanceData
        }
      }
    }, {
      params: t.Object({
        contractorId: t.String()
      }),
      detail: {
        tags: ['Contractor'],
        summary: 'Get contractor performance',
        description: 'Retrieve contractor performance metrics and scoring'
      }
    })
  )
  
  // ============================================
  // ORCHESTRATION ENDPOINTS
  // ============================================
  
  .group('/orchestrate', app => app
    // Execute custom orchestration
    .post('/execute', async ({ body, orchestrator }) => {
      const { task, context } = body
      
      const result = await orchestrator.executeCustomTask(task, context)
      
      return {
        success: true,
        data: result,
        orchestrationId: `ORCH-${Date.now()}`
      }
    }, {
      body: t.Object({
        task: t.Object({
          type: t.String(),
          priority: t.Number(),
          data: t.Object({}, { additionalProperties: true }),
          requiredAgents: t.Array(t.String())
        }),
        context: t.Object({
          sessionId: t.String(),
          urgency: t.Union([
            t.Literal('low'),
            t.Literal('medium'),
            t.Literal('high'),
            t.Literal('critical')
          ]),
          metadata: t.Optional(t.Object({}, { additionalProperties: true }))
        })
      }),
      detail: {
        tags: ['Orchestration'],
        summary: 'Execute custom orchestration',
        description: 'Execute a custom task through the orchestration system'
      }
    })
    
    // Get agent status
    .get('/agents/status', async ({ orchestrator }) => {
      const status = orchestrator.getAgentStatus()
      
      return {
        success: true,
        data: status,
        timestamp: new Date()
      }
    }, {
      detail: {
        tags: ['Orchestration'],
        summary: 'Get agent status',
        description: 'Get the current status of all agents in the system'
      }
    })
  )
  
  // ============================================
  // MCP TOOLS ENDPOINTS
  // ============================================
  
  .group('/mcp', app => app
    // Execute MCP tool
    .post('/execute', async ({ body, mcpTools }) => {
      const result = await mcpTools.execute(body.tool, body.parameters)
      
      return {
        success: true,
        data: result,
        tool: body.tool
      }
    }, {
      body: t.Object({
        tool: t.String(),
        parameters: t.Object({}, { additionalProperties: true })
      }),
      detail: {
        tags: ['MCP'],
        summary: 'Execute MCP tool',
        description: 'Execute a specific MCP tool with parameters'
      }
    })
    
    // List available tools
    .get('/tools', async ({ mcpTools }) => {
      const tools = mcpTools.getAvailableTools()
      
      return {
        success: true,
        data: tools
      }
    }, {
      detail: {
        tags: ['MCP'],
        summary: 'List MCP tools',
        description: 'Get list of available MCP tools'
      }
    })
  )
  
  // ============================================
  // HEALTH & MONITORING
  // ============================================
  
  .get('/health', async ({ redis, vectorStore }) => {
    const checks = {
      api: 'healthy',
      redis: await redis.ping().then(() => 'healthy').catch(() => 'unhealthy'),
      vectorStore: await vectorStore.health().then(() => 'healthy').catch(() => 'unhealthy'),
      orchestrator: orchestrator.getHealth()
    }
    
    const allHealthy = Object.values(checks).every(status => status === 'healthy')
    
    return {
      status: allHealthy ? 'healthy' : 'degraded',
      checks,
      timestamp: new Date(),
      uptime: process.uptime()
    }
  }, {
    detail: {
      tags: ['Health'],
      summary: 'Health check',
      description: 'Check the health status of all system components'
    }
  })
  
  .get('/metrics', async ({ metrics }) => {
    return {
      success: true,
      data: await metrics.getAll(),
      timestamp: new Date()
    }
  }, {
    detail: {
      tags: ['Health'],
      summary: 'Get metrics',
      description: 'Retrieve all system metrics'
    }
  })
  
  // Error handling
  .onError(({ code, error }) => {
    console.error(`[Bot Engine Error] ${code}:`, error)
    
    if (code === 'VALIDATION') {
      return {
        success: false,
        error: 'Validation failed',
        details: error
      }
    }
    
    if (code === 'NOT_FOUND') {
      return {
        success: false,
        error: 'Resource not found'
      }
    }
    
    return {
      success: false,
      error: 'Internal server error',
      message: error.message
    }
  })

// ============================================
// WEBSOCKET SERVER
// ============================================

const wsApp = new Elysia()
  .use(ws())
  .ws('/ws', {
    open(ws) {
      console.log('WebSocket connection opened:', ws.id)
      ws.send(JSON.stringify({ type: 'connected', id: ws.id }))
    },
    
    message(ws, message) {
      console.log('WebSocket message:', message)
      
      // Handle real-time bot interactions
      if (message.type === 'client_message') {
        orchestrator.processClientRequest(message.data.message, {
          sessionId: ws.id,
          urgency: 'normal',
          conversationHistory: [],
          metadata: { channel: 'websocket' }
        }).then(result => {
          ws.send(JSON.stringify({
            type: 'bot_response',
            data: result
          }))
        })
      }
      
      // Broadcast to other connected clients if needed
      if (message.type === 'broadcast') {
        ws.publish('notifications', message.data)
      }
    },
    
    close(ws) {
      console.log('WebSocket connection closed:', ws.id)
    }
  })

// ============================================
// START SERVERS
// ============================================

// Start main API server
app.listen(config.port, () => {
  console.log(`🚀 Bot Engine API running at http://localhost:${config.port}`)
  console.log(`📚 API Documentation at http://localhost:${config.port}/api/v1/docs`)
})

// Start WebSocket server
wsApp.listen(config.wsPort, () => {
  console.log(`🔌 WebSocket server running at ws://localhost:${config.wsPort}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await taskQueue.close()
  await app.stop()
  await wsApp.stop()
  process.exit(0)
})

export { app, wsApp }