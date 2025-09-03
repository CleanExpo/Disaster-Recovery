"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const openai_1 = __importDefault(require("openai"));
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [new winston_1.default.transports.Console()]
});
class AIService {
    prisma;
    openai = null;
    complianceMode = true;
    constructor() {
        this.prisma = new client_1.PrismaClient();
        if (process.env.OPENAI_API_KEY) {
            this.openai = new openai_1.default({
                apiKey: process.env.OPENAI_API_KEY
            });
        }
    }
    async processQuery(query, context) {
        try {
            if (this.isEmergencyQuery(query)) {
                return await this.handleEmergencyQuery(query, context);
            }
            const databaseMatch = await this.searchDatabaseContent(query, context);
            if (databaseMatch) {
                return databaseMatch;
            }
            const guideMatch = await this.searchGuides(query, context);
            if (guideMatch) {
                return guideMatch;
            }
            return await this.generateSafeResponse(query, context);
        }
        catch (error) {
            logger.error('AI Service Error:', error);
            return this.getDefaultResponse(context);
        }
    }
    isEmergencyQuery(query) {
        const emergencyKeywords = [
            'emergency', 'urgent', 'flood', 'fire', 'danger',
            'help', 'immediate', 'crisis', 'disaster', 'damage',
            'leak', 'burst', 'smoke', 'sewage', 'mould', 'biohazard'
        ];
        const lowerQuery = query.toLowerCase();
        return emergencyKeywords.some(keyword => lowerQuery.includes(keyword));
    }
    async handleEmergencyQuery(query, context) {
        const emergencyGuide = await this.prisma.emergencyGuide.findFirst({
            where: {
                isActive: true,
                OR: [
                    { keywords: { contains: query.toLowerCase() } },
                    { emergencyType: { contains: this.extractEmergencyType(query) } }
                ]
            }
        });
        if (emergencyGuide) {
            const steps = JSON.parse(emergencyGuide.steps || '[]');
            return {
                message: emergencyGuide.initialResponse,
                data: {
                    steps,
                    estimatedResponse: emergencyGuide.estimatedResponse,
                    priority: emergencyGuide.priority
                },
                source: 'emergency_protocol',
                confidence: 1.0,
                suggestedActions: [
                    'Contact emergency services if immediate danger',
                    'Move to safe location',
                    'Document damage with photos',
                    'Do not attempt repairs yourself'
                ]
            };
        }
        return {
            message: 'This appears to be an emergency. For your safety, please ensure you are in a safe location. A contractor will be notified immediately.',
            source: 'emergency_protocol',
            confidence: 0.9,
            suggestedActions: [
                'Ensure personal safety first',
                'Turn off utilities if safe to do so',
                'Document the situation',
                'Wait for professional help'
            ]
        };
    }
    async searchDatabaseContent(query, context) {
        const content = await this.prisma.verifiedContent.findFirst({
            where: {
                isActive: true,
                OR: [
                    { title: { contains: query } },
                    { content: { contains: query } },
                    { keywords: { contains: query.toLowerCase() } }
                ]
            }
        });
        if (content) {
            return {
                message: content.content,
                data: {
                    title: content.title,
                    category: content.category,
                    lastVerified: content.lastVerified
                },
                source: 'database',
                confidence: 1.0
            };
        }
        return null;
    }
    async searchGuides(query, context) {
        const guide = await this.prisma.stepByStepGuide.findFirst({
            where: {
                isActive: true,
                userType: context.userType,
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                    { keywords: { contains: query.toLowerCase() } }
                ]
            }
        });
        if (guide) {
            const steps = JSON.parse(guide.steps || '[]');
            return {
                message: `Here's a guide for: ${guide.title}\n${guide.description}`,
                data: {
                    title: guide.title,
                    steps,
                    estimatedTime: guide.estimatedTime,
                    difficulty: guide.difficulty
                },
                source: 'guide',
                confidence: 1.0,
                suggestedActions: steps.slice(0, 3)
            };
        }
        return null;
    }
    async generateSafeResponse(query, context) {
        if (this.openai && !this.complianceMode) {
            try {
                const completion = await this.openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a disaster recovery assistant. You must:
                1. ONLY provide factual, verified information
                2. NEVER give health or legal advice
                3. Always recommend professional assistance
                4. Keep responses brief and actionable
                5. Focus on safety first`
                        },
                        {
                            role: 'user',
                            content: query
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 200
                });
                return {
                    message: completion.choices[0].message.content || this.getDefaultResponse(context).message,
                    source: 'database',
                    confidence: 0.7,
                    suggestedActions: [
                        'Contact a professional for specific advice',
                        'Document your situation',
                        'Request a formal assessment'
                    ]
                };
            }
            catch (error) {
                logger.error('OpenAI API Error:', error);
            }
        }
        return this.getDefaultResponse(context);
    }
    extractEmergencyType(query) {
        const types = {
            'flood': 'flooding',
            'water': 'water_damage',
            'fire': 'fire_damage',
            'mould': 'mould_remediation',
            'sewage': 'sewage_cleanup',
            'storm': 'storm_damage',
            'biohazard': 'biohazard_cleanup'
        };
        const lowerQuery = query.toLowerCase();
        for (const [keyword, type] of Object.entries(types)) {
            if (lowerQuery.includes(keyword)) {
                return type;
            }
        }
        return 'general_emergency';
    }
    getDefaultResponse(context) {
        const responses = {
            client: 'I can help you with disaster recovery information. For specific assistance, I\'ll need more details about your situation. All advice provided is based on our verified database.',
            contractor: 'I can assist with job information and procedures. Please specify what you need help with, and I\'ll provide relevant information from our contractor resources.'
        };
        return {
            message: responses[context.userType],
            source: 'database',
            confidence: 0.5,
            suggestedActions: [
                'Provide more specific details',
                'Choose from available options',
                'Request professional assessment'
            ]
        };
    }
    async trainOnContent(contentId) {
        const content = await this.prisma.verifiedContent.findUnique({
            where: { id: contentId }
        });
        if (content) {
            logger.info(`Training on new content: ${content.title}`);
        }
    }
    async getContractorRecommendations(jobType, location, urgency) {
        const contractors = await this.prisma.contractor.findMany({
            where: {
                isActive: true,
                isVerified: true,
                serviceAreas: { contains: location },
                specializations: { contains: jobType }
            },
            orderBy: [
                { rating: 'desc' },
                { completedJobs: 'desc' }
            ],
            take: 5
        });
        return contractors.map(c => ({
            id: c.id,
            businessName: c.businessName,
            rating: c.rating,
            responseTime: c.averageResponseTime,
            specialMatch: c.specializations?.includes(jobType) ? 'exact' : 'partial'
        }));
    }
    validateCompliance(response) {
        const prohibitedTerms = [
            'medical advice', 'legal counsel', 'diagnosis',
            'prescription', 'treatment', 'lawsuit', 'liability',
            'guarantee', 'warranty', 'insurance claim advice'
        ];
        const lowerResponse = response.toLowerCase();
        return !prohibitedTerms.some(term => lowerResponse.includes(term));
    }
}
exports.default = AIService;
//# sourceMappingURL=ai-service.js.map