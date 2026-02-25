import type { ContentSection } from '@/components/antigravity';
import type { LocationData } from '../../../data/locations/_schema';
import { loadLocationData } from './data-loader';
import {
  generateIntroSection,
  generateRiskProfileSection,
  generateHistoricalEventsSection,
  generateSeasonalCalendarSection,
  generateProcessSection,
  generateCoverageSection,
  generateLocalResourcesSection,
  generateInsuranceSection,
} from './content-blocks';
import { generateLocationFAQs, type FAQEntry } from './faq-generator';

export interface LocationPageContent {
  sections: ContentSection[];
  faqs: FAQEntry[];
  data: LocationData;
}

export function getLocationPageContent(slug: string): LocationPageContent | null {
  const data = loadLocationData(slug);
  if (!data) return null;

  const faqs = generateLocationFAQs(data);

  const sections: ContentSection[] = [
    generateIntroSection(data),
    generateRiskProfileSection(data),
    generateHistoricalEventsSection(data),
    generateSeasonalCalendarSection(data),
    generateProcessSection(data),
    generateCoverageSection(data),
    generateLocalResourcesSection(data),
    generateInsuranceSection(data),
    {
      heading: `Frequently Asked Questions — ${data.city} Services`,
      body: (
        <>
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </>
      ),
    },
  ];

  return { sections, faqs, data };
}
