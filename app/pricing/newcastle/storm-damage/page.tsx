import { Metadata } from 'next';
import { AgPricingPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Storm Damage Repair Cost Newcastle | Pricing from $2,310 | Free Quote',
  description: 'Storm Damage Repair pricing in Newcastle, NSW. Minimum $2,310, average $6,825. IICRC-certified, transparent pricing.',
  keywords: [
    'storm damage repair cost newcastle',
    'storm-damage pricing newcastle',
    'newcastle storm damage repair price',
    'disaster recovery cost newcastle'
  ]
};

export default function NewcastleStormDamageRepairPricingPage() {
  return (
    <AgPricingPageTemplate
      cityName="Newcastle"
      stateName="NSW"
      serviceName="Storm Damage"
      minimumCallout="$2,310"
      averageCost="$11,000"
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
