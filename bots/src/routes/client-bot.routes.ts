/**
 * Client Bot Routes - ElysiaJS
 * Handles all client interactions with compliance and data verification
 */

import { Elysia, t } from 'elysia';
import { ClientBotHandler } from '../bots/elysia-engine/client-bot-handler';
import { MasterOrchestrator } from '../bots/orchestration/agent-hierarchy';

export const clientBotRouter = new Elysia({
  prefix: '/api/client'
})
  .state('orchestrator', new MasterOrchestrator())
  
  // Main message handler
  .post('/message', async ({ body, store }) => {
    const result = await ClientBotHandler.processMessage(body, store.orchestrator);
    return {
      success: true,
      data: result
    };
  }, {
    body: t.Object({
      message: t.String(),
      sessionId: t.String(),
      channel: t.Union([
        t.Literal('web'),
        t.Literal('sms'),
        t.Literal('whatsapp'),
        t.Literal('email')
      ]),
      metadata: t.Optional(t.Object({
        location: t.Optional(t.Object({
          address: t.String(),
          suburb: t.Optional(t.String()),
          state: t.Optional(t.String()),
          postcode: t.Optional(t.String())
        })),
        phone: t.Optional(t.String()),
        email: t.Optional(t.String())
      }))
    }),
    tags: ['Client Bot']
  })
  
  // Emergency handler
  .post('/emergency', async ({ body, store }) => {
    const emergencyBody = {
      ...body,
      message: `EMERGENCY: ${body.description}`
    };
    
    const result = await ClientBotHandler.processMessage(emergencyBody, store.orchestrator);
    
    // Add to emergency queue
    await store.queue.add('emergency', {
      ...body,
      timestamp: new Date(),
      priority: 'high'
    });
    
    return {
      success: true,
      emergencyId: `EMRG-${Date.now()}`,
      data: result
    };
  }, {
    body: t.Object({
      serviceType: t.String(),
      description: t.String(),
      location: t.Object({
        address: t.String(),
        suburb: t.Optional(t.String()),
        state: t.Optional(t.String()),
        postcode: t.Optional(t.String())
      }),
      customerName: t.String(),
      customerPhone: t.String(),
      customerEmail: t.Optional(t.String()),
      sessionId: t.String()
    }),
    tags: ['Client Bot', 'Emergency']
  })
  
  // Get step-by-step guides
  .get('/guides', async ({ query, store }) => {
    const guides = await store.prisma.stepByStepGuide.findMany({
      where: {
        userType: 'customer',
        type: query.type || undefined,
        active: true
      },
      include: {
        steps: {
          orderBy: { stepNumber: 'asc' }
        }
      },
      orderBy: { priority: 'desc' }
    });
    
    return {
      success: true,
      data: guides
    };
  }, {
    query: t.Object({
      type: t.Optional(t.String())
    }),
    tags: ['Client Bot', 'Guides']
  })
  
  // Get specific guide
  .get('/guides/:id', async ({ params, store }) => {
    const guide = await store.prisma.stepByStepGuide.findUnique({
      where: { id: params.id },
      include: {
        steps: {
          orderBy: { stepNumber: 'asc' }
        }
      }
    });
    
    if (!guide) {
      throw new Error('Guide not found');
    }
    
    return {
      success: true,
      data: guide
    };
  }, {
    params: t.Object({
      id: t.String()
    }),
    tags: ['Client Bot', 'Guides']
  })
  
  // Insurance claim submission
  .post('/insurance/claim', async ({ body, store }) => {
    // Fetch insurance process guide
    const insuranceProcess = await store.prisma.insuranceProcess.findFirst({
      where: {
        insurerName: body.insurerName,
        processType: 'claim_submission',
        active: true
      }
    });
    
    // Create job with insurance details
    const job = await store.prisma.job.create({
      data: {
        serviceType: body.serviceType,
        urgency: body.urgency || 'standard',
        status: 'pending',
        address: body.location.address,
        suburb: body.location.suburb || '',
        state: body.location.state || '',
        postcode: body.location.postcode || '',
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerEmail: body.customerEmail,
        description: body.description,
        insuranceClaim: true,
        insurerName: body.insurerName,
        claimNumber: body.claimNumber,
        policyNumber: body.policyNumber
      }
    });
    
    // Add to appropriate queue
    await store.queue.add(body.urgency === 'emergency' ? 'emergency' : 'standard', {
      jobId: job.id,
      ...body
    });
    
    return {
      success: true,
      jobId: job.id,
      insuranceProcess: insuranceProcess
    };
  }, {
    body: t.Object({
      serviceType: t.String(),
      urgency: t.Optional(t.String()),
      description: t.String(),
      location: t.Object({
        address: t.String(),
        suburb: t.Optional(t.String()),
        state: t.Optional(t.String()),
        postcode: t.Optional(t.String())
      }),
      customerName: t.String(),
      customerPhone: t.String(),
      customerEmail: t.String(),
      insurerName: t.String(),
      claimNumber: t.Optional(t.String()),
      policyNumber: t.String()
    }),
    tags: ['Client Bot', 'Insurance']
  })
  
  // Get contractors in area
  .post('/contractors/search', async ({ body, store }) => {
    const contractors = await store.prisma.contractor.findMany({
      where: {
        active: true,
        verified: true,
        services: {
          has: body.serviceType
        },
        OR: [
          { serviceAreas: { has: body.suburb } },
          { serviceAreas: { has: body.postcode } },
          {
            territories: {
              some: {
                OR: [
                  { suburb: body.suburb || '' },
                  { postcode: body.postcode || '' }
                ]
              }
            }
          }
        ]
      },
      select: {
        id: true,
        businessName: true,
        services: true,
        responseTime: true,
        customerRating: true,
        currentCapacity: true,
        emergencyAvailable: true
      },
      orderBy: [
        { customerRating: 'desc' },
        { responseTime: 'asc' }
      ]
    });
    
    return {
      success: true,
      count: contractors.length,
      data: contractors
    };
  }, {
    body: t.Object({
      serviceType: t.String(),
      suburb: t.Optional(t.String()),
      postcode: t.Optional(t.String()),
      emergencyOnly: t.Optional(t.Boolean())
    }),
    tags: ['Client Bot', 'Contractors']
  })
  
  // Get conversation history
  .get('/conversation/:sessionId', async ({ params, store }) => {
    const conversation = await store.prisma.botConversation.findUnique({
      where: { sessionId: params.sessionId }
    });
    
    return {
      success: true,
      data: conversation
    };
  }, {
    params: t.Object({
      sessionId: t.String()
    }),
    tags: ['Client Bot']
  });