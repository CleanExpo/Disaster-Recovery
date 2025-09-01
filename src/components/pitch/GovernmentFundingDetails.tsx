'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, DollarSign, Award, FileText, Clock, CheckCircle, 
  TrendingUp, Globe, Target, ArrowRight, Download, ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MAJOR_FUNDING_PROGRAMS, 
  STATE_FUNDING_PROGRAMS, 
  INDUSTRY_RECOGNITION_PATHWAY,
  CPP40421_SPECIALISATIONS,
  FUNDING_STRATEGY,
  IMPLEMENTATION_TIMELINE,
  COMPETITIVE_ADVANTAGES
} from '@/data/government-funding-framework'

export default function GovernmentFundingDetails() {
  const [activeTab, setActiveTab] = useState('funding')

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
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
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Shield className="h-12 w-12 text-yellow-400" />
            Government Funding Framework
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Comprehensive pathway to $2.4B in Australian government funding and industry recognition for 
            the specialty cleaning and restoration sector
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="funding" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Funding Programs
            </TabsTrigger>
            <TabsTrigger value="recognition" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Industry Recognition
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Implementation
            </TabsTrigger>
            <TabsTrigger value="advantages" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Advantages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funding">
            <div className="space-y-8">
              {/* Federal Programs */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Globe className="h-6 w-6 text-yellow-400" />
                    Federal Funding Programs - $2.4B Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {MAJOR_FUNDING_PROGRAMS.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-yellow-400/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-white text-lg">{program.name}</h3>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {program.applicationStatus}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Grant Range:</span>
                            <span className="text-yellow-400 font-bold">
                              {formatCurrency(program.minGrant)} - {formatCurrency(program.maxGrant)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Coverage:</span>
                            <span className="text-blue-400">{program.coveragePercent}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Duration:</span>
                            <span className="text-gray-200">{program.duration}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Focus Areas:</h4>
                          <div className="flex flex-wrap gap-1">
                            {program.focusAreas.slice(0, 2).map((area, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-gray-400">
                          Authority: {program.authority}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* State Programs */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-400" />
                    State & Territory Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {STATE_FUNDING_PROGRAMS.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <h3 className="font-bold text-white mb-2">{program.name}</h3>
                        <div className="text-blue-400 font-bold mb-1">
                          {formatCurrency(program.minGrant)} - {formatCurrency(program.maxGrant)}
                        </div>
                        <div className="text-xs text-gray-400">{program.authority}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recognition">
            <div className="space-y-8">
              {/* CPP40421 Overview */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Award className="h-6 w-6 text-green-400" />
                    CPP40421 Certificate IV in Specialty Cleaning & Restoration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Current Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">National Recognition:</span>
                          <Badge className="bg-green-600 text-white">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Queensland Providers:</span>
                          <span className="text-yellow-400 font-bold">{CPP40421_SPECIALISATIONS.currentProviders.queensland}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">National Providers:</span>
                          <span className="text-yellow-400 font-bold">{CPP40421_SPECIALISATIONS.currentProviders.national}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Specialty Restoration Focus</h3>
                      <div className="space-y-2">
                        {CPP40421_SPECIALISATIONS.specialisations[1].coverageAreas.map((area, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recognition Pathway */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Industry Recognition Pathway</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {INDUSTRY_RECOGNITION_PATHWAY.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-white mb-2">{step.phase}</h3>
                          <div className="grid md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-gray-400">Duration:</span>
                              <div className="text-blue-400">{step.duration}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400">Cost:</span>
                              <div className="text-yellow-400">{step.cost}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400">Authority:</span>
                              <div className="text-gray-300 text-sm">{step.authority}</div>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-1">Requirements:</h4>
                              <ul className="text-xs text-gray-400 space-y-1">
                                {step.requirements.slice(0, 2).map((req, i) => (
                                  <li key={i}>• {req}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-300 mb-1">Deliverables:</h4>
                              <ul className="text-xs text-gray-400 space-y-1">
                                {step.deliverables.slice(0, 2).map((del, i) => (
                                  <li key={i}>• {del}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strategy">
            <div className="space-y-8">
              {/* Primary Strategy */}
              <Card className="bg-gradient-to-r from-yellow-900/20 to-blue-900/20 backdrop-blur-sm border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Target className="h-6 w-6 text-yellow-400" />
                    Primary Funding Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">{FUNDING_STRATEGY.primaryTarget.amount}</div>
                      <div className="text-white font-semibold mb-2">{FUNDING_STRATEGY.primaryTarget.program}</div>
                      <div className="text-sm text-gray-300">{FUNDING_STRATEGY.primaryTarget.justification}</div>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-lg font-bold text-white mb-4">Economic Justification</h3>
                      <div className="space-y-2">
                        {FUNDING_STRATEGY.economicJustification.map((point, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Implementation Timeline */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Clock className="h-6 w-6 text-blue-400" />
                    Implementation Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(IMPLEMENTATION_TIMELINE).map(([phase, details], index) => (
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-6 border border-white/10"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{phase}</h3>
                            <div className="text-sm text-blue-400">{details.duration}</div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {details.activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advantages">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-400" />
                    Strategic Competitive Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {COMPETITIVE_ADVANTAGES.map((advantage, index) => (
                      <motion.div
                        key={advantage.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-6 border border-green-500/30"
                      >
                        <h3 className="text-xl font-bold text-white mb-3">{advantage.title}</h3>
                        <p className="text-gray-300 mb-4">{advantage.description}</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-green-300">{advantage.impact}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="bg-gradient-to-r from-yellow-900/20 to-green-900/20 backdrop-blur-sm border-yellow-500/30">
                <CardContent className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                  >
                    <h2 className="text-3xl font-bold text-white mb-6">
                      Government Partnership = Market Domination
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                      This comprehensive framework transforms disaster recovery from a fragmented service industry 
                      into a government-recognised profession with regulatory barriers, funding support, and 
                      institutional credibility.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-yellow-600 to-green-600 hover:from-yellow-700 hover:to-green-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download Framework
                      </Button>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Application Process
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}