/**
 * Contractor Bot API Routes
 * Handles contractor portal and job management
 */

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AIService from '../services/ai-service';
import winston from 'winston';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const JWT_SECRET = process.env.JWT_SECRET || 'nrp-contractor-secret-2025';

/**
 * Middleware to verify contractor authentication
 */
const authenticateContractor = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const contractor = await prisma.contractor.findUnique({
      where: { id: decoded.contractorId }
    });
    
    if (!contractor || !contractor.isActive) {
      return res.status(401).json({ error: 'Invalid contractor account' });
    }
    
    (req as any).contractor = contractor;
    next();
    
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

/**
 * POST /api/contractor/login
 * Contractor authentication
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password, licenseNumber } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const contractor = await prisma.contractor.findUnique({
      where: { email }
    });
    
    if (!contractor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // In production, use proper password hashing
    // For demo, comparing plain text (NOT SECURE)
    const isValid = password === 'demo123'; // Temporary for testing
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        contractorId: contractor.id,
        email: contractor.email,
        businessName: contractor.businessName
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      contractor: {
        id: contractor.id,
        businessName: contractor.businessName,
        email: contractor.email,
        isVerified: contractor.isVerified,
        serviceAreas: contractor.serviceAreas,
        specializations: contractor.specializations
      }
    });
    
    logger.info(`Contractor login: ${contractor.businessName}`);
    
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * GET /api/contractor/jobs/available
 * Get available jobs for contractor
 */
router.get('/jobs/available', authenticateContractor, async (req: Request, res: Response) => {
  try {
    const contractor = (req as any).contractor;
    
    // Parse contractor's service areas and specializations
    const serviceAreas = contractor.serviceAreas?.split(',').map((s: string) => s.trim()) || [];
    const specializations = contractor.specializations?.split(',').map((s: string) => s.trim()) || [];
    
    // Find matching jobs
    const jobs = await prisma.job.findMany({
      where: {
        status: 'pending',
        OR: serviceAreas.map((area: string) => ({
          location: { contains: area }
        }))
      },
      orderBy: [
        { urgency: 'desc' },
        { createdAt: 'asc' }
      ],
      take: 20
    });
    
    // Score jobs based on match
    const scoredJobs = jobs.map(job => {
      let score = 0;
      
      // Location match
      if (serviceAreas.some((area: string) => job.location.includes(area))) {
        score += 10;
      }
      
      // Specialization match
      if (specializations.includes(job.emergencyType)) {
        score += 20;
      }
      
      // Urgency bonus
      if (job.urgency === 'critical') score += 15;
      else if (job.urgency === 'high') score += 10;
      else if (job.urgency === 'medium') score += 5;
      
      return {
        ...job,
        matchScore: score,
        estimatedDistance: calculateDistance(contractor.location, job.location),
        estimatedPayout: calculatePayout(job.emergencyType, job.urgency)
      };
    });
    
    // Sort by score
    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json({
      success: true,
      jobs: scoredJobs.map(job => ({
        id: job.id,
        emergencyType: job.emergencyType,
        location: job.location,
        address: job.address,
        urgency: job.urgency,
        description: job.description,
        matchScore: job.matchScore,
        estimatedDistance: job.estimatedDistance,
        estimatedPayout: job.estimatedPayout,
        createdAt: job.createdAt
      }))
    });
    
  } catch (error) {
    logger.error('Jobs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

/**
 * POST /api/contractor/jobs/:jobId/accept
 * Accept a job
 */
router.post('/jobs/:jobId/accept', authenticateContractor, async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { estimatedArrival, notes } = req.body;
    const contractor = (req as any).contractor;
    
    // Check if job is still available
    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) }
    });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    if (job.status !== 'pending') {
      return res.status(400).json({ error: 'Job no longer available' });
    }
    
    // Assign job to contractor
    const updatedJob = await prisma.job.update({
      where: { id: job.id },
      data: {
        status: 'assigned',
        contractorId: contractor.id,
        assignedAt: new Date(),
        metadata: JSON.stringify({
          ...JSON.parse(job.metadata || '{}'),
          assignmentDetails: {
            estimatedArrival,
            notes,
            acceptedAt: new Date()
          }
        })
      }
    });
    
    // Update contractor stats
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        activeJobs: { increment: 1 },
        lastActiveAt: new Date()
      }
    });
    
    res.json({
      success: true,
      message: 'Job accepted successfully',
      job: {
        id: updatedJob.id,
        customerName: updatedJob.customerName,
        customerPhone: updatedJob.customerPhone,
        address: updatedJob.address,
        emergencyType: updatedJob.emergencyType,
        description: updatedJob.description,
        urgency: updatedJob.urgency
      }
    });
    
    logger.info(`Job ${jobId} accepted by ${contractor.businessName}`);
    
  } catch (error) {
    logger.error('Job acceptance error:', error);
    res.status(500).json({ error: 'Failed to accept job' });
  }
});

