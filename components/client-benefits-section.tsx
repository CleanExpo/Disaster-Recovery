import { DollarSign, Bell, Shield, Scale } from "lucide-react"

export default function ClientBenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees or surprise costs. Get clear, upfront pricing for all restoration services.",
      color: "#00BFA6",
    },
    {
      icon: Bell,
      title: "Step-by-Step Updates",
      description: "Real-time notifications and progress tracking so you always know what's happening.",
      color: "#2196F3",
    },
    {
      icon: Shield,
      title: "Insurance Advocacy",
      description: "Expert support navigating insurance claims and ensuring you get fair coverage.",
      color: "#7C4DFF",
    },
    {
      icon: Scale,
      title: "Fair Claim Handling",
      description: "Professional advocacy to ensure your insurance claims are handled fairly and efficiently.",
      color: "#00BFA6",
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Benefits grid */}
          <div>
            <div className="mb-12">
              <h2 className="font-poppins text-4xl md:text-5xl text-balance mb-6 font-medium">
                Client <span className="text-[#00BFA6]">Benefits</span>
              </h2>
              <p className="text-lg text-[#9CA3AF] font-inter leading-relaxed">
                Experience restoration services the way they should be - transparent, reliable, and stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors duration-200"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: benefit.color }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-poppins text-base mb-3 font-semibold" style={{ color: benefit.color }}>
                      {benefit.title}
                    </h3>
                    <p className="text-[#9CA3AF] font-inter leading-relaxed text-sm">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side - Dashboard mockup */}
          <div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] shadow-2xl">
              <div className="mb-6">
                <h3 className="font-poppins text-lg text-[#00BFA6] mb-2 font-semibold">Client Dashboard</h3>
                <p className="text-[#9CA3AF] text-sm">Track your restoration project in real-time</p>
              </div>

              {/* Mock dashboard content */}
              <div className="space-y-4">
                {/* Project status */}
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter font-medium text-[#F9FAFB]">Water Damage Restoration</span>
                    <span className="text-xs bg-[#00BFA6] text-[#0F1115] px-2 py-1 rounded-full font-semibold">
                      IN PROGRESS
                    </span>
                  </div>
                  <div className="w-full bg-[#374151] rounded-full h-2">
                    <div className="bg-[#00BFA6] h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-[#9CA3AF] text-sm mt-2">75% Complete - Drying phase</p>
                </div>

                {/* Cost breakdown */}
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-medium text-[#F9FAFB] mb-3">Cost Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Water extraction</span>
                      <span className="text-[#F9FAFB]">$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Drying equipment</span>
                      <span className="text-[#F9FAFB]">$800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Materials</span>
                      <span className="text-[#F9FAFB]">$600</span>
                    </div>
                    <div className="border-t border-[#374151] pt-2 flex justify-between font-semibold">
                      <span className="text-[#00BFA6]">Total</span>
                      <span className="text-[#00BFA6]">$2,600</span>
                    </div>
                  </div>
                </div>

                {/* Recent updates */}
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-medium text-[#F9FAFB] mb-3">Recent Updates</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#F9FAFB]">Drying equipment installed</p>
                        <p className="text-[#9CA3AF]">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#2196F3] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-[#F9FAFB]">Insurance claim approved</p>
                        <p className="text-[#9CA3AF]">1 day ago</p>
                      </div>
                    </div>
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
