import { Users, Workflow, CreditCard, TrendingUp } from "lucide-react"

export default function ContractorBenefitsSection() {
  const benefits = [
    {
      icon: Users,
      title: "Qualified Leads",
      description: "Receive pre-screened, high-quality leads that match your expertise and location.",
      color: "#7C4DFF",
    },
    {
      icon: Workflow,
      title: "Automated Workflows",
      description: "Streamlined processes for estimates, scheduling, and project management.",
      color: "#00BFA6",
    },
    {
      icon: CreditCard,
      title: "Faster Payments",
      description: "Automated invoicing and guaranteed payment processing within 24 hours.",
      color: "#2196F3",
    },
    {
      icon: TrendingUp,
      title: "Growth Through Training",
      description: "Access to industry training, certifications, and business development resources.",
      color: "#00BFA6",
    },
  ]

  return (
    <section className="py-24 relative bg-gradient-to-b from-[#0F1115] to-[#1F2937]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Contractor portal mockup */}
          <div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] shadow-2xl">
              <div className="mb-6">
                <h3 className="font-poppins text-lg text-[#7C4DFF] mb-2 font-semibold">Contractor Portal</h3>
                <p className="text-[#9CA3AF] text-sm">Manage your business efficiently</p>
              </div>

              {/* Mock portal content */}
              <div className="space-y-4">
                {/* Available jobs */}
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-medium text-[#F9FAFB] mb-3">Available Jobs</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg border border-[#00BFA6]/30">
                      <div>
                        <p className="font-medium text-[#F9FAFB]">Water Damage - Kitchen</p>
                        <p className="text-[#9CA3AF] text-sm">Downtown • $2,600 • Urgent</p>
                      </div>
                      <span className="text-xs bg-[#00BFA6] text-[#0F1115] px-2 py-1 rounded-full font-semibold">
                        NEW
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium text-[#F9FAFB]">Fire Damage Restoration</p>
                        <p className="text-[#9CA3AF] text-sm">Suburbs • $8,400 • Standard</p>
                      </div>
                      <span className="text-xs bg-[#7C4DFF] text-white px-2 py-1 rounded-full font-semibold">
                        MATCHED
                      </span>
                    </div>
                  </div>
                </div>

                {/* Earnings summary */}
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-medium text-[#F9FAFB] mb-3">This Month</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#9CA3AF]">Jobs Completed</p>
                      <p className="text-2xl font-bold text-[#00BFA6]">12</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF]">Total Earnings</p>
                      <p className="text-2xl font-bold text-[#00BFA6]">$24,800</p>
                    </div>
                  </div>
                </div>

                {/* Training progress */}
                <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-medium text-[#F9FAFB] mb-3">Training Progress</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#9CA3AF]">Advanced Water Damage</span>
                        <span className="text-[#00BFA6]">85%</span>
                      </div>
                      <div className="w-full bg-[#374151] rounded-full h-2">
                        <div className="bg-[#00BFA6] h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Benefits */}
          <div>
            <div className="mb-12">
              <h2 className="font-poppins text-4xl md:text-5xl text-balance mb-6 font-medium">
                Contractor <span className="text-[#7C4DFF]">Benefits</span>
              </h2>
              <p className="text-lg text-[#9CA3AF] font-inter leading-relaxed">
                Grow your restoration business with consistent leads, streamlined operations, and guaranteed payments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#7C4DFF] transition-colors duration-200"
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
        </div>
      </div>
    </section>
  )
}
