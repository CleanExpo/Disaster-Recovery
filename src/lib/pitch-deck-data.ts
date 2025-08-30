export const pitchDeckData = {
  slides: [
    {
      id: 1,
      type: 'title',
      title: 'Disaster Recovery',
      subtitle: 'Building the Industry, Not Just Business',
      background: 'gradient',
      animation: 'fadeIn',
      duration: 8000,
      narration: 'Welcome to Disaster Recovery. We are building Australia\'s first pre-vetted restoration network, transforming a 2.8 billion dollar industry dominated by corporate middlemen.',
      image: '/images/logos/disaster-recovery-logo.png',
      music: 'epic-intro'
    },
    {
      id: 2,
      type: 'problem',
      title: 'The $2.8B Problem',
      points: [
        '95% of market controlled by administration companies',
        'Small contractors forced into unfavorable terms',
        'Customers receive inconsistent service quality',
        '115,350 fragmented businesses with no unity'
      ],
      background: 'dark',
      animation: 'slideLeft',
      duration: 10000,
      narration: 'The Australian restoration industry is broken. 95% of the market is controlled by massive administration companies that aren\'t even restoration businesses. They\'re middlemen who\'ve captured the industry through volume deals with insurance companies, forcing skilled contractors into subcontractor roles with razor-thin margins.',
      chart: {
        type: 'bar',
        data: {
          labels: ['Corporate Control', 'Contractor Margins', 'Customer Complaints', 'Market Fragmentation'],
          datasets: [{
            label: 'Industry Problems (%)',
            data: [95, 15, 68, 85],
            backgroundColor: ['#ef4444', '#f97316', '#eab308', '#f87171']
          }]
        }
      }
    },
    {
      id: 3,
      type: 'market',
      title: 'Massive Market Opportunity',
      subtitle: '$41B Global Market Growing 5.7% Annually',
      background: 'chart',
      animation: 'zoom',
      duration: 12000,
      narration: 'The global disaster restoration market is worth 41 billion US dollars, growing at 5.7% annually. In Australia alone, we have a 2.8 billion dollar opportunity with 23.7 million properties at flood risk. Climate change has increased disasters by 35% since the 1990s, with 14,000 daily water emergencies globally.',
      chart: {
        type: 'pie',
        data: {
          labels: ['Untapped Digital Market', 'Traditional Players', 'Current Digital Solutions'],
          datasets: [{
            data: [75, 23, 2],
            backgroundColor: ['#3b82f6', '#6b7280', '#10b981']
          }]
        }
      },
      insights: [
        { value: '23.7M', label: 'Properties at Risk' },
        { value: '35%', label: 'Disaster Increase' },
        { value: '14,000', label: 'Daily Emergencies' }
      ]
    },
    {
      id: 4,
      type: 'solution',
      title: 'Our Revolutionary Solution',
      subtitle: 'Australia\'s First Pre-Vetted Restoration Network',
      features: [
        { 
          icon: 'Shield', 
          title: 'Pre-Vetted Network', 
          description: 'Licensed, insured, background-checked contractors' 
        },
        { 
          icon: 'Globe', 
          title: 'Territory Protection', 
          description: 'Exclusive areas without punishment for downtime' 
        },
        { 
          icon: 'Zap', 
          title: 'AI-Powered Matching', 
          description: 'Intelligent customer-contractor pairing' 
        },
        { 
          icon: 'Rocket', 
          title: 'SEO Domination', 
          description: '#1 rankings for every restoration search' 
        }
      ],
      background: 'gradient',
      animation: 'slideUp',
      duration: 12000,
      narration: 'We\'re building Disaster Recovery - Australia\'s first truly contractor-owned network. Our platform combines pre-vetted contractors with advanced AI technology, territory protection, and comprehensive training. We\'re not just another referral service - we\'re creating the industry ecosystem that never existed.',
      screenshots: ['dashboard', 'contractor-portal', 'ai-matching']
    },
    {
      id: 5,
      type: 'traction',
      title: 'Proven Business Model',
      subtitle: 'US Companies Generate $1B+ Annually',
      metrics: [
        { label: 'SERVPRO Franchises', value: '1,900+', growth: 'US Leader' },
        { label: 'BELFOR Revenue', value: '$1B+', growth: '45 Countries' },
        { label: 'ServiceMaster Valuation', value: '8-12x', growth: 'Revenue Multiple' },
        { label: 'Australian Opportunity', value: '$2.8B', growth: '2% Digital' }
      ],
      background: 'dark',
      animation: 'fadeScale',
      duration: 10000,
      narration: 'The model is already proven internationally. SERVPRO operates 1,900 franchises in the US. BELFOR generates over 1 billion annually across 45 countries. ServiceMaster trades at 8 to 12 times revenue. Australia\'s market is ripe for disruption with only 2% digital penetration.',
      chart: {
        type: 'line',
        data: {
          labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
          datasets: [{
            label: 'Projected Revenue ($M AUD)',
            data: [14, 28, 56, 112, 224],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          }]
        }
      }
    },
    {
      id: 6,
      type: 'business-model',
      title: 'Multiple Revenue Streams',
      subtitle: 'Diversified & Scalable Income',
      streams: [
        { 
          name: 'Contractor Commissions', 
          percentage: 40, 
          description: '8-12% on completed jobs' 
        },
        { 
          name: 'Lead Generation', 
          percentage: 25, 
          description: 'Premium placement & routing' 
        },
        { 
          name: 'Subscription Services', 
          percentage: 20, 
          description: 'Platform access & tools' 
        },
        { 
          name: 'Training & Certification', 
          percentage: 15, 
          description: 'Professional development' 
        }
      ],
      background: 'gradient',
      animation: 'slideRight',
      duration: 10000,
      narration: 'Our business model features multiple revenue streams. Contractor commissions at industry-standard 8 to 12 percent. Lead generation fees for premium placement. Recurring subscription revenue for platform access. Training and certification programs. Each contractor generates average lifetime value of 50,000 dollars.',
      unitEconomics: {
        avgJobValue: '$15,000',
        customerAcquisition: '$200',
        lifetimeValue: '$50,000',
        targetMargin: '60%'
      }
    },
    {
      id: 7,
      type: 'technology',
      title: 'Cutting-Edge Technology Platform',
      subtitle: 'AI-Powered Industry Transformation',
      features: [
        'Intelligent customer-contractor matching algorithms',
        'Automated emergency triage and priority assessment',
        'Predictive demand forecasting based on weather patterns',
        'Real-time performance analytics and quality monitoring',
        'Dynamic pricing optimisation and market analysis'
      ],
      background: 'tech',
      animation: 'matrix',
      duration: 10000,
      narration: 'Our technology platform leverages artificial intelligence for intelligent matching, automated triage, predictive forecasting, and real-time analytics. We\'re not just digitizing the industry - we\'re revolutionizing how disaster recovery operates.',
      screenshots: ['ai-dashboard', 'analytics', 'mobile-app']
    },
    {
      id: 8,
      type: 'seo-strategy',
      title: 'SEO Domination Strategy',
      subtitle: '750 Programmatic Pages, #1 Rankings Nationwide',
      background: 'gradient',
      animation: 'zoom',
      duration: 10000,
      narration: 'Our SEO strategy will capture the market before competitors wake up. 750 programmatic pages targeting every location and service combination. Number one rankings for water damage restoration, fire damage, mould remediation across all Australian cities. This creates a sustainable customer acquisition moat.',
      metrics: [
        { label: 'Target Pages', value: '750+' },
        { label: 'Location Coverage', value: '100%' },
        { label: 'Service Keywords', value: '500+' },
        { label: 'Acquisition Cost', value: '<$200' }
      ]
    },
    {
      id: 9,
      type: 'competitive',
      title: 'Unbeatable Competitive Advantages',
      advantages: [
        { 
          title: 'First-Mover Advantage',
          description: 'Building before US giants establish dominance'
        },
        {
          title: 'Quality Differentiation',
          description: 'Professional standards in unprofessional market'
        },
        {
          title: 'Local Ownership',
          description: 'Australian-built for Australian conditions'
        },
        {
          title: 'Network Effects',
          description: 'More contractors = better coverage = more customers'
        },
        {
          title: 'SEO Moat',
          description: '#1 rankings create sustainable acquisition advantage'
        }
      ],
      background: 'dark',
      animation: 'slideLeft',
      duration: 10000,
      narration: 'We have five unbeatable advantages. First-mover position before American giants arrive. Quality differentiation in a fragmented market. Local ownership understanding Australian conditions. Network effects where growth accelerates growth. And an SEO moat that locks in customer acquisition.'
    },
    {
      id: 10,
      type: 'financials',
      title: 'Path to $280M Revenue',
      subtitle: 'Conservative Projections, Explosive Growth',
      background: 'chart',
      animation: 'slideUp',
      duration: 12000,
      narration: 'Our financial projections show a clear path to 280 million dollars in revenue within three years, capturing just 10% market share. Year one: 140 million with 5% share. Year two: 224 million with 8% share. Year three: 280 million with 10% share. These are conservative estimates in a growing market.',
      chart: {
        type: 'bar',
        data: {
          labels: ['Year 1', 'Year 2', 'Year 3'],
          datasets: [
            {
              label: 'Revenue ($M AUD)',
              data: [140, 224, 280],
              backgroundColor: '#3b82f6'
            },
            {
              label: 'Market Share (%)',
              data: [5, 8, 10],
              backgroundColor: '#10b981'
            }
          ]
        }
      }
    },
    {
      id: 11,
      type: 'market-entry',
      title: 'Phased Market Entry Strategy',
      phases: [
        {
          phase: 'Foundation',
          timeline: '1-6 months',
          focus: 'Sydney, Melbourne, Brisbane',
          contractors: '100-200',
          investment: '$2M'
        },
        {
          phase: 'Expansion',
          timeline: '6-18 months',
          focus: 'All capitals & regional',
          contractors: '500-750',
          investment: '$5M'
        },
        {
          phase: 'Domination',
          timeline: '18-36 months',
          focus: 'National coverage',
          contractors: '1000+',
          investment: '$15M'
        }
      ],
      background: 'gradient',
      animation: 'stagger',
      duration: 10000,
      narration: 'Our market entry follows three phases. Foundation: Launch in Sydney, Melbourne, Brisbane with 100 contractors. Expansion: All capital cities with 500 contractors. Domination: Complete national coverage with over 1000 contractors. Each phase builds on proven success.'
    },
    {
      id: 12,
      type: 'team',
      title: 'Visionary Leadership',
      members: [
        {
          name: 'Shane',
          role: 'Founder & CEO',
          bio: '15+ years disaster recovery experience. Built the vision, established partnerships, ready to execute.',
          image: '/images/team/shane-founder.jpg'
        }
      ],
      hiringPlan: [
        'CTO - Platform development and AI systems',
        'Head of Operations - Contractor network',
        'Head of Marketing - SEO and acquisition',
        'Head of Quality - Training programs'
      ],
      background: 'dark',
      animation: 'fadeIn',
      duration: 8000,
      narration: 'Led by founder Shane with over 15 years in disaster recovery. Strategic partnerships with IICRC, Telchelms, and Card.com.au already established. Ready to hire CTO, Operations Head, Marketing Head, and Quality Head with seed funding.'
    },
    {
      id: 13,
      type: 'partnerships',
      title: 'Strategic Partnerships Secured',
      partners: [
        {
          name: 'IICRC',
          type: 'Industry Standards',
          value: 'Certification authority'
        },
        {
          name: 'Telchelms.com',
          type: 'Technology',
          value: 'Field documentation'
        },
        {
          name: 'Card.com.au',
          type: 'Financial Services',
          value: 'Claims processing'
        }
      ],
      background: 'gradient',
      animation: 'zoom',
      duration: 8000,
      narration: 'Strategic partnerships already secured. IICRC for industry certification standards. Telchelms for field documentation technology. Card.com.au for claims processing and contractor financing. These partnerships accelerate our launch and credibility.'
    },
    {
      id: 14,
      type: 'ask',
      title: 'Investment Opportunity',
      subtitle: '$2M Seed Round - 3 Month Launch',
      allocation: [
        { category: 'Technology Development', amount: '$700K', percentage: 35 },
        { category: 'Marketing & SEO', amount: '$600K', percentage: 30 },
        { category: 'Team Building', amount: '$500K', percentage: 25 },
        { category: 'Operations & Legal', amount: '$200K', percentage: 10 }
      ],
      terms: '$2M seed at $8M pre-money valuation',
      background: 'gradient',
      animation: 'fadeScale',
      duration: 10000,
      narration: 'We\'re raising 2 million dollars seed funding to launch in 3 months instead of 12. Technology development: 700 thousand. Marketing and SEO: 600 thousand. Team building: 500 thousand. Operations: 200 thousand. This investment captures the market before competitors react.',
      returns: {
        seed: '25-50x projected',
        seriesA: '10-20x projected',
        timeline: '5-7 years to exit'
      }
    },
    {
      id: 15,
      type: 'exit-strategy',
      title: 'Clear Path to Massive Returns',
      subtitle: '25-50x Projected for Seed Investors',
      strategies: [
        {
          type: 'Strategic Acquisition',
          buyers: 'BELFOR, ServiceMaster, Paul Davis',
          multiple: '8-12x revenue'
        },
        {
          type: 'IPO',
          requirement: '$100M+ revenue',
          multiple: '6-10x revenue'
        },
        {
          type: 'Platform Expansion',
          opportunity: 'Adjacent services',
          multiple: '10-15x revenue'
        }
      ],
      background: 'dark',
      animation: 'slideUp',
      duration: 10000,
      narration: 'Clear exit strategy in 5 to 7 years. Strategic acquisition by BELFOR or ServiceMaster at 8 to 12 times revenue. IPO potential at 100 million revenue. Platform expansion into adjacent services. Seed investors projected 25 to 50 times return.'
    },
    {
      id: 16,
      type: 'closing',
      title: 'Join Us in Building the Industry',
      subtitle: 'Not Just a Business, But Australia\'s Restoration Infrastructure',
      cta: 'Schedule Investment Discussion',
      contact: {
        email: 'investors@disasterrecovery.com.au',
        phone: '1300 566 166',
        website: 'disasterrecovery.com.au'
      },
      background: 'epic',
      animation: 'fadeIn',
      duration: 8000,
      narration: 'This isn\'t just about building another restoration company. We\'re creating the infrastructure for an entire industry to professionalize and thrive. The American model has worked for over 10 years. Now it\'s Australia\'s turn, and we\'re positioned to capture it from day one. Join us in building the industry, not just a business.',
      urgency: 'First movers will capture the market. Window closes in 6 months.'
    }
  ]
};