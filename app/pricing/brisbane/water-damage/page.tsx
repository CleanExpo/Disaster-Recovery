import { Metadata } from 'next';
import { AgPricingPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Cost Brisbane | Pricing from $2,640 | Free Quote',
  description: 'Water Damage Restoration pricing in Brisbane, QLD. Minimum $2,640, average $6,600. IICRC-certified, transparent pricing.',
  keywords: [
    'water damage restoration cost brisbane',
    'water-damage pricing brisbane',
    'brisbane water damage restoration price',
    'disaster recovery cost brisbane'
  ]
};

export default function BrisbaneWaterDamageRestorationPricingPage() {
  return (
    <AgPricingPageTemplate
      cityName="Brisbane"
      stateName="QLD"
      serviceName="Water Damage"
      minimumCallout="$2,640"
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
