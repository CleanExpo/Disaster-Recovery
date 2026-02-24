'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Maximize2,
  Volume2,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Zap,
  Shield,
  Brain,
  Rocket,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Youtube,
  PlayCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: JSX.Element;
  videoUrl?: string;
  duration?: number;
}

export default function PitchDeckPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Disaster Recovery Platform",
      subtitle: "Transforming Crisis into Opportunity",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_1",
      duration: 30,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              $1 Billion Market
            </h1>
            <p className="text-2xl text-gray-300">Australian Disaster Recovery Industry</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Rocket className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
              <p className="text-gray-300">27M parameter HRM brain technology</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <Globe className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">National Scale</h3>
              <p className="text-gray-300">Complete Australian coverage</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">10x Growth</h3>
              <p className="text-gray-300">Positioned for explosive expansion</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem",
      subtitle: "Current Market Inefficiencies",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_2",
      duration: 45,
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Industry Pain Points</h2>
              
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">60+ Minute Response Times</h4>
                    <p className="text-gray-200">Current industry average for initial contact</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Manual Processes</h4>
                    <p className="text-gray-200">Paper-based systems and phone tag</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Poor Contractor Matching</h4>
                    <p className="text-gray-200">Geographic and skill mismatches</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Market Impact</h2>
              
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lost Revenue</span>
                    <span className="text-2xl font-bold text-white">$200M/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer Churn</span>
                    <span className="text-2xl font-bold text-white">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Contractor Utilisation</span>
                    <span className="text-2xl font-bold text-white">< 60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "AI-Orchestrated Recovery Platform",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_3",
      duration: 60,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Revolutionary 3-Layer Architecture</h2>
          </div>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <Brain className="h-10 w-10 text-blue-600" />
                <h3 className="text-2xl font-bold text-white">Layer 1: HRM AI Brain</h3>
              </div>
              <p className="text-gray-300">AI-powered system for claim assessment, contractor matching, and analytics</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <Zap className="h-10 w-10 text-green-600" />
                <h3 className="text-2xl font-bold text-white">Layer 2: Instant Orchestration</h3>
              </div>
              <p className="text-gray-300">Automated workflow engine targeting rapid initial response times</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-10 w-10 text-purple-600" />
                <h3 className="text-2xl font-bold text-white">Layer 3: KPI-Driven Payments</h3>
              </div>
              <p className="text-gray-300">KPI-driven payment releases based on performance milestones</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Business Model",
      subtitle: "Multiple Revenue Streams",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_4",
      duration: 45,
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Revenue Streams</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Platform Fees</span>
                    <Badge className="bg-green-500/20 text-green-700">Primary</Badge>
                  </div>
                  <p className="text-gray-200 text-sm">$550 per claim (20% of total)</p>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-green-600" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Contractor Subscriptions</span>
                    <Badge className="bg-blue-500/20 text-blue-700">Growth</Badge>
                  </div>
                  <p className="text-gray-200 text-sm">$299-999/month premium features</p>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-blue-400 to-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Insurance API</span>
                    <Badge className="bg-purple-500/20 text-purple-700">Future</Badge>
                  </div>
                  <p className="text-gray-200 text-sm">Direct integration fees</p>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-to-r from-purple-400 to-purple-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Unit Economics</h3>
              
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-600">
                    <span className="text-gray-300">Average Claim Value</span>
                    <span className="text-2xl font-bold text-white">$2,750</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Platform Fee (20%)</span>
                    <span className="text-xl font-semibold text-green-600">$550</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Contractor Payment</span>
                    <span className="text-xl font-semibold text-white">$2,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Gross Margin</span>
                    <span className="text-xl font-semibold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                    <span className="text-gray-300">CAC Payback</span>
                    <span className="text-xl font-semibold text-white">2.3 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Traction & Growth",
      subtitle: "Proven Market Validation",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_5",
      duration: 40,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Growth Trajectory</h2>
            <p className="text-xl text-gray-300">Building towards sustainable growth</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
            >
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">$500K</div>
              <div className="text-sm text-gray-200">MRR Target</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
            >
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">150+</div>
              <div className="text-sm text-gray-200">Target Contractors</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
            >
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">25%+</div>
              <div className="text-sm text-gray-200">Growth Target</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
            >
              <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">7</div>
              <div className="text-sm text-gray-200">States Covered</div>
            </motion.div>
          </div>
          
          {/* Growth Chart */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Revenue Growth</h3>
            <div className="space-y-3">
              {['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'].map((quarter, index) => (
                <div key={quarter} className="flex items-center gap-4">
                  <span className="text-gray-200 w-20">{quarter}</span>
                  <div className="flex-1 h-8 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(index + 1) * 25}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-end pr-2"
                    >
                      <span className="text-xs text-white font-semibold">
                        ${['500K', '2M', '5M', '10M'][index]}/mo
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Competitive Advantage",
      subtitle: "Unbeatable Market Position",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_6",
      duration: 35,
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: "HRM AI Technology",
                description: "27M parameter brain-inspired AI",
                features: ["Instant claim assessment", "Predictive analytics", "Self-improving algorithms"]
              },
              {
                icon: Zap,
                title: "Network Effects",
                description: "Each user makes platform stronger",
                features: ["More contractors = better coverage", "More claims = better AI", "More data = better matching"]
              },
              {
                icon: Shield,
                title: "Insurance Integration",
                description: "Direct API connections",
                features: ["Real-time claim validation", "Instant payment processing", "Compliance automation"]
              },
              {
                icon: Globe,
                title: "Market Dominance",
                description: "First-mover advantage",
                features: ["National contractor network", "SEO monopoly strategy", "Brand recognition"]
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <advantage.icon className="h-10 w-10 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{advantage.title}</h3>
                    <p className="text-sm text-gray-200">{advantage.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {advantage.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Investment Opportunity",
      subtitle: "Join the Revolution",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_7",
      duration: 50,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">$5M Series A</h2>
            <p className="text-xl text-gray-300">Accelerate National Dominance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Use of Funds</h3>
              
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Technology Development</span>
                    <span className="text-gray-200">40%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Market Expansion</span>
                    <span className="text-gray-200">30%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-green-500" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Sales & Marketing</span>
                    <span className="text-gray-200">20%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-purple-500" />
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Operations</span>
                    <span className="text-gray-200">10%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[10%] bg-orange-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Investment Terms</h3>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Valuation</span>
                    <span className="text-xl font-bold text-white">$20M pre-money</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Investment</span>
                    <span className="text-xl font-bold text-green-600">$5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Equity</span>
                    <span className="text-xl font-bold text-white">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Expected Exit</span>
                    <span className="text-xl font-bold text-purple-600">5-10x target</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-6 w-6 text-green-600" />
                  <span className="text-white font-semibold">Why Now?</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Market timing perfect post-disasters</li>
                  <li>• AI technology maturity</li>
                  <li>• Proven unit economics</li>
                  <li>• Clear path to profitability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Government Funding Opportunities",
      subtitle: "Strategic Public Sector Alignment",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_8",
      duration: 35,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Government Support & Grants</h2>
            <p className="text-xl text-gray-300">Exploring strategic funding partnerships</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Available Programs</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Disaster Recovery Grants</h4>
                  <p className="text-gray-200 text-sm">Federal and state programs for disaster resilience</p>
                  <p className="text-green-600 text-sm mt-2">Potential: $1-5M</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Innovation & Technology Grants</h4>
                  <p className="text-gray-200 text-sm">R&D tax incentives and AI development support</p>
                  <p className="text-green-600 text-sm mt-2">Potential: $500K-2M</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Regional Development</h4>
                  <p className="text-gray-200 text-sm">Support for services in underserved areas</p>
                  <p className="text-green-600 text-sm mt-2">Potential: $250K-1M</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Strategic Alignment</h3>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-white font-semibold">National Resilience</p>
                      <p className="text-gray-200 text-sm">Supporting government disaster response objectives</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Job Creation</p>
                      <p className="text-gray-200 text-sm">Empowering contractor network nationwide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Community Support</p>
                      <p className="text-gray-200 text-sm">Faster recovery for affected communities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Data & Insights</p>
                      <p className="text-gray-200 text-sm">Valuable disaster recovery data for policy</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
                <h4 className="text-white font-semibold mb-2">Active Exploration</h4>
                <p className="text-gray-300 text-sm">Currently engaging with government agencies to identify partnership opportunities and grant programs aligned with our mission.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "The Team",
      subtitle: "Industry Veterans & AI Experts",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_9",
      duration: 30,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Leadership Team</h2>
            <p className="text-xl text-gray-300">20+ Years Combined Experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">CEO & Founder</h3>
              <p className="text-gray-200 mb-3">Disaster Recovery Expert</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• 15+ years in insurance</p>
                <p>• Former restoration company owner</p>
                <p>• $50M+ in claims managed</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">CTO</h3>
              <p className="text-gray-200 mb-3">AI & ML Expert</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• PhD in Neural Networks</p>
                <p>• Ex-Google AI researcher</p>
                <p>• 10+ AI patents</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">COO</h3>
              <p className="text-gray-200 mb-3">Operations Specialist</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• Ex-Uber marketplace lead</p>
                <p>• Scaled 3 startups to exit</p>
                <p>• Network effects expert</p>
              </div>
            </motion.div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Advisory Board</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Former Insurance CEO",
                "Government Relations Expert", 
                "AI Ethics Professor",
                "Venture Partner"
              ].map((advisor, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-300">{advisor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Next Steps",
      subtitle: "Join Us in Transforming an Industry",
      videoUrl: "https://youtube.com/embed/PLACEHOLDER_VIDEO_10",
      duration: 25,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-white mb-4">Let's Build the Future Together</h2>
            <p className="text-2xl text-gray-300">The opportunity is now</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Schedule Deep Dive</h3>
                <p className="text-gray-300">2-hour session with leadership team</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Due Diligence</h3>
                <p className="text-gray-300">Full access to metrics, tech, and team</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Term Sheet</h3>
                <p className="text-gray-300">Target close in 30 days</p>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <div className="space-y-2 text-gray-300">
                <p>Email: invest@disasterrecovery.com.au</p>
                <p>Phone: 1300 DISASTER</p>
                <p>LinkedIn: /company/disaster-recovery-au</p>
              </div>
              <Button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
                Schedule Meeting Now
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const currentSlideDuration = slides[currentSlide].duration || 30;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + (100 / currentSlideDuration);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, slides.length]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Investor Pitch Deck</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-white border-white/30">
                Slide {currentSlide + 1} of {slides.length}
              </Badge>
              <Button
                onClick={() => setShowVideo(!showVideo)}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
              >
                <Youtube className="h-4 w-4 mr-2" />
                {showVideo ? 'Hide Video' : 'Show Video'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Video Player Placeholder */}
          {showVideo && (
            <Card className="mb-8 bg-black/50 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="h-16 w-16 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70 mb-2">YouTube Video Placeholder</p>
                    <p className="text-sm text-white/50">Video URL: {slides[currentSlide].videoUrl}</p>
                    <p className="text-xs text-white/30 mt-2">Replace with actual YouTube embed when URL is provided</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide Content */}
          <Card className="bg-black/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              {/* Slide Header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {slides[currentSlide].title}
                </h2>
                {slides[currentSlide].subtitle && (
                  <p className="text-xl text-gray-200">{slides[currentSlide].subtitle}</p>
                )}
              </div>

              {/* Slide Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[500px]"
                >
                  {slides[currentSlide].content}
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-200">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>

              {/* Slide Navigation Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}