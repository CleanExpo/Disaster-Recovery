import { prisma } from './prisma';

export interface TenantConfig {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customCss?: string;
  industry?: string;
  isActive: boolean;
  configurations: Record<string, any>;
}

export interface TenantConfiguration {
  key: string;
  value: any;
  type: 'string' | 'boolean' | 'number' | 'json';
}

export class TenantService {
  /**
   * Get tenant by domain or subdomain
   */
  static async getTenantByDomain(domain: string): Promise<TenantConfig | null> {
    const tenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { domain: domain },
          { subdomain: domain }
        ],
        isActive: true
      },
      include: {
        configurations: true
      }
    });

    if (!tenant) return null;

    return this.formatTenantConfig(tenant);
  }

  /**
   * Get tenant by ID
   */
  static async getTenantById(tenantId: string): Promise<TenantConfig | null> {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        configurations: true
      }
    });

    if (!tenant) return null;

    return this.formatTenantConfig(tenant);
  }

  /**
   * Create a new tenant
   */
  static async createTenant(data: {
    name: string;
    domain?: string;
    subdomain?: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    customCss?: string;
    industry?: string;
    configurations?: TenantConfiguration[];
  }): Promise<TenantConfig> {
    const tenant = await prisma.tenant.create({
      data: {
        name: data.name,
        domain: data.domain,
        subdomain: data.subdomain,
        logo: data.logo,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        customCss: data.customCss,
        industry: data.industry,
        configurations: data.configurations ? {
          create: data.configurations.map(config => ({
            key: config.key,
            value: String(config.value),
            type: config.type
          }))
        } : undefined
      },
      include: {
        configurations: true
      }
    });

    return this.formatTenantConfig(tenant);
  }

  /**
   * Update tenant configuration
   */
  static async updateTenantConfig(
    tenantId: string, 
    key: string, 
    value: any, 
    type: 'string' | 'boolean' | 'number' | 'json' = 'string'
  ): Promise<void> {
    await prisma.tenantConfiguration.upsert({
      where: {
        tenantId_key: {
          tenantId,
          key
        }
      },
      update: {
        value: String(value),
        type
      },
      create: {
        tenantId,
        key,
        value: String(value),
        type
      }
    });
  }

  /**
   * Get tenant configuration value
   */
  static async getTenantConfig(tenantId: string, key: string): Promise<any> {
    const config = await prisma.tenantConfiguration.findUnique({
      where: {
        tenantId_key: {
          tenantId,
          key
        }
      }
    });

    if (!config) return null;

    // Parse value based on type
    switch (config.type) {
      case 'boolean':
        return config.value === 'true';
      case 'number':
        return Number(config.value);
      case 'json':
        return JSON.parse(config.value);
      default:
        return config.value;
    }
  }

  /**
   * Get all tenant configurations
   */
  static async getAllTenantConfigs(tenantId: string): Promise<Record<string, any>> {
    const configs = await prisma.tenantConfiguration.findMany({
      where: { tenantId }
    });

    const result: Record<string, any> = {};
    configs.forEach(config => {
      switch (config.type) {
        case 'boolean':
          result[config.key] = config.value === 'true';
          break;
        case 'number':
          result[config.key] = Number(config.value);
          break;
        case 'json':
          result[config.key] = JSON.parse(config.value);
          break;
        default:
          result[config.key] = config.value;
      }
    });

    return result;
  }

  /**
   * Format tenant data with configurations
   */
  private static formatTenantConfig(tenant: any): TenantConfig {
    const configurations: Record<string, any> = {};
    
    tenant.configurations.forEach((config: any) => {
      switch (config.type) {
        case 'boolean':
          configurations[config.key] = config.value === 'true';
          break;
        case 'number':
          configurations[config.key] = Number(config.value);
          break;
        case 'json':
          configurations[config.key] = JSON.parse(config.value);
          break;
        default:
          configurations[config.key] = config.value;
      }
    });

    return {
      id: tenant.id,
      name: tenant.name,
      domain: tenant.domain,
      subdomain: tenant.subdomain,
      logo: tenant.logo,
      primaryColor: tenant.primaryColor,
      secondaryColor: tenant.secondaryColor,
      customCss: tenant.customCss,
      industry: tenant.industry,
      isActive: tenant.isActive,
      configurations
    };
  }

  /**
   * Get default tenant configurations for different industries
   */
  static getDefaultIndustryConfigs(industry: string): TenantConfiguration[] {
    const configs: Record<string, TenantConfiguration[]> = {
      'restoration': [
        { key: 'serviceCategories', value: ['Water Damage', 'Fire Damage', 'Mold Remediation', 'Storm Damage'], type: 'json' },
        { key: 'urgencyLevels', value: ['Emergency', 'Urgent', 'Standard', 'Planned'], type: 'json' },
        { key: 'defaultCurrency', value: 'AUD', type: 'string' },
        { key: 'enableInsurance', value: true, type: 'boolean' },
        { key: 'enableLeadScoring', value: true, type: 'boolean' }
      ],
      'insurance': [
        { key: 'serviceCategories', value: ['Claims Processing', 'Policy Review', 'Risk Assessment', 'Settlement'], type: 'json' },
        { key: 'urgencyLevels', value: ['Critical', 'High', 'Medium', 'Low'], type: 'json' },
        { key: 'defaultCurrency', value: 'AUD', type: 'string' },
        { key: 'enableInsurance', value: true, type: 'boolean' },
        { key: 'enableLeadScoring', value: false, type: 'boolean' }
      ],
      'healthcare': [
        { key: 'serviceCategories', value: ['General Practice', 'Specialist', 'Emergency', 'Telehealth'], type: 'json' },
        { key: 'urgencyLevels', value: ['Emergency', 'Urgent', 'Same Day', 'Routine'], type: 'json' },
        { key: 'defaultCurrency', value: 'AUD', type: 'string' },
        { key: 'enableInsurance', value: true, type: 'boolean' },
        { key: 'enableLeadScoring', value: false, type: 'boolean' }
      ],
      'legal': [
        { key: 'serviceCategories', value: ['Consultation', 'Document Review', 'Court Representation', 'Mediation'], type: 'json' },
        { key: 'urgencyLevels', value: ['Emergency', 'Urgent', 'Standard', 'Routine'], type: 'json' },
        { key: 'defaultCurrency', value: 'AUD', type: 'string' },
        { key: 'enableInsurance', value: false, type: 'boolean' },
        { key: 'enableLeadScoring', value: true, type: 'boolean' }
      ]
    };

    return configs[industry] || configs['restoration'];
  }
}
