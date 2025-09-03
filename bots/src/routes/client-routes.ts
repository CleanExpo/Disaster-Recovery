/**
 * Client Bot API Routes
 * Handles all client-facing endpoints with AI integration
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AIService from '../services/ai-service';
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

// Initialize services
const router = Router();
const prisma = new PrismaClient();
const aiService = new AIService();

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

// Middleware for session management
router.use((req: Request, res: Response, next) => {
  if (!req.headers['x-session-id']) {
    req.headers['x-session-id'] = uuidv4();
  }
  next();
});

/**
 * POST /api/client/message
 * Process client message with AI
 */
router.post('/message', async (req: Request, res: Response) => {
  try {
    const { message, sessionId, metadata = {} } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }
    
    // Store conversation
    const conversation = await prisma.botConversation.create({
      data: {
        sessionId: sessionId || req.headers['x-session-id'] as string,
        userType: 'client',
        message,
        response: '', // Will be updated
        metadata: JSON.stringify(metadata)
      }
    });
    
    // Process with AI
    const aiResponse = await aiService.processQuery(message, {
      userType: 'client',
      location: metadata.location,
      previousContext: await getConversationContext(sessionId)
    });
    
    // Update conversation with response
    await prisma.botConversation.update({
      where: { id: conversation.id },
      data: { 
        response: aiResponse.message,
        metadata: JSON.stringify({
          ...metadata,
          source: aiResponse.source,
          confidence: aiResponse.confidence
        })
      }
    });
    
    // Send response
    res.json({
      success: true,
      sessionId: sessionId || req.headers['x-session-id'],
      response: aiResponse.message,
      suggestedActions: aiResponse.suggestedActions,
      data: aiResponse.data
    });
    
  } catch (error) {
    logger.error('Message processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      sessionId: req.headers['x-session-id']
    });
  }
});

/**
 * POST /api/client/emergency
 * Report emergency with immediate response
 */
router.post('/emergency', async (req: Request, res: Response) => {
  try {
    const {
      type,
      location,
      address,
      description,
      customerName,
      customerPhone,
      severity = 'high'
    } = req.body;
    
    // Validate required fields
    if (!type || !location || !customerPhone) {
      return res.status(400).json({
        error: 'Missing required emergency information'
      });
    }
    
    // Process emergency with AI
    const aiResponse = await aiService.processQuery(
      `EMERGENCY: ${type} at ${location}. ${description}`,
      {
        userType: 'client',
        emergencyLevel: severity as any,
        location
      }
    );
    
    // Get contractor recommendations
    const contractors = await aiService.getContractorRecommendations(
      type,
      location,
      severity
    );
    
    // Create job record
    const job = await prisma.job.create({
      data: {
        emergencyType: type,
        location,
        address: address || location,
        description,
        customerName: customerName || 'Emergency Client',
        customerPhone,
        status: 'pending',
        urgency: severity,
        metadata: JSON.stringify({
          reportedAt: new Date(),
          aiResponse: aiResponse.message,
          recommendedContractors: contractors
        })
      }
    });
    
    // Send emergency response
    res.json({
      success: true,
      emergencyId: `EMRG-${job.id}`,
      message: aiResponse.message,
      immediateActions: aiResponse.suggestedActions,
      contractors: contractors.slice(0, 3),
      estimatedResponse: '15-30 minutes',
      trackingUrl: `/track/${job.id}`
    });
    
    logger.info(`Emergency reported: ${type} at ${location}`, {
      jobId: job.id,
      severity
    });
    
  } catch (error) {
    logger.error('Emergency processing error:', error);
    res.status(500).json({
      error: 'Emergency reported but processing failed. Help is on the way.',
      fallbackNumber: '000' // Emergency services
    });
  }
});

/**
 * GET /api/client/guides
 * Get relevant step-by-step guides
 */
router.get('/guides', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    
    const whereClause: any = {
      isActive: true,
      userType: 'client'
    };
    
    if (category) {
      whereClause.category = category as string;
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search as string } },
        { keywords: { contains: (search as string).toLowerCase() } }
      ];
    }
    
    const guides = await prisma.stepByStepGuide.findMany({
      where: whereClause,
      orderBy: { priority: 'asc' },
      take: 10
    });
    
    res.json({
      success: true,
      guides: guides.map(guide => ({
        id: guide.id,
        title: guide.title,
        description: guide.description,
        category: guide.category,
        difficulty: guide.difficulty,
        estimatedTime: guide.estimatedTime,
        steps: JSON.parse(guide.steps || '[]')
      }))
    });
    
  } catch (error) {
    logger.error('Guides fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch guides' });
  }
});

/**
 * GET /api/client/status/:jobId
 * Check job status
 */
router.get('/status/:jobId', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    
    const job = await prisma.job.findFirst({
      where: {
        OR: [
          { id: parseInt(jobId) || -1 },
          { id: parseInt(jobId.replace('EMRG-', '')) || -1 }
        ]
      },
      include: {
        contractor: true
      }
    });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({
      success: true,
      job: {
        id: `EMRG-${job.id}`,
        status: job.status,
        emergencyType: job.emergencyType,
        location: job.location,
        contractor: job.contractor ? {
          businessName: job.contractor.businessName,
          phone: job.contractor.phone,
          estimatedArrival: job.contractor.averageResponseTime
        } : null,
        timeline: {
          reported: job.createdAt,
          assigned: job.assignedAt,
          completed: job.completedAt
        },
        updates: JSON.parse(job.metadata || '{}').updates || []
      }
    });
    
  } catch (error) {
    logger.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check status' });
  }
});

/**
 * POST /api/client/feedback
 * Submit feedback for completed job
 */
router.post('/feedback', async (req: Request, res: Response) => {
  try {
    const { jobId, rating, comment } = req.body;
    
    if (!jobId || !rating) {
      return res.status(400).json({ error: 'Job ID and rating required' });
    }
    
    const job = await prisma.job.findFirst({
      where: {
        id: parseInt(jobId.replace('EMRG-', '')) || -1,
        status: 'completed'
      }
    });
    
    if (!job) {
      return res.status(404).json({ error: 'Completed job not found' });
    }
    
    // Update job with feedback
    const metadata = JSON.parse(job.metadata || '{}');
    metadata.feedback = {
      rating,
      comment,
      submittedAt: new Date()
    };
    
    await prisma.job.update({
      where: { id: job.id },
      data: { metadata: JSON.stringify(metadata) }
    });
    
    // Update contractor rating if applicable
    if (job.contractorId) {
      const contractor = await prisma.contractor.findUnique({
        where: { id: job.contractorId }
      });
      
      if (contractor) {
        const totalRating = (contractor.rating * contractor.completedJobs + rating) / (contractor.completedJobs + 1);
        
        await prisma.contractor.update({
          where: { id: contractor.id },
          data: { rating: totalRating }
        });
      }
    }
    
    res.json({
      success: true,
      message: 'Thank you for your feedback'
    });
    
  } catch (error) {
    logger.error('Feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

/**
 * Helper function to get conversation context
 */
async function getConversationContext(sessionId: string): Promise<string[]> {
  if (!sessionId) return [];
  
  const recentConversations = await prisma.botConversation.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  
  return recentConversations.map(c => `User: ${c.message}\nBot: ${c.response}`);
}

export default router;