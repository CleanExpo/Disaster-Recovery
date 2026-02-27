import { Metadata } from 'next';
import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Our Services | Disaster Recovery',
  description:
    'Comprehensive disaster recovery services across Australia including water damage restoration, fire damage restoration, flood recovery, storm damage repair, mould remediation, structural drying, biohazard cleaning, sewage cleanup, trauma cleanup, emergency response and commercial services.',
};

/* -------------------------------------------------------------------------- */
/* Service link card style                                                     */
/* -------------------------------------------------------------------------- */

const cardStyle: React.CSSProperties = {
  display: 'block',
  padding: '1.25rem',
  background: 'var(--ag-surface-white, white)',
  borderRadius: '0.75rem',
  textDecoration: 'none',
  border: '1px solid rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.2s, transform 0.2s',
};

const cardTitleStyle: React.CSSProperties = {
  display: 'block',
  fontWeight: 600,
  fontSize: '1rem',
  color: 'var(--ag-primary-blue, #0052CC)',
  marginBottom: '0.35rem',
};

const cardDescStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.875rem',
  color: 'var(--ag-text-muted, #5C6A79)',
  lineHeight: 1.5,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1rem',
};

/* -------------------------------------------------------------------------- */
/* Service data                                                                */
/* -------------------------------------------------------------------------- */

interface ServiceLink {
  title: string;
  href: string;
  description: string;
}

const coreRestorationServices: ServiceLink[] = [
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage-restoration',
    description: '24/7 emergency water extraction, drying and full restoration for homes and businesses.',
  },
  {
    title: 'Fire Damage Restoration',
    href: '/services/fire-damage-restoration',
    description: 'Complete fire, smoke and soot damage restoration including structural repairs.',
  },
  {
    title: 'Flood Damage Restoration',
    href: '/services/flood-damage-restoration',
    description: 'Rapid flood recovery services from extraction through to rebuild and contents restoration.',
  },
  {
    title: 'Storm Damage Restoration',
    href: '/services/storm-damage-restoration',
    description: 'Emergency storm damage repair including roof tarping, debris removal and structural drying.',
  },
  {
    title: 'Mould Remediation',
    href: '/services/mould-remediation',
    description: 'IICRC-certified mould identification, containment, removal and prevention services.',
  },
  {
    title: 'Structural Drying',
    href: '/services/structural-drying',
    description: 'Advanced psychrometric drying systems for walls, floors, ceilings and subfloors.',
  },
];

const specialistServices: ServiceLink[] = [
  {
    title: 'Biohazard Cleaning',
    href: '/services/biohazard-cleaning',
    description: 'Certified biohazard remediation for blood, bodily fluids, infectious materials and sharps.',
  },
  {
    title: 'Sewage Cleanup',
    href: '/services/sewage-cleanup',
    description: 'Category 3 black water and sewage overflow cleanup, decontamination and sanitisation.',
  },
  {
    title: 'Trauma Cleanup',
    href: '/services/trauma-cleanup',
    description: 'Compassionate and discreet trauma scene, unattended death and crime scene cleaning.',
  },
  {
    title: 'Meth Lab Decontamination',
    href: '/services/meth-lab-decontamination',
    description: 'Certified clandestine drug lab testing, decontamination and clearance to Australian standards.',
  },
  {
    title: 'Laser Cleaning',
    href: '/services/laser-cleaning',
    description: 'Non-invasive laser ablation technology for precision surface cleaning and restoration.',
  },
];

const emergencyCommercialServices: ServiceLink[] = [
  {
    title: 'Emergency Response',
    href: '/services/emergency-response',
    description: '24/7 rapid emergency response with guaranteed fast arrival times Australia-wide.',
  },
  {
    title: 'Commercial Services',
    href: '/services/commercial-services',
    description: 'Large-scale commercial and industrial disaster recovery for offices, retail, warehouses and facilities.',
  },
];

const weatherEventServices: ServiceLink[] = [
  {
    title: 'Bushfire Damage Restoration',
    href: '/services/bushfire-damage-restoration',
    description: 'Specialist bushfire damage assessment, smoke remediation and full property restoration.',
  },
  {
    title: 'Cyclone Damage Restoration',
    href: '/services/cyclone-damage-restoration',
    description: 'Cyclone and severe weather event recovery including structural repair and water extraction.',
  },
];

