/**
 * NRP Bot System - Express Server for Testing
 * Alternative server implementation using Express
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import winston from 'winston';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Logger setup
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'NRP Bot System',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: '/health',
      clientBot: '/api/client',
      contractorBot: '/api/contractor',
      guides: '/api/guides'
    }
  });
});

// Client bot message handler
app.post('/api/client/message', async (req, res) => {
  try {
    const { message, sessionId, channel = 'web' } = req.body;
    
    logger.info(`Client message from ${sessionId}: ${message}`);
    
    // Check for emergency keywords
    const isEmergency = /emergency|urgent|flood|fire|help/i.test(message);
    
    if (isEmergency) {
      // Get emergency guide from database
      const emergencyGuide = await prisma.emergencyGuide.findFirst({
        where: { active: true },
        orderBy: { priority: 'desc' }
      });
      
      if (emergencyGuide) {
        const steps = JSON.parse(emergencyGuide.immediateSteps);
        res.json({
          success: true,
          response: `🚨 EMERGENCY DETECTED\n\nImmediate steps:\n${steps.join('\n')}`,
          type: 'emergency',
          sessionId
        });
        return;
      }
    }
    
    // Normal response
    res.json({
      success: true,
      response: 'I can help you with contractor services and emergency procedures. Please provide more details about what you need.',
      sessionId
    });
    
  } catch (error) {
    logger.error('Error processing client message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    });
  }
});

// Get available guides
app.get('/api/guides', async (req, res) => {
  try {
    const guides = await prisma.stepByStepGuide.findMany({
      where: { active: true },
      select: {
        id: true,
        type: true,
        userType: true,
        title: true,
        description: true
      }
    });
    
    res.json({
      success: true,
      data: guides
    });
    
  } catch (error) {
    logger.error('Error fetching guides:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch guides'
    });
  }
});

// Get contractors
app.get('/api/contractors', async (req, res) => {
  try {
    const contractors = await prisma.contractor.findMany({
      where: {
        active: true,
        verified: true
      },
      select: {
        id: true,
        businessName: true,
        phone: true,
        services: true,
        serviceAreas: true,
        customerRating: true,
        emergencyAvailable: true
      }
    });
    
    // Parse JSON strings
    const formattedContractors = contractors.map(c => ({
      ...c,
      services: JSON.parse(c.services),
      serviceAreas: JSON.parse(c.serviceAreas)
    }));
    
    res.json({
      success: true,
      count: contractors.length,
      data: formattedContractors
    });
    
  } catch (error) {
    logger.error('Error fetching contractors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contractors'
    });
  }
});

// Emergency guides endpoint
app.get('/api/emergency-guides', async (req, res) => {
  try {
    const guides = await prisma.emergencyGuide.findMany({
      where: { active: true },
      orderBy: { priority: 'desc' }
    });
    
    // Parse JSON strings
    const formattedGuides = guides.map(g => ({
      ...g,
      immediateSteps: JSON.parse(g.immediateSteps),
      safetyWarnings: JSON.parse(g.safetyWarnings),
      doNotActions: JSON.parse(g.doNotActions),
      contactNumbers: JSON.parse(g.contactNumbers)
    }));
    
    res.json({
      success: true,
      data: formattedGuides
    });
    
  } catch (error) {
    logger.error('Error fetching emergency guides:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch emergency guides'
    });
  }
});

// Service procedures endpoint
app.get('/api/service-procedures', async (req, res) => {
  try {
    const procedures = await prisma.serviceProcedure.findMany({
      where: { active: true }
    });
    
    // Parse JSON strings
    const formattedProcedures = procedures.map(p => ({
      ...p,
      safetyNotes: JSON.parse(p.safetyNotes),
      requiredPPE: JSON.parse(p.requiredPPE),
      certificationReq: JSON.parse(p.certificationReq)
    }));
    
    res.json({
      success: true,
      data: formattedProcedures
    });
    
  } catch (error) {
    logger.error('Error fetching procedures:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch procedures'
    });
  }
});

// ============================================
// SERVER STARTUP
// ============================================

async function start() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connected');
    
    // Start server
    app.listen(port, () => {
      logger.info(`🚀 Bot API running at http://localhost:${port}`);
      logger.info('✅ Express server operational');
    });
    
  } catch (error) {
    logger.error('❌ Startup failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
start();