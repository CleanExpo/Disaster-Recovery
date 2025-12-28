/**
 * PDF Generation Service
 *
 * Generates professional NRPG inspection report PDFs using Puppeteer and Handlebars
 * - Embeds photos, cost tables, compliance data
 * - NRPG branding with header/footer
 * - Multi-page layout support
 * - Digital signature ready
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import Handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';
import { CostEstimate } from './cost-estimation.service';

// ============================================================================
// TYPES
// ============================================================================

export interface PDFGenerationOptions {
  templateName: 'standard' | 'insurance' | 'client';
  outputPath?: string;
  includePhotos?: boolean;
  includeCostBreakdown?: boolean;
  includeCompliance?: boolean;
  includeSignature?: boolean;
  watermark?: string;
  headerText?: string;
  footerText?: string;
}

export interface ReportData {
  // Report Header
  reportNumber: string;
  reportDate: Date;
  inspectionDate: Date;
  inspectorName: string;
  inspectorCertifications: string[];

  // Property Information
  property: {
    address: string;
    city: string;
    state: string;
    postcode: string;
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL';
  };

  // Client Information
  client: {
    name: string;
    email?: string;
    phone?: string;
    insuranceProvider?: string;
    claimNumber?: string;
  };

  // Damage Assessment
  damage: {
    type: string;
    category?: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'SEVERE';
    affectedArea: number; // square meters
    description: string;
  };

  // Damage Areas (room-by-room)
  damageAreas?: Array<{
    roomName: string;
    damageType: string;
    severity: string;
    affectedArea: number;
    moistureReadings?: Array<{
      location: string;
      reading: number;
      timestamp: Date;
    }>;
    notes?: string;
  }>;

  // Photos
  photos?: Array<{
    url: string;
    caption: string;
    timestamp?: Date;
    location?: string;
  }>;

  // Cost Estimate
  costEstimate?: CostEstimate;

  // Compliance
  compliance?: {
    jurisdictionRules: Array<{
      ruleId: string;
      description: string;
      status: 'COMPLIANT' | 'NON_COMPLIANT' | 'NOT_APPLICABLE';
      notes?: string;
    }>;
    iicrcStandards: Array<{
      standardId: string;
      title: string;
      applicable: boolean;
      sections?: string[];
    }>;
  };

  // Recommendations
  recommendations?: Array<{
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    description: string;
    estimatedCost?: number;
  }>;

  // Signatures
  signatures?: {
    inspector?: {
      name: string;
      signature?: string; // base64 image
      date: Date;
    };
    client?: {
      name: string;
      signature?: string;
      date?: Date;
    };
  };

  // NRPG Branding
  branding?: {
    logo?: string; // base64 or URL
    companyName?: string;
    contactInfo?: string;
    website?: string;
  };
}

export interface PDFGenerationResult {
  success: boolean;
  filePath?: string;
  buffer?: Buffer;
  pageCount?: number;
  fileSize?: number;
  generationTime: number;
  error?: string;
}

// ============================================================================
// HANDLEBARS HELPERS
// ============================================================================

// Register Handlebars helpers
Handlebars.registerHelper('formatDate', (date: Date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

Handlebars.registerHelper('formatDateTime', (date: Date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
});

Handlebars.registerHelper('formatCurrency', (amount: number) => {
  if (amount === undefined || amount === null) return '$0.00';
  return `$${amount.toFixed(2)}`;
});

Handlebars.registerHelper('formatNumber', (num: number, decimals: number = 2) => {
  if (num === undefined || num === null) return '0';
  return num.toFixed(decimals);
});

Handlebars.registerHelper('uppercase', (str: string) => {
  return str ? str.toUpperCase() : '';
});

Handlebars.registerHelper('lowercase', (str: string) => {
  return str ? str.toLowerCase() : '';
});

Handlebars.registerHelper('eq', (a: any, b: any) => {
  return a === b;
});

Handlebars.registerHelper('gt', (a: number, b: number) => {
  return a > b;
});

Handlebars.registerHelper('add', (a: number, b: number) => {
  return a + b;
});

Handlebars.registerHelper('multiply', (a: number, b: number) => {
  return a * b;
});

// ============================================================================
// PDF GENERATION SERVICE
// ============================================================================

export class PDFGenerationService {
  private static browser: Browser | null = null;
  private static readonly TEMPLATE_DIR = path.join(
    process.cwd(),
    'templates',
    'inspection'
  );

  /**
   * Initialize Puppeteer browser (singleton)
   */
  private static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      AdvancedLogger.info('Initializing Puppeteer browser');

      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });

      AdvancedLogger.info('Puppeteer browser initialized');
    }

    return this.browser;
  }

  /**
   * Close Puppeteer browser
   */
  static async closeBrowser(): Promise<void> {
    if (this.browser) {
      AdvancedLogger.info('Closing Puppeteer browser');
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Load and compile Handlebars template
   */
  private static async loadTemplate(
    templateName: string
  ): Promise<HandlebarsTemplateDelegate> {
    const correlationId = AdvancedLogger.setCorrelationId();

    const templatePath = path.join(this.TEMPLATE_DIR, `${templateName}.hbs`);

    AdvancedLogger.debug('Loading template', { templatePath });

    try {
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      const template = Handlebars.compile(templateContent);

      AdvancedLogger.info('Template loaded and compiled', { templateName });

      return template;
    } catch (error: any) {
      AdvancedLogger.error('Failed to load template', error, {
        templatePath,
        templateName,
      });
      throw new Error(`Template not found: ${templateName}`);
    }
  }

  /**
   * Generate PDF from report data
   */
  static async generatePDF(
    reportData: ReportData,
    options: PDFGenerationOptions = { templateName: 'standard' }
  ): Promise<PDFGenerationResult> {
    const correlationId = AdvancedLogger.setCorrelationId();
    const startTime = Date.now();

    AdvancedLogger.info('Starting PDF generation', {
      reportNumber: reportData.reportNumber,
      templateName: options.templateName,
    });

    let page: Page | null = null;

    try {
      // Load template
      const template = await this.loadTemplate(options.templateName);

      // Prepare data with options
      const templateData = {
        ...reportData,
        includePhotos: options.includePhotos ?? true,
        includeCostBreakdown: options.includeCostBreakdown ?? true,
        includeCompliance: options.includeCompliance ?? true,
        includeSignature: options.includeSignature ?? true,
        watermark: options.watermark,
        headerText: options.headerText || 'NRPG Inspection Report',
        footerText:
          options.footerText ||
          'National Restoration Property Group - Professional Disaster Recovery',
        generatedAt: new Date(),
      };

      // Render HTML
      const html = template(templateData);

      AdvancedLogger.debug('Template rendered to HTML', {
        htmlLength: html.length,
      });

      // Launch browser and create page
      const browser = await this.getBrowser();
      page = await browser.newPage();

      // Set viewport for consistent rendering
      await page.setViewport({
        width: 1200,
        height: 1600,
        deviceScaleFactor: 2, // High quality
      });

      // Set content
      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      AdvancedLogger.debug('HTML content loaded in browser');

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 15mm;">
            <span>${options.headerText || 'NRPG Inspection Report'}</span>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 15mm;">
            <span class="pageNumber"></span> / <span class="totalPages"></span> |
            ${options.footerText || 'NRPG Professional Disaster Recovery'}
          </div>
        `,
      });

      await page.close();
      page = null;

      const generationTime = Date.now() - startTime;
      const fileSize = pdfBuffer.length;

      AdvancedLogger.info('PDF generated successfully', {
        reportNumber: reportData.reportNumber,
        fileSize,
        generationTime,
      });

      // Save to file if output path specified
      if (options.outputPath) {
        await fs.writeFile(options.outputPath, pdfBuffer);

        AdvancedLogger.info('PDF saved to file', {
          outputPath: options.outputPath,
        });

        return {
          success: true,
          filePath: options.outputPath,
          buffer: pdfBuffer,
          fileSize,
          generationTime,
        };
      }

      return {
        success: true,
        buffer: pdfBuffer,
        fileSize,
        generationTime,
      };
    } catch (error: any) {
      const generationTime = Date.now() - startTime;

      AdvancedLogger.error('PDF generation failed', error, {
        reportNumber: reportData.reportNumber,
        templateName: options.templateName,
        generationTime,
      });

      if (page) {
        await page.close();
      }

      return {
        success: false,
        generationTime,
        error: error.message,
      };
    }
  }

  /**
   * Generate PDF and return as base64 string
   */
  static async generatePDFBase64(
    reportData: ReportData,
    options: PDFGenerationOptions = { templateName: 'standard' }
  ): Promise<{ success: boolean; base64?: string; error?: string }> {
    const result = await this.generatePDF(reportData, options);

    if (!result.success || !result.buffer) {
      return {
        success: false,
        error: result.error,
      };
    }

    const base64 = result.buffer.toString('base64');

    return {
      success: true,
      base64,
    };
  }

  /**
   * Generate multiple PDFs in batch
   */
  static async generateBatchPDFs(
    reports: Array<{ data: ReportData; options?: PDFGenerationOptions }>,
    outputDir?: string
  ): Promise<PDFGenerationResult[]> {
    const correlationId = AdvancedLogger.setCorrelationId();

    AdvancedLogger.info('Starting batch PDF generation', {
      count: reports.length,
      outputDir,
    });

    const results: PDFGenerationResult[] = [];

    for (let i = 0; i < reports.length; i++) {
      const { data, options } = reports[i];

      const pdfOptions: PDFGenerationOptions = {
        ...options,
        templateName: options?.templateName || 'standard',
        outputPath: outputDir
          ? path.join(outputDir, `${data.reportNumber}.pdf`)
          : undefined,
      };

      const result = await this.generatePDF(data, pdfOptions);
      results.push(result);

      AdvancedLogger.info(`Batch PDF ${i + 1}/${reports.length} generated`, {
        reportNumber: data.reportNumber,
        success: result.success,
      });
    }

    AdvancedLogger.info('Batch PDF generation completed', {
      total: reports.length,
      successful: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
    });

    return results;
  }

  /**
   * Validate report data before PDF generation
   */
  static validateReportData(reportData: ReportData): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Required fields
    if (!reportData.reportNumber) {
      errors.push('Report number is required');
    }

    if (!reportData.reportDate) {
      errors.push('Report date is required');
    }

    if (!reportData.inspectionDate) {
      errors.push('Inspection date is required');
    }

    if (!reportData.inspectorName) {
      errors.push('Inspector name is required');
    }

    if (!reportData.property?.address) {
      errors.push('Property address is required');
    }

    if (!reportData.client?.name) {
      errors.push('Client name is required');
    }

    if (!reportData.damage?.type) {
      errors.push('Damage type is required');
    }

    // Validation warnings
    if (reportData.photos && reportData.photos.length === 0) {
      errors.push('Warning: No photos included in report');
    }

    if (!reportData.costEstimate) {
      errors.push('Warning: No cost estimate included in report');
    }

    if (errors.length > 0) {
      AdvancedLogger.warn('Report data validation found issues', {
        reportNumber: reportData.reportNumber,
        errorCount: errors.length,
        errors,
      });
    }

    return {
      valid: errors.filter((e) => !e.startsWith('Warning')).length === 0,
      errors,
    };
  }

  /**
   * Get estimated PDF size before generation
   */
  static estimatePDFSize(reportData: ReportData): {
    estimatedSizeKB: number;
    pageCount: number;
  } {
    let pageCount = 1; // Cover page
    let estimatedSizeKB = 50; // Base size

    // Photos
    if (reportData.photos && reportData.photos.length > 0) {
      pageCount += Math.ceil(reportData.photos.length / 4); // 4 photos per page
      estimatedSizeKB += reportData.photos.length * 100; // ~100KB per photo
    }

    // Damage areas
    if (reportData.damageAreas && reportData.damageAreas.length > 0) {
      pageCount += Math.ceil(reportData.damageAreas.length / 3);
      estimatedSizeKB += reportData.damageAreas.length * 10;
    }

    // Cost estimate
    if (reportData.costEstimate) {
      pageCount += 1;
      estimatedSizeKB += 30;
    }

    // Compliance
    if (reportData.compliance) {
      pageCount += 1;
      estimatedSizeKB += 20;
    }

    return {
      estimatedSizeKB,
      pageCount,
    };
  }
}
