"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientBotRouter = void 0;
const elysia_1 = require("elysia");
const client_bot_handler_1 = require("../bots/elysia-engine/client-bot-handler");
const agent_hierarchy_1 = require("../bots/orchestration/agent-hierarchy");
exports.clientBotRouter = new elysia_1.Elysia({
    prefix: '/api/client'
})
    .state('orchestrator', new agent_hierarchy_1.MasterOrchestrator())
    .post('/message', async ({ body, store }) => {
    const result = await client_bot_handler_1.ClientBotHandler.processMessage(body, store.orchestrator);
    return {
        success: true,
        data: result
    };
}, {
    body: elysia_1.t.Object({
        message: elysia_1.t.String(),
        sessionId: elysia_1.t.String(),
        channel: elysia_1.t.Union([
            elysia_1.t.Literal('web'),
            elysia_1.t.Literal('sms'),
            elysia_1.t.Literal('whatsapp'),
            elysia_1.t.Literal('email')
        ]),
        metadata: elysia_1.t.Optional(elysia_1.t.Object({
            location: elysia_1.t.Optional(elysia_1.t.Object({
                address: elysia_1.t.String(),
                suburb: elysia_1.t.Optional(elysia_1.t.String()),
                state: elysia_1.t.Optional(elysia_1.t.String()),
                postcode: elysia_1.t.Optional(elysia_1.t.String())
            })),
            phone: elysia_1.t.Optional(elysia_1.t.String()),
            email: elysia_1.t.Optional(elysia_1.t.String())
        }))
    }),
    tags: ['Client Bot']
})
    .post('/emergency', async ({ body, store }) => {
    const emergencyBody = {
        ...body,
        message: `EMERGENCY: ${body.description}`
    };
    const result = await client_bot_handler_1.ClientBotHandler.processMessage(emergencyBody, store.orchestrator);
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
    body: elysia_1.t.Object({
        serviceType: elysia_1.t.String(),
        description: elysia_1.t.String(),
        location: elysia_1.t.Object({
            address: elysia_1.t.String(),
            suburb: elysia_1.t.Optional(elysia_1.t.String()),
            state: elysia_1.t.Optional(elysia_1.t.String()),
            postcode: elysia_1.t.Optional(elysia_1.t.String())
        }),
        customerName: elysia_1.t.String(),
        customerPhone: elysia_1.t.String(),
        customerEmail: elysia_1.t.Optional(elysia_1.t.String()),
        sessionId: elysia_1.t.String()
    }),
    tags: ['Client Bot', 'Emergency']
})
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
    query: elysia_1.t.Object({
        type: elysia_1.t.Optional(elysia_1.t.String())
    }),
    tags: ['Client Bot', 'Guides']
})
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
    params: elysia_1.t.Object({
        id: elysia_1.t.String()
    }),
    tags: ['Client Bot', 'Guides']
})
    .post('/insurance/claim', async ({ body, store }) => {
    const insuranceProcess = await store.prisma.insuranceProcess.findFirst({
        where: {
            insurerName: body.insurerName,
            processType: 'claim_submission',
            active: true
        }
    });
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
    body: elysia_1.t.Object({
        serviceType: elysia_1.t.String(),
        urgency: elysia_1.t.Optional(elysia_1.t.String()),
        description: elysia_1.t.String(),
        location: elysia_1.t.Object({
            address: elysia_1.t.String(),
            suburb: elysia_1.t.Optional(elysia_1.t.String()),
            state: elysia_1.t.Optional(elysia_1.t.String()),
            postcode: elysia_1.t.Optional(elysia_1.t.String())
        }),
        customerName: elysia_1.t.String(),
        customerPhone: elysia_1.t.String(),
        customerEmail: elysia_1.t.String(),
        insurerName: elysia_1.t.String(),
        claimNumber: elysia_1.t.Optional(elysia_1.t.String()),
        policyNumber: elysia_1.t.String()
    }),
    tags: ['Client Bot', 'Insurance']
})
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
    body: elysia_1.t.Object({
        serviceType: elysia_1.t.String(),
        suburb: elysia_1.t.Optional(elysia_1.t.String()),
        postcode: elysia_1.t.Optional(elysia_1.t.String()),
        emergencyOnly: elysia_1.t.Optional(elysia_1.t.Boolean())
    }),
    tags: ['Client Bot', 'Contractors']
})
    .get('/conversation/:sessionId', async ({ params, store }) => {
    const conversation = await store.prisma.botConversation.findUnique({
        where: { sessionId: params.sessionId }
    });
    return {
        success: true,
        data: conversation
    };
}, {
    params: elysia_1.t.Object({
        sessionId: elysia_1.t.String()
    }),
    tags: ['Client Bot']
});
//# sourceMappingURL=client-bot.routes.js.map