const assessmentServices: ServiceLink[] = [
  {
    title: 'Technical Assessment',
    href: '/services/technical-assessment',
    description: 'Comprehensive damage assessment using thermal imaging, moisture mapping and forensic diagnostics.',
  },
  {
    title: 'Indoor Environmental Professional',
    href: '/services/indoor-environmental-professional',
    description: 'Independent indoor air quality testing, mould assessment and environmental reporting.',
  },
];

const specialtyServices: ServiceLink[] = [
  {
    title: 'Specialty Restoration Services',
    href: '/services/specialty-services',
    description: 'Specialist recovery for documents, electronics, artwork, antiques, pianos and other valuable items.',
  },
  {
    title: 'Location-Specific Services',
    href: '/services/location-specific',
    description: 'Restoration services tailored to specific Queensland locations and their unique risk profiles.',
  },
];

const relatedSections: ServiceLink[] = [
  {
    title: 'By Industry',
    href: '/industries',
    description: 'Disaster recovery tailored to your industry — agriculture, healthcare, education, mining, and more.',
  },
  {
    title: 'By Property Type',
    href: '/property-types',
    description: 'Services for every property type from residential homes to high-rise commercial towers.',
  },
  {
    title: 'By Disaster Type',
    href: '/disasters',
    description: 'Bushfire, cyclone, flood, storm and coastal erosion response across Australia.',
  },
  {
    title: 'Compare Options',
    href: '/compare',
    description: 'Side-by-side comparisons to help you choose the right restoration approach.',
  },
];

/* -------------------------------------------------------------------------- */
/* Helper to render a grid of service link cards                               */
/* -------------------------------------------------------------------------- */

function ServiceGrid({ services }: { services: ServiceLink[] }) {
  return (
    <div style={gridStyle}>
      {services.map((service) => (
        <Link key={service.href} href={service.href} style={cardStyle}>
          <span style={cardTitleStyle}>{service.title}</span>
          <span style={cardDescStyle}>{service.description}</span>
        </Link>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function UltraModernServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Wrench className="h-12 w-12" />,
        title: 'Our Services',
        subtitle:
          'Professional disaster recovery and restoration services available 24/7 across Australia. From emergency water extraction to specialist biohazard remediation, we cover every scenario.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services' },
      ]}
      sections={[
        {
          heading: 'Core Restoration Services',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Our core restoration services cover the most common disaster scenarios Australian homes and businesses face, from burst pipes and kitchen fires to severe flooding and storm damage.
              </p>
              <ServiceGrid services={coreRestorationServices} />
            </>
          ),
        },
        {
          heading: 'Specialist Services',
          background: 'light',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Certified specialist services for hazardous environments, contamination events and sensitive situations requiring expert handling and strict compliance with Australian safety standards.
              </p>
              <ServiceGrid services={specialistServices} />
            </>
          ),
        },
        {
          heading: 'Emergency & Commercial',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Round-the-clock emergency response and dedicated commercial disaster recovery for businesses of every size, from corner shops to high-rise office towers.
              </p>
              <ServiceGrid services={emergencyCommercialServices} />
            </>
          ),
        },
        {
          heading: 'Weather Event Recovery',
          background: 'light',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Specialist restoration services for major Australian weather events including bushfires, cyclones and severe storm systems affecting communities across the country.
              </p>
              <ServiceGrid services={weatherEventServices} />
            </>
          ),
        },
        {
          heading: 'Assessment & Professional Services',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Independent technical assessment and indoor environmental professional services providing detailed reporting for insurance claims, compliance and remediation planning.
              </p>
              <ServiceGrid services={assessmentServices} />
            </>
          ),
        },
        {
          heading: 'Specialty Restoration',
          background: 'light',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Expert recovery for irreplaceable and high-value items including documents, electronics, artwork, antiques, pianos and solar panels.
              </p>
              <ServiceGrid services={specialtyServices} />
            </>
          ),
        },
        {
          heading: 'Browse by Category',
          body: (
            <>
              <p style={{ color: 'var(--ag-text-muted, #5C6A79)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                Find the right disaster recovery service by industry, property type, disaster type, or compare your options.
              </p>
              <ServiceGrid services={relatedSections} />
            </>
          ),
        },
      ]}
    />
  );
}
