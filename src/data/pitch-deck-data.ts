import { 
  TrendingUp, Users, Target, Zap, Shield, Award,
  DollarSign, Globe, Rocket, BarChart3, CheckCircle,
  ArrowRight, Star, Building2, Clock, Phone, AlertTriangle,
  Bot, Network, MapPin, Search, Smartphone, Cpu
} from 'lucide-react';

export interface PitchDeckSlide {
  id: number;
  type: string;
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  points?: string[];
  features?: Array<{
    title: string;
    description: string;
    icon: any;
  }>;
  metrics?: Array<{
    value: string;
    label: string;
    growth?: string;
  }>;
  members?: Array<{
    name: string;
    role: string;
    bio: string;
    image?: string;
  }>;
  chart?: {
    type: string;
    data: {
      labels: string[];
      datasets: Array<{
        data: number[];
        backgroundColor: string[];
        borderColor?: string[];
      }>;
    };
  };
  allocation?: Array<{
    category: string;
    amount: string;
    percentage: number;
  }>;
  terms?: string;
  cta?: string;
  contact?: {
    phone: string;
    email: string;
    website: string;
  };
  voiceNarration?: string;
  backgroundMusic?: string;
  screenshots?: string[];
}

export const pitchDeckData: PitchDeckSlide[] = [
  // Title Slide
  {
    id: 1,
    type: 'title',
    title: 'National Recovery Platform',
    subtitle: 'Revolutionizing Disaster Recovery Distribution Across Australia',
    image: '/images/logo-white.png',
    voiceNarration: 'Welcome to National Recovery Platform, the revolutionary disaster recovery distribution system that is transforming how Australia responds to property disasters. We are building the nations most comprehensive network of recovery contractors, powered by artificial intelligence and designed to dominate every market from major cities to the most remote locations.',
    backgroundMusic: '/audio/corporate-inspiring.mp3'
  },

  // Problem Slide
  {
    id: 2,
    type: 'problem',
    title: 'The Crisis in Disaster Recovery',
    subtitle: 'A $15B Market Plagued by Inefficiency',
    points: [
      'Insurance claims take 45+ days to connect with qualified contractors',
      'Property owners face delayed responses during critical 24-48 hour windows',
      'Rural and remote areas are severely underserved with limited contractor networks',
      'Manual processes create bottlenecks and increase costs by 300%',
      'No centralized platform exists for national contractor coordination',
      'Competition is fragmented with no dominant market leader'
    ],
    chart: {
      type: 'bar',
      data: {
        labels: ['Response Time', 'Cost Overhead', 'Market Fragmentation', 'Rural Coverage'],
        datasets: [{
          data: [85, 75, 90, 95],
          backgroundColor: ['#ef4444', '#f97316', '#eab308', '#dc2626'],
          borderColor: ['#dc2626', '#ea580c', '#ca8a04', '#b91c1c']
        }]
      }
    },
    voiceNarration: 'The disaster recovery industry is facing a massive crisis. With over 15 billion dollars in annual claims, the current system is failing property owners when they need help most. Response times average 45 days, costs are inflated by 300%, and rural areas are completely underserved. This creates a massive opportunity for disruption.',
    screenshots: ['/images/problem-response-times.jpg', '/images/problem-costs.jpg']
  },

  // Solution Slide
  {
    id: 3,
    type: 'solution',
    title: 'AI-Powered National Distribution',
    subtitle: 'Complete Market Domination Through Technology',
    features: [
      {
        title: 'AI Bot Interface',
        description: '24/7 automated client interaction with zero human intervention',
        icon: Bot
      },
      {
        title: 'Auto-Scaling Pages',
        description: 'Dynamic location-based landing pages generated from contractor data',
        icon: Globe
      },
      {
        title: 'National Network',
        description: 'Coast-to-coast coverage from major cities to remote outback locations',
        icon: Network
      },
      {
        title: 'Instant Matching',
        description: 'Real-time contractor matching based on location, expertise, and availability',
        icon: Zap
      },
      {
        title: 'SEO Domination',
        description: 'Programmatic SEO targeting every location and service combination',
        icon: Search
      },
      {
        title: 'Mobile-First',
        description: 'Responsive platform optimized for emergency mobile access',
        icon: Smartphone
      },
      {
        title: 'Smart Routing',
        description: 'Intelligent lead distribution with performance-based prioritization',
        icon: Target
      },
      {
        title: 'Zero Touch Ops',
        description: 'Fully automated operations requiring minimal human oversight',
        icon: Cpu
      }
    ],
    voiceNarration: 'Our solution leverages cutting-edge AI and automation to create a self-running platform that scales automatically. Every client interaction is handled by our advanced AI bot, while our system generates thousands of location-specific pages to dominate search results. Contractors join our network and immediately gain access to qualified leads in their service area.',
    screenshots: ['/images/ai-bot-demo.jpg', '/images/contractor-dashboard.jpg', '/images/auto-generated-pages.jpg']
  },

  // Market Slide
  {
    id: 4,
    type: 'market',
    title: 'Massive Market Opportunity',
    subtitle: '$15B+ Total Addressable Market',
    chart: {
      type: 'doughnut',
      data: {
        labels: ['Water Damage', 'Fire Restoration', 'Mould Remediation', 'Storm Damage', 'Other'],
        datasets: [{
          data: [40, 25, 15, 12, 8],
          backgroundColor: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6']
        }]
      }
    },
    voiceNarration: 'We are targeting a massive 15 billion dollar market that spans every property type from single homes to 80-floor high-rises, from corner shops to offshore oil rigs. Our addressable market includes residential, commercial, industrial, and institutional properties across every disaster category.',
    screenshots: ['/images/market-size-breakdown.jpg', '/images/property-types.jpg']
  },

  // Business Model Slide
  {
    id: 5,
    type: 'business-model',
    title: 'Scalable Revenue Streams',
    subtitle: 'Multiple Revenue Channels with Network Effects',
    features: [
      {
        title: 'Lead Distribution Fees',
        description: 'Per-lead pricing model with qualified insurance claims',
        icon: DollarSign
      },
      {
        title: 'Territory Rights',
        description: 'Premium pricing for exclusive geographic coverage',
        icon: MapPin
      },
      {
        title: 'Performance Tiers',
        description: 'Higher-performing contractors pay premium for priority access',
        icon: Award
      },
      {
        title: 'Platform Subscriptions',
        description: 'Monthly SaaS fees for contractor dashboard and tools',
        icon: Rocket
      }
    ],
    voiceNarration: 'Our business model creates multiple revenue streams that scale with network growth. We charge contractors for qualified leads, offer premium territory rights, implement performance-based pricing tiers, and generate recurring subscription revenue. As more contractors join, the platform becomes more valuable for everyone.',
    screenshots: ['/images/revenue-model.jpg', '/images/pricing-tiers.jpg']
  },

  // Traction Slide
  {
    id: 6,
    type: 'traction',
    title: 'Explosive Early Growth',
    subtitle: 'Validation Across Multiple Metrics',
    metrics: [
      {
        value: '450+',
        label: 'Contractors Onboarded',
        growth: '+125% MoM'
      },
      {
        value: '2,847',
        label: 'Qualified Leads Generated',
        growth: '+89% MoM'
      },
      {
        value: '$2.4M',
        label: 'Jobs Completed',
        growth: '+156% MoM'
      },
      {
        value: '98.7%',
        label: 'Client Satisfaction',
        growth: '+0.8%'
      },
      {
        value: '1,200+',
        label: 'Location Pages Live',
        growth: '+200% MoM'
      },
      {
        value: '#1',
        label: 'SEO Rankings Achieved',
        growth: '+45 keywords'
      },
      {
        value: '24/7',
        label: 'AI Bot Uptime',
        growth: '99.9% SLA'
      },
      {
        value: '$125',
        label: 'Average Cost Per Lead',
        growth: '-23% optimization'
      }
    ],
    voiceNarration: 'Our traction metrics demonstrate explosive growth across all key areas. We have onboarded over 450 contractors nationwide, generated nearly 3,000 qualified leads, and facilitated over 2.4 million dollars in completed jobs. Our AI bot maintains 24/7 uptime with 99.9% SLA while achieving number one SEO rankings for over 45 keywords.',
    screenshots: ['/images/growth-metrics.jpg', '/images/contractor-map.jpg', '/images/seo-rankings.jpg']
  },

  // Technology Slide
  {
    id: 7,
    type: 'technology',
    title: 'Advanced Technology Stack',
    subtitle: 'Built for Scale and Automation',
    features: [
      {
        title: 'AI-Powered Matching',
        description: 'Machine learning algorithms for optimal contractor-client pairing',
        icon: Cpu
      },
      {
        title: 'Programmatic SEO',
        description: 'Automated page generation targeting 10,000+ keyword combinations',
        icon: Search
      },
      {
        title: 'Real-time Analytics',
        description: 'Live performance tracking and optimization across all metrics',
        icon: BarChart3
      },
      {
        title: 'Mobile-first Design',
        description: 'Progressive web app optimized for emergency response scenarios',
        icon: Smartphone
      }
    ],
    voiceNarration: 'Our technology stack is built for massive scale and complete automation. Advanced AI algorithms handle contractor matching, programmatic SEO generates thousands of targeted pages, and real-time analytics optimize performance continuously. Everything is designed to run without human intervention.',
    screenshots: ['/images/tech-architecture.jpg', '/images/ai-matching.jpg', '/images/analytics-dashboard.jpg']
  },

  // Competition Slide
  {
    id: 8,
    type: 'competition',
    title: 'Competitive Landscape',
    subtitle: 'First-Mover Advantage in National Distribution',
    content: 'The disaster recovery market is highly fragmented with no dominant national player. Local contractors operate in silos, insurance companies struggle with coordination, and property owners face lengthy delays. Our platform creates the first comprehensive national network with AI-powered automation.',
    voiceNarration: 'We operate in a highly fragmented market with no dominant national player. While local contractors exist everywhere, there is no unified distribution platform. This gives us a massive first-mover advantage to establish market dominance before competitors can respond.',
    screenshots: ['/images/competitive-analysis.jpg', '/images/market-fragmentation.jpg']
  },

  // Team Slide
  {
    id: 9,
    type: 'team',
    title: 'World-Class Team',
    subtitle: 'Industry Veterans with Proven Track Records',
    members: [
      {
        name: 'CEO & Founder',
        role: 'Strategic Leadership',
        bio: '15+ years building and scaling marketplace platforms. Previously led teams at major tech companies.',
        image: '/images/team/ceo.jpg'
      },
      {
        name: 'CTO & Co-Founder',
        role: 'Technology Leadership',
        bio: 'Former Google engineer with expertise in AI and distributed systems. Built platforms serving millions.',
        image: '/images/team/cto.jpg'
      },
      {
        name: 'VP of Operations',
        role: 'Business Operations',
        bio: '20+ years in disaster recovery industry. Deep relationships with insurance companies nationwide.',
        image: '/images/team/vp-ops.jpg'
      },
      {
        name: 'Head of AI',
        role: 'Artificial Intelligence',
        bio: 'PhD in Machine Learning. Previously at OpenAI working on large language models and automation.',
        image: '/images/team/head-ai.jpg'
      },
      {
        name: 'VP of Growth',
        role: 'Marketing & SEO',
        bio: 'Expert in programmatic SEO and growth hacking. Built organic traffic for multiple unicorns.',
        image: '/images/team/vp-growth.jpg'
      },
      {
        name: 'Head of Partnerships',
        role: 'Strategic Partnerships',
        bio: 'Former insurance executive with relationships across major carriers and regulatory bodies.',
        image: '/images/team/head-partnerships.jpg'
      }
    ],
    voiceNarration: 'Our world-class team combines deep industry expertise with cutting-edge technical skills. Our leadership has successfully built and scaled multiple marketplace platforms, while our technical team includes AI experts from leading companies like Google and OpenAI.',
    screenshots: ['/images/team-photo.jpg', '/images/team-achievements.jpg']
  },

  // Go-to-Market Slide
  {
    id: 10,
    type: 'go-to-market',
    title: 'Go-to-Market Strategy',
    subtitle: 'Systematic National Expansion',
    features: [
      {
        title: 'Phase 1: Foundation',
        description: 'Major cities, contractor recruitment, SEO infrastructure development',
        icon: Building2
      },
      {
        title: 'Phase 2: Expansion',
        description: 'Regional centers, programmatic page generation, AI bot deployment',
        icon: Rocket
      },
      {
        title: 'Phase 3: Domination',
        description: 'Rural coverage, market monopolization, competitive lock-out',
        icon: Target
      },
      {
        title: 'Phase 4: International',
        description: 'New Zealand expansion, Pacific territories, global opportunities',
        icon: Globe
      }
    ],
    voiceNarration: 'Our go-to-market strategy focuses on systematic national expansion. We start with major cities to build critical mass, expand to regional centers with automated systems, dominate rural markets through programmatic SEO, and then expand internationally to New Zealand and Pacific territories.',
    screenshots: ['/images/expansion-map.jpg', '/images/rollout-timeline.jpg']
  },

  // Financial Projections Slide
  {
    id: 11,
    type: 'financials',
    title: 'Financial Projections',
    subtitle: '10x Revenue Growth Over 5 Years',
    chart: {
      type: 'line',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [{
          data: [250000, 2500000, 12500000, 45000000, 125000000],
          backgroundColor: ['#3b82f6'],
          borderColor: ['#1d4ed8']
        }]
      }
    },
    metrics: [
      {
        value: '$125M',
        label: 'Projected Year 5 Revenue'
      },
      {
        value: '45%',
        label: 'Gross Margin'
      },
      {
        value: '25%',
        label: 'Net Margin'
      },
      {
        value: '3.2x',
        label: 'Revenue Multiple'
      }
    ],
    voiceNarration: 'Our financial projections show explosive growth potential with revenue scaling from 250,000 in year one to 125 million by year five. With 45% gross margins and 25% net margins, we project a 3.2x revenue multiple by year five.',
    screenshots: ['/images/revenue-projection.jpg', '/images/unit-economics.jpg']
  },

  // Ask Slide
  {
    id: 12,
    type: 'ask',
    title: 'Investment Opportunity',
    subtitle: 'Seeking $5M Series A to Accelerate Growth',
    allocation: [
      {
        category: 'Technology Development',
        amount: '$2.0M',
        percentage: 40
      },
      {
        category: 'Marketing & SEO',
        amount: '$1.5M',
        percentage: 30
      },
      {
        category: 'Team Expansion',
        amount: '$1.0M',
        percentage: 20
      },
      {
        category: 'Operations & Infrastructure',
        amount: '$0.5M',
        percentage: 10
      }
    ],
    terms: 'Preferred shares with 1x liquidation preference, participating rights, and standard protective provisions.',
    voiceNarration: 'We are seeking 5 million dollars in Series A funding to accelerate our growth across technology development, marketing expansion, team building, and infrastructure scaling. This investment will enable us to dominate the Australian market and prepare for international expansion.',
    screenshots: ['/images/funding-allocation.jpg', '/images/milestone-timeline.jpg']
  },

  // Closing Slide
  {
    id: 13,
    type: 'closing',
    title: 'Join the Revolution',
    subtitle: 'Transform Disaster Recovery Across Australia',
    cta: 'Let\'s Build the Future Together',
    contact: {
      phone: '+61 1300 RECOVERY',
      email: 'investors@nationalrecoveryplatform.com.au',
      website: 'www.nationalrecoveryplatform.com.au'
    },
    voiceNarration: 'The disaster recovery industry is ready for disruption, and we are the team to deliver it. With proven traction, advanced technology, and a clear path to market domination, National Recovery Platform represents a once-in-a-decade investment opportunity. Join us in transforming how Australia responds to disasters.',
    screenshots: ['/images/vision-future.jpg', '/images/national-coverage.jpg']
  }
];

export const backgroundMusicTracks = [
  {
    id: 'corporate-inspiring',
    name: 'Corporate Inspiring',
    url: '/audio/corporate-inspiring.mp3',
    description: 'Uplifting corporate background music'
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    url: '/audio/tech-minimal.mp3',
    description: 'Minimalist tech-focused ambient'
  },
  {
    id: 'growth-energy',
    name: 'Growth Energy',
    url: '/audio/growth-energy.mp3',
    description: 'Energetic growth and success theme'
  }
];

export const slideTransitions = [
  'fade',
  'slide-left',
  'slide-right',
  'slide-up',
  'slide-down',
  'zoom-in',
  'zoom-out',
  'flip',
  'cube',
  'parallax'
];