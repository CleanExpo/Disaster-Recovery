import { Metadata } from 'next';
import { AgPricingPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Flood Recovery Cost Melbourne | Pricing from $2,750',
  description: 'Flood Recovery pricing in Melbourne, VIC. Minimum $2,750, average $10,625. IICRC-certified, transparent pricing.',
  keywords: [
    'flood recovery cost melbourne',
    'flood-recovery pricing melbourne',
    'melbourne flood recovery price',
    'disaster recovery cost melbourne'
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/pricing/melbourne/flood-recovery' },
};

export default function MelbourneFloodRecoveryPricingPage() {
  return (
    <AgPricingPageTemplate
      cityName="Melbourne"
      stateName="VIC"
      serviceName="Flood Recovery"
      minimumCallout="$2,750"
      averageCost="$15,400"
      insuranceCoverage="95%"
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
