import { Metadata } from 'next';
import { AgPricingPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Fire & Smoke Damage Cost Perth | Pricing from $2,530 | Free Quote',
  description: 'Fire & Smoke Damage pricing in Perth, WA. Minimum $2,530, average $13,800. IICRC-certified, transparent pricing.',
  keywords: [
    'fire & smoke damage cost perth',
    'fire-damage pricing perth',
    'perth fire & smoke damage price',
    'disaster recovery cost perth'
  ]
};

export default function PerthFireSmokeDamagePricingPage() {
  return (
    <AgPricingPageTemplate
      cityName="Perth"
      stateName="WA"
      serviceName="Fire & Smoke Damage"
      minimumCallout="$2,530"
      averageCost="$13,200"
      insuranceCoverage="100%"
      priceRanges={[
        {
                "type": "Minor Damage",
                "range": "$2,420 - $7,920",
                "description": "Single room, minimal damage"
        },
        {
                "type": "Moderate Damage",
                "range": "$7,920 - $13,200",
                "description": "Multiple rooms, standard restoration"
        },
        {
                "type": "Major Damage",
                "range": "$13,200 - $23,760",
                "description": "Whole floor affected"
        },
        {
                "type": "Severe Damage",
                "range": "$23,760 - $33,000+",
                "description": "Structural damage, complete restoration"
        }
]}
      pricingFactors={[
        {
                "factor": "Property Size",
                "impact": "20-30%",
                "example": "Larger properties require more equipment and time"
        },
        {
                "factor": "Damage Severity",
                "impact": "30-50%",
                "example": "Category 3 water costs more than Category 1"
        },
        {
                "factor": "Response Time",
                "impact": "10-20%",
                "example": "Emergency after-hours response adds surcharge"
        },
        {
                "factor": "Materials Affected",
                "impact": "15-25%",
                "example": "Hardwood restoration costs more than carpet"
        },
        {
                "factor": "Secondary Damage",
                "impact": "20-40%",
                "example": "Mould growth increases total cost"
        }
]}
    />
  );
}