/**
 * GET /api/contractor/jobs/active
 * Get contractor's active jobs
 */
router.get('/jobs/active', authenticateContractor, async (req: Request, res: Response) => {
  try {
    const contractor = (req as any).contractor;
    
    const jobs = await prisma.job.findMany({
      where: {
        contractorId: contractor.id,
        status: { in: ['assigned', 'in_progress'] }
      },
      orderBy: { assignedAt: 'desc' }
    });
    
    res.json({
      success: true,
      jobs: jobs.map(job => ({
        id: job.id,
        emergencyType: job.emergencyType,
        location: job.location,
        address: job.address,
        customerName: job.customerName,
        customerPhone: job.customerPhone,
        status: job.status,
        urgency: job.urgency,
        assignedAt: job.assignedAt,
        description: job.description
      }))
    });
    
  } catch (error) {
    logger.error('Active jobs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch active jobs' });
  }
});

/**
 * PUT /api/contractor/jobs/:jobId/status
 * Update job status
 */
router.put('/jobs/:jobId/status', authenticateContractor, async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { status, notes, photos } = req.body;
    const contractor = (req as any).contractor;
    
    // Validate status transition
    const validStatuses = ['in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Verify job ownership
    const job = await prisma.job.findFirst({
      where: {
        id: parseInt(jobId),
        contractorId: contractor.id
      }
    });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found or not assigned to you' });
    }
    
    // Update job status
    const updateData: any = { status };
    
    if (status === 'completed') {
      updateData.completedAt = new Date();
      
      // Update contractor stats
      await prisma.contractor.update({
        where: { id: contractor.id },
        data: {
          completedJobs: { increment: 1 },
          activeJobs: { decrement: 1 }
        }
      });
    }
    
    // Add update to metadata
    const metadata = JSON.parse(job.metadata || '{}');
    metadata.updates = metadata.updates || [];
    metadata.updates.push({
      status,
      notes,
      photos,
      timestamp: new Date(),
      by: contractor.businessName
    });
    updateData.metadata = JSON.stringify(metadata);
    
    const updatedJob = await prisma.job.update({
      where: { id: job.id },
      data: updateData
    });
    
    res.json({
      success: true,
      message: `Job status updated to ${status}`,
      job: {
        id: updatedJob.id,
        status: updatedJob.status,
        completedAt: updatedJob.completedAt
      }
    });
    
    logger.info(`Job ${jobId} status updated to ${status} by ${contractor.businessName}`);
    
  } catch (error) {
    logger.error('Status update error:', error);
    res.status(500).json({ error: 'Failed to update job status' });
  }
});

/**
 * GET /api/contractor/stats
 * Get contractor statistics
 */
router.get('/stats', authenticateContractor, async (req: Request, res: Response) => {
  try {
    const contractor = (req as any).contractor;
    
    // Get job stats
    const [totalJobs, completedThisMonth, activeJobs] = await Promise.all([
      prisma.job.count({
        where: {
          contractorId: contractor.id,
          status: 'completed'
        }
      }),
      prisma.job.count({
        where: {
          contractorId: contractor.id,
          status: 'completed',
          completedAt: {
            gte: new Date(new Date().setDate(1)) // First day of month
          }
        }
      }),
      prisma.job.count({
        where: {
          contractorId: contractor.id,
          status: { in: ['assigned', 'in_progress'] }
        }
      })
    ]);
    
    res.json({
      success: true,
      stats: {
        totalCompleted: contractor.completedJobs,
        activeJobs: contractor.activeJobs,
        rating: contractor.rating,
        responseTime: contractor.averageResponseTime,
        thisMonth: {
          completed: completedThisMonth,
          revenue: completedThisMonth * 500 // Estimated
        },
        allTime: {
          jobs: totalJobs,
          revenue: totalJobs * 500 // Estimated
        }
      }
    });
    
  } catch (error) {
    logger.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

/**
 * Helper Functions
 */
function calculateDistance(loc1: string, loc2: string): string {
  // Simplified distance calculation
  // In production, use proper geocoding
  if (loc1 === loc2) return '< 5km';
  if (loc1.split(',')[0] === loc2.split(',')[0]) return '5-15km';
  return '> 15km';
}

function calculatePayout(emergencyType: string, urgency: string): number {
  const baseRates: any = {
    'flooding': 500,
    'fire_damage': 750,
    'water_damage': 450,
    'mould_remediation': 600,
    'sewage_cleanup': 650,
    'storm_damage': 550,
    'biohazard_cleanup': 800
  };
  
  const urgencyMultiplier: any = {
    'critical': 1.5,
    'high': 1.3,
    'medium': 1.1,
    'low': 1.0
  };
  
  const base = baseRates[emergencyType] || 400;
  const multiplier = urgencyMultiplier[urgency] || 1.0;
  
  return Math.round(base * multiplier);
}

export default router;