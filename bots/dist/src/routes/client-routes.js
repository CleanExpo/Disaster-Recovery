"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const ai_service_1 = __importDefault(require("../services/ai-service"));
const winston_1 = __importDefault(require("winston"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const aiService = new ai_service_1.default();
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [new winston_1.default.transports.Console()]
});
router.use((req, res, next) => {
    if (!req.headers['x-session-id']) {
        req.headers['x-session-id'] = (0, uuid_1.v4)();
    }
    next();
});
router.post('/message', async (req, res) => {
    try {
        const { message, sessionId, metadata = {} } = req.body;
        if (!message) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }
        const conversation = await prisma.botConversation.create({
            data: {
                sessionId: sessionId || req.headers['x-session-id'],
                userType: 'client',
                message,
                response: '',
                metadata: JSON.stringify(metadata)
            }
        });
        const aiResponse = await aiService.processQuery(message, {
            userType: 'client',
            location: metadata.location,
            previousContext: await getConversationContext(sessionId)
        });
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
        res.json({
            success: true,
            sessionId: sessionId || req.headers['x-session-id'],
            response: aiResponse.message,
            suggestedActions: aiResponse.suggestedActions,
            data: aiResponse.data
        });
    }
    catch (error) {
        logger.error('Message processing error:', error);
        res.status(500).json({
            error: 'Failed to process message',
            sessionId: req.headers['x-session-id']
        });
    }
});
router.post('/emergency', async (req, res) => {
    try {
        const { type, location, address, description, customerName, customerPhone, severity = 'high' } = req.body;
        if (!type || !location || !customerPhone) {
            return res.status(400).json({
                error: 'Missing required emergency information'
            });
        }
        const aiResponse = await aiService.processQuery(`EMERGENCY: ${type} at ${location}. ${description}`, {
            userType: 'client',
            emergencyLevel: severity,
            location
        });
        const contractors = await aiService.getContractorRecommendations(type, location, severity);
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
    }
    catch (error) {
        logger.error('Emergency processing error:', error);
        res.status(500).json({
            error: 'Emergency reported but processing failed. Help is on the way.',
            fallbackNumber: '000'
        });
    }
});
router.get('/guides', async (req, res) => {
    try {
        const { category, search } = req.query;
        const whereClause = {
            isActive: true,
            userType: 'client'
        };
        if (category) {
            whereClause.category = category;
        }
        if (search) {
            whereClause.OR = [
                { title: { contains: search } },
                { keywords: { contains: search.toLowerCase() } }
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
    }
    catch (error) {
        logger.error('Guides fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch guides' });
    }
});
router.get('/status/:jobId', async (req, res) => {
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
    }
    catch (error) {
        logger.error('Status check error:', error);
        res.status(500).json({ error: 'Failed to check status' });
    }
});
router.post('/feedback', async (req, res) => {
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
    }
    catch (error) {
        logger.error('Feedback submission error:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});
async function getConversationContext(sessionId) {
    if (!sessionId)
        return [];
    const recentConversations = await prisma.botConversation.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'desc' },
        take: 5
    });
    return recentConversations.map(c => `User: ${c.message}\nBot: ${c.response}`);
}
exports.default = router;
//# sourceMappingURL=client-routes.js.map