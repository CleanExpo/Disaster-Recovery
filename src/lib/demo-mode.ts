/**
 * DEMO MODE CONFIGURATION
 * =======================
 * Allows the site to run in demo mode without authentication
 * and provides automated demo flows for testing
 */

export const isDemoMode = () => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
};

export const DEMO_DATA = {
  contractor: {
    // Step 1: Business Information
    businessInfo: {
      companyName: 'Demo Restoration Services Pty Ltd',
      tradingName: 'Demo Restorations',
      abn: '12345678901',
      acn: '123456789',
      businessType: 'COMPANY',
      yearEstablished: 2015,
      numberOfEmployees: 25,
      annualRevenue: '$2-5M',
      website: 'https://demo-restoration.com.au',
      email: 'demo@restoration.com.au',
      phone: '0400 123 456',
      mobile: '0400 123 456',
      address: '123 Demo Street',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000'
    },
    // Step 2: Insurance & Licensing
    insurance: {
      publicLiability: {
        provider: 'Demo Insurance Co',
        policyNumber: 'PL-2024-DEMO-001',
        coverAmount: 20000000,
        expiryDate: '2025-12-31'
      },
      professionalIndemnity: {
        provider: 'Demo Insurance Co',
        policyNumber: 'PI-2024-DEMO-001',
        coverAmount: 10000000,
        expiryDate: '2025-12-31'
      },
      workersCompensation: {
        provider: 'WorkCover Queensland',
        policyNumber: 'WC-2024-DEMO-001',
        expiryDate: '2025-12-31'
      },
      licenses: [
        {
          type: 'QBCC',
          number: 'QBCC-DEMO-12345',
          expiryDate: '2025-12-31'
        },
        {
          type: 'Asbestos Removal',
          number: 'ASB-DEMO-12345',
          expiryDate: '2025-12-31'
        }
      ]
    },
    // Step 3: Experience & References
    experience: {
      yearsInBusiness: 9,
      specializations: [
        'Water Damage Restoration',
        'Fire Damage Restoration',
        'Mould Remediation',
        'Storm Damage Repairs'
      ],
      majorProjects: [
        {
          name: 'Brisbane Floods Recovery 2022',
          value: 5000000,
          description: 'Major flood restoration project covering 200+ properties'
        },
        {
          name: 'Cyclone Recovery North QLD',
          value: 3000000,
          description: 'Emergency response and restoration for cyclone damage'
        }
      ],
      references: [
        {
          name: 'John Smith',
          company: 'ABC Insurance Adjusters',
          phone: '0411 222 333',
          email: 'john@abc-adjusters.com.au'
        },
        {
          name: 'Sarah Johnson',
          company: 'XYZ Property Management',
          phone: '0422 333 444',
          email: 'sarah@xyz-property.com.au'
        }
      ]
    },
    // Step 4: Equipment & Resources
    equipment: {
      vehicles: 15,
      dryingEquipment: true,
      moistureMeters: true,
      thermalCameras: true,
      generators: true,
      extractors: true,
      airMovers: true,
      dehumidifiers: true,
      hepaFilters: true,
      team: {
        technicians: 20,
        projectManagers: 3,
        administrators: 2
      }
    },
    // Step 5: Health & Safety
    healthSafety: {
      whsPolicy: true,
      safeWorkProcedures: true,
      riskAssessments: true,
      toolboxTalks: true,
      incidentReporting: true,
      ppe: true,
      training: [
        'Working at Heights',
        'Confined Spaces',
        'Asbestos Awareness',
        'First Aid',
        'Fire Safety'
      ]
    },
    // Step 6: Banking & Payment
    banking: {
      accountName: 'Demo Restoration Services Pty Ltd',
      bsb: '123-456',
      accountNumber: '12345678',
      abn: '12345678901',
      gstRegistered: true,
      paymentTerms: '30 days',
      preferredPaymentMethod: 'EFT'
    }
  },
  client: {
    name: 'Sarah Thompson',
    email: 'sarah.demo@example.com',
    phone: '0433 555 666',
    address: '456 Client Avenue, Sydney NSW 2000',
    claimNumber: 'DEMO-2024-001234',
    insuranceCompany: 'Demo Insurance Co',
    incidentType: 'Water Damage',
    incidentDate: new Date().toISOString().split('T')[0],
    description: 'Burst pipe in upstairs bathroom caused water damage to ceiling and walls in multiple rooms.'
  }
};

/**
 * Simulate typing effect for demo mode
 */
export const simulateTyping = async (
  element: HTMLInputElement | HTMLTextAreaElement,
  text: string,
  delay: number = 58 // Increased by 15% from 50
) => {
  element.focus();
  element.value = '';
  
  for (let i = 0; i <= text.length; i++) {
    element.value = text.substring(0, i);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

/**
 * Simulate click with visual feedback
 */
export const simulateClick = async (element: HTMLElement, delay: number = 575) => { // Increased by 15% from 500
  element.classList.add('ring-4', 'ring-yellow-400', 'ring-offset-2');
  element.scrollIntoView({ behaviour: 'smooth', block: 'centre' });
  
  await new Promise(resolve => setTimeout(resolve, delay));
  element.click();
  
  setTimeout(() => {
    element.classList.remove('ring-4', 'ring-yellow-400', 'ring-offset-2');
  }, 1000);
};

/**
 * Auto-fill form with demo data
 */
export const autoFillForm = async (formData: any, delay: number = 115) => { // Increased by 15% from 100
  for (const [key, value] of Object.entries(formData)) {
    const input = document.querySelector(`[name="${key}"]`) as HTMLInputElement;
    if (input) {
      if (input.type === 'checkbox') {
        if (value && !input.checked) {
          await simulateClick(input, delay);
        }
      } else if (input.type === 'select-one') {
        input.value = value as string;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        await simulateTyping(input, value as string, 35); // Increased by 15% from 30
      }
    }
  }
};