import { Button } from "@/components/ui/button"
import { ArrowRight, Users, FileText, CheckCircle } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA6]/10 to-[#7C4DFF]/10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6">
                🚀 Australia's Leading Restoration Marketplace Platform
              </div>
              <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight text-balance">
                The <span className="text-[#00BFA6]">Smart Way</span> to Connect Restoration Services
              </h1>
              <p className="text-xl md:text-2xl text-[#9CA3AF] mt-6 leading-relaxed font-inter">
                Our marketplace platform connects clients with verified contractors through transparent pricing, automated workflows, and real-time project tracking.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-poppins font-semibold text-lg px-8 py-4"
              >
                Submit Restoration Request
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white font-poppins font-semibold text-lg px-8 py-4 bg-transparent"
              >
                Join Our Contractor Network
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-[#9CA3AF]">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                <span>Verified Contractors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151]">
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="font-poppins font-semibold text-xl text-[#00BFA6] mb-6">Marketplace Platform</h3>
                </div>

                {/* Enhanced Workflow */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <span className="font-inter font-medium text-sm text-[#F9FAFB]">Clients</span>
                    </div>

                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-[#2196F3] to-[#00BFA6]" />
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-[#0F1115]" />
                      </div>
                      <span className="font-inter font-medium text-sm text-[#F9FAFB]">Smart Matching</span>
                    </div>

                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF]" />
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-[#7C4DFF] rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <span className="font-inter font-medium text-sm text-[#F9FAFB]">Verified Contractor</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                    <div className="text-[#00BFA6] font-inter font-medium text-sm">Automated Workflows</div>
                    <div className="text-[#9CA3AF] text-xs mt-1">Smart matching & tracking</div>
                  </div>
                  <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                    <div className="text-[#2196F3] font-inter font-medium text-sm">Real-time Updates</div>
                    <div className="text-[#9CA3AF] text-xs mt-1">Progress & communication</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
