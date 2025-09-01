'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Clock, User, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LeadCaptureForm from '@/components/forms/LeadCaptureForm'
import { FeedbackForm } from '@/components/support/FeedbackForm'

interface DemoStep {
  id: string
  title: string
  description: string
  duration: number
  action: () => void
  isCompleted: boolean
}

export default function FormDemonstration() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [demonstrationMode, setDemonstrationMode] = useState<'lead' | 'feedback'>('lead')
  const [isReady, setIsReady] = useState(false)

  const demoSteps: DemoStep[] = [
    {
      id: 'intro',
      title: 'Form Demonstration Starting',
      description: 'Watch as our intelligent system demonstrates form completion with realistic mock data',
      duration: 3000,
      action: () => {},
      isCompleted: false
    },
    {
      id: 'contact-info',
      title: 'Filling Contact Information',
      description: 'Entering realistic client contact details including name, phone, and email',
      duration: 2500,
      action: () => simulateFormFilling('contact'),
      isCompleted: false
    },
    {
      id: 'property-info',
      title: 'Property Details Entry',
      description: 'Adding comprehensive property information and damage assessment',
      duration: 3000,
      action: () => simulateFormFilling('property'),
      isCompleted: false
    },
    {
      id: 'damage-details',
      title: 'Damage Information',
      description: 'Describing the emergency situation and urgency level',
      duration: 2800,
      action: () => simulateFormFilling('damage'),
      isCompleted: false
    },
    {
      id: 'insurance-details',
      title: 'Insurance Processing',
      description: 'Entering insurance company details and claim information',
      duration: 2200,
      action: () => simulateFormFilling('insurance'),
      isCompleted: false
    },
    {
      id: 'completion',
      title: 'Form Submission',
      description: 'Completing the form and demonstrating our instant response system',
      duration: 2000,
      action: () => simulateFormFilling('submit'),
      isCompleted: false
    }
  ]

  const [steps, setSteps] = useState(demoSteps)

  const simulateFormFilling = (section: string) => {
    // Simulate realistic form filling animations
    const elements = document.querySelectorAll(`[data-demo-section="${section}"]`)
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-pulse', 'bg-blue-50', 'border-blue-300')
        setTimeout(() => {
          element.classList.remove('animate-pulse', 'bg-blue-50', 'border-blue-300')
          element.classList.add('bg-green-50', 'border-green-300')
        }, 800)
      }, index * 200)
    })
  }

  const startDemo = async () => {
    setIsPlaying(true)
    setIsReady(true)
    
    // Narrate the demonstration if audio is enabled
    if (audioEnabled) {
      await playNarration('Welcome to our disaster recovery form demonstration. Watch as we show you how quickly and efficiently our system processes emergency restoration requests.')
    }

    // Run through each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      
      if (audioEnabled) {
        await playNarration(steps[i].description)
      }
      
      steps[i].action()
      
      // Mark step as completed
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, isCompleted: true } : step
      ))
      
      await new Promise(resolve => setTimeout(resolve, steps[i].duration))
      
      if (!isPlaying) break // Allow stopping mid-demo
    }
    
    setIsPlaying(false)
    
    if (audioEnabled) {
      await playNarration('Demonstration complete. This showcases how our AI-powered platform processes emergency restoration requests with speed and accuracy.')
    }
  }

  const stopDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setSteps(prev => prev.map(step => ({ ...step, isCompleted: false })))
  }

  const resetDemo = () => {
    stopDemo()
    setIsReady(false)
  }

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
        const audio = new Audio(audioUrl)
        
        return new Promise<void>((resolve) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl)
            resolve()
          }
          audio.play().catch(() => resolve()) // Continue even if audio fails
        })
      }
    } catch (error) {
      console.log('Audio narration not available, continuing silently')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Form Demonstration
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Experience how our AI-powered platform processes emergency restoration requests
          </p>
          
          {/* Demo Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={isPlaying ? stopDemo : startDemo}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isPlaying}
            >
              {isPlaying ? (
                <>
                  <Clock className="mr-2 h-5 w-5 animate-spin" />
                  Demo Running...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start Demonstration
                </>
              )}
            </Button>
            
            <Button
              onClick={resetDemo}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
            
            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="mr-2 h-5 w-5" />
                  Audio On
                </>
              ) : (
                <>
                  <VolumeX className="mr-2 h-5 w-5" />
                  Audio Off
                </>
              )}
            </Button>
          </div>

          {/* Demo Type Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={() => setDemonstrationMode('lead')}
              variant={demonstrationMode === 'lead' ? 'default' : 'outline'}
              className={demonstrationMode === 'lead' ? 'bg-blue-600' : 'border-white/20 text-white hover:bg-white/10'}
            >
              <User className="mr-2 h-4 w-4" />
              Lead Capture Form
            </Button>
            <Button
              onClick={() => setDemonstrationMode('feedback')}
              variant={demonstrationMode === 'feedback' ? 'default' : 'outline'}
              className={demonstrationMode === 'feedback' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
            >
              <FileText className="mr-2 h-4 w-4" />
              Feedback Form
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Demonstration Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border transition-all ${
                        index === currentStep && isPlaying
                          ? 'border-blue-500 bg-blue-500/10'
                          : step.isCompleted
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-slate-600 bg-slate-700/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.isCompleted
                            ? 'bg-green-500 text-white'
                            : index === currentStep && isPlaying
                            ? 'bg-blue-500 text-white animate-pulse'
                            : 'bg-slate-600 text-slate-300'
                        }`}>
                          {step.isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : index === currentStep && isPlaying ? (
                            <Clock className="h-4 w-4 animate-spin" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{step.title}</h4>
                          <p className="text-sm text-slate-400">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
              <AnimatePresence mode="wait">
                {demonstrationMode === 'lead' ? (
                  <motion.div
                    key="lead-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <LeadCaptureForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="feedback-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <FeedbackForm embedded={true} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Demo Information */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="bg-green-900/20 border-green-500/30 backdrop-blur-sm">
              <CardContent className="py-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Demonstration Active</h3>
                </div>
                <p className="text-green-100">
                  This demonstration shows how our AI-powered platform processes {demonstrationMode === 'lead' ? 'emergency restoration requests' : 'user feedback'} with 
                  realistic mock data. Watch the form fields populate automatically with professionally crafted responses.
                </p>
                {audioEnabled && (
                  <p className="text-sm text-green-200 mt-2">
                    🎧 Audio narration is enabled for enhanced demonstration experience
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}