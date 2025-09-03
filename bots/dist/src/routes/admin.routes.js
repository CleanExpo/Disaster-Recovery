"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const elysia_1 = require("elysia");
exports.adminRouter = new elysia_1.Elysia({
    prefix: '/api/admin'
})
    .post('/contractors/:id/verify', async ({ params, body, store }) => {
    const contractor = await store.prisma.contractor.update({
        where: { id: params.id },
        data: {
            verified: true,
            verifiedAt: new Date(),
            backgroundCheck: body.backgroundCheck || false,
            backgroundCheckAt: body.backgroundCheck ? new Date() : null
        }
    });
    return {
        success: true,
        data: contractor
    };
}, {
    params: elysia_1.t.Object({
        id: elysia_1.t.String()
    }),
    body: elysia_1.t.Object({
        backgroundCheck: elysia_1.t.Optional(elysia_1.t.Boolean())
    }),
    tags: ['Admin']
})
    .post('/content/:id/approve', async ({ params, body, store }) => {
    const content = await store.prisma.verifiedContent.update({
        where: { id: params.id },
        data: {
            approved: true,
            approvedBy: body.approvedBy,
            approvedAt: new Date()
        }
    });
    return {
        success: true,
        data: content
    };
}, {
    params: elysia_1.t.Object({
        id: elysia_1.t.String()
    }),
    body: elysia_1.t.Object({
        approvedBy: elysia_1.t.String()
    }),
    tags: ['Admin', 'Content']
})
    .get('/metrics', async ({ store }) => {
    const metrics = await store.prisma.botMetrics.findFirst({
        orderBy: { date: 'desc' }
    });
    const contractors = await store.prisma.contractor.count({
        where: { active: true }
    });
    const verifiedContractors = await store.prisma.contractor.count({
        where: { active: true, verified: true }
    });
    const activeJobs = await store.prisma.job.count({
        where: { status: { in: ['pending', 'assigned', 'in_progress'] } }
    });
    const conversations = await store.prisma.botConversation.count({
        where: { status: 'active' }
    });
    return {
        success: true,
        data: {
            ...metrics,
            contractors,
            verifiedContractors,
            activeJobs,
            activeConversations: conversations
        }
    };
}, {
    tags: ['Admin', 'Metrics']
})
    .get('/compliance/audit', async ({ query, store }) => {
    const logs = await store.prisma.complianceAudit.findMany({
        where: {
            ...(query.startDate && {
                timestamp: { gte: new Date(query.startDate) }
            }),
            ...(query.endDate && {
                timestamp: { lte: new Date(query.endDate) }
            })
        },
        orderBy: { timestamp: 'desc' },
        take: query.limit || 100
    });
    return {
        success: true,
        data: logs
    };
}, {
    query: elysia_1.t.Object({
        startDate: elysia_1.t.Optional(elysia_1.t.String()),
        endDate: elysia_1.t.Optional(elysia_1.t.String()),
        limit: elysia_1.t.Optional(elysia_1.t.Number())
    }),
    tags: ['Admin', 'Compliance']
});
//# sourceMappingURL=admin.routes.js.map