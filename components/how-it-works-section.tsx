import { FileText, UserCheck, Wrench, CreditCard } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: FileText,
      title: "Client Submits Request",
      description: "Client provides details about their restoration needs through our simple, guided form process.",
      color: "#2196F3",
      bgColor: "from-[#2196F3]/20 to-[#1976D2]/10",
      borderColor: "border-[#2196F3]/30",
    },
    {
      icon: UserCheck,
      title: "CRM Matches Contractor",
      description: "Our intelligent system matches the request with qualified, verified contractors in the area.",
      color: "#00BFA6",
      bgColor: "from-[#00BFA6]/20 to-[#00A693]/10",
      borderColor: "border-[#00BFA6]/30",
    },
    {
      icon: Wrench,
      title: "Job Managed Via Platform",
      description: "All communication, updates, and project management happens transparently through our platform.",
      color: "#7C4DFF",
      bgColor: "from-[#7C4DFF]/20 to-[#6A1B9A]/10",
      borderColor: "border-[#7C4DFF]/30",
    },
    {
      icon: CreditCard,
      title: "Payment & Advocacy Handled",
      description: "Secure payments are processed automatically, with insurance advocacy support throughout.",
      color: "#00BFA6",
      bgColor: "from-[#00BFA6]/20 to-[#00A693]/10",
      borderColor: "border-[#00BFA6]/30",
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            How It <span className="text-[#00BFA6]">Works</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Four simple steps to connect clients with contractors seamlessly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1

            return (
              <div key={index} className="relative">
                {/* Timeline connector line */}
                {!isLast && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-[#00BFA6] to-[#7C4DFF] opacity-30" />
                )}

                <div className="flex items-start space-x-6 mb-12">
                  {/* Step number and icon */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                      {/* Step number */}
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="flex-1">
                    <div className={`bg-gradient-to-br ${step.bgColor} rounded-2xl p-6 border ${step.borderColor}`}>
                      <h3 className="font-poppins font-semibold text-2xl mb-3" style={{ color: step.color }}>
                        {step.title}
                      </h3>
                      <p className="text-[#9CA3AF] font-inter leading-relaxed text-lg">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-2xl p-8 border border-[#00BFA6]/20">
            <h3 className="font-poppins font-semibold text-2xl text-[#00BFA6] mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-[#9CA3AF] font-inter text-lg">
              Join thousands of satisfied clients and contractors who trust our platform
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
