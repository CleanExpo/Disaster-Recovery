"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractorBotRouter = void 0;
const elysia_1 = require("elysia");
exports.contractorBotRouter = new elysia_1.Elysia({
    prefix: '/api/contractor'
})
    .post('/auth/login', async ({ body, store, jwt }) => {
    const contractor = await store.prisma.contractor.findUnique({
        where: { email: body.email }
    });
    if (!contractor || !contractor.verified) {
        throw new Error('Invalid credentials or unverified account');
    }
    const token = await jwt.sign({
        id: contractor.id,
        email: contractor.email,
        businessName: contractor.businessName
    });
    return {
        success: true,
        token,
        contractor: {
            id: contractor.id,
            businessName: contractor.businessName,
            email: contractor.email,
            services: contractor.services
        }
    };
}, {
    body: elysia_1.t.Object({
        email: elysia_1.t.String({ format: 'email' }),
        password: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Auth']
})
    .get('/jobs/available', async ({ store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    if (!payload) {
        throw new Error('Unauthorized');
    }
    const contractor = await store.prisma.contractor.findUnique({
        where: { id: payload.id },
        include: { territories: true }
    });
    const jobs = await store.prisma.job.findMany({
        where: {
            status: 'pending',
            OR: [
                { suburb: { in: contractor.territories.map(t => t.suburb) } },
                { postcode: { in: contractor.territories.map(t => t.postcode) } },
                { serviceType: { in: contractor.services } }
            ]
        },
        orderBy: [
            { urgency: 'desc' },
            { createdAt: 'asc' }
        ]
    });
    return {
        success: true,
        data: jobs
    };
}, {
    headers: elysia_1.t.Object({
        authorization: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
})
    .post('/jobs/:jobId/accept', async ({ params, store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    if (!payload) {
        throw new Error('Unauthorized');
    }
    const job = await store.prisma.job.update({
        where: { id: params.jobId },
        data: {
            contractorId: payload.id,
            status: 'assigned',
            assignedAt: new Date(),
            acceptedAt: new Date()
        }
    });
    store.ws.notifyClient(job.id, {
        type: 'contractor_assigned',
        contractorId: payload.id
    });
    await store.prisma.contractor.update({
        where: { id: payload.id },
        data: {
            currentCapacity: { decrement: 1 }
        }
    });
    return {
        success: true,
        data: job
    };
}, {
    params: elysia_1.t.Object({
        jobId: elysia_1.t.String()
    }),
    headers: elysia_1.t.Object({
        authorization: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
})
    .patch('/jobs/:jobId/status', async ({ params, body, store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    if (!payload) {
        throw new Error('Unauthorized');
    }
    const job = await store.prisma.job.findUnique({
        where: { id: params.jobId }
    });
    if (job.contractorId !== payload.id) {
        throw new Error('Not authorized for this job');
    }
    const updatedJob = await store.prisma.job.update({
        where: { id: params.jobId },
        data: {
            status: body.status,
            ...(body.status === 'in_progress' && { startedAt: new Date() }),
            ...(body.status === 'completed' && { completedAt: new Date() }),
            ...(body.notes && { internalNotes: body.notes })
        }
    });
    if (body.status === 'completed') {
        await store.prisma.contractor.update({
            where: { id: payload.id },
            data: {
                currentCapacity: { increment: 1 },
                totalJobs: { increment: 1 }
            }
        });
    }
    store.ws.notifyClient(job.id, {
        type: 'job_status_update',
        status: body.status
    });
    return {
        success: true,
        data: updatedJob
    };
}, {
    params: elysia_1.t.Object({
        jobId: elysia_1.t.String()
    }),
    body: elysia_1.t.Object({
        status: elysia_1.t.Union([
            elysia_1.t.Literal('in_progress'),
            elysia_1.t.Literal('completed'),
            elysia_1.t.Literal('cancelled')
        ]),
        notes: elysia_1.t.Optional(elysia_1.t.String())
    }),
    headers: elysia_1.t.Object({
        authorization: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
})
    .get('/jobs/my', async ({ query, store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    if (!payload) {
        throw new Error('Unauthorized');
    }
    const jobs = await store.prisma.job.findMany({
        where: {
            contractorId: payload.id,
            ...(query.status && { status: query.status })
        },
        orderBy: { createdAt: 'desc' }
    });
    return {
        success: true,
        data: jobs
    };
}, {
    query: elysia_1.t.Object({
        status: elysia_1.t.Optional(elysia_1.t.String())
    }),
    headers: elysia_1.t.Object({
        authorization: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
})
    .get('/guides', async ({ store }) => {
    const guides = await store.prisma.stepByStepGuide.findMany({
        where: {
            userType: 'contractor',
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
    tags: ['Contractor Bot', 'Guides']
})
    .get('/procedures/:serviceType', async ({ params, store }) => {
    const procedures = await store.prisma.serviceProcedure.findMany({
        where: {
            serviceType: params.serviceType,
            active: true
        }
    });
    return {
        success: true,
        data: procedures
    };
}, {
    params: elysia_1.t.Object({
        serviceType: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Procedures']
})
    .put('/availability', async ({ body, store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    if (!payload) {
        throw new Error('Unauthorized');
    }
    await store.prisma.contractor.update({
        where: { id: payload.id },
        data: {
            emergencyAvailable: body.emergencyAvailable,
            currentCapacity: body.currentCapacity
        }
    });
    if (body.schedule) {
        await store.prisma.contractorAvailability.deleteMany({
            where: { contractorId: payload.id }
        });
        await store.prisma.contractorAvailability.createMany({
            data: body.schedule.map(s => ({
                contractorId: payload.id,
                ...s
            }))
        });
    }
    return {
        success: true,
        message: 'Availability updated'
    };
}, {
    body: elysia_1.t.Object({
        emergencyAvailable: elysia_1.t.Boolean(),
        currentCapacity: elysia_1.t.Number(),
        schedule: elysia_1.t.Optional(elysia_1.t.Array(elysia_1.t.Object({
            dayOfWeek: elysia_1.t.Number(),
            startTime: elysia_1.t.String(),
            endTime: elysia_1.t.String(),
            available: elysia_1.t.Boolean()
        })))
    }),
    headers: elysia_1.t.Object({
        authorization: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Availability']
})
    .get('/metrics', async ({ store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    if (!payload) {
        throw new Error('Unauthorized');
    }
    const contractor = await store.prisma.contractor.findUnique({
        where: { id: payload.id }
    });
    const jobs = await store.prisma.job.findMany({
        where: { contractorId: payload.id }
    });
    const completedJobs = jobs.filter(j => j.status === 'completed');
    const avgCompletionTime = completedJobs.reduce((acc, job) => {
        if (job.startedAt && job.completedAt) {
            return acc + (job.completedAt.getTime() - job.startedAt.getTime());
        }
        return acc;
    }, 0) / completedJobs.length || 0;
    return {
        success: true,
        data: {
            totalJobs: contractor.totalJobs,
            completionRate: contractor.completionRate,
            customerRating: contractor.customerRating,
            responseTime: contractor.responseTime,
            currentCapacity: contractor.currentCapacity,
            maxCapacity: contractor.maxCapacity,
            avgCompletionTime: avgCompletionTime / 3600000,
            jobsByStatus: {
                pending: jobs.filter(j => j.status === 'pending').length,
                assigned: jobs.filter(j => j.status === 'assigned').length,
                in_progress: jobs.filter(j => j.status === 'in_progress').length,
                completed: completedJobs.length
            }
        }
    };
}, {
    headers: elysia_1.t.Object({
        authorization: elysia_1.t.String()
    }),
    tags: ['Contractor Bot', 'Metrics']
});
//# sourceMappingURL=contractor-bot.routes.js.map