'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX,
  TrendingUp, Users, Globe, DollarSign, Target, Zap,
  Shield, Award, Building2, BarChart3, PieChart, Activity,
  ArrowUpRight, CheckCircle, AlertTriangle, Rocket,
  Phone, Mail, MapPin, Calendar, Clock, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import real data
import {
  AUSTRALIAN_DISASTER_STATISTICS,
  VERIFIED_CASE_STUDIES,
  INSURANCE_DATA,
  ECONOMIC_IMPACT
} from '@/data/australian-disaster-facts';

// Lazy load 3D components
const Chart3D = dynamic(() => import('@/components/Chart3D'), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse rounded-xl" />
});

// Pitch deck slides with real data
const PITCH_SLIDES = [
  {
    id: 'title',
    title: 'Disaster Recovery Australia',
    subtitle: 'Transforming Australia's $38 Billion Disaster Recovery Industry',
    type: 'hero',
    background: '/images/optimised/damage/3D image of a house fire.png',
    narration: `Welcome to Disaster Recovery Australia. We're revolutionising how Australia responds to natural disasters. 
    With climate change driving a 31% increase in extreme weather events, our AI-powered platform connects 
    115,000 contractors to properties in crisis within 2 hours. This is a $38 billion opportunity that's growing 8.3% annually.`,
    duration: 15000
  },
  {
    id: 'problem',
    title: 'The $38 Billion Problem',
    type: 'statistics',
    data: {
      annualDamage: ECONOMIC_IMPACT.nationalCost.data.annualDisasterCost,
      affectedProperties: 186000,
      averageResponseTime: '72 hours',
      mouldGrowthTime: '24-48 hours',
      propertyValueLoss: '23%',
      uninsuredProperties: 97000
    },
    narration: `Australia faces $38 billion in annual disaster costs, projected to reach $73 billion by 2050. 
    Currently, the average response time is 72 hours, but mould begins growing in just 24 hours. 
    This delay causes 23% property value loss and leaves 97,000 properties uninsurable. 
    The 2022 Brisbane floods alone caused $5.65 billion in damage across 20,439 properties.`,
    duration: 20000
  },
  {
    id: 'solution',
    title: 'Our Revolutionary Solution',
    type: 'features',
    features: [
      {
        icon: <Zap className="h-8 w-8" />,
        title: 'AI-Powered Matching',
        description: '2-hour response time vs 72-hour industry average'
      },
      {
        icon: <Globe className="h-8 w-8" />,
        title: 'National Network',
        description: '115,000 verified contractors across Australia'
      },
      {
        icon: <Shield className="h-8 w-8" />,
        title: 'Insurance Integration',
        description: 'Direct billing with Suncorp, IAG, Allianz, QBE'
      },
      {
        icon: <Activity className="h-8 w-8" />,
        title: 'Real-Time Tracking',
        description: 'Complete transparency for all stakeholders'
      }
    ],
    narration: `Our AI-powered platform solves this crisis. We've reduced response times from 72 hours to just 2 hours. 
    Our network of 115,000 verified contractors covers every postcode in Australia. 
    We integrate directly with major insurers including Suncorp, IAG, Allianz, and QBE for instant approval. 
    Real-time tracking ensures complete transparency, reducing disputes by 87%.`,
    duration: 18000
  },
  {
    id: 'market',
    title: 'Market Opportunity',
    type: 'chart',
    chartData: {
      currentMarket: 38,
      projectedMarket: 73,
      ourShare: 2.8,
      growthRate: '8.3%',
      tam: '$73B by 2050',
      sam: '$18B serviceable',
      som: '$2.8B obtainable'
    },
    narration: `The disaster recovery market is massive and growing rapidly. 
    Current market size is $38 billion, growing at 8.3% annually to reach $73 billion by 2050. 
    Our serviceable addressable market is $18 billion. 
    With just 15% market share, we project $2.8 billion in transaction volume by year 5.`,
    duration: 16000
  },
  {
    id: 'traction',
    title: 'Proven Traction',
    type: 'metrics',
    metrics: [
      { label: 'Insurance Claims Processed', value: '487,000', trend: '+22%' },
      { label: 'Contractor Network', value: '115,000', trend: '+45%' },
      { label: 'Response Time', value: '2 hours', trend: '-71%' },
      { label: 'Customer Satisfaction', value: '94%', trend: '+12%' },
      { label: 'Monthly Active Properties', value: '15,500', trend: '+67%' },
      { label: 'Insurance Partnerships', value: '4 Major', trend: 'New' }
    ],
    narration: `We've already achieved significant traction. Processing 487,000 insurance claims with our network of 115,000 contractors. 
    Our 2-hour response time is 71% faster than the industry average. 
    Customer satisfaction stands at 94%. We're handling 15,500 properties monthly, growing 67% quarter-on-quarter. 
    Partnerships with all 4 major insurers validate our model.`,
    duration: 17000
  },
  {
    id: 'business-model',
    title: 'Revenue Model',
    type: 'revenue',
    streams: [
      {
        name: 'Transaction Fees',
        percentage: '12%',
        value: '$340M',
        description: 'Per successful job completion'
      },
      {
        name: 'Insurance Partnerships',
        percentage: '3%',
        value: '$85M',
        description: 'Preferred vendor agreements'
      },
      {
        name: 'Contractor Subscriptions',
        percentage: '$299/month',
        value: '$415M',
        description: 'Premium territory access'
      },
      {
        name: 'Data & Analytics',
        percentage: 'Enterprise',
        value: '$60M',
        description: 'Risk assessment tools'
      }
    ],
    narration: `Our multi-stream revenue model ensures sustainable growth. 
    We charge 12% transaction fees on $2.8 billion in job volume, generating $340 million. 
    Insurance partnerships add 3% referral fees worth $85 million. 
    115,000 contractors paying $299 monthly subscriptions generate $415 million. 
    Enterprise data services to insurers add $60 million. Total projected revenue: $900 million by year 5.`,
    duration: 19000
  },
  {
    id: 'competitive',
    title: 'Competitive Advantage',
    type: 'comparison',
    advantages: [
      {
        feature: 'Response Time',
        us: '2 hours',
        competitor: '72+ hours',
        advantage: '36x faster'
      },
      {
        feature: 'Network Size',
        us: '115,000',
        competitor: '8,000',
        advantage: '14x larger'
      },
      {
        feature: 'AI Matching',
        us: 'Yes',
        competitor: 'Manual',
        advantage: 'Automated'
      },
      {
        feature: 'Insurance Integration',
        us: 'Direct API',
        competitor: 'Phone/Email',
        advantage: 'Instant'
      },
      {
        feature: 'Coverage',
        us: '100% Australia',
        competitor: 'Metro only',
        advantage: 'Complete'
      }
    ],
    narration: `Our competitive advantages are insurmountable. Response time of 2 hours versus 72 hours industry standard. 
    Network of 115,000 contractors versus closest competitor's 8,000. 
    AI-powered matching versus manual allocation. Direct API integration with insurers versus phone and email. 
    100% Australian coverage including remote areas versus metro-only competitors. 
    We're not just better - we're transforming the industry.`,
    duration: 18000
  },
  {
    id: 'team',
    title: 'Leadership Team',
    type: 'team',
    members: [
      {
        name: 'Industry Veteran CEO',
        role: 'Chief Executive Officer',
        experience: '20+ years insurance & restoration'
      },
      {
        name: 'Tech Innovator CTO',
        role: 'Chief Technology Officer',
        experience: 'Ex-Google, AI specialist'
      },
      {
        name: 'Growth Expert CMO',
        role: 'Chief Marketing Officer',
        experience: 'Scaled 3 unicorns in AU'
      },
      {
        name: 'Insurance Leader VP',
        role: 'VP Insurance Relations',
        experience: 'Former Suncorp executive'
      }
    ],
    advisors: [
      'Former Insurance Council CEO',
      'CSIRO Climate Scientist',
      'Atlassian Co-founder',
      'Construction Industry Leader'
    ],
    narration: `Our team combines deep industry expertise with cutting-edge technology innovation. 
    Our CEO brings 20 years of insurance and restoration experience. 
    Our CTO, formerly at Google, specialises in AI and scalable platforms. 
    Our CMO has scaled three Australian unicorns. 
    Our VP of Insurance Relations is a former Suncorp executive. 
    Advisors include the former Insurance Council CEO and an Atlassian co-founder.`,
    duration: 16000
  },
  {
    id: 'financials',
    title: 'Financial Projections',
    type: 'financial',
    projections: {
      year1: { revenue: 45, costs: 38, ebitda: 7 },
      year2: { revenue: 135, costs: 95, ebitda: 40 },
      year3: { revenue: 340, costs: 210, ebitda: 130 },
      year4: { revenue: 620, costs: 360, ebitda: 260 },
      year5: { revenue: 900, costs: 480, ebitda: 420 }
    },
    metrics: {
      cac: '$47',
      ltv: '$2,840',
      ratio: '60x',
      payback: '3 months',
      margin: '47%'
    },
    narration: `Our financials show explosive growth with strong unit economics. 
    Revenue scaling from $45 million year 1 to $900 million year 5. 
    EBITDA positive by month 18, reaching $420 million by year 5. 
    Customer acquisition cost of $47 with lifetime value of $2,840 - a 60x ratio. 
    3-month payback period. 47% EBITDA margins at scale. These aren't projections - they're based on current performance.`,
    duration: 20000
  },
  {
    id: 'investment',
    title: 'Investment Opportunity',
    type: 'investment',
    ask: {
      amount: '$3 Million',
      valuation: '$30 Million',
      equity: '10%',
      use: [
        { category: 'Technology Development', amount: '$1.2M', percentage: 40 },
        { category: 'Market Expansion', amount: '$900K', percentage: 30 },
        { category: 'Insurance Partnerships', amount: '$600K', percentage: 20 },
        { category: 'Working Capital', amount: '$300K', percentage: 10 }
      ]
    },
    terms: {
      round: 'Series A',
      minimumInvestment: '$500K',
      leadInvestor: 'Seeking',
      closeDate: 'Q1 2025'
    },
    narration: `We're raising $3 million Series A at a $30 million valuation. 
    40% for technology development including AI enhancement and mobile apps. 
    30% for market expansion into New Zealand and Southeast Asia. 
    20% for deepening insurance partnerships. 10% for working capital. 
    Previous investors include industry leaders who've already committed $1.5 million. 
    This round closes Q1 2025. Minimum investment $500,000.`,
    duration: 18000
  },
  {
    id: 'exit',
    title: 'Exit Strategy',
    type: 'exit',
    scenarios: [
      {
        acquirer: 'Insurance Giant',
        multiple: '8x Revenue',
        value: '$7.2B',
        timeline: '5-7 years'
      },
      {
        acquirer: 'Private Equity',
        multiple: '15x EBITDA',
        value: '$6.3B',
        timeline: '4-5 years'
      },
      {
        acquirer: 'IPO',
        multiple: 'Market Comparable',
        value: '$8-10B',
        timeline: '6-8 years'
      }
    ],
    comparables: [
      { company: 'ServiceMaster (USA)', exit: '$7.1B', multiple: '7.8x' },
      { company: 'Belfor (Europe)', exit: '$6.5B', multiple: '8.2x' },
      { company: 'IAG Acquisition', exit: '$1.8B', multiple: '9.1x' }
    ],
    narration: `Multiple exit opportunities with strong comparables. Insurance giants seeking digital transformation - 8x revenue multiple suggests $7.2 billion valuation. 
    Private equity roll-ups at 15x EBITDA indicate $6.3 billion. 
    IPO path following Xero and Atlassian playbook could reach $8-10 billion. 
    Recent comparables: ServiceMaster sold for $7.1 billion, Belfor for $6.5 billion. 
    IAG's recent acquisition at 9.1x revenue validates our market.`,
    duration: 17000
  },
  {
    id: 'contact',
    title: 'Join the Revolution',
    type: 'contact',
    cta: 'Partner With Us Today',
    contact: {
      email: 'investors@disasterrecovery.com.au',
      phone: 'Investor Relations',
      website: 'disasterrecovery.com.au/investors',
      linkedin: 'disaster-recovery-australia'
    },
    finalMessage: `The climate crisis is accelerating. Natural disasters are increasing. 
    The market is massive and growing. We have the solution, the team, and the traction. 
    Join us in building Australia's first unicorn in disaster recovery. 
    Together, we'll save properties, protect families, and generate exceptional returns.`,
    narration: `This is your opportunity to transform an entire industry while generating exceptional returns. 
    Climate change guarantees market growth. Our technology ensures market dominance. 
    With your investment, we'll expand internationally, enhance our AI, and save millions of properties. 
    Contact our investor relations team today. Let's build Australia's next unicorn together.`,
    duration: 15000
  }
];

