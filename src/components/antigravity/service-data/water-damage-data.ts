import type { ServicePageData } from '../types';

const iconThermometer = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`;
const iconDrop = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>`;
const iconLayers = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>`;

export const waterDamageData: ServicePageData = {
  slug: 'water-damage',
  breadcrumbLabel: 'Water & Flood',
  title: 'Emergency Flood & Water Extraction',
  leadText: 'Rapid-response mitigation for all categories of water damage. We utilise advanced thermal imaging and high-velocity structural drying to halt secondary damage and mould amplification.',
  theme: {
    headerGradient: 'linear-gradient(135deg, #051A2E 0%, #155C8F 100%)',
    headerRadial: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
    leadBorderColor: '#38BDF8',
    statusColor: '#38bdf8',
    pulseColor: 'rgba(56, 189, 248, 0.7)',
    techIconColor: '#0ea5e9',
    techIconBg: '#F0F9FF',
    techIconBorder: '#E0F2FE',
  },
  introHeading: 'Stopping the Progression of Water Damage',
  introParagraphs: [
    'Water damage behaves progressively. Within 48 hours, clean Category 1 water degrades into highly contaminated Category 3 (Black Water), accelerating structural decay and triggering severe microbial growth.',
    "NRPG's water mitigation fleet is equipped with truck-mounted extraction units and LGR (Low Grain Refrigerant) dehumidifiers designed to drastically lower the specific humidity of the affected environment, instantly halting secondary disaster progression.",
  ],
  technicalCards: [
    {
      iconSvg: iconThermometer,
      title: 'Thermal Moisture Mapping',
      description: 'We deploy infrared thermography to trace hidden water saturation behind drywall and under subfloors, quantifying the exact scope of the disaster without destructive teardowns.',
    },
    {
      iconSvg: iconDrop,
      title: 'Sub-surface Extraction',
      description: 'Using weighted extraction rovers, we can pull thousands of litres of trapped moisture directly out of carpet pads, preserving flooring that would otherwise require total replacement.',
    },
    {
      iconSvg: iconLayers,
      title: 'Targeted Structural Drying',
      description: 'By injecting high-velocity, low-humidity air directly into wall cavities and structural voids, we force rapid evaporation of deeply bound moisture.',
    },
  ],
  protocolHeading: 'The IICRC S500 Mitigation Protocol',
  protocolSteps: [
    {
      title: 'Hazard Assessment & Scoping:',
      description: ' Immediate safety containment, electrical isolation, and thermal/hygrometer mapping to define the drying chamber.',
    },
    {
      title: 'Bulk Moisture Extraction:',
      description: ' Pumping standing water and executing weighted extraction on porous materials.',
    },
    {
      title: 'Evaporation & Humidification Control:',
      description: ' Installing an engineered array of air movers and LGR/desiccant dehumidifiers to manipulate vapour pressure.',
    },
    {
      title: 'Final Antimicrobial Clearance:',
      description: ' Application of botanical, EPA-registered disinfectants to neutralise remaining pathogens and guarantee a safe environment.',
    },
  ],
  sidebar: {
    statusText: '24/7 Flood Response Active',
    heading: 'Deploy Water Techs',
    description: 'Automated dispatch to the nearest available water extraction fleet.',
    ctaHref: '/claim?service=water-damage',
    ctaText: 'Make a Claim',
    footerNote: 'Direct insurance billing available. IICRC S500 compliant reporting provided to all adjusters.',
    trustText: 'Operating strictly under IICRC S500 Standard for Professional Water Damage Restoration.',
  },
};
