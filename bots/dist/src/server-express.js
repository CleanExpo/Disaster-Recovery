"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const winston_1 = __importDefault(require("winston"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3001;
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [new winston_1.default.transports.Console()]
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});
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
app.post('/api/client/message', async (req, res) => {
    try {
        const { message, sessionId, channel = 'web' } = req.body;
        logger.info(`Client message from ${sessionId}: ${message}`);
        const isEmergency = /emergency|urgent|flood|fire|help/i.test(message);
        if (isEmergency) {
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
        res.json({
            success: true,
            response: 'I can help you with contractor services and emergency procedures. Please provide more details about what you need.',
            sessionId
        });
    }
    catch (error) {
        logger.error('Error processing client message:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process message'
        });
    }
});
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
    }
    catch (error) {
        logger.error('Error fetching guides:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch guides'
        });
    }
});
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
    }
    catch (error) {
        logger.error('Error fetching contractors:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contractors'
        });
    }
});
app.get('/api/emergency-guides', async (req, res) => {
    try {
        const guides = await prisma.emergencyGuide.findMany({
            where: { active: true },
            orderBy: { priority: 'desc' }
        });
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
    }
    catch (error) {
        logger.error('Error fetching emergency guides:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch emergency guides'
        });
    }
});
app.get('/api/service-procedures', async (req, res) => {
    try {
        const procedures = await prisma.serviceProcedure.findMany({
            where: { active: true }
        });
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
    }
    catch (error) {
        logger.error('Error fetching procedures:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch procedures'
        });
    }
});
async function start() {
    try {
        await prisma.$connect();
        logger.info('✅ Database connected');
        app.listen(port, () => {
            logger.info(`🚀 Bot API running at http://localhost:${port}`);
            logger.info('✅ Express server operational');
        });
    }
    catch (error) {
        logger.error('❌ Startup failed:', error);
        process.exit(1);
    }
}
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
start();
//# sourceMappingURL=server-express.js.map