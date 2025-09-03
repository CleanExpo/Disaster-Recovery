export declare const COMPLIANCE_CONFIG: {
    prohibitedTopics: string[];
    allowedTopics: string[];
    disclaimers: {
        general: string;
        noHealthAdvice: string;
        noLegalAdvice: string;
        emergencyServices: string;
        insuranceSpecific: string;
    };
};
export declare class DataVerificationService {
    verifyResponse(responseType: string, content: string, sourceId?: string): Promise<{
        verified: boolean;
        response: string;
        sources: string[];
        disclaimers: string[];
    }>;
    private checkProhibited;
    private getSafeAlternative;
    private verifyAgainstDatabase;
    private getDisclaimers;
}
export declare class StepByStepGuideService {
    getGuide(guideType: string, userType: 'customer' | 'contractor'): Promise<any>;
    getAvailableGuides(userType: 'customer' | 'contractor'): Promise<{
        guides: Array<{
            id: string;
            title: string;
            type: string;
        }>;
    }>;
}
export declare class ResponseAttributionService {
    static addAttribution(response: string, sources: string[], disclaimers: string[]): string;
    static formatForChannel(response: string, channel: 'web' | 'sms' | 'whatsapp' | 'email'): string;
}
//# sourceMappingURL=data-verification-layer.d.ts.map