"use client"

import { Shield, Zap, Calculator, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"

export default function TrustSection() {
  const [hoveredIntegration, setHoveredIntegration] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const integrations = [
    {
      name: "CRM",
      description: "Seamless claim management",
      icon: Shield,
      color: "#00BFA6",
    },
    {
      name: "Clean Claims",
      description: "Automated claim processing",
      icon: Zap,
      color: "#2196F3",
    },
    {
      name: "Xero",
      description: "Automated invoicing",
      icon: Calculator,
      color: "#7C4DFF",
    },
    {
      name: "QuickBooks",
      description: "Financial management",
      icon: BarChart3,
      color: "#00BFA6",
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            Trust & <span className="text-[#00BFA6]">Integrations</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Built on industry-leading platforms with seamless integrations for complete transparency
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {integrations.map((integration, index) => {
              const Icon = integration.icon
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={isClient ? () => setHoveredIntegration(index) : undefined}
                  onMouseLeave={isClient ? () => setHoveredIntegration(null) : undefined}
                >
                  <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#00BFA6] transition-colors duration-200 cursor-pointer">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: integration.color }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-center" style={{ color: integration.color }}>
                      {integration.name}
                    </h3>

                    {/* Tooltip */}
                    {isClient && hoveredIntegration === index && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0F1115] border border-[#00BFA6] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] whitespace-nowrap z-10">
                        {integration.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#00BFA6]"></div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-[#00BFA6] mb-2">Insurance Grade Security</h3>
              <p className="text-[#9CA3AF] font-inter">Bank-level encryption and compliance standards</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-[#2196F3] mb-2">Real-time Processing</h3>
              <p className="text-[#9CA3AF] font-inter">Instant updates and automated workflows</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7C4DFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-[#7C4DFF] mb-2">Complete Transparency</h3>
              <p className="text-[#9CA3AF] font-inter">Full visibility into all processes and costs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
