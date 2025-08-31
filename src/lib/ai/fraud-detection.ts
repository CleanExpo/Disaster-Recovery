import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export interface FraudDetectionResult {
  isAuthentic: boolean;
  confidenceScore: number; // 0-100
  suspiciousElements: string[];
  recommendedAction: 'APPROVE' | 'REVIEW' | 'REJECT';
  analysisDetails: {
    documentType: string;
    contentAnalysis: string;
    plagiarismCheck: string;
    consistencyCheck: string;
    metadataAnalysis: string;
  };
  riskFactors: Array<{
    category: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
    evidence: string;
  }>;
}

export interface DocumentAnalysisInput {
  documentType: 'INSURANCE_POLICY' | 'BUSINESS_LICENSE' | 'CERTIFICATION' | 'PROOF_OF_WORK' | 'FINANCIAL_STATEMENT' | 'OTHER';
  content: string; // OCR extracted text or document content
  metadata?: {
    filename?: string;
    fileSize?: number;
    uploadTimestamp?: string;
    ipAddress?: string;
    userAgent?: string;
  };
  contractorId: string;
  documentUrl?: string;
}

class FraudDetectionService {
  private static instance: FraudDetectionService;

  public static getInstance(): FraudDetectionService {
    if (!FraudDetectionService.instance) {
      FraudDetectionService.instance = new FraudDetectionService();
    }
    return FraudDetectionService.instance;
  }

  async analyzeDocument(input: DocumentAnalysisInput): Promise<FraudDetectionResult> {
    try {
      // Log fraud detection attempt
      const fraudLog = await prisma.fraudDetectionLog.create({
        data: {
          contractorId: input.contractorId,
          documentType: input.documentType,
          analysisStatus: 'PROCESSING',
          ipAddress: input.metadata?.ipAddress,
          userAgent: input.metadata?.userAgent,
        }
      });

      // Run parallel fraud detection checks
      const [
        contentAnalysis,
        plagiarismCheck,
        consistencyCheck,
        metadataAnalysis
      ] = await Promise.all([
        this.analyzeContent(input),
        this.checkPlagiarism(input),
        this.checkConsistency(input),
        this.analyzeMetadata(input)
      ]);

      // Calculate overall risk score
      const riskFactors = [
        ...contentAnalysis.risks,
        ...plagiarismCheck.risks,
        ...consistencyCheck.risks,
        ...metadataAnalysis.risks
      ];

      const confidenceScore = this.calculateConfidenceScore(riskFactors);
      const recommendedAction = this.determineRecommendedAction(confidenceScore, riskFactors);

      const result: FraudDetectionResult = {
        isAuthentic: confidenceScore >= 70,
        confidenceScore,
        suspiciousElements: riskFactors
          .filter(rf => rf.severity === 'HIGH')
          .map(rf => rf.description),
        recommendedAction,
        analysisDetails: {
          documentType: input.documentType,
          contentAnalysis: contentAnalysis.summary,
          plagiarismCheck: plagiarismCheck.summary,
          consistencyCheck: consistencyCheck.summary,
          metadataAnalysis: metadataAnalysis.summary,
        },
        riskFactors
      };

      // Update fraud detection log with results
      await prisma.fraudDetectionLog.update({
        where: { id: fraudLog.id },
        data: {
          analysisStatus: 'COMPLETED',
          confidenceScore,
          riskLevel: this.getRiskLevel(confidenceScore),
          suspiciousElements: JSON.stringify(result.suspiciousElements),
          analysisResults: JSON.stringify(result),
          reviewRequired: recommendedAction === 'REVIEW',
        }
      });

      return result;

    } catch (error) {
      console.error('Error in fraud detection analysis:', error);
      
      // Return conservative result on error
      return {
        isAuthentic: false,
        confidenceScore: 0,
        suspiciousElements: ['Analysis failed - manual review required'],
        recommendedAction: 'REVIEW',
        analysisDetails: {
          documentType: input.documentType,
          contentAnalysis: 'Analysis failed',
          plagiarismCheck: 'Analysis failed',
          consistencyCheck: 'Analysis failed',
          metadataAnalysis: 'Analysis failed',
        },
        riskFactors: [{
          category: 'SYSTEM_ERROR',
          severity: 'HIGH',
          description: 'Automated analysis failed',
          evidence: error instanceof Error ? error.message : 'Unknown error'
        }]
      };
    }
  }

