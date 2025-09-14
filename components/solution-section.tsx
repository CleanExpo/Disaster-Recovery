import { Users, Settings, CheckCircle } from "lucide-react"

export default function SolutionSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            The <span className="text-[#00BFA6]">Solution</span> Bridge
          </h2>
          <p className="text-xl text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Clients gain clarity. Contractors gain consistency. CRM powers both.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Client Journey */}
          <div className="bg-gradient-to-br from-[#2196F3]/20 to-[#1976D2]/10 rounded-3xl p-8 border border-[#2196F3]/30 h-full flex flex-col hover:shadow-2xl hover:shadow-[#2196F3]/20 transition-all duration-300 group">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#2196F3] mb-2">Client Journey</h3>
              <p className="text-[#9CA3AF] text-sm">Property owners experience seamless restoration services</p>
            </div>
            <div className="space-y-6 text-[#9CA3AF] flex-grow">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2196F3]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2196F3] font-bold text-sm">1</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Submit Request</span>
                  <span className="text-sm leading-relaxed">Describe your restoration needs through our platform</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2196F3]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2196F3] font-bold text-sm">2</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Get Matched</span>
                  <span className="text-sm leading-relaxed">AI-powered matching with verified contractors</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2196F3]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2196F3] font-bold text-sm">3</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Track Progress</span>
                  <span className="text-sm leading-relaxed">Real-time updates and transparent pricing</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2196F3]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2196F3] font-bold text-sm">4</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Complete Project</span>
                  <span className="text-sm leading-relaxed">Quality assurance and satisfaction guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Bridge */}
          <div className="bg-gradient-to-br from-[#00BFA6]/20 to-[#00A693]/10 rounded-3xl p-8 border border-[#00BFA6]/30 h-full flex flex-col hover:shadow-2xl hover:shadow-[#00BFA6]/20 transition-all duration-300 group">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00BFA6] to-[#00A693] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-12 w-12 text-[#0F1115]" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#00BFA6] mb-2">Platform Engine</h3>
              <p className="text-[#9CA3AF] text-sm">AI-powered marketplace connecting all stakeholders</p>
            </div>
            <div className="space-y-6 text-[#9CA3AF] text-center flex-grow">
              <div className="bg-[#00BFA6]/10 rounded-xl p-4">
                <div className="font-semibold text-[#F9FAFB] mb-1">Smart Matching</div>
                <div className="text-sm leading-relaxed">AI algorithm connects clients with perfect contractors</div>
              </div>
              <div className="bg-[#00BFA6]/10 rounded-xl p-4">
                <div className="font-semibold text-[#F9FAFB] mb-1">Automated Workflows</div>
                <div className="text-sm leading-relaxed">Streamlined processes from request to completion</div>
              </div>
              <div className="bg-[#00BFA6]/10 rounded-xl p-4">
                <div className="font-semibold text-[#F9FAFB] mb-1">Real-time Communication</div>
                <div className="text-sm leading-relaxed">Instant messaging and project updates</div>
              </div>
              <div className="bg-[#00BFA6]/10 rounded-xl p-4">
                <div className="font-semibold text-[#F9FAFB] mb-1">Secure Payments</div>
                <div className="text-sm leading-relaxed">Escrow protection and automated processing</div>
              </div>
            </div>
          </div>

          {/* Contractor Journey */}
          <div className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#6A1B9A]/10 rounded-3xl p-8 border border-[#7C4DFF]/30 h-full flex flex-col hover:shadow-2xl hover:shadow-[#7C4DFF]/20 transition-all duration-300 group">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7C4DFF] to-[#6A1B9A] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#7C4DFF] mb-2">Contractor Journey</h3>
              <p className="text-[#9CA3AF] text-sm">Professionals grow their business through our platform</p>
            </div>
            <div className="space-y-6 text-[#9CA3AF] flex-grow">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#7C4DFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7C4DFF] font-bold text-sm">1</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Join Platform</span>
                  <span className="text-sm leading-relaxed">Register and complete verification process</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#7C4DFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7C4DFF] font-bold text-sm">2</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Receive Leads</span>
                  <span className="text-sm leading-relaxed">Get qualified leads matched to your expertise</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#7C4DFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7C4DFF] font-bold text-sm">3</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Manage Projects</span>
                  <span className="text-sm leading-relaxed">Use platform tools for efficient project management</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#7C4DFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7C4DFF] font-bold text-sm">4</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block">Scale Business</span>
                  <span className="text-sm leading-relaxed">Grow through training and business tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center mt-16">
          <p className="text-2xl font-poppins font-semibold text-[#00BFA6]">
            One platform. Two solutions. Complete transparency.
          </p>
        </div>
      </div>
    </section>
  )
}
