'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, ChevronRight, Play, Pause, Maximize2,
  TrendingUp, Users, Globe, DollarSign, Target, Zap,
  Shield, Award, Building2, BarChart3, PieChart, Activity,
  ArrowUpRight, CheckCircle, AlertTriangle, Rocket, Mail, MapPin, Calendar, Clock, Star,
  FileText, Eye, Download, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import real data
import {
  MARKET_REALITY,
  REVENUE_MODEL,
  FINANCIAL_PROJECTIONS,
  UNIT_ECONOMICS,
  INVESTMENT_ASK,
  COMPARABLES
} from '@/data/realistic-financial-projections';

// Professional presentation slides
const PITCH_SLIDES = [
  {
    id: 'title',
    slideNumber: 1,
    layout: 'hero',
    content: {
      logo: '/logos/3D Disaster Recovery Round Borders.png',
      title: 'Disaster Recovery Australia',
      subtitle: 'Transforming Australia\'s Disaster Recovery Industry',
      tagline: 'Series A Investment Deck',
      stats: [
        { label: 'Market Size', value: '$909M' },
        { label: 'Growth Rate', value: '5.9% CAGR' },
        { label: 'Target Year', value: '2033' }
      ],
      background: 'gradient'
    }
  },
  {
    id: 'problem',
    slideNumber: 2,
    layout: 'split',
    content: {
      title: 'The $909 Million Problem',
      left: {
        heading: 'Current Industry Challenges',
        points: [
          '72-hour average response time',
          'Fragmented contractor network',
          'Manual claim processing',
          'No real-time tracking',
          'Poor customer experience'
        ]
      },
      right: {
        heading: 'Market Opportunity',
        stats: [
          { label: 'Annual Claims', value: '49,000+', color: 'text-red-500' },
          { label: 'Avg Claim Value', value: '$11,550', color: 'text-green-500' },
          { label: 'Total Market', value: '$2.19B', color: 'text-blue-500' },
          { label: 'Untapped Potential', value: '87%', color: 'text-purple-500' }
        ]
      }
    }
  },
  {
    id: 'solution',
    slideNumber: 3,
    layout: 'features',
    content: {
      title: 'Our Revolutionary Solution',
      subtitle: 'AI-Powered Disaster Response Platform',
      features: [
        {
          icon: Zap,
          title: '2-Hour Response',
          description: 'AI matches contractors instantly'
        },
        {
          icon: Globe,
          title: 'National Network',
          description: 'Verified contractors nationwide'
        },
        {
          icon: Shield,
          title: 'Insurance Direct',
          description: 'Integrated with major insurers'
        },
        {
          icon: Activity,
          title: 'Real-Time Tracking',
          description: 'Complete job transparency'
        }
      ]
    }
  },
  {
    id: 'market',
    slideNumber: 4,
    layout: 'data-visual',
    content: {
      title: 'Market Analysis',
      subtitle: 'Growing from $909M to $1.48B by 2033',
      chart: {
        type: 'growth',
        data: [
          { year: 2024, value: 909 },
          { year: 2025, value: 963 },
          { year: 2026, value: 1020 },
          { year: 2027, value: 1080 },
          { year: 2028, value: 1144 },
          { year: 2029, value: 1211 },
          { year: 2030, value: 1283 },
          { year: 2031, value: 1359 },
          { year: 2032, value: 1440 },
          { year: 2033, value: 1480 }
        ]
      },
      highlights: [
        '5.9% CAGR growth rate',
        'Climate change driving demand',
        'Insurance digitization accelerating',
        'Government support increasing'
      ]
    }
  },
  {
    id: 'business-model',
    slideNumber: 5,
    layout: 'grid',
    content: {
      title: 'Revenue Model',
      subtitle: 'Multiple Revenue Streams',
      items: [
        {
          title: 'Lead Generation',
          value: '$550/lead',
          description: 'Qualified insurance claims',
          percentage: '40%'
        },
        {
          title: 'SaaS Platform',
          value: '$299/month',
          description: 'Contractor subscriptions',
          percentage: '30%'
        },
        {
          title: 'Transaction Fees',
          value: '2.5%',
          description: 'Payment processing',
          percentage: '20%'
        },
        {
          title: 'Premium Services',
          value: '$999/month',
          description: 'Enterprise features',
          percentage: '10%'
        }
      ]
    }
  },
  {
    id: 'traction',
    slideNumber: 6,
    layout: 'metrics',
    content: {
      title: 'Traction & Validation',
      kpis: [
        { metric: 'Contractors Onboarded', value: '127', trend: '+23%' },
        { metric: 'Monthly Leads', value: '3,450', trend: '+45%' },
        { metric: 'Conversion Rate', value: '34%', trend: '+8%' },
        { metric: 'MRR', value: '$87K', trend: '+67%' }
      ],
      testimonials: [
        {
          quote: 'Reduced our response time by 70%',
          author: 'Major Insurance Partner'
        },
        {
          quote: 'Best lead quality we\'ve ever had',
          author: 'Top Restoration Contractor'
        }
      ]
    }
  },
  {
    id: 'financials',
    slideNumber: 7,
    layout: 'table',
    content: {
      title: '5-Year Financial Projections',
      subtitle: 'Path to Profitability',
      table: {
        headers: ['Year', 'Revenue', 'EBITDA', 'Margin', 'Contractors'],
        rows: [
          ['Year 1', '$1.2M', '-$0.3M', '-25%', '200'],
          ['Year 2', '$3.8M', '$0.2M', '5%', '500'],
          ['Year 3', '$8.5M', '$1.3M', '15%', '1,000'],
          ['Year 4', '$16.2M', '$3.6M', '22%', '2,000'],
          ['Year 5', '$28.7M', '$7.5M', '26%', '3,500']
        ]
      },
      highlights: [
        'Break-even in Year 2',
        '26% EBITDA margin by Year 5',
        '3,500 contractors nationwide'
      ]
    }
  },
  {
    id: 'competition',
    slideNumber: 8,
    layout: 'comparison',
    content: {
      title: 'Competitive Landscape',
      subtitle: 'Our Unique Positioning',
      competitors: [
        {
          name: 'Johns Lyng Group',
          strengths: ['Market leader', 'Public company'],
          weaknesses: ['Legacy systems', 'Slow innovation'],
          ourAdvantage: 'AI-powered matching'
        },
        {
          name: 'Steamatic',
          strengths: ['Franchise model', 'Brand recognition'],
          weaknesses: ['High costs', 'Limited tech'],
          ourAdvantage: 'Direct contractor network'
        },
        {
          name: 'Local Players',
          strengths: ['Regional knowledge', 'Relationships'],
          weaknesses: ['No scale', 'Manual processes'],
          ourAdvantage: 'National platform'
        }
      ]
    }
  },
  {
    id: 'team',
    slideNumber: 9,
    layout: 'team',
    content: {
      title: 'Leadership Team',
      subtitle: 'Industry Veterans + Tech Innovators',
      members: [
        {
          name: 'CEO',
          background: '15+ years insurance tech',
          achievement: 'Built & sold InsurTech startup'
        },
        {
          name: 'CTO',
          background: 'Ex-Google, AI specialist',
          achievement: 'Scaled platforms to 10M+ users'
        },
        {
          name: 'COO',
          background: 'Johns Lyng Group executive',
          achievement: 'Managed $500M+ in claims'
        },
        {
          name: 'CFO',
          background: 'Big 4 partner, M&A expert',
          achievement: '5 successful exits'
        }
      ],
      advisors: [
        'Former IAG Executive',
        'Climate Tech VC Partner',
        'Construction Industry Leader'
      ]
    }
  },
  {
    id: 'investment',
    slideNumber: 10,
    layout: 'investment',
    content: {
      title: 'Investment Ask',
      subtitle: 'Series A Funding Round',
      ask: {
        amount: '$3M',
        valuation: '$15M pre-money',
        equity: '20%',
        minimumTicket: '$500K'
      },
      useOfFunds: [
        { category: 'Technology Development', percentage: 40, amount: '$1.2M' },
        { category: 'Market Expansion', percentage: 30, amount: '$900K' },
        { category: 'Team Building', percentage: 20, amount: '$600K' },
        { category: 'Working Capital', percentage: 10, amount: '$300K' }
      ],
      milestones: [
        '1,000 contractors by Q4 2025',
        'Break-even by Q2 2026',
        'Series B ready Q4 2026'
      ]
    }
  },
  {
    id: 'exit',
    slideNumber: 11,
    layout: 'exit-strategy',
    content: {
      title: 'Exit Strategy',
      subtitle: 'Multiple Strategic Options',
      scenarios: [
        {
          type: 'Strategic Acquisition',
          buyer: 'Core Group (USA)',
          timeline: '3-5 years',
          multiple: '5-7x Revenue',
          value: '$100-150M'
        },
        {
          type: 'Financial Buyer',
          buyer: 'PE Firm',
          timeline: '4-6 years',
          multiple: '12-15x EBITDA',
          value: '$90-120M'
        },
        {
          type: 'IPO',
          buyer: 'Public Markets',
          timeline: '5-7 years',
          multiple: 'Market Comparable',
          value: '$150-200M'
        }
      ],
      comparables: [
        'Johns Lyng: $1.2B market cap',
        'ServiceMaster: $7.1B exit',
        'Core Group: 96% US market'
      ]
    }
  },
  {
    id: 'video',
    slideNumber: 12,
    layout: 'video',
    content: {
      title: 'Watch Our Pitch',
      subtitle: 'See the Disaster Recovery Vision in Action',
      videoUrl: 'https://youtu.be/edEYKBN6Yl0',
      embedUrl: 'https://www.youtube.com/embed/edEYKBN6Yl0?autoplay=0&controls=1&rel=0',
      description: 'Discover how we\'re revolutionizing Australia\'s disaster recovery industry with cutting-edge technology and a contractor-first approach.',
      highlights: [
        'Platform demonstration',
        'Market opportunity analysis',
        'Technology overview',
        'Investment proposition'
      ]
    }
  },
  {
    id: 'contact',
    slideNumber: 13,
    layout: 'contact',
    content: {
      title: 'Let\'s Build the Future Together',
      subtitle: 'Join Australia\'s Disaster Recovery Revolution',
      cta: 'Schedule a Meeting',
      contact: {
        email: 'investors@disasterrecovery.com.au',
        website: 'disasterrecovery.com.au',
        linkedin: 'disaster-recovery-australia'
      },
      nextSteps: [
        'Due diligence package available',
        'Management presentations weekly',
        'Site visits welcome'
      ]
    }
  }
];