  private async analyzeContent(input: DocumentAnalysisInput) {
    // Return mock response if OpenAI is not configured
    if (!openai) {
      return {
        analysis: 'AI analysis unavailable - manual review required',
        riskScore: 50,
        flags: ['OpenAI API not configured']
      };
    }

    const prompt = `Analyse this ${input.documentType} document for authenticity and fraud indicators:

Document Content:
${input.content}

Provide a detailed analysis covering:
1. Document structure and formatting consistency
2. Language patterns and professional terminology usage
3. Dates, addresses, and contact information validity
4. Compliance with Australian standards and regulations
5. Red flags or suspicious elements
6. Overall authenticity assessment

Focus on identifying:
- Inconsistent formatting or fonts
- Suspicious language patterns
- Invalid Australian addresses or email numbers
- Incorrect business registration formats
- Unusual document structure
- Generic or template-like content
- Missing required information for this document type`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a forensic document analyst specialising in detecting fraudulent business documents, insurance policies, and certifications. Provide detailed, objective analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
    });

    const analysis = response.choices[0].message.content || '';
    
    // Extract risk factors from analysis
    const risks = this.extractRiskFactors(analysis, 'CONTENT_ANALYSIS');

    return {
      summary: analysis,
      risks
    };
  }

  private async checkPlagiarism(input: DocumentAnalysisInput) {
    // Check against known fraudulent documents and common templates
    const suspiciousPatterns = [
      /template|placeholder|example|sample/gi,
      /\[INSERT.*?\]|\{.*?\}|\<.*?\>/g,
      /lorem ipsum/gi,
      /www\.example\.com|example@/gi,
      /123-456-7890|555-/g,
    ];

    const risks = [];
    
    for (const pattern of suspiciousPatterns) {
      const matches = input.content.match(pattern);
      if (matches && matches.length > 0) {
        risks.push({
          category: 'PLAGIARISM',
          severity: 'HIGH' as const,
          description: `Template or placeholder content detected`,
          evidence: `Found: ${matches.slice(0, 3).join(', ')}`
        });
      }
    }

    // Check for duplicate submissions
    const existingDocuments = await prisma.onboardingDocument.findMany({
      where: {
        contractorId: {
          not: input.contractorId
        }
      },
      select: {
        content: true,
        contractorId: true,
      }
    });

    for (const doc of existingDocuments) {
      if (doc.content && this.calculateSimilarity(input.content, doc.content) > 0.8) {
        risks.push({
          category: 'PLAGIARISM',
          severity: 'HIGH' as const,
          description: 'Document appears to be duplicate of another submission',
          evidence: `Similar to document from contractor ${doc.contractorId}`
        });
        break;
      }
    }

    return {
      summary: `Plagiarism check found ${risks.length} potential issues`,
      risks
    };
  }

  private async checkConsistency(input: DocumentAnalysisInput) {
    // Get contractor's other documents for consistency checking
    const contractorDocuments = await prisma.onboardingDocument.findMany({
      where: {
        contractorId: input.contractorId,
        id: {
          not: undefined // Get all documents for this contractor
        }
      },
      select: {
        documentType: true,
        content: true,
        metadata: true,
      }
    });

    const risks = [];

    // Check for consistent business name, ABN, addresses across documents
    const businessNameMatches = input.content.match(/(?:business name|company name|trading as)[\s:]*([^\n\r,;]{1,100})/gi);
    const abnMatches = input.content.match(/(?:abn|australian business number)[\s:]*(\d{2}\s?\d{3}\s?\d{3}\s?\d{3})/gi);
    const addressMatches = input.content.match(/(?:address|street|suburb)[\s:]*([^\n\r]{1,200})/gi);

    // Simple consistency check - this would be more sophisticated in production
    if (contractorDocuments.length > 0 && businessNameMatches) {
      // Check if business names are consistent across documents
      // This is a simplified check - production would use more sophisticated matching
    }

    // Check document dates for logical sequence
    const dateMatches = input.content.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g);
    if (dateMatches && dateMatches.length > 1) {
      // Check if dates are in logical order
      const dates = dateMatches.map(d => new Date(d)).filter(d => !isNaN(d.getTime()));
      // Add logic to check date consistency
    }

    return {
      summary: `Consistency check completed with ${risks.length} concerns`,
      risks
    };
  }

  private async analyzeMetadata(input: DocumentAnalysisInput) {
    const risks = [];
    
    if (input.metadata) {
      // Check for suspicious upload patterns
      if (input.metadata.fileSize && input.metadata.fileSize < 1000) {
        risks.push({
          category: 'METADATA',
          severity: 'MEDIUM' as const,
          description: 'Unusually small file size for document type',
          evidence: `File size: ${input.metadata.fileSize} bytes`
        });
      }

      // Check filename for suspicious patterns
      if (input.metadata.filename) {
        const suspiciousFilenames = /template|fake|copy|duplicate|test/i;
        if (suspiciousFilenames.test(input.metadata.filename)) {
          risks.push({
            category: 'METADATA',
            severity: 'HIGH' as const,
            description: 'Suspicious filename pattern',
            evidence: `Filename: ${input.metadata.filename}`
          });
        }
      }

      // Check for rapid successive uploads (potential automated submission)
      if (input.metadata.uploadTimestamp) {
        const recentUploads = await prisma.onboardingDocument.count({
          where: {
            contractorId: input.contractorId,
            uploadedAt: {
              gte: new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
            }
          }
        });

        if (recentUploads > 5) {
          risks.push({
            category: 'METADATA',
            severity: 'HIGH' as const,
            description: 'Unusually rapid document submissions',
            evidence: `${recentUploads} documents uploaded in last 5 minutes`
          });
        }
      }
    }

    return {
      summary: `Metadata analysis completed`,
      risks
    };
  }

  private extractRiskFactors(analysis: string, category: string) {
    const risks = [];
    
    // Look for high-risk indicators in the analysis
    const highRiskKeywords = [
      'suspicious', 'fraudulent', 'fake', 'template', 'inconsistent',
      'invalid', 'incorrect', 'missing', 'red flag', 'concerning'
    ];

    const mediumRiskKeywords = [
      'unusual', 'inconsistent', 'questionable', 'unclear', 'generic'
    ];

    for (const keyword of highRiskKeywords) {
      if (analysis.toLowerCase().includes(keyword)) {
        risks.push({
          category,
          severity: 'HIGH' as const,
          description: `Analysis flagged potential issue`,
          evidence: `Keyword: "${keyword}" found in analysis`
        });
      }
    }

    for (const keyword of mediumRiskKeywords) {
      if (analysis.toLowerCase().includes(keyword) && !highRiskKeywords.some(hrk => analysis.toLowerCase().includes(hrk))) {
        risks.push({
          category,
          severity: 'MEDIUM' as const,
          description: `Analysis noted potential concern`,
          evidence: `Keyword: "${keyword}" found in analysis`
        });
      }
    }

    return risks;
  }

  private calculateSimilarity(text1: string, text2: string): number {
    // Simple Jaccard similarity - production would use more sophisticated algorithms
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  private calculateConfidenceScore(riskFactors: Array<{ severity: 'LOW' | 'MEDIUM' | 'HIGH' }>): number {
    let score = 100;
    
    for (const factor of riskFactors) {
      switch (factor.severity) {
        case 'HIGH':
          score -= 25;
          break;
        case 'MEDIUM':
          score -= 10;
          break;
        case 'LOW':
          score -= 5;
          break;
      }
    }

    return Math.max(0, score);
  }

  private determineRecommendedAction(confidenceScore: number, riskFactors: Array<{ severity: 'LOW' | 'MEDIUM' | 'HIGH' }>): 'APPROVE' | 'REVIEW' | 'REJECT' {
    const highRiskFactors = riskFactors.filter(rf => rf.severity === 'HIGH').length;
    
    if (highRiskFactors >= 3 || confidenceScore < 30) {
      return 'REJECT';
    } else if (highRiskFactors >= 1 || confidenceScore < 70) {
      return 'REVIEW';
    } else {
      return 'APPROVE';
    }
  }

  private getRiskLevel(confidenceScore: number): string {
    if (confidenceScore >= 80) return 'LOW';
    if (confidenceScore >= 60) return 'MEDIUM';
    return 'HIGH';
  }
}

export default FraudDetectionService;