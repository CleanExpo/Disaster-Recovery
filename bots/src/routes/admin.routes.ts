/**
 * Admin Routes - System Management
 */

import { Elysia, t } from 'elysia';

export const adminRouter = new Elysia({
  prefix: '/api/admin'
})
  // Verify contractor
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
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      backgroundCheck: t.Optional(t.Boolean())
    }),
    tags: ['Admin']
  })
  
  // Approve content
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
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      approvedBy: t.String()
    }),
    tags: ['Admin', 'Content']
  })
  
  // System metrics
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
  
  // Compliance audit logs
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
    query: t.Object({
      startDate: t.Optional(t.String()),
      endDate: t.Optional(t.String()),
      limit: t.Optional(t.Number())
    }),
    tags: ['Admin', 'Compliance']
  });