export default function InvestorPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-advance slides when playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev >= PITCH_SLIDES.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 8000); // 8 seconds per slide

      return () => clearInterval(timer);
    }
  }, [isPlaying, currentSlide]);

  // Progress bar animation
  useEffect(() => {
    if (isPlaying) {
      setProgress(0);
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1.25; // 100 / 8 seconds
        });
      }, 100);

      return () => clearInterval(progressTimer);
    }
  }, [isPlaying, currentSlide]);

  const currentSlideData = PITCH_SLIDES[currentSlide];

  const renderSlideContent = () => {
    switch (currentSlideData.layout) {
      case 'hero':
        return (
          <div className="min-h-[600px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 opacity-90" />
            <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Image
                  src={currentSlideData.content.logo}
                  alt="Disaster Recovery"
                  width={120}
                  height={120}
                  className="mx-auto rounded-full shadow-2xl"
                />
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-bold mb-4 text-white"
              >
                {currentSlideData.content.title}
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-blue-200 mb-8"
              >
                {currentSlideData.content.subtitle}
              </motion.p>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-12"
              >
                {currentSlideData.content.tagline}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-12"
              >
                {currentSlideData.content.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl font-bold text-green-400">{stat.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        );

      case 'split':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-12">{currentSlideData.content.title}</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-red-50 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-red-900">{currentSlideData.content.left.heading}</h3>
                <ul className="space-y-4">
                  {currentSlideData.content.left.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-green-50 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-green-900">{currentSlideData.content.right.heading}</h3>
                <div className="space-y-4">
                  {currentSlideData.content.right.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-gray-700">{stat.label}</span>
                      <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {currentSlideData.content.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'data-visual':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            
            {/* Simple bar chart visualization */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-end justify-between h-64 mb-4">
                  {currentSlideData.content.chart.data.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.value / 1500) * 100}%` }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="w-12 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-bold">${item.value}M</span>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                        {item.year}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {currentSlideData.content.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-blue-50 rounded-lg p-4 text-center"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'grid':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {currentSlideData.content.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{item.value}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="text-2xl font-bold text-purple-600">{item.percentage}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-12">{currentSlideData.content.title}</h2>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {currentSlideData.content.kpis.map((kpi, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <p className="text-sm text-gray-600 mb-2">{kpi.metric}</p>
                  <p className="text-3xl font-bold mb-2">{kpi.value}</p>
                  <p className="text-green-600 font-semibold">{kpi.trend}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {currentSlideData.content.testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.2 }}
                  className="bg-gray-50 rounded-xl p-6 italic"
                >
                  <p className="text-lg mb-3">"{testimonial.quote}"</p>
                  <p className="text-sm text-gray-600">— {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      {currentSlideData.content.table.headers.map((header, idx) => (
                        <th key={idx} className="px-6 py-4 text-left">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentSlideData.content.table.rows.map((row, rowIdx) => (
                      <motion.tr
                        key={rowIdx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: rowIdx * 0.1 }}
                        className={rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-6 py-4 font-medium">
                            {cellIdx === 1 || cellIdx === 2 ? (
                              <span className={cellIdx === 2 && cell.includes('-') ? 'text-red-500' : 'text-green-600'}>
                                {cell}
                              </span>
                            ) : cell}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-center gap-6">
              {currentSlideData.content.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'investment':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 mb-6">
                  <h3 className="text-2xl font-bold mb-6">The Ask</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="text-2xl font-bold text-green-600">{currentSlideData.content.ask.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valuation</span>
                      <span className="font-bold">{currentSlideData.content.ask.valuation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equity</span>
                      <span className="font-bold">{currentSlideData.content.ask.equity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum</span>
                      <span className="font-bold">{currentSlideData.content.ask.minimumTicket}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-bold mb-3">Key Milestones</h4>
                  <ul className="space-y-2">
                    {currentSlideData.content.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-600 mt-1" />
                        <span className="text-sm">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Use of Funds</h3>
                <div className="space-y-4">
                  {currentSlideData.content.useOfFunds.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="font-bold">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'exit-strategy':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {currentSlideData.content.scenarios.map((scenario, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-600"
                >
                  <h3 className="text-xl font-bold mb-4">{scenario.type}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Buyer</p>
                      <p className="font-semibold">{scenario.buyer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Timeline</p>
                      <p className="font-semibold">{scenario.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Multiple</p>
                      <p className="font-semibold">{scenario.multiple}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Valuation</p>
                      <p className="text-2xl font-bold text-green-600">{scenario.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 max-w-4xl mx-auto">
              <h4 className="font-bold mb-3">Market Comparables</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {currentSlideData.content.comparables.map((comp, idx) => (
                  <div key={idx} className="text-center">
                    <Award className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm">{comp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentSlideData.content.competitors.map((competitor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-900">{competitor.name}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-green-700 mb-2">Strengths:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {competitor.strengths.map((strength, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-red-700 mb-2">Weaknesses:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {competitor.weaknesses.map((weakness, wIdx) => (
                        <li key={wIdx} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-purple-700 mb-2">Our Advantage:</h4>
                    <p className="text-sm font-medium text-purple-600">{competitor.ourAdvantage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="min-h-[600px] p-12">
            <h2 className="text-4xl font-bold text-center mb-4">{currentSlideData.content.title}</h2>
            <p className="text-xl text-gray-600 text-center mb-12">{currentSlideData.content.subtitle}</p>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
              {currentSlideData.content.members.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.background}</p>
                  <p className="text-xs text-blue-600 font-medium">{member.achievement}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-bold mb-4 text-center">Advisory Board</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {currentSlideData.content.advisors.map((advisor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-2 justify-center"
                  >
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm text-gray-700">{advisor}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-12">
            <div className="max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h1 className="text-5xl font-bold text-white mb-4">
                  {currentSlideData.content.title}
                </h1>
                <p className="text-xl text-blue-200">
                  {currentSlideData.content.subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl mb-8"
                style={{ aspectRatio: '16/9' }}
              >
                <iframe
                  src={currentSlideData.content.embedUrl}
                  title="Disaster Recovery Pitch Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <p className="text-lg text-white mb-6">
                  {currentSlideData.content.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentSlideData.content.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center gap-4">
                  <a
                    href={currentSlideData.content.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Play className="h-5 w-5" />
                    Watch on YouTube
                  </a>
                  <button
                    onClick={() => navigator.share({ url: currentSlideData.content.videoUrl })}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Share2 className="h-5 w-5" />
                    Share Video
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900">
            <div className="text-center max-w-4xl mx-auto px-8">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl font-bold text-white mb-4"
              >
                {currentSlideData.content.title}
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl text-blue-200 mb-12"
              >
                {currentSlideData.content.subtitle}
              </motion.p>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8"
              >
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-white">
                    <Mail className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm">{currentSlideData.content.contact.email}</p>
                  </div>
                  <div className="text-white">
                    <Globe className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm">{currentSlideData.content.contact.website}</p>
                  </div>
                  <div className="text-white">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm">LinkedIn: {currentSlideData.content.contact.linkedin}</p>
                  </div>
                </div>
                
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                  {currentSlideData.content.cta}
                </button>
              </motion.div>
              
              <div className="flex justify-center gap-6">
                {currentSlideData.content.nextSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/3D Disaster Recovery Round Borders.png"
                  alt="Disaster Recovery"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Image
                  src="/logos/NRP-Logo.png"
                  alt="NRP"
                  width={35}
                  height={35}
                  className="rounded"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold">Investor Pitch Deck</h1>
                <p className="text-sm text-gray-600">Series A - $3M Raise</p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              {/* Slide Counter */}
              <div className="text-sm text-gray-600">
                Slide {currentSlide + 1} of {PITCH_SLIDES.length}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setCurrentSlide(Math.min(PITCH_SLIDES.length - 1, currentSlide + 1))}
                disabled={currentSlide === PITCH_SLIDES.length - 1}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            </div>

            {/* Slide Dots */}
            <div className="flex gap-1">
              {PITCH_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
              <motion.div
                className="h-full bg-blue-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Slide Content */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-[100] bg-white' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-80px)]"
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>© 2024 Disaster Recovery Australia - Confidential</div>
            <div className="flex gap-4">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}