import type { ServicePageData } from '../types';

const iconContainment = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`;
const iconMicrobe = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path><path d="M4.93 4.93l14.14 14.14"></path></svg>`;
const iconAirQuality = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 3a17 17 0 0 0 0 18"></path><path d="M12.5 3a17 17 0 0 1 0 18"></path><path d="M7 6a17 17 0 0 0 0 12"></path><path d="M17 6a17 17 0 0 1 0 12"></path><path d="M4 9a17 17 0 0 0 0 6"></path><path d="M20 9a17 17 0 0 1 0 6"></path></svg>`;

export const mouldRemediationData: ServicePageData = {
  slug: 'mould-remediation',
  breadcrumbLabel: 'Microbial Recovery',
  title: 'Mould & Microbial Remediation',
  leadText: 'Scientific, containment-based removal of toxic mould colonies. We restore indoor air quality (IAQ) to healthy, pre-condition basements using strict IICRC S520 guidelines.',
  theme: {
    headerGradient: 'linear-gradient(135deg, #062817 0%, #115E39 100%)',
    headerRadial: 'radial-gradient(circle at top right, rgba(34, 197, 94, 0.1) 0%, transparent 60%)',
    leadBorderColor: '#22c55e',
    statusColor: '#22c55e',
    pulseColor: 'rgba(34, 197, 94, 0.7)',
    techIconColor: '#15803d',
    techIconBg: '#F0FDF4',
    techIconBorder: '#DCFCE7',
  },
  introHeading: 'The Danger of Airborne Spore Amplification',
  introParagraphs: [
    'Mould is not a stain; it is a living biological organism. Wiping away visible colonies with household bleach only stresses the fungus, causing it to aggressively release thousands of microscopic mycotoxins into your HVAC system.',
    "NRPG approaches mould remediation as a biohazard operation. Our primary objective is source containment\u2014ensuring cross-contamination never occurs while we physically extract the compromised building materials from the property.",
  ],
  technicalCards: [
    {
      iconSvg: iconContainment,
      title: 'Negative Pressure Containment',
      description: 'We construct airtight microbial containment chambers utilising 6-mil poly-sheeting and zipper-doors, keeping active mould spores isolated from healthy, unaffected areas of the home.',
    },
    {
      iconSvg: iconMicrobe,
      title: 'Bio-Extraction & Sanding',
      description: 'Visible surface mould is deeply wire-brushed, sanded, or HEPA-vacuumed directly off structural timber. Any hopelessly compromised porous drywall is cut and safely discarded into sealed bio-bags.',
    },
    {
      iconSvg: iconAirQuality,
      title: 'Air Quality Scrubbing',
      description: 'Industrial HEPA scrubbers filter the air within the containment zone 4 to 6 times per hour, trapping dead micro-particulates up to 0.3 microns before they can be inhaled.',
    },
  ],
  protocolHeading: 'The IICRC S520 Remediation Standard',
  protocolSteps: [
    {
      title: 'Initial Moisture Root-Cause:',
      description: ' Mould only grows where water exists. We first utilise thermal imaging to locate and halt the source of moisture intrusion.',
    },
    {
      title: 'Pre-Remediation IAQ Testing:',
      description: ' (Optional) Engaging a third-party Indoor Environmental Professional (IEP) to baseline the aggressive spore count.',
    },
    {
      title: 'Containment & Negative Air:',
      description: ' Sealing vents and doorways, establishing negative pressure so air only flows towards our HEPA filtration exhaust.',
    },
    {
      title: 'Physical Removal & Antimicrobial Wash:',
      description: ' Discarding unsalvageable materials, followed by heavy application of botanical antimicrobial solutions.',
    },
  ],
  sidebar: {
    statusText: 'Live Response Active',
    heading: 'Deploy Mould Techs',
    description: 'Automated dispatch to the nearest available biohazard extraction fleet.',
    ctaHref: '/claim?service=mould-remediation',
    ctaText: 'Make a Claim',
    footerNote: 'Direct insurance billing available. IICRC S520 compliant reporting provided to all adjusters.',
    trustText: 'Operating strictly under IICRC S520 Standard for Professional Microbial Remediation.',
  },
};
