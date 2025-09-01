'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Maximize2, ChevronLeft, ChevronRight, RotateCcw,
  TrendingUp, DollarSign, Users, Globe, Zap, Target, Award, ChartBar, Brain, Rocket, Shield, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'

interface Slide {
  id: number
  title: string
  content: React.ReactNode
  narration: string
  duration: number
}

export default function PitchDeckPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playingRef = useRef<boolean>(false)

  const slides: Slide[] = [
    {
      id: 1,
      title: "Disaster Recovery Reimagined",
      narration: "Welcome to the future of disaster recovery. We're transforming a one billion dollar Australian market with cutting-edge AI orchestration, creating an unstoppable platform positioned for explosive ten times growth.",
      duration: 8000,
      content: (
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold text-white mb-4">
              Disaster Recovery
            </h1>
            <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Reimagined with AI
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
          >
            Transforming a $1B Australian market with AI orchestration,
            creating an unstoppable platform positioned for 10x growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center justify-center gap-2 text-blue-300"
          >
            <Rocket className="h-8 w-8" />
            <span className="text-xl font-semibold">Investment Opportunity</span>
          </motion.div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem",
      narration: "The disaster recovery industry is broken. Recovery is slow, inefficient, and frustrating for property owners. Insurance claims take weeks to process with high rejection rates. Contractors struggle to find consistent, quality jobs. There's no unified platform connecting all stakeholders efficiently.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Target className="h-12 w-12 text-red-400" />
            The Problem
          </motion.h2>
          
          <div className="space-y-6">
            {[
              "Disaster recovery is slow, inefficient, and frustrating for property owners",
              "Insurance claims take weeks to process with high rejection rates", 
              "Contractors struggle to find consistent, quality jobs",
              "No unified platform connecting all stakeholders efficiently"
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className="flex items-start gap-4 bg-red-950/30 backdrop-blur-sm rounded-xl p-6 border border-red-600/30"
              >
                <span className="text-red-400 text-2xl font-bold mt-1">•</span>
                <span className="text-xl text-gray-300">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Solution",
      narration: "Our AI provides instant, accurate damage assessments in under one hundred milliseconds. We deliver automated insurance approval with a ninety-five percent success rate. Our intelligent job matching connects contractors instantly. We've created a complete ecosystem with network effects and an unbreachable data moat.",
      duration: 12000,
      content: (
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Zap className="h-12 w-12 text-emerald-600" />
            Our Solution
          </motion.h2>
          
          <div className="space-y-6">
            {[
              "AI provides instant, accurate damage assessments in under 100ms",
              "Automated insurance approval with 95% success rate",
              "Intelligent job matching connecting contractors instantly", 
              "Complete ecosystem with network effects and data moat"
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className="flex items-start gap-4 bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30"
              >
                <span className="text-emerald-600 text-2xl font-bold mt-1">✓</span>
                <span className="text-xl text-gray-300">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Market Opportunity",
      narration: "We're targeting the Australian disaster recovery market, valued at approximately four hundred million dollars annually with steady growth. Our target is to capture five percent market share within twenty-four months, representing significant revenue opportunity."
      duration: 8000,
      content: (
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center"
          >
            Market Opportunity
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Market Size', value: '$400M+', description: 'Australian disaster recovery market', icon: Globe },
              { label: 'Growth Rate', value: '8%', description: 'Annual market growth', icon: TrendingUp },
              { label: 'Target Share', value: '5%', description: 'In 24 months', icon: Target },
              { label: 'Revenue Target', value: '$20M', description: 'Annual revenue potential', icon: DollarSign }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
              >
                <metric.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-blue-300 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Competitive Advantages",
      narration: "Our competitive advantages are insurmountable. Our advanced AI Technology provides instant assessments. Network effects make each contractor and claim strengthen the platform exponentially. Direct insurance integration through API connections with major providers. And complete national coverage across Australia with Pacific expansion ready."
      duration: 14000,
      content: (
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center"
          >
            Competitive Advantages
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Technology',
                description: 'Advanced AI providing instant assessments'
              },
              {
                icon: Zap,
                title: 'Network Effects',
                description: 'Each contractor and claim makes the platform exponentially stronger'
              },
              {
                icon: Shield,
                title: 'Insurance Integration',
                description: 'Direct API connections with major insurance providers'
              },
              {
                icon: Globe,
                title: 'National Coverage',
                description: 'Complete Australian market with Pacific expansion ready'
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <advantage.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{advantage.title}</h3>
                <p className="text-gray-400">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Growth Trajectory",
      narration: "Our growth plan is ambitious but realistic. We currently have fifty contractors in our network. We're targeting two hundred and fifty contractors and five hundred thousand monthly revenue by Q4 2024. Then scaling to one thousand contractors and two million monthly revenue by Q2 2025. This represents sustainable growth building to twenty million annual revenue."
      duration: 16000,
      content: (
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <ChartBar className="h-12 w-12 text-purple-400" />
            Growth Trajectory
          </motion.h2>
          
          <div className="space-y-6 mb-8">
            {[
              { quarter: 'Q2 2024', target: '50 contractors', revenue: '$50K/mo', achieved: true },
              { quarter: 'Q4 2024', target: '250 contractors', revenue: '$500K/mo', achieved: false },
              { quarter: 'Q2 2025', target: '1,000 contractors', revenue: '$2M/mo', achieved: false },
              { quarter: 'Q4 2025', target: '2,500 contractors', revenue: '$5M/mo', achieved: false }
            ].map((milestone, index) => (
              <motion.div
                key={milestone.quarter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className="flex items-center gap-6"
              >
                <div className="w-24 text-right">
                  <div className="text-white font-semibold">{milestone.quarter}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">{milestone.target}</span>
                    <span className="text-emerald-600 font-semibold">{milestone.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className={`h-3 rounded-full ${
                        milestone.achieved ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: milestone.achieved ? '100%' : `${(index + 1) * 25}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="p-6 bg-purple-900/30 rounded-xl border border-purple-500/30 text-center"
          >
            <div className="text-2xl font-bold text-white mb-2">24-Month Target</div>
            <div className="text-gray-400 mb-4">$20M annual revenue potential</div>
            <div className="text-4xl font-bold text-emerald-600">Sustainable Growth</div>
          </motion.div>
        </div>
      )
    },
    {
      id: 7,
      title: "Secret Weapon: Government Partnership", 
      narration: "Here's our secret weapon: A comprehensive government funding and industry recognition framework. We've identified two point four billion dollars in Australian government funding for innovative startups. Our pathway includes Industry Growth Program grants up to five million dollars, and establishing CPP40421 Certificate IV in Specialty Cleaning and Restoration as a government-recognised industry. This creates a regulatory moat, professional accreditation requirements, and positions us as the industry standard backed by government recognition.",
      duration: 18000,
      content: (
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3"
          >
            <Shield className="h-12 w-12 text-yellow-400" />
            Secret Weapon: Government Partnership
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Government Funding */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-yellow-900/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                $2.4B Government Funding
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Industry Growth Program</span>
                  <span className="text-yellow-400 font-bold">Up to $5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Clean Energy Innovation</span>
                  <span className="text-yellow-400 font-bold">$500M Pool</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Defence Industry Grants</span>
                  <span className="text-yellow-400 font-bold">Up to $1M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">CSIRO Kick-Start</span>
                  <span className="text-yellow-400 font-bold">$10K-$50K</span>
                </div>
              </div>
            </motion.div>

            {/* Industry Recognition */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6" />
                Industry Recognition Framework
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>CPP40421 Certificate IV Recognition</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>ANZSIC Industry Classification</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Australian Standards Development</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Professional Registration System</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strategic Advantage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-yellow-900/30 to-blue-900/30 rounded-xl p-8 border border-yellow-500/30"
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Strategic Advantage</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">Regulatory Moat</div>
                <div className="text-gray-300">Government-backed industry standards create competitive barriers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">Revenue Streams</div>
                <div className="text-gray-300">Training, certification, and accreditation programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">Market Position</div>
                <div className="text-gray-300">First-mover advantage as industry standard setter</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-center"
          >
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
              Government Partnership = Unstoppable Market Domination
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 8,
      title: "Investment Opportunity", 
      narration: "We're raising three million dollars to accelerate growth and build market presence. With our AI technology, early traction, and government partnership pathway, this is your opportunity to invest in the future of disaster recovery. Join us in building a sustainable business that transforms this industry."
      duration: 12000,
      content: (
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-8"
          >
            Join Us in Revolutionizing Disaster Recovery
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            We're raising $3M to accelerate growth and build market presence.
            With our AI technology and early traction, this is your opportunity
            to invest in the future of disaster recovery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 backdrop-blur-sm border border-white/20"
          >
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">$3M</div>
                <div className="text-gray-300">Raising</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">5%</div>
                <div className="text-gray-300">Market Share Target</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">$20M</div>
                <div className="text-gray-300">Revenue Target</div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
            >
              Ready to Scale to Market Domination!
            </motion.div>
          </motion.div>
        </div>
      )
    }
  ]

  const playNarration = async (text: string) => {
    if (!audioEnabled) return

    try {
      const response = await fetch('/api/elevenlabs/narrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.pause()
        }
        
        audioRef.current = new Audio(audioUrl)
        
        return new Promise<void>((resolve) => {
          if (audioRef.current) {
            audioRef.current.onended = () => {
              URL.revokeObjectURL(audioUrl)
              resolve()
            }
            audioRef.current.play().catch(() => resolve())
          } else {
            resolve()
          }
        })
      }
    } catch (error) {
      console.log('Audio narration not available, continuing silently')
    }
  }

  const startPresentation = async () => {
    setIsPlaying(true)
    playingRef.current = true
    
    for (let i = 0; i < slides.length; i++) {
      if (!playingRef.current) break
      
      setCurrentSlide(i)
      
      if (audioEnabled && playingRef.current) {
        await playNarration(slides[i].narration)
      }
      
      // Visual progress animation
      const duration = slides[i].duration
      const interval = 50
      const steps = duration / interval
      
      for (let step = 0; step <= steps; step++) {
        if (!playingRef.current) break
        setProgress((step / steps) * 100)
        await new Promise(resolve => setTimeout(resolve, interval))
      }
    }
    
    playingRef.current = false
    setIsPlaying(false)
    setProgress(0)
  }

  const stopPresentation = () => {
    playingRef.current = false
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setProgress(0)
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setProgress(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setProgress(0)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 ${isFullscreen ? 'p-0' : 'py-8'}`}
    >
      <div className={`container mx-auto ${isFullscreen ? 'h-screen flex flex-col' : 'px-4'}`}>
        {/* Controls */}
        <div className={`bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6 ${isFullscreen ? 'flex-shrink-0' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={isPlaying ? stopPresentation : startPresentation}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {isPlaying ? 'Pause' : 'Start'} Presentation
              </Button>
              
              <Button onClick={prevSlide} variant="outline" disabled={currentSlide === 0}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button onClick={nextSlide} variant="outline" disabled={currentSlide === slides.length - 1}>
                <SkipForward className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={() => setAudioEnabled(!audioEnabled)}
                variant="outline"
                className={audioEnabled ? 'text-blue-400' : 'text-gray-500'}
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              
              <Button onClick={toggleFullscreen} variant="outline">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">
                Slide {currentSlide + 1} of {slides.length}
              </span>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className={`flex-1 flex items-center justify-center ${isFullscreen ? '' : 'min-h-[600px]'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-7xl mx-auto px-8"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Navigation */}
        {!isFullscreen && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-blue-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}