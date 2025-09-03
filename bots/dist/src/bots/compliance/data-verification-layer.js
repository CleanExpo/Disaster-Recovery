"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseAttributionService = exports.StepByStepGuideService = exports.DataVerificationService = exports.COMPLIANCE_CONFIG = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.COMPLIANCE_CONFIG = {
    prohibitedTopics: [
        'medical diagnosis',
        'health treatment',
        'legal rights',
        'legal action',
        'medical advice',
        'health risks',
        'compensation claims',
        'liability'
    ],
    allowedTopics: [
        'service procedures',
        'contractor availability',
        'equipment information',
        'general safety',
        'insurance processes',
        'emergency procedures'
    ],
    disclaimers: {
        general: 'Information provided is general in nature. Always consult qualified professionals for specific advice.',
        noHealthAdvice: 'We cannot provide health or medical advice. Consult healthcare professionals for health concerns.',
        noLegalAdvice: 'We cannot provide legal advice. Consult legal professionals for legal matters.',
        emergencyServices: 'In emergencies, always call 000 first.',
        insuranceSpecific: 'Insurance processes vary. Contact your insurer for specific policy information.'
    }
};
class DataVerificationService {
    async verifyResponse(responseType, content, sourceId) {
        const prohibited = this.checkProhibited(content);
        if (prohibited.found) {
            return {
                verified: false,
                response: this.getSafeAlternative(prohibited.type),
                sources: [],
                disclaimers: [exports.COMPLIANCE_CONFIG.disclaimers.general]
            };
        }
        const verification = await this.verifyAgainstDatabase(responseType, sourceId);
        const disclaimers = this.getDisclaimers(responseType);
        return {
            verified: verification.verified,
            response: content,
            sources: verification.sources,
            disclaimers
        };
    }
    checkProhibited(content) {
        const lower = content.toLowerCase();
        for (const topic of exports.COMPLIANCE_CONFIG.prohibitedTopics) {
            if (lower.includes(topic)) {
                return { found: true, type: topic };
            }
        }
        return { found: false };
    }
    getSafeAlternative(prohibitedType) {
        const alternatives = {
            'medical diagnosis': 'I cannot provide medical diagnosis. Please consult healthcare professionals.',
            'health treatment': 'I cannot advise on health treatments. Please consult qualified medical practitioners.',
            'legal rights': 'I cannot provide legal advice. Please consult qualified legal professionals.',
            'legal action': 'For legal matters, please consult a qualified lawyer or legal aid service.',
            'medical advice': 'I cannot provide medical advice. For health concerns, please consult healthcare professionals.',
            'health risks': 'For health risk assessments, please consult qualified healthcare providers.',
            'compensation claims': 'For compensation matters, please consult legal professionals or your insurance provider.',
            'liability': 'For liability questions, please consult legal professionals.'
        };
        return alternatives[prohibitedType] || 'This topic requires professional consultation.';
    }
    async verifyAgainstDatabase(responseType, sourceId) {
        const sources = [];
        if (sourceId) {
            const verifiedContent = await prisma.verifiedContent.findUnique({
                where: { id: sourceId }
            });
            if (verifiedContent && verifiedContent.approved) {
                sources.push(`Verified Content: ${verifiedContent.title}`);
                return { verified: true, sources };
            }
        }
        const approvedContent = await prisma.verifiedContent.findFirst({
            where: {
                type: responseType,
                approved: true,
                active: true
            }
        });
        if (approvedContent) {
            sources.push(`Database: ${responseType}`);
            return { verified: true, sources };
        }
        return { verified: false, sources: [] };
    }
    getDisclaimers(responseType) {
        const disclaimers = [exports.COMPLIANCE_CONFIG.disclaimers.general];
        switch (responseType) {
            case 'emergency_response':
                disclaimers.push(exports.COMPLIANCE_CONFIG.disclaimers.emergencyServices);
                break;
            case 'insurance_claim':
                disclaimers.push(exports.COMPLIANCE_CONFIG.disclaimers.insuranceSpecific);
                break;
            case 'health_related':
                disclaimers.push(exports.COMPLIANCE_CONFIG.disclaimers.noHealthAdvice);
                break;
            case 'legal_related':
                disclaimers.push(exports.COMPLIANCE_CONFIG.disclaimers.noLegalAdvice);
                break;
        }
        return disclaimers;
    }
}
exports.DataVerificationService = DataVerificationService;
class StepByStepGuideService {
    async getGuide(guideType, userType) {
        const guide = await prisma.stepByStepGuide.findFirst({
            where: {
                type: guideType,
                userType,
                active: true
            },
            include: {
                steps: {
                    orderBy: { stepNumber: 'asc' }
                }
            }
        });
        if (!guide) {
            return null;
        }
        return {
            title: guide.title,
            description: guide.description,
            steps: guide.steps,
            disclaimers: [
                exports.COMPLIANCE_CONFIG.disclaimers.general,
                'These are general procedures. Specific situations may vary.'
            ],
            source: `Guide ID: ${guide.id}`
        };
    }
    async getAvailableGuides(userType) {
        const guides = await prisma.stepByStepGuide.findMany({
            where: {
                userType,
                active: true
            },
            select: {
                id: true,
                title: true,
                type: true
            },
            orderBy: { priority: 'desc' }
        });
        return { guides };
    }
}
exports.StepByStepGuideService = StepByStepGuideService;
class ResponseAttributionService {
    static addAttribution(response, sources, disclaimers) {
        let attributedResponse = response;
        if (sources.length > 0) {
            attributedResponse += '\n\n📚 Sources:\n';
            sources.forEach(source => {
                attributedResponse += `• ${source}\n`;
            });
        }
        if (disclaimers.length > 0) {
            attributedResponse += '\n⚠️ Important:\n';
            disclaimers.forEach(disclaimer => {
                attributedResponse += `• ${disclaimer}\n`;
            });
        }
        return attributedResponse;
    }
    static formatForChannel(response, channel) {
        switch (channel) {
            case 'sms':
                return response.substring(0, 450) + (response.length > 450 ? '...[Reply MORE for details]' : '');
            case 'whatsapp':
                return response;
            case 'email':
                return `<html><body><pre>${response}</pre></body></html>`;
            case 'web':
            default:
                return response;
        }
    }
}
exports.ResponseAttributionService = ResponseAttributionService;
//# sourceMappingURL=data-verification-layer.js.map