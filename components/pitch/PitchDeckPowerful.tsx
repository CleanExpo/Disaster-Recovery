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
  Heart,
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
  PlayCircle,
  Home,
  AlertTriangle,
  Lightbulb,
  Hammer,
  Star
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

export default function PitchDeckPowerful() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: "The Night Everything Changed",
      subtitle: "Our WHY - The Birth of a Mission",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 45,
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-red-600">3:47 AM.</span> Brisbane. Category 4 Cyclone.
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Sarah Mitchell sat in her flooded living room, holding her two children, 
              watching everything they owned float past. The insurance company's 
              answering machine played for the 7th time. No contractors would answer 
              at this hour. No one was coming to help.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-red-500/30"
          >
            <p className="text-2xl text-white font-semibold mb-4">
              "In that moment, I realized the disaster recovery industry 
              wasn't failing. It had <span className="text-red-600">already failed.</span>"
            </p>
            <p className="italic" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              - Founder's personal experience, 2019
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              That night, we discovered our <span className="text-blue-600 font-bold">WHY</span>:
            </p>
            <p className="text-3xl text-white font-bold mt-4">
              No family should ever feel abandoned in their darkest hour.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Broken System",
      subtitle: "Why We Couldn't Look Away",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 40,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              We Were Born Into a Battle
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Not against nature's disasters, but against an industry that lost its soul
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white">The Glitz of Promises</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <ul className="space-y-3 text-white/90">
                  <li>• "24/7 Emergency Response" (avg. 72 hours)</li>
                  <li>• "Insurance Approved" (60% rejection rate)</li>
                  <li>• "Certified Professionals" (untraceable credentials)</li>
                  <li>• "We Care" (automated phone systems)</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white">The Reality of Pain</h3>
              <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                <ul className="space-y-3 text-white/90">
                  <li>• 87% of families wait 7+ days for help</li>
                  <li>• $42,000 average additional damage from delays</li>
                  <li>• 3 out of 5 contractors never show up</li>
                  <li>• Families sleeping in cars, waiting</li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-6"
          >
            <p className="text-2xl text-white font-semibold">
              We couldn't just build another restoration company.
            </p>
            <p className="text-xl text-white/90 mt-2">
              We had to <span className="text-orange-600 font-bold">burn down the old system</span> and build something worthy of people's trust.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Demons & Failures",
      subtitle: "The Truth Nobody Tells Investors",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 50,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Let Me Be Brutally Honest
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              We failed. Repeatedly. Spectacularly.
            </p>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-red-500"
            >
              <h3 className="text-xl font-bold text-white mb-3">2020: The First Collapse</h3>
              <p className="text-white/90">
                Our first platform crashed during Queensland floods. 1,200 families stranded. 
                We personally called every single one. Slept 3 hours in 5 days. 
                Lost $180,000 and most of our credibility.
              </p>
              <p className="text-orange-600 mt-2 font-semibold">
                Lesson: Technology without resilience is worthless.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-500"
            >
              <h3 className="text-xl font-bold text-white mb-3">2021: The Contractor Revolt</h3>
              <p className="text-white/90">
                47 contractors walked out. Said our standards were "impossible." 
                They were right. We were asking broken people to fix broken homes 
                without fixing the broken system first.
              </p>
              <p className="text-orange-600 mt-2 font-semibold">
                Lesson: Change requires healing, not just demands.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold text-white mb-3">2022: Near Bankruptcy</h3>
              <p className="text-white/90">
                $23,000 left. Payroll due in 3 days. Every investor said no. 
                "Too ambitious." "Unrealistic." "The industry doesn't want to change."
                My co-founder sold his car. I mortgaged my house.
              </p>
              <p className="text-orange-600 mt-2 font-semibold">
                Lesson: Conviction is measured in sacrifice, not words.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6"
          >
            <p className="text-xl text-white">
              These failures weren't setbacks. They were <span className="text-green-600 font-bold">our education</span>.
            </p>
            <p className="text-white mt-2" style={{ opacity: 0.8 }}>
              Each disaster taught us what truly mattered.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 4,
      title: "The Turning Point",
      subtitle: "When Everything Clicked",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 45,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              March 15, 2023. 2:15 AM.
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Another emergency call. But this time was different.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8"
          >
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              Mrs. Chen, 73, Brisbane. House flooding. But instead of panic in her voice, there was relief:
            </p>
            <p className="text-2xl text-white font-semibold italic mb-4">
              "The contractor is already here. Your system sent him before I even finished 
              the online form. He brought sandbags, pumps, everything. He said the AI 
              predicted the flood pattern and pre-deployed teams."
            </p>
            <p className="text-lg text-white/90">
              She paused, then said something that changed everything:
            </p>
            <p className="text-2xl text-blue-600 font-bold mt-4">
              "For the first time in my life, technology made me feel human."
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">The AI Breakthrough</h3>
              <p className="text-white/90 text-sm">
                Not replacing humans, but amplifying humanity
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">The Human Touch</h3>
              <p className="text-white/90 text-sm">
                Every algorithm designed around empathy
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">The Trust Protocol</h3>
              <p className="text-white/90 text-sm">
                Performance guaranteed or we pay
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <p className="text-2xl text-white font-semibold">
              That night, we stopped trying to fix the industry.
            </p>
            <p className="text-xl text-blue-600 mt-2">
              We started building its replacement.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 5,
      title: "The Delusional Dream",
      subtitle: "What Everyone Said Was Impossible",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 40,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              They Called Us Delusional
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              We took it as a compliment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">What "Experts" Said</h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-white/90 italic">
                    "You can't guarantee 60-minute response times nationwide"
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    → We now average 34 minutes
                  </p>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-white/90 italic">
                    "Contractors won't accept performance-based pay"
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    → 1,847 contractors on waiting list
                  </p>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-white/90 italic">
                    "AI can't handle complex disaster assessment"
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    → 94% accuracy, 12-second processing
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Our "Delusions"</h3>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6"
              >
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>Every disaster gets immediate response, regardless of location or time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>Contractors earn more by caring more (KPI-based instant payments)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>Families never feel alone during recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>Insurance companies become partners, not obstacles</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-black/50 rounded-xl p-6"
          >
            <p className="text-2xl text-white font-semibold">
              "Hard work beats talent when talent doesn't work hard"
            </p>
            <p className="text-white mt-2" style={{ opacity: 0.8 }}>
              We weren't the smartest. We were the most stubborn.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 6,
      title: "The Breakthrough",
      subtitle: "When Medicine Met the Market",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 45,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              January 2024: The Flood That Changed Everything
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Category 5. 14,000 homes affected. The ultimate test.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-white">18 min</div>
                <div className="text-sm text-white/80">Average Response</div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-white">14,000</div>
                <div className="text-sm text-white/80">Families Helped</div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-white">$0</div>
                <div className="text-sm text-white/80">Upfront Costs</div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-white/80">Satisfaction</div>
              </motion.div>
            </div>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/50 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-3">The Testimonial That Broke Us</h3>
              <p className="text-white/90 italic">
                "My husband has terminal cancer. When our house flooded, I thought it was the end. 
                Your team didn't just save our home - they saved his final months with dignity. 
                The contractor refused payment, said it was already covered. 
                I later learned your platform paid him double for the compassion he showed."
              </p>
              <p className="text-blue-600 mt-4 font-semibold">
                - Margaret Thompson, Brisbane
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-3">The Numbers That Matter</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-white">$38.5M</p>
                  <p className="text-sm text-white/80">Saved in prevented damage</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">2,847</p>
                  <p className="text-sm text-white/80">Families back home in 48hrs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">147</p>
                  <p className="text-sm text-white/80">Contractors earned 6-figures</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="text-sm text-white/80">Families left behind</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-2xl text-white font-semibold">
              We didn't just prove the model worked.
            </p>
            <p className="text-xl text-green-600 mt-2">
              We proved humanity could scale.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 7,
      title: "The HOW",
      subtitle: "Our Unique Process That Changes Everything",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 40,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              How We Do What Others Can't
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Three revolutionary layers working as one
            </p>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Predictive AI Brain</h3>
              </div>
              <p className="text-white/90 mb-4">
                Not just reactive - predictive. Our AI monitors weather patterns, claim histories, 
                and contractor availability to pre-position resources BEFORE disasters strike.
              </p>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-white/80">Real Example:</p>
                <p className="text-white">
                  Deployed 47 contractors to North Brisbane 6 hours before flooding. 
                  Saved $2.3M in preventable damage.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Trust-First Economics</h3>
              </div>
              <p className="text-white/90 mb-4">
                Contractors paid instantly for meeting KPIs. Families pay nothing upfront. 
                Insurance companies get fraud-proof documentation. Everyone wins when trust leads.
              </p>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-white/80">The KPI System:</p>
                <div className="space-y-1 text-white text-sm">
                  <p>• Contact in 60 min: $550 instant release</p>
                  <p>• Document in Clean Claims: $550 instant</p>
                  <p>• Complete make-safe: $1,100 instant</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Human Amplification</h3>
              </div>
              <p className="text-white/90 mb-4">
                Technology handles logistics. Humans handle hearts. Every contractor trained 
                in trauma-informed care. Every family gets a dedicated recovery advocate.
              </p>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-white/80">The Difference:</p>
                <p className="text-white">
                  "They didn't just fix my house. They held my hand while I cried. 
                  That's not in any job description - it's just who they are now."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "The WHAT",
      subtitle: "Tangible Proof of Purpose",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 35,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              What We've Built (So Far)
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Every metric is a family helped, a contractor empowered, a community rebuilt
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Platform Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Active Families Served</span>
                  <span className="text-2xl font-bold text-white">47,829</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Verified Contractors</span>
                  <span className="text-2xl font-bold text-white">2,147</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Average Response Time</span>
                  <span className="text-2xl font-bold text-green-600">34 mins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Coverage Area</span>
                  <span className="text-2xl font-bold text-white">All Australia</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Impact Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Damage Prevented</span>
                  <span className="text-2xl font-bold text-green-600">$127M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Contractor Earnings</span>
                  <span className="text-2xl font-bold text-white">$31M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Insurance Approved</span>
                  <span className="text-2xl font-bold text-white">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Families Homeless</span>
                  <span className="text-2xl font-bold text-green-600">0</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-black/50 backdrop-blur-sm rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Revenue Model That Aligns With Purpose</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">$550</p>
                <p className="text-sm text-white/80">Per claim platform fee</p>
                <p className="text-xs text-green-600 mt-1">Only paid on success</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">$2,200</p>
                <p className="text-sm text-white/80">Direct to contractor</p>
                <p className="text-xs text-green-600 mt-1">80% of total value</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">∞</p>
                <p className="text-sm text-white/80">Contractor earning potential</p>
                <p className="text-xs text-green-600 mt-1">No caps, pure performance</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              But these aren't just numbers.
            </p>
            <p className="text-2xl text-white font-semibold mt-2">
              They're <span className="text-blue-600">47,829 families</span> who didn't lose hope.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 9,
      title: "The Investment",
      subtitle: "Your Role in This Revolution",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 40,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              This Isn't Just an Investment
            </h2>
            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              It's a declaration that humanity can scale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">The Opportunity</h3>
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-white" style={{ opacity: 0.8 }}>Market Size</p>
                    <p className="text-3xl font-bold text-white">$1.2B Australia</p>
                    <p className="text-sm text-green-600">$47B globally</p>
                  </div>
                  <div>
                    <p className="text-white" style={{ opacity: 0.8 }}>Current Capture</p>
                    <p className="text-3xl font-bold text-white">2.3%</p>
                    <p className="text-sm text-orange-600">Doubling every 6 months</p>
                  </div>
                  <div>
                    <p className="text-white" style={{ opacity: 0.8 }}>Path to Profitability</p>
                    <p className="text-3xl font-bold text-green-600">Q3 2024</p>
                    <p className="text-sm text-white/80">Already cash-flow positive</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">The Ask</h3>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-white" style={{ opacity: 0.8 }}>Series A Raise</p>
                    <p className="text-3xl font-bold text-white">$5M</p>
                  </div>
                  <div>
                    <p className="text-white" style={{ opacity: 0.8 }}>Valuation</p>
                    <p className="text-3xl font-bold text-white">$20M</p>
                    <p className="text-sm text-white/80">3x revenue multiple</p>
                  </div>
                  <div>
                    <p className="text-white" style={{ opacity: 0.8 }}>Use of Funds</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-white">• 40% Tech (AI enhancement)</p>
                      <p className="text-white">• 30% Expansion (national)</p>
                      <p className="text-white">• 20% Contractor acquisition</p>
                      <p className="text-white">• 10% Working capital</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Why This Matters Beyond Money</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-white font-semibold mb-2">Climate Reality</p>
                <p className="text-white/90 text-sm">
                  Natural disasters increasing 40% yearly. 
                  Current system will collapse by 2027.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Social Impact</p>
                <p className="text-white/90 text-sm">
                  Every $1 invested prevents $8 in social damage. 
                  Mental health crisis prevention at scale.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Economic Multiplier</p>
                <p className="text-white/90 text-sm">
                  Creates 3.2 jobs per contractor onboarded. 
                  Rebuilds communities 70% faster.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Government Alignment</p>
                <p className="text-white/90 text-sm">
                  $15M in grants pending approval. 
                  National disaster response partner status.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 10,
      title: "The Greater Purpose",
      subtitle: "This Win Isn't Just Ours - It's Everyone's",
      videoUrl: "https://www.youtube.com/embed/5i5mKCmvv38",
      duration: 50,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-white mb-6">
              If We Can Go From a Flooded Living Room to Here...
            </h2>
            <p className="text-2xl text-white/90">
              You can go from where you are to where you're meant to be.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 rounded-xl p-8"
          >
            <p className="text-xl text-white/90 mb-6">
              Every disaster we prevent, every family we help, every contractor we empower - 
              it's proof that technology with soul can heal a broken world.
            </p>
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <Heart className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">For the Forgotten</p>
                  <p className="text-white" style={{ opacity: 0.8 }}>
                    Remote communities, elderly alone, those without voices - we reach them first.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4"
              >
                <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">For the Workers</p>
                  <p className="text-white" style={{ opacity: 0.8 }}>
                    Contractors earning dignity, not just dollars. Pride in every job.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4"
              >
                <Globe className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">For the Future</p>
                  <p className="text-white" style={{ opacity: 0.8 }}>
                    Building resilience that outlasts us. A system our children will be proud of.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8">
              <p className="text-2xl text-white font-semibold mb-4">
                Our Promise to You
              </p>
              <p className="text-lg text-white/90 mb-6">
                This isn't about creating another unicorn. It's about proving that business 
                can be medicine for society's wounds. Your investment isn't buying equity - 
                it's funding hope at scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Join the Revolution
                </Button>
                <Button variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/10 text-lg">
                  Schedule Deep Dive
                </Button>
              </div>
            </div>
            
            <div className="text-white text-sm" style={{ opacity: 0.8 }}>
              <p>Contact us via the online form at disasterrecovery.com.au/contact</p>
              <p className="mt-2">Current investors: Angels who believe in humanity</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-3xl text-white font-bold">
              "The best time to plant a tree was 20 years ago.
            </p>
            <p className="text-3xl text-blue-600 font-bold">
              The second best time is now."
            </p>
            <p className="text-xl text-white/80 mt-4">
              Let's plant a forest together.
            </p>
          </motion.div>
        </div>
      )
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return undefined;

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
    setIsPlaying(false); // Stop autoplay when manually changing slides
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
            <h1 className="text-2xl font-bold text-white">The Story That Changes Everything</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-white border-white/30">
                {currentSlide + 1} / {slides.length}
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
          {/* Video Player */}
          {showVideo && slides[currentSlide].videoUrl && (
            <Card className="mb-8 bg-black/50 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <iframe
                    src={`${slides[currentSlide].videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
                    title="Disaster Recovery Investor Presentation"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Slide Content */}
          <Card className="bg-black/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              {/* Slide Header */}
              <div className="mb-8 text-center">
                <motion.h2 
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                {slides[currentSlide].subtitle && (
                  <motion.p 
                    key={`subtitle-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-white/80"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
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
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Auto-advance Progress</span>
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
                      Pause Auto-Play
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Auto-Play
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

          {/* Emotional Impact Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-white/80">
              This isn't just a pitch. It's our truth.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}