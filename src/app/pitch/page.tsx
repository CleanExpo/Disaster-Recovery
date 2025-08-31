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
import {
  MARKET_REALITY,
  REVENUE_MODEL,
  FINANCIAL_PROJECTIONS,
  UNIT_ECONOMICS,
  INVESTMENT_ASK,
  COMPARABLES
} from '@/data/realistic-financial-projections';

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
    subtitle: `Transforming Australia's $${MARKET_REALITY.totalMarketSize.current} Million Disaster Recovery Industry`,
    type: 'hero',
    background: '/images/optimised/damage/3D image of a house fire.png',
    narration: `Welcome to Disaster Recovery Australia. We're revolutionising how Australia responds to natural disasters. 
    With climate change driving extreme weather increases, our AI-powered platform connects qualified contractors 
    to properties in crisis within 2 hours. This is a $909 million market growing at 5.9% annually.`,
    duration: 15000
  },
  {
    id: 'problem',
    title: `The $${MARKET_REALITY.totalMarketSize.current} Million Opportunity`,
    type: 'statistics',
    data: {
      marketSize: `$${MARKET_REALITY.totalMarketSize.current}M`,
      projectedGrowth: `$${MARKET_REALITY.totalMarketSize.projected2033}M by 2033`,
      cagr: `${MARKET_REALITY.totalMarketSize.cagr}% CAGR`,
      insuranceClaims: `$${MARKET_REALITY.insuranceClaims.extremeWeather2024}M annual claims`,
      averageClaimValue: `$${MARKET_REALITY.insuranceClaims.averageClaimValue} per claim`,
      claimsCount: `${MARKET_REALITY.insuranceClaims.claimsCount} claims annually`
    },
    narration: `Australia's disaster recovery market is $909 million, growing to $1.48 billion by 2033 at 5.9% CAGR. 
    The 2024 extreme weather events generated $2.19 billion in insurance claims across 49,000 properties. 
    With an average claim value of $11,550, this represents massive opportunity. 
    Current industry leaders like Johns Lyng Group achieved $1.2 billion revenue with 10.7% EBITDA margins.`,
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
        title: 'Scalable Network',
        description: 'Growing contractor network with verified credentials'
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
    narration: `Our AI-powered platform transforms disaster response. We target 2-hour response times versus industry standard delays. 
    Our growing network of verified contractors will cover key Australian markets initially, expanding nationally. 
    We're building integrations with major insurers including Suncorp, IAG, Allianz, and QBE for streamlined approval. 
    Real-time tracking provides complete transparency for all stakeholders.`,
    duration: 18000
  },
  {
    id: 'market',
    title: 'Market Opportunity',
    type: 'chart',
    chartData: {
      currentMarket: MARKET_REALITY.totalMarketSize.current,
      projectedMarket: MARKET_REALITY.totalMarketSize.projected2033,
      ourShare: FINANCIAL_PROJECTIONS.year5.grossTransactionVolume,
      growthRate: `${MARKET_REALITY.totalMarketSize.cagr}%`,
      tam: `$${MARKET_REALITY.totalMarketSize.projected2033}M by 2033`,
      sam: '$500M serviceable',
      som: `$${FINANCIAL_PROJECTIONS.year5.grossTransactionVolume}M obtainable`
    },
    narration: `The disaster recovery market is substantial and growing steadily. 
    Current market size is $909 million, growing at 5.9% annually to reach $1.48 billion by 2033. 
    Our serviceable addressable market is $500 million within major Australian markets. 
    With 3.5% market share, we project $40 million in transaction volume by year 5.`,
    duration: 16000
  },
  {
    id: 'traction',
    title: 'Proven Traction',
    type: 'metrics',
    metrics: [
      { label: 'Target Market Share', value: '3.5%', trend: 'Year 5 Goal' },
      { label: 'Contractor Network Goal', value: `${FINANCIAL_PROJECTIONS.year5.contractors}`, trend: 'Scaling' },
      { label: 'Target Response Time', value: '2 hours', trend: 'Industry Leading' },
      { label: 'Jobs Processed (Y5)', value: `${FINANCIAL_PROJECTIONS.year5.jobsProcessed}`, trend: 'Annual' },
      { label: 'Transaction Volume (Y5)', value: `$${FINANCIAL_PROJECTIONS.year5.grossTransactionVolume}M`, trend: 'Projected' },
      { label: 'Insurance Partnerships', value: 'Building', trend: 'In Progress' }
    ],
    narration: `We're building towards significant traction milestones. Targeting 3.5% market share with a network of 2,500 contractors by year 5. 
    Our goal of 2-hour response time will transform industry standards. 
    We project processing 4,700 jobs annually by year 5, generating $40 million in transaction volume. 
    Building partnerships with major insurers to validate and scale our model.`,
    duration: 17000
  },
  {
    id: 'business-model',
    title: 'Revenue Model',
    type: 'revenue',
    streams: [
      {
        name: 'Transaction Fees',
        percentage: `${(REVENUE_MODEL.commissionRates.transactionFee * 100)}%`,
        value: `$${FINANCIAL_PROJECTIONS.year5.revenue.transactionFees}M`,
        description: 'Per successful job completion'
      },
      {
        name: 'Insurance Commissions',
        percentage: `${(REVENUE_MODEL.commissionRates.insuranceReferral * 100)}%`,
        value: `$${FINANCIAL_PROJECTIONS.year5.revenue.insuranceCommissions}M`,
        description: 'Insurance referral fees'
      },
      {
        name: 'Contractor Subscriptions',
        percentage: `$${REVENUE_MODEL.commissionRates.contractorSubscription}/month`,
        value: `$${FINANCIAL_PROJECTIONS.year5.revenue.subscriptions}M`,
        description: 'Monthly platform access'
      },
      {
        name: 'Data Services',
        percentage: 'SaaS',
        value: `$${FINANCIAL_PROJECTIONS.year5.revenue.dataServices}M`,
        description: 'Analytics and insights'
      }
    ],
    narration: `Our multi-stream revenue model ensures sustainable growth. 
    We charge ${(REVENUE_MODEL.commissionRates.transactionFee * 100)}% transaction fees on $${FINANCIAL_PROJECTIONS.year5.grossTransactionVolume} million in job volume, generating $${FINANCIAL_PROJECTIONS.year5.revenue.transactionFees} million. 
    Insurance partnerships add ${(REVENUE_MODEL.commissionRates.insuranceReferral * 100)}% referral fees worth $${FINANCIAL_PROJECTIONS.year5.revenue.insuranceCommissions} million. 
    ${FINANCIAL_PROJECTIONS.year5.contractors} contractors paying $${REVENUE_MODEL.commissionRates.contractorSubscription} monthly generate $${FINANCIAL_PROJECTIONS.year5.revenue.subscriptions} million. 
    Data services add $${FINANCIAL_PROJECTIONS.year5.revenue.dataServices} million. Total projected revenue: $${FINANCIAL_PROJECTIONS.year5.revenue.total} million by year 5.`,
    duration: 19000
  },
  {
    id: 'competitive',
    title: 'Competitive Advantage',
    type: 'comparison',
    advantages: [
      {
        feature: 'Market Position',
        us: 'Technology Platform',
        competitor: 'Service Provider',
        advantage: 'Asset-Light Model'
      },
      {
        feature: 'Unit Economics',
        us: `$${UNIT_ECONOMICS.customerAcquisitionCost.contractor} CAC`,
        competitor: '$500+ CAC',
        advantage: '50% Lower'
      },
      {
        feature: 'LTV/CAC Ratio',
        us: `${UNIT_ECONOMICS.ltvCacRatio.contractor.toFixed(1)}x`,
        competitor: '5-8x',
        advantage: 'Superior'
      },
      {
        feature: 'Market Focus',
        us: 'Claims Distribution',
        competitor: 'Direct Service',
        advantage: 'Scalable'
      },
      {
        feature: 'Strategic Positioning',
        us: 'Core Group Target',
        competitor: 'Independent',
        advantage: 'Exit Ready'
      }
    ],
    narration: `Our competitive advantages are sustainable and scalable. Asset-light technology platform versus traditional service providers. 
    Customer acquisition cost of just $${UNIT_ECONOMICS.customerAcquisitionCost.contractor} with ${UNIT_ECONOMICS.ltvCacRatio.contractor.toFixed(1)}x LTV/CAC ratio. 
    Claims distribution model that scales without proportional cost increases. 
    Strategic positioning as acquisition target for Core Group's Australian expansion. 
    We're building the platform they'll want to buy.`,
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
      year1: { revenue: FINANCIAL_PROJECTIONS.year1.revenue.total, costs: FINANCIAL_PROJECTIONS.year1.costs.total, ebitda: FINANCIAL_PROJECTIONS.year1.ebitda },
      year2: { revenue: FINANCIAL_PROJECTIONS.year2.revenue.total, costs: FINANCIAL_PROJECTIONS.year2.costs.total, ebitda: FINANCIAL_PROJECTIONS.year2.ebitda },
      year3: { revenue: FINANCIAL_PROJECTIONS.year3.revenue.total, costs: FINANCIAL_PROJECTIONS.year3.costs.total, ebitda: FINANCIAL_PROJECTIONS.year3.ebitda },
      year4: { revenue: FINANCIAL_PROJECTIONS.year4.revenue.total, costs: FINANCIAL_PROJECTIONS.year4.costs.total, ebitda: FINANCIAL_PROJECTIONS.year4.ebitda },
      year5: { revenue: FINANCIAL_PROJECTIONS.year5.revenue.total, costs: FINANCIAL_PROJECTIONS.year5.costs.total, ebitda: FINANCIAL_PROJECTIONS.year5.ebitda }
    },
    metrics: {
      cac: `$${UNIT_ECONOMICS.customerAcquisitionCost.contractor}`,
      ltv: `$${UNIT_ECONOMICS.lifetimeValue.contractor}`,
      ratio: `${UNIT_ECONOMICS.ltvCacRatio.contractor.toFixed(1)}x`,
      payback: UNIT_ECONOMICS.paybackPeriod.contractor,
      margin: `${Math.round(FINANCIAL_PROJECTIONS.year5.ebitdaMargin * 100)}%`
    },
    narration: `Our financials show steady growth with realistic unit economics. 
    Revenue scaling from $${FINANCIAL_PROJECTIONS.year1.revenue.total} million year 1 to $${FINANCIAL_PROJECTIONS.year5.revenue.total} million year 5. 
    EBITDA positive by year 2, reaching $${FINANCIAL_PROJECTIONS.year5.ebitda} million by year 5. 
    Customer acquisition cost of $${UNIT_ECONOMICS.customerAcquisitionCost.contractor} with lifetime value of $${UNIT_ECONOMICS.lifetimeValue.contractor} - a ${UNIT_ECONOMICS.ltvCacRatio.contractor.toFixed(1)}x ratio. 
    ${UNIT_ECONOMICS.paybackPeriod.contractor} payback period. ${Math.round(FINANCIAL_PROJECTIONS.year5.ebitdaMargin * 100)}% EBITDA margins at scale.`,
    duration: 20000
  },
  {
    id: 'investment',
    title: 'Investment Opportunity',
    type: 'investment',
    ask: {
      amount: `$${(INVESTMENT_ASK.amount / 1000000).toFixed(0)} Million`,
      valuation: `$${(INVESTMENT_ASK.preMoneyValuation / 1000000).toFixed(0)} Million`,
      equity: `${(INVESTMENT_ASK.equityOffered * 100).toFixed(0)}%`,
      use: [
        { category: 'Technology Development', amount: `$${(INVESTMENT_ASK.useOfFunds.technologyDevelopment.amount / 1000000).toFixed(1)}M`, percentage: 40 },
        { category: 'Market Acquisition', amount: `$${(INVESTMENT_ASK.useOfFunds.marketAcquisition.amount / 1000000).toFixed(1)}M`, percentage: 30 },
        { category: 'Team Building', amount: `$${(INVESTMENT_ASK.useOfFunds.teamBuilding.amount / 1000000).toFixed(1)}M`, percentage: 20 },
        { category: 'Working Capital', amount: `$${(INVESTMENT_ASK.useOfFunds.workingCapital.amount / 1000000).toFixed(1)}M`, percentage: 10 }
      ]
    },
    terms: {
      round: 'Series A',
      minimumInvestment: '$500K',
      leadInvestor: 'Seeking',
      closeDate: 'Q1 2025'
    },
    narration: `We're raising $${(INVESTMENT_ASK.amount / 1000000).toFixed(0)} million Series A at a $${(INVESTMENT_ASK.preMoneyValuation / 1000000).toFixed(0)} million valuation for ${(INVESTMENT_ASK.equityOffered * 100).toFixed(0)}% equity. 
    40% for technology development including AI matching and mobile apps. 
    30% for market acquisition through SEO and partnerships. 
    20% for team building with key hires including CTO and Head of Sales. 
    10% for working capital and regulatory requirements. 
    ${INVESTMENT_ASK.runway} runway to profitability and Series A readiness.`,
    duration: 18000
  },
  {
    id: 'strategic',
    title: 'Strategic Acquisition Target',
    type: 'strategic',
    coreGroup: {
      name: 'Core Group',
      coverage: '96% United States',
      network: '80+ restoration providers',
      achievement: '#1 TPA by RIA - Three Years Running',
      model: 'Technology-enabled restoration network'
    },
    cleanClaims: {
      opportunity: 'Introduce Clean Claims to Australia',
      market: 'Untapped $909M Australian market',
      synergy: 'Perfect strategic fit with Core model',
      timing: 'First-mover advantage in Australia'
    },
    positioning: {
      us: 'Australian market entry vehicle',
      them: 'Proven US restoration leader',
      together: 'Trans-Pacific restoration dominance',
      value: 'Ready-built platform for immediate scale'
    },
    narration: `Core Group dominates 96% of the US restoration market with 80+ providers and three consecutive years as #1 TPA. 
    They're the perfect strategic acquirer for our Australian platform. 
    We offer them immediate entry into Australia's $909 million untapped market. 
    Together, we can introduce Clean Claims to Australia while giving Core trans-Pacific market dominance. 
    We're not just building a business - we're building Core's Australian acquisition target.`,
    duration: 22000
  },
  {
    id: 'exit',
    title: 'Exit Strategy',
    type: 'exit',
    scenarios: [
      {
        acquirer: 'Core Group (USA)',
        multiple: `${COMPARABLES.realisticExitScenarios.base.multiple}x Revenue`,
        value: `$${COMPARABLES.realisticExitScenarios.base.valuation}M`,
        timeline: COMPARABLES.realisticExitScenarios.base.timeline
      },
      {
        acquirer: 'Johns Lyng Group',
        multiple: `${COMPARABLES.johnsLyngGroup.ebitdaMultiple}x EBITDA`,
        value: `$${COMPARABLES.realisticExitScenarios.optimistic.valuation}M`,
        timeline: COMPARABLES.realisticExitScenarios.optimistic.timeline
      },
      {
        acquirer: 'Private Equity',
        multiple: 'Conservative',
        value: `$${COMPARABLES.realisticExitScenarios.conservative.valuation}M`,
        timeline: COMPARABLES.realisticExitScenarios.conservative.timeline
      }
    ],
    comparables: [
      { company: COMPARABLES.johnsLyngGroup.company, exit: `$${COMPARABLES.johnsLyngGroup.marketCap}M Market Cap`, multiple: `${COMPARABLES.johnsLyngGroup.revenueMultiple}x Revenue` },
      { company: COMPARABLES.servicemaster.company, exit: `$${(COMPARABLES.servicemaster.salePrice / 1000).toFixed(1)}B Exit`, multiple: `${COMPARABLES.servicemaster.revenueMultiple}x Revenue` },
      { company: 'Core Group Network', exit: '96% US Coverage', multiple: 'Strategic Buyer' }
    ],
    narration: `Multiple strategic exit opportunities with realistic valuations. Core Group's 96% US market dominance makes them ideal acquirer for Australian expansion - ${COMPARABLES.realisticExitScenarios.base.multiple}x revenue multiple suggests $${COMPARABLES.realisticExitScenarios.base.valuation} million valuation. 
    Johns Lyng Group trades at ${COMPARABLES.johnsLyngGroup.ebitdaMultiple}x EBITDA, indicating potential $${COMPARABLES.realisticExitScenarios.optimistic.valuation} million acquisition. 
    ServiceMaster's $${(COMPARABLES.servicemaster.salePrice / 1000).toFixed(1)} billion exit at ${COMPARABLES.servicemaster.revenueMultiple}x revenue validates sector multiples. 
    We're positioning for Core Group acquisition as they expand into Australia.`,
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
  const [isPlaying, setIsPlaying] = useState(true); // Auto-start playing
  const [isMuted, setIsMuted] = useState(true); // Start muted for better UX
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
                      <p className="text-4xl font-bold text-green-400">${MARKET_REALITY.totalMarketSize.current}M</p>
                      <p className="text-sm text-gray-400">Market Size</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-blue-400">{FINANCIAL_PROJECTIONS.year5.contractors}</p>
                      <p className="text-sm text-gray-400">Contractors (Y5)</p>
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

            {currentSlideData.type === 'strategic' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-12">{currentSlideData.title}</h2>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-8 border border-blue-500/30">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Building2 className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{currentSlideData.coreGroup?.name}</h3>
                        <p className="text-blue-300">{currentSlideData.coreGroup?.model}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>US Coverage</span>
                        <span className="font-bold text-green-400">{currentSlideData.coreGroup?.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network Size</span>
                        <span className="font-bold text-blue-400">{currentSlideData.coreGroup?.network}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Industry Status</span>
                        <span className="font-bold text-yellow-400">{currentSlideData.coreGroup?.achievement}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 rounded-xl p-8 border border-emerald-500/30">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <Globe className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Australian Opportunity</h3>
                        <p className="text-emerald-300">Untapped Market Entry</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Clean Claims</span>
                        <span className="font-bold text-emerald-400">{currentSlideData.cleanClaims?.opportunity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Size</span>
                        <span className="font-bold text-green-400">{currentSlideData.cleanClaims?.market}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Strategic Fit</span>
                        <span className="font-bold text-yellow-400">{currentSlideData.cleanClaims?.synergy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timing</span>
                        <span className="font-bold text-purple-400">{currentSlideData.cleanClaims?.timing}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-center mb-8">Strategic Value Proposition</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-10 w-10" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">For Core Group</h4>
                      <p className="text-gray-300">{currentSlideData.positioning?.us}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowUpRight className="h-10 w-10" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Combined Power</h4>
                      <p className="text-gray-300">{currentSlideData.positioning?.together}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Rocket className="h-10 w-10" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Ready to Scale</h4>
                      <p className="text-gray-300">{currentSlideData.positioning?.value}</p>
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