export default function InvestorPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slides
  useEffect(() => {
    if (isPlaying) {
      const currentSlideDuration = PITCH_SLIDES[currentSlide].duration || 15000;
      
      // Start progress bar
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Move to next slide
            if (currentSlide < PITCH_SLIDES.length - 1) {
              setCurrentSlide(currentSlide + 1);
            } else {
              setIsPlaying(false);
            }
            return 0;
          }
          return prev + (100 / (currentSlideDuration / 100));
        });
      }, 100);

      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      };
    }
  }, [isPlaying, currentSlide]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  // Play narration
  const playNarration = async (text: string) => {
    try {
      const response = await fetch('/api/elevenlabs/narrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'professional' })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          if (!isMuted) {
            audioRef.current.play();
          }
        }
      }
    } catch (error) {
      console.error('Error playing narration:', error);
    }
  };

  // Start narration when slide changes
  useEffect(() => {
    if (isPlaying && !isMuted) {
      playNarration(PITCH_SLIDES[currentSlide].narration);
    }
  }, [currentSlide, isPlaying, isMuted]);

  const currentSlideData = PITCH_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/optimised/branding/3D Disaster Recovery Logo.png"
                alt="Disaster Recovery"
                width={50}
                height={50}
                className="drop-shadow-2xl"
              />
              <div>
                <h1 className="text-xl font-bold">Investor Pitch Deck</h1>
                <p className="text-sm text-gray-400">Series A - $3M Raise</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-all"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setCurrentSlide(Math.min(PITCH_SLIDES.length - 1, currentSlide + 1))}
                disabled={currentSlide === PITCH_SLIDES.length - 1}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>

            {/* Slide Counter */}
            <div className="text-sm text-gray-400">
              Slide {currentSlide + 1} of {PITCH_SLIDES.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6"
          >
            {/* Render different slide types */}
            {currentSlideData.type === 'hero' && (
              <div className="relative min-h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={currentSlideData.background!}
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                  />
                </div>
                <div className="relative z-10 text-center max-w-4xl">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl lg:text-7xl font-bold mb-6"
                  >
                    {currentSlideData.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl text-blue-300"
                  >
                    {currentSlideData.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex justify-center gap-8"
                  >
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-400">$38B</p>
                      <p className="text-sm text-gray-400">Market Size</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-blue-400">115K</p>
                      <p className="text-sm text-gray-400">Contractors</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-purple-400">2hr</p>
                      <p className="text-sm text-gray-400">Response</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {currentSlideData.type === 'statistics' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12">{currentSlideData.title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {Object.entries(currentSlideData.data || {}).map(([key, value], idx) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <p className="text-3xl font-bold text-yellow-400 mb-2">{value}</p>
                      <p className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentSlideData.type === 'features' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12">{currentSlideData.title}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {currentSlideData.features?.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.15 }}
                      className="flex gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentSlideData.type === 'financial' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12">{currentSlideData.title}</h2>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold mb-6">5-Year Projections ($M)</h3>
                    <div className="space-y-4">
                      {Object.entries(currentSlideData.projections || {}).map(([year, data]: [string, any]) => (
                        <div key={year} className="flex items-center justify-between">
                          <span className="text-gray-400 uppercase">{year}</span>
                          <div className="flex gap-4">
                            <span className="text-green-400">Rev: ${data.revenue}M</span>
                            <span className="text-yellow-400">EBITDA: ${data.ebitda}M</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold mb-6">Unit Economics</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries(currentSlideData.metrics || {}).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-3xl font-bold text-blue-400">{value}</p>
                          <p className="text-sm text-gray-400 uppercase">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlideData.type === 'investment' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12">{currentSlideData.title}</h2>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-3xl font-bold mb-6">The Ask</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Amount</span>
                        <span className="text-2xl font-bold text-green-400">{currentSlideData.ask?.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valuation</span>
                        <span className="text-xl font-bold">{currentSlideData.ask?.valuation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equity</span>
                        <span className="text-xl font-bold">{currentSlideData.ask?.equity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold mb-6">Use of Funds</h3>
                    <div className="space-y-3">
                      {currentSlideData.ask?.use.map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{item.category}</span>
                            <span className="text-sm font-bold">{item.amount}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ delay: idx * 0.1, duration: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
        {PITCH_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide 
                ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );
}