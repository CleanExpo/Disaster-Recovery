'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Clock, Shield, AlertTriangle, CheckCircle2, MapPin, Star } from 'lucide-react';
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo';
import { easyWinKeywords, generateContentStructure } from '@/lib/seo-keyword-strategy';
import { australianCities, regionalCities, generateLocalFAQs } from '@/lib/dynamic-content-generator';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

interface DynamicPageProps {
  params: {
    slug: string[];
  };
}

export default function DynamicSEOPage({ params }: DynamicPageProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [pageContent, setPageContent] = useState<any>(null);
  
  useEffect(() => {
    generatePageContent();
  }, [params.slug]);
  
  const generatePageContent = () => {
    const slugPath = params.slug.join('/');
    
    // Parse the URL structure
    const urlPatterns = {
      // Pattern: /emergency/[problem]/[location]
      emergency: /^emergency\/(.*?)\/(.*?)$/,
      // Pattern: /cost/[service]/[location]
      cost: /^cost\/(.*?)\/(.*?)$/,
      // Pattern: /[location]/[service]/[modifier]
      location: /^([\w-]+)\/([\w-]+)(?:\/([\w-]+))?$/,
      // Pattern: /how-to/[problem]
      howTo: /^how-to\/(.*?)$/,
      // Pattern: /vs/[option1]-vs-[option2]
      comparison: /^vs\/(.*?)-vs-(.*?)$/,
      // Pattern: /insurance/[claim-type]
      insurance: /^insurance\/(.*?)$/
    };
    
    let content = null;
    
    // Check URL patterns and generate appropriate content
    if (urlPatterns.emergency.test(slugPath)) {
      content = generateEmergencyContent(slugPath);
    } else if (urlPatterns.cost.test(slugPath)) {
      content = generateCostContent(slugPath);
    } else if (urlPatterns.howTo.test(slugPath)) {
      content = generateHowToContent(slugPath);
    } else if (urlPatterns.comparison.test(slugPath)) {
      content = generateComparisonContent(slugPath);
    } else if (urlPatterns.insurance.test(slugPath)) {
      content = generateInsuranceContent(slugPath);
    } else if (urlPatterns.location.test(slugPath)) {
      content = generateLocationServiceContent(slugPath);
    } else {
      // Try to match specific keyword opportunities
      content = generateKeywordTargetedContent(slugPath);
    }
    
    if (!content) {
      notFound();
    }
    
    setPageContent(content);
  };
  
  const generateEmergencyContent = (slug: string) => {
    const matches = slug.match(/^emergency\/(.*?)\/(.*?)$/);
    if (!matches) return null;
    
    const [, problem, location] = matches;
    const formattedProblem = problem.replace(/-/g, ' ');
    const formattedLocation = location.replace(/-/g, ' ');
    
    return {
      title: `Emergency ${formattedProblem} Services in ${formattedLocation}`,
      metaDescription: `24/7 emergency ${formattedProblem} response in ${formattedLocation}. Immediate help available. Insurance approved. Call 1300 814 870 now.`,
      h1: `Emergency ${formattedProblem} in ${formattedLocation}`,
      content: {
        intro: `Experiencing ${formattedProblem} in ${formattedLocation}? Our emergency response team is available 24/7 with average arrival times of 30-60 minutes. Don't let ${formattedProblem} cause further damage to your property.`,
        urgency: `${formattedProblem} requires immediate professional attention to prevent secondary damage, health risks, and increased restoration costs. Every minute counts when dealing with ${formattedProblem}.`,
        services: [
          'Immediate emergency response 24/7',
          'Water extraction and structural drying',
          'Mould prevention treatments',
          'Insurance claim documentation',
          'Complete restoration services'
        ],
        process: [
          { step: 'Emergency Call', time: 'Immediate', description: 'Call our 24/7 hotline for instant response' },
          { step: 'Rapid Dispatch', time: '5 minutes', description: `${formattedLocation} team mobilized immediately` },
          { step: 'On-Site Arrival', time: '30-60 minutes', description: 'Professional team arrives with equipment' },
          { step: 'Emergency Mitigation', time: '1-2 hours', description: 'Stop damage and begin extraction' },
          { step: 'Full Restoration', time: '3-7 days', description: 'Complete property restoration' }
        ],
        faqs: [
          {
            question: `How quickly can you respond to ${formattedProblem} in ${formattedLocation}?`,
            answer: `Our emergency teams in ${formattedLocation} typically arrive within 30-60 minutes for ${formattedProblem} situations. We have crews stationed throughout the area for rapid response.`
          },
          {
            question: `What should I do while waiting for help with ${formattedProblem}?`,
            answer: `For ${formattedProblem}: Turn off water/electricity if safe, move valuables away from affected areas, take photos for insurance, and avoid entering contaminated areas.`
          },
          {
            question: `Is emergency ${formattedProblem} service covered by insurance?`,
            answer: `Most insurance policies cover sudden ${formattedProblem} damage. We work directly with all major insurers and can manage your claim from start to finish.`
          }
        ]
      },
      cta: {
        primary: 'Call Emergency Line Now',
        secondary: 'Request Immediate Help'
      },
      schema: 'EmergencyService'
    };
  };
  
  const generateCostContent = (slug: string) => {
    const matches = slug.match(/^cost\/(.*?)\/(.*?)$/);
    if (!matches) return null;
    
    const [, service, location] = matches;
    const formattedService = service.replace(/-/g, ' ');
    const formattedLocation = location.replace(/-/g, ' ');
    
    return {
      title: `${formattedService} Cost in ${formattedLocation} | Price Guide 2024`,
      metaDescription: `${formattedService} cost in ${formattedLocation}: $2,000-$15,000 average. Free quotes, insurance coverage available. Detailed pricing guide and factors.`,
      h1: `${formattedService} Cost in ${formattedLocation}`,
      content: {
        intro: `Understanding ${formattedService} costs in ${formattedLocation} helps you budget for restoration and work with insurance. Prices vary based on damage extent, property size, and required services.`,
        priceRanges: [
          { category: 'Minor Damage', range: '$1,500 - $3,500', description: 'Single room, minimal structural impact' },
          { category: 'Moderate Damage', range: '$3,500 - $8,000', description: 'Multiple rooms, some structural work' },
          { category: 'Major Damage', range: '$8,000 - $15,000', description: 'Extensive damage, significant restoration' },
          { category: 'Severe Damage', range: '$15,000+', description: 'Whole property, major reconstruction' }
        ],
        factors: [
          'Size of affected area (square meters)',
          'Type and extent of damage',
          'Materials affected (carpet, hardwood, drywall)',
          'Need for mould remediation',
          'Structural repairs required',
          'Contents restoration needs',
          'Emergency service timing',
          'Insurance coverage and excess'
        ],
        savings: [
          'Quick response reduces overall costs',
          'Insurance direct billing available',
          'Free assessments and quotes',
          'Price match guarantee',
          'Payment plans available'
        ],
        faqs: [
          {
            question: `What's the average ${formattedService} cost in ${formattedLocation}?`,
            answer: `Average ${formattedService} costs in ${formattedLocation} range from $3,000-$7,000 for typical residential properties. Commercial properties may cost more due to size and complexity.`
          },
          {
            question: `Does insurance cover ${formattedService} costs?`,
            answer: `Most insurance policies cover ${formattedService} when caused by sudden, accidental events. We handle direct insurance billing to minimize your out-of-pocket expenses.`
          },
          {
            question: 'How can I reduce restoration costs?',
            answer: 'Fast action is key - calling immediately prevents secondary damage. We also offer price matching, insurance claim assistance, and flexible payment options.'
          }
        ]
      },
      cta: {
        primary: 'Get Free Quote Now',
        secondary: 'Check Insurance Coverage'
      },
      schema: 'PriceSpecification'
    };
  };
  
  const generateHowToContent = (slug: string) => {
    const matches = slug.match(/^how-to\/(.*?)$/);
    if (!matches) return null;
    
    const [, topic] = matches;
    const formattedTopic = topic.replace(/-/g, ' ');
    
    return {
      title: `How to ${formattedTopic} | Expert Guide & Professional Help`,
      metaDescription: `Complete guide on how to ${formattedTopic}. Step-by-step instructions, when to call professionals, and expert tips. Free consultation available.`,
      h1: `How to ${formattedTopic}`,
      content: {
        intro: `Learning how to properly handle ${formattedTopic} can save time, money, and prevent further damage. While some steps can be taken immediately, professional help is often essential for complete resolution.`,
        steps: [
          { 
            step: 1, 
            title: 'Assess the Situation', 
            description: 'Evaluate the extent of damage and safety risks',
            warning: 'Never enter areas with electrical hazards or structural damage'
          },
          {
            step: 2,
            title: 'Stop the Source',
            description: 'Turn off water, contain leaks, or address the root cause',
            warning: 'Call professionals if you cannot safely stop the source'
          },
          {
            step: 3,
            title: 'Document Everything',
            description: 'Take photos and videos for insurance claims',
            warning: 'Document before beginning any cleanup'
          },
          {
            step: 4,
            title: 'Initial Mitigation',
            description: 'Remove water, ventilate area, protect belongings',
            warning: 'Wear protective equipment and avoid contaminated water'
          },
          {
            step: 5,
            title: 'Professional Assessment',
            description: 'Get expert evaluation for hidden damage',
            warning: 'DIY attempts may void insurance coverage'
          }
        ],
        whenToCallProfessionals: [
          'Water damage exceeds 20 square meters',
          'Category 2 or 3 water (grey/black water)',
          'Mould growth is visible',
          'Structural damage is present',
          'Electrical systems are affected',
          'Insurance claim will be filed',
          'Health symptoms develop'
        ],
        risks: [
          'Hidden moisture leading to mould',
          'Structural weakening',
          'Electrical hazards',
          'Health risks from contamination',
          'Insurance claim denial',
          'Increased long-term costs'
        ],
        faqs: [
          {
            question: `Can I handle ${formattedTopic} myself?`,
            answer: `Minor ${formattedTopic} issues might be manageable, but professional help ensures proper resolution, prevents hidden damage, and maintains insurance coverage.`
          },
          {
            question: `What equipment is needed for ${formattedTopic}?`,
            answer: `Professional ${formattedTopic} requires specialized equipment like industrial dehumidifiers, air movers, moisture meters, and HEPA filtration that aren't available to consumers.`
          },
          {
            question: 'When is professional help essential?',
            answer: 'Professional help is essential for large areas, contaminated water, mould presence, structural damage, or when filing insurance claims.'
          }
        ]
      },
      cta: {
        primary: 'Get Professional Help',
        secondary: 'Free DIY Consultation'
      },
      schema: 'HowTo'
    };
  };
  
  const generateComparisonContent = (slug: string) => {
    const matches = slug.match(/^vs\/(.*?)$/);
    if (!matches) return null;
    
    const [, comparison] = matches;
    const [option1, option2] = comparison.split('-vs-');
    const formattedOption1 = option1.replace(/-/g, ' ');
    const formattedOption2 = option2.replace(/-/g, ' ');
    
    return {
      title: `${formattedOption1} vs ${formattedOption2} | Expert Comparison Guide`,
      metaDescription: `Comparing ${formattedOption1} vs ${formattedOption2} for restoration. Costs, effectiveness, timeframes, and expert recommendations. Make the right choice.`,
      h1: `${formattedOption1} vs ${formattedOption2}: Complete Comparison`,
      content: {
        intro: `Choosing between ${formattedOption1} and ${formattedOption2} requires understanding the pros, cons, costs, and long-term implications of each approach.`,
        comparisonTable: [
          { 
            factor: 'Cost', 
            option1: 'Variable based on extent', 
            option2: 'Generally predictable',
            winner: 'Depends on situation'
          },
          {
            factor: 'Timeframe',
            option1: '3-7 days typical',
            option2: '1-3 days typical',
            winner: formattedOption2
          },
          {
            factor: 'Effectiveness',
            option1: '95-99% success rate',
            option2: '80-90% success rate',
            winner: formattedOption1
          },
          {
            factor: 'Insurance Coverage',
            option1: 'Usually covered',
            option2: 'Varies by policy',
            winner: formattedOption1
          },
          {
            factor: 'Long-term Results',
            option1: 'Permanent solution',
            option2: 'May need follow-up',
            winner: formattedOption1
          }
        ],
        option1Benefits: [
          'Professional expertise and equipment',
          'Insurance coverage typically available',
          'Guaranteed results with warranty',
          'Addresses hidden damage',
          'Prevents secondary issues'
        ],
        option2Benefits: [
          'Lower upfront cost',
          'Immediate action possible',
          'No scheduling required',
          'Maintains control',
          'Learning experience'
        ],
        recommendations: {
          choose1When: [
            'Damage exceeds small area',
            'Insurance claim will be filed',
            'Health risks are present',
            'Professional certification needed',
            'Hidden damage suspected'
          ],
          choose2When: [
            'Very minor damage only',
            'Immediate temporary fix needed',
            'Budget is extremely limited',
            'Experience and tools available',
            'No insurance involvement'
          ]
        },
        faqs: [
          {
            question: `Is ${formattedOption1} worth the extra cost over ${formattedOption2}?`,
            answer: `${formattedOption1} typically provides better long-term value through proper resolution, insurance coverage, and prevention of future issues.`
          },
          {
            question: 'Can I start with one option and switch?',
            answer: `You can start with ${formattedOption2} for immediate mitigation, but delaying ${formattedOption1} may increase overall costs and reduce effectiveness.`
          },
          {
            question: 'What do insurance companies prefer?',
            answer: `Insurance companies typically prefer ${formattedOption1} as it ensures proper documentation, prevents fraud, and reduces likelihood of future claims.`
          }
        ]
      },
      cta: {
        primary: 'Get Professional Quote',
        secondary: 'Discuss Your Options'
      },
      schema: 'Comparison'
    };
  };
  
  const generateInsuranceContent = (slug: string) => {
    const matches = slug.match(/^insurance\/(.*?)$/);
    if (!matches) return null;
    
    const [, claimType] = matches;
    const formattedClaimType = claimType.replace(/-/g, ' ');
    
    return {
      title: `${formattedClaimType} Insurance Claims | Complete Guide & Help`,
      metaDescription: `${formattedClaimType} insurance claim guide. What's covered, claim process, documentation needed, and professional help. Maximize your claim success.`,
      h1: `${formattedClaimType} Insurance Claims Guide`,
      content: {
        intro: `Understanding ${formattedClaimType} insurance claims helps maximize coverage and streamline the process. We work directly with all major Australian insurers to ensure successful claims.`,
        coverage: {
          typicallyCovered: [
            'Sudden and accidental damage',
            'Storm and weather events',
            'Burst pipes and plumbing failures',
            'Fire and smoke damage',
            'Vandalism and malicious damage'
          ],
          notCovered: [
            'Gradual damage or wear',
            'Lack of maintenance',
            'Intentional damage',
            'Flood (without specific coverage)',
            'Rising damp'
          ]
        },
        claimProcess: [
          { step: 1, action: 'Report damage immediately', tip: 'Most policies require notification within 48 hours' },
          { step: 2, action: 'Document everything', tip: 'Photos, videos, and written descriptions' },
          { step: 3, action: 'Prevent further damage', tip: 'Mitigation is required by policy' },
          { step: 4, action: 'Get professional assessment', tip: 'We provide insurance-approved reports' },
          { step: 5, action: 'Submit claim with documentation', tip: 'We handle this process for you' },
          { step: 6, action: 'Meet with assessor', tip: 'We attend to support your claim' },
          { step: 7, action: 'Approval and restoration', tip: 'Direct billing available' }
        ],
        documentation: [
          'Date and time of damage',
          'Cause of damage',
          'Photos before and after',
          'List of damaged items',
          'Professional assessment report',
          'Quotes for restoration',
          'Proof of ownership/value',
          'Previous maintenance records'
        ],
        tips: [
          'Never admit fault or negligence',
          'Don\'t throw away damaged items',
          'Keep all receipts for emergency repairs',
          'Get multiple quotes if required',
          'Understand your excess and limits',
          'Know your policy exclusions',
          'Use approved repairers when possible'
        ],
        faqs: [
          {
            question: `Will my insurance cover ${formattedClaimType}?`,
            answer: `Most policies cover sudden ${formattedClaimType}, but coverage varies. We review your policy and maximize your claim potential through proper documentation and process management.`
          },
          {
            question: 'How long does the insurance claim process take?',
            answer: 'Simple claims: 5-10 days. Complex claims: 2-4 weeks. We expedite the process through direct insurer relationships and proper documentation.'
          },
          {
            question: 'What if my claim is denied?',
            answer: 'We help appeal denied claims by providing additional documentation, expert reports, and working with insurance ombudsman if necessary.'
          }
        ]
      },
      cta: {
        primary: 'Get Claim Assistance',
        secondary: 'Free Policy Review'
      },
      schema: 'InsuranceClaim'
    };
  };
  
  const generateLocationServiceContent = (slug: string) => {
    const matches = slug.match(/^([\w-]+)\/([\w-]+)(?:\/([\w-]+))?$/);
    if (!matches) return null;
    
    const [, location, service, modifier] = matches;
    const formattedLocation = location.replace(/-/g, ' ');
    const formattedService = service.replace(/-/g, ' ');
    const formattedModifier = modifier ? modifier.replace(/-/g, ' ') : '';
    
    // Find location data
    const allCities = [...australianCities, ...regionalCities];
    const cityData = allCities.find(city => 
      city.city.toLowerCase() === formattedLocation.toLowerCase() ||
      city.suburbs.some(suburb => suburb.toLowerCase() === formattedLocation.toLowerCase())
    );
    
    if (!cityData) return null;
    
    const isSuburb = cityData.city.toLowerCase() !== formattedLocation.toLowerCase();
    const actualCity = cityData.city;
    const displayLocation = isSuburb ? `${formattedLocation}, ${actualCity}` : formattedLocation;
    
    return {
      title: `${formattedService} ${displayLocation} ${formattedModifier} | Local Experts`,
      metaDescription: `Professional ${formattedService} in ${displayLocation}. ${formattedModifier} 24/7 local response, insurance approved. Serving all ${actualCity} areas. Call 1300 814 870.`,
      h1: `${formattedService} Services in ${displayLocation} ${formattedModifier}`,
      content: {
        intro: `Expert ${formattedService} services for ${displayLocation} residents and businesses. With our deep understanding of ${actualCity}'s ${cityData.climate} climate and local conditions, we provide tailored solutions for ${formattedService} ${formattedModifier}.`,
        localFactors: [
          `${cityData.climate} climate impacts on ${formattedService}`,
          `Common issues: ${cityData.commonIssues.slice(0, 3).join(', ')}`,
          `Serving ${cityData.population.toLocaleString()} residents in greater ${actualCity}`,
          `Near landmarks: ${cityData.landmarks.slice(0, 2).join(', ')}`,
          `Rapid response to ${cityData.suburbs.slice(0, 3).join(', ')}`
        ],
        serviceAreas: {
          primary: displayLocation,
          nearby: isSuburb ? 
            cityData.suburbs.filter(s => s !== formattedLocation).slice(0, 5) :
            cityData.suburbs.slice(0, 6),
          response: '30-60 minutes average'
        },
        whyLocal: [
          `Stationed in ${actualCity} for rapid response`,
          `Understanding of local building codes and regulations`,
          `Familiar with ${cityData.state} insurance requirements`,
          `Experience with ${cityData.climate} weather patterns`,
          `Established relationships with local suppliers`
        ],
        testimonials: [
          {
            text: `Fast response for ${formattedService} in ${displayLocation}. Professional team arrived within an hour.`,
            author: `Sarah M., ${displayLocation}`,
            rating: 5
          },
          {
            text: `Excellent ${formattedService} service. They handled everything including insurance claims.`,
            author: `John D., ${isSuburb ? actualCity : cityData.suburbs[0]}`,
            rating: 5
          },
          {
            text: `Best ${formattedService} company in ${actualCity}. Highly recommend for ${formattedModifier} situations.`,
            author: `Lisa T., ${cityData.suburbs[1]}`,
            rating: 5
          }
        ],
        faqs: generateLocalFAQs(cityData, formattedService)
      },
      cta: {
        primary: `Call ${displayLocation} Team Now`,
        secondary: 'Get Local Quote'
      },
      schema: 'LocalService'
    };
  };
  
  const generateKeywordTargetedContent = (slug: string) => {
    // Convert slug to potential keyword
    const keyword = slug.replace(/-/g, ' ');
    
    // Check if this matches any of our easy-win keywords
    const allKeywords = [
      ...easyWinKeywords.emergencySpecific,
      ...easyWinKeywords.questions,
      ...easyWinKeywords.costKeywords,
      ...easyWinKeywords.urgentKeywords,
      ...easyWinKeywords.insuranceKeywords,
      ...easyWinKeywords.comparisonKeywords,
      ...easyWinKeywords.buildingTypeKeywords,
      ...easyWinKeywords.damageSourceKeywords,
      ...easyWinKeywords.healthKeywords,
      ...easyWinKeywords.seasonalKeywords,
      ...easyWinKeywords.iepKeywords,
      ...easyWinKeywords.commercialKeywords,
      ...easyWinKeywords.voiceSearchKeywords
    ];
    
    const matchedKeyword = allKeywords.find(k => 
      k.keyword.toLowerCase() === keyword.toLowerCase()
    );
    
    if (!matchedKeyword) return null;
    
    const contentStructure = generateContentStructure(matchedKeyword.keyword);
    
    return {
      title: `${matchedKeyword.keyword} | Expert Solutions | Disaster Recovery`,
      metaDescription: `${matchedKeyword.keyword} - Professional service, insurance approved, 24/7 response. Get immediate help from certified experts. Call 1300 814 870.`,
      h1: contentStructure.h1,
      content: {
        intro: `Dealing with ${matchedKeyword.keyword}? You're not alone. This is a common issue affecting thousands of Australian property owners. Our expert team provides immediate, professional solutions.`,
        keyPoints: [
          'Certified professionals with 15+ years experience',
          'Insurance approved and direct billing available',
          '24/7 emergency response across Australia',
          'Guaranteed workmanship and results',
          'Free assessments and competitive quotes'
        ],
        sections: contentStructure.h2Tags.map((h2: string) => ({
          title: h2,
          content: generateSectionContent(h2, matchedKeyword.keyword)
        })),
        faqs: [
          {
            question: matchedKeyword.keyword.includes('?') ? matchedKeyword.keyword : `What about ${matchedKeyword.keyword}?`,
            answer: `Professional help with ${matchedKeyword.keyword} ensures proper resolution, prevents future issues, and maintains insurance coverage. Our experts handle all aspects from assessment to complete restoration.`
          },
          {
            question: `How much does ${matchedKeyword.keyword} service cost?`,
            answer: `Costs vary based on specific needs, but we offer free assessments, competitive pricing, and work with your insurance for direct billing to minimize out-of-pocket expenses.`
          },
          {
            question: `How quickly can you help with ${matchedKeyword.keyword}?`,
            answer: `We provide 24/7 emergency response with typical arrival times of 30-60 minutes for urgent situations. Same-day service available for non-emergencies.`
          }
        ],
        trustSignals: [
          'IICRC Certified Technicians',
          'Fully Licensed & Insured',
          'Insurance Preferred Provider',
          '5-Star Google Reviews',
          '24/7 Emergency Response',
          '100% Satisfaction Guarantee'
        ]
      },
      cta: {
        primary: matchedKeyword.intent === 'Transactional' ? 'Get Help Now' : 'Learn More',
        secondary: 'Free Assessment'
      },
      schema: 'Service',
      keyword: matchedKeyword
    };
  };
  
  const generateSectionContent = (sectionTitle: string, keyword: string) => {
    const templates: { [key: string]: string } = {
      'What Causes': `There are several factors that can lead to ${keyword}. Understanding these causes helps in prevention and ensures proper treatment when issues arise. Common causes include weather events, equipment failure, poor maintenance, and structural issues.`,
      'Signs You Need': `Recognizing when you need professional help for ${keyword} is crucial. Key indicators include visible damage, unusual odors, health symptoms, increased utility bills, and changes in your property's condition.`,
      'Our Process': `Our systematic approach to ${keyword} ensures thorough resolution. We begin with assessment, proceed with mitigation, perform necessary repairs, and complete with verification and documentation for your records and insurance.`,
      'Cost Guide': `Understanding costs for ${keyword} helps with budgeting and insurance claims. Prices vary based on extent, materials affected, and required services. We provide free quotes and work with insurance for direct billing.`,
      'Insurance Coverage': `Most insurance policies provide coverage for ${keyword} when it results from covered perils. We assist with documentation, meet with assessors, and ensure maximum claim approval through proper procedures.`,
      'Why Choose': `Our expertise with ${keyword} comes from 15+ years serving Australian property owners. We combine certified technicians, advanced equipment, proven processes, and excellent customer service for superior results.`,
      'FAQs': `Common questions about ${keyword} help you make informed decisions. We address concerns about timing, costs, processes, and outcomes to ensure you're comfortable with our services.`
    };
    
    const defaultTemplate = `Professional solutions for ${keyword} require expertise and proper equipment. This section covers important aspects to help you understand the process and make informed decisions.`;
    
    // Find matching template
    for (const [key, template] of Object.entries(templates)) {
      if (sectionTitle.includes(key)) {
        return template;
      }
    }
    
    return defaultTemplate;
  };
  
  if (!pageContent) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateLocalBusinessSchema({
              name: 'Disaster Recovery',
              description: pageContent.metaDescription,
              telephone: '1300 814 870',
              address: {
                streetAddress: 'Servicing All Areas',
                addressLocality: 'Brisbane',
                addressRegion: 'QLD',
                postalCode: '4000',
                addressCountry: 'AU'
              },
              url: `https://disasterrecovery.com.au/${params.slug.join('/')}`
            })
          )
        }}
      />
      {pageContent.content.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(pageContent.content.faqs))
          }}
        />
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {pageContent.keyword && pageContent.keyword.difficulty === 'Easy' && (
              <div className="inline-flex items-center gap-2 bg-green-600/30 px-4 py-2 rounded-full mb-4">
                <Star className="h-4 w-4" />
                <span className="text-sm">Top Rated Service</span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {pageContent.h1}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {pageContent.content.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowLeadForm(true)}
              >
                <Phone className="mr-2" />
                {pageContent.cta.primary}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-blue-900 hover:bg-blue-50"
              >
                {pageContent.cta.secondary}
              </Button>
            </div>
            {pageContent.keyword && (
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Service</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Insurance Approved</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>All Areas</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Display content based on page type */}
            {pageContent.content.urgency && (
              <Card className="p-6 mb-8 border-2 border-red-200 bg-red-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-red-900 mb-2">Urgent Attention Required</h2>
                    <p className="text-red-800">{pageContent.content.urgency}</p>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Process Steps */}
            {pageContent.content.process && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Our Process</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pageContent.content.process.map((step: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold">{step.step}</h3>
                          <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                          <p className="text-xs text-blue-600 font-semibold">{step.time}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Price Ranges */}
            {pageContent.content.priceRanges && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Pricing Guide</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {pageContent.content.priceRanges.map((price: any, index: number) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-bold mb-2">{price.category}</h3>
                      <p className="text-3xl font-bold text-green-600 mb-2">{price.range}</p>
                      <p className="text-gray-600">{price.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Comparison Table */}
            {pageContent.content.comparisonTable && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Detailed Comparison</h2>
                <Card className="overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left">Factor</th>
                        <th className="p-4 text-left">Option 1</th>
                        <th className="p-4 text-left">Option 2</th>
                        <th className="p-4 text-left">Winner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.content.comparisonTable.map((row: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="p-4 font-semibold">{row.factor}</td>
                          <td className="p-4">{row.option1}</td>
                          <td className="p-4">{row.option2}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                              {row.winner}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
            
            {/* How-To Steps */}
            {pageContent.content.steps && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Step-by-Step Guide</h2>
                {pageContent.content.steps.map((step: any) => (
                  <Card key={step.step} className="p-6 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        {step.warning && (
                          <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                            <p className="text-sm text-yellow-800">{step.warning}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Sections */}
            {pageContent.content.sections && (
              <div className="mb-12">
                {pageContent.content.sections.map((section: any, index: number) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    <p className="text-gray-700">{section.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Trust Signals */}
            {pageContent.content.trustSignals && (
              <div className="mb-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {pageContent.content.trustSignals.map((signal: string, index: number) => (
                    <Card key={index} className="p-4 text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-semibold">{signal}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* FAQs */}
            {pageContent.content.faqs && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {pageContent.content.faqs.map((faq: any, index: number) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait for the problem to get worse. Get professional help now with insurance-approved service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowLeadForm(true)}
            >
              <Phone className="mr-2" />
              Call 1300 814 870 Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => setShowLeadForm(true)}
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
      
      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Get Immediate Help</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowLeadForm(false)}
                className="text-2xl"
              >
                ×
              </Button>
            </div>
            <div className="p-4">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
