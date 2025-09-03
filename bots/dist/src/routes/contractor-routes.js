"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const ai_service_1 = __importDefault(require("../services/ai-service"));
const winston_1 = __importDefault(require("winston"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const aiService = new ai_service_1.default();
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [new winston_1.default.transports.Console()]
});
const JWT_SECRET = process.env.JWT_SECRET || 'nrp-contractor-secret-2025';
const authenticateContractor = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const contractor = await prisma.contractor.findUnique({
            where: { id: decoded.contractorId }
        });
        if (!contractor || !contractor.isActive) {
            return res.status(401).json({ error: 'Invalid contractor account' });
        }
        req.contractor = contractor;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};
router.post('/login', async (req, res) => {
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
        const isValid = password === 'demo123';
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({
            contractorId: contractor.id,
            email: contractor.email,
            businessName: contractor.businessName
        }, JWT_SECRET, { expiresIn: '24h' });
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
    }
    catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
router.get('/jobs/available', authenticateContractor, async (req, res) => {
    try {
        const contractor = req.contractor;
        const serviceAreas = contractor.serviceAreas?.split(',').map((s) => s.trim()) || [];
        const specializations = contractor.specializations?.split(',').map((s) => s.trim()) || [];
        const jobs = await prisma.job.findMany({
            where: {
                status: 'pending',
                OR: serviceAreas.map((area) => ({
                    location: { contains: area }
                }))
            },
            orderBy: [
                { urgency: 'desc' },
                { createdAt: 'asc' }
            ],
            take: 20
        });
        const scoredJobs = jobs.map(job => {
            let score = 0;
            if (serviceAreas.some((area) => job.location.includes(area))) {
                score += 10;
            }
            if (specializations.includes(job.emergencyType)) {
                score += 20;
            }
            if (job.urgency === 'critical')
                score += 15;
            else if (job.urgency === 'high')
                score += 10;
            else if (job.urgency === 'medium')
                score += 5;
            return {
                ...job,
                matchScore: score,
                estimatedDistance: calculateDistance(contractor.location, job.location),
                estimatedPayout: calculatePayout(job.emergencyType, job.urgency)
            };
        });
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
    }
    catch (error) {
        logger.error('Jobs fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});
router.post('/jobs/:jobId/accept', authenticateContractor, async (req, res) => {
    try {
        const { jobId } = req.params;
        const { estimatedArrival, notes } = req.body;
        const contractor = req.contractor;
        const job = await prisma.job.findUnique({
            where: { id: parseInt(jobId) }
        });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        if (job.status !== 'pending') {
            return res.status(400).json({ error: 'Job no longer available' });
        }
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
    }
    catch (error) {
        logger.error('Job acceptance error:', error);
        res.status(500).json({ error: 'Failed to accept job' });
    }
});
router.get('/jobs/active', authenticateContractor, async (req, res) => {
    try {
        const contractor = req.contractor;
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
    }
    catch (error) {
        logger.error('Active jobs fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch active jobs' });
    }
});
router.put('/jobs/:jobId/status', authenticateContractor, async (req, res) => {
    try {
        const { jobId } = req.params;
        const { status, notes, photos } = req.body;
        const contractor = req.contractor;
        const validStatuses = ['in_progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const job = await prisma.job.findFirst({
            where: {
                id: parseInt(jobId),
                contractorId: contractor.id
            }
        });
        if (!job) {
            return res.status(404).json({ error: 'Job not found or not assigned to you' });
        }
        const updateData = { status };
        if (status === 'completed') {
            updateData.completedAt = new Date();
            await prisma.contractor.update({
                where: { id: contractor.id },
                data: {
                    completedJobs: { increment: 1 },
                    activeJobs: { decrement: 1 }
                }
            });
        }
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
    }
    catch (error) {
        logger.error('Status update error:', error);
        res.status(500).json({ error: 'Failed to update job status' });
    }
});
router.get('/stats', authenticateContractor, async (req, res) => {
    try {
        const contractor = req.contractor;
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
                        gte: new Date(new Date().setDate(1))
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
                    revenue: completedThisMonth * 500
                },
                allTime: {
                    jobs: totalJobs,
                    revenue: totalJobs * 500
                }
            }
        });
    }
    catch (error) {
        logger.error('Stats fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});
function calculateDistance(loc1, loc2) {
    if (loc1 === loc2)
        return '< 5km';
    if (loc1.split(',')[0] === loc2.split(',')[0])
        return '5-15km';
    return '> 15km';
}
function calculatePayout(emergencyType, urgency) {
    const baseRates = {
        'flooding': 500,
        'fire_damage': 750,
        'water_damage': 450,
        'mould_remediation': 600,
        'sewage_cleanup': 650,
        'storm_damage': 550,
        'biohazard_cleanup': 800
    };
    const urgencyMultiplier = {
        'critical': 1.5,
        'high': 1.3,
        'medium': 1.1,
        'low': 1.0
    };
    const base = baseRates[emergencyType] || 400;
    const multiplier = urgencyMultiplier[urgency] || 1.0;
    return Math.round(base * multiplier);
}
exports.default = router;
//# sourceMappingURL=contractor-routes.js.map