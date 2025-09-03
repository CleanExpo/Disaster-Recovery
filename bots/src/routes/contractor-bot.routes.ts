/**
 * Contractor Bot Routes - ElysiaJS
 * Handles contractor operations and job management
 */

import { Elysia, t } from 'elysia';

export const contractorBotRouter = new Elysia({
  prefix: '/api/contractor'
})
  // Contractor authentication
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
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String()
    }),
    tags: ['Contractor Bot', 'Auth']
  })
  
  // Get available jobs
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
    headers: t.Object({
      authorization: t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
  })
  
  // Accept job
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
    
    // Notify client via WebSocket
    store.ws.notifyClient(job.id, {
      type: 'contractor_assigned',
      contractorId: payload.id
    });
    
    // Update contractor capacity
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
    params: t.Object({
      jobId: t.String()
    }),
    headers: t.Object({
      authorization: t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
  })
  
  // Update job status
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
    
    // Update capacity if job completed
    if (body.status === 'completed') {
      await store.prisma.contractor.update({
        where: { id: payload.id },
        data: {
          currentCapacity: { increment: 1 },
          totalJobs: { increment: 1 }
        }
      });
    }
    
    // Notify client
    store.ws.notifyClient(job.id, {
      type: 'job_status_update',
      status: body.status
    });
    
    return {
      success: true,
      data: updatedJob
    };
  }, {
    params: t.Object({
      jobId: t.String()
    }),
    body: t.Object({
      status: t.Union([
        t.Literal('in_progress'),
        t.Literal('completed'),
        t.Literal('cancelled')
      ]),
      notes: t.Optional(t.String())
    }),
    headers: t.Object({
      authorization: t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
  })
  
  // Get my jobs
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
    query: t.Object({
      status: t.Optional(t.String())
    }),
    headers: t.Object({
      authorization: t.String()
    }),
    tags: ['Contractor Bot', 'Jobs']
  })
  
  // Get contractor guides
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
  
  // Get service procedures
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
    params: t.Object({
      serviceType: t.String()
    }),
    tags: ['Contractor Bot', 'Procedures']
  })
  
  // Update availability
  .put('/availability', async ({ body, store, jwt, headers }) => {
    const payload = await jwt.verify(headers.authorization?.replace('Bearer ', ''));
    
    if (!payload) {
      throw new Error('Unauthorized');
    }
    
    // Update contractor availability
    await store.prisma.contractor.update({
      where: { id: payload.id },
      data: {
        emergencyAvailable: body.emergencyAvailable,
        currentCapacity: body.currentCapacity
      }
    });
    
    // Update schedule
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
    body: t.Object({
      emergencyAvailable: t.Boolean(),
      currentCapacity: t.Number(),
      schedule: t.Optional(t.Array(t.Object({
        dayOfWeek: t.Number(),
        startTime: t.String(),
        endTime: t.String(),
        available: t.Boolean()
      })))
    }),
    headers: t.Object({
      authorization: t.String()
    }),
    tags: ['Contractor Bot', 'Availability']
  })
  
  // Get contractor metrics
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
        avgCompletionTime: avgCompletionTime / 3600000, // Convert to hours
        jobsByStatus: {
          pending: jobs.filter(j => j.status === 'pending').length,
          assigned: jobs.filter(j => j.status === 'assigned').length,
          in_progress: jobs.filter(j => j.status === 'in_progress').length,
          completed: completedJobs.length
        }
      }
    };
  }, {
    headers: t.Object({
      authorization: t.String()
    }),
    tags: ['Contractor Bot', 'Metrics']
  });