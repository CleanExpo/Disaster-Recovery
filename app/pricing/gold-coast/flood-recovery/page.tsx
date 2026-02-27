import { Metadata } from 'next';
import { AgPricingPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Flood Recovery Cost Gold Coast | Pricing from $2,640 | Free Quote',
  description: 'Flood Recovery pricing in Gold Coast, QLD. Minimum $2,640, average $10,200. IICRC-certified, transparent pricing.',
  keywords: [
    'flood recovery cost gold coast',
    'flood-recovery pricing gold coast',
    'gold coast flood recovery price',
    'disaster recovery cost gold coast'
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/pricing/gold-coast/flood-recovery' },
};

export default function GoldCoastFloodRecoveryPricingPage() {
  return (
    <AgPricingPageTemplate
      cityName="Gold Coast"
      stateName="QLD"
      serviceName="Flood Recovery"
      minimumCallout="$2,640"
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
