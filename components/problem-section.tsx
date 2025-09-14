import { AlertTriangle, FileX, DollarSign, Clock, Users, Briefcase } from "lucide-react"

export default function ProblemSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            The Current <span className="text-[#00BFA6]">Problem</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Both clients and contractors face unnecessary challenges in the restoration industry
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Client Pain Points */}
          <div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#00BFA6] transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-poppins font-semibold text-2xl text-[#2196F3]">Client Frustrations</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <DollarSign className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-[#F9FAFB] mb-2">Hidden Costs</h4>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Surprise fees and unclear pricing structures leave clients feeling deceived and financially
                      vulnerable.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-[#F9FAFB] mb-2">Confusing Claims</h4>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Complex insurance processes with no guidance, leaving clients lost in paperwork and bureaucracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-[#F9FAFB] mb-2">No Clear Updates</h4>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Clients are kept in the dark about project progress, timelines, and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contractor Pain Points */}
          <div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#7C4DFF] transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#7C4DFF] rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-poppins font-semibold text-2xl text-[#7C4DFF]">Contractor Challenges</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-[#F9FAFB] mb-2">No Reliable Leads</h4>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Inconsistent work flow and unreliable lead generation makes business planning impossible.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <DollarSign className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-[#F9FAFB] mb-2">Inconsistent Payments</h4>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Late payments and payment disputes create cash flow problems and business uncertainty.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FileX className="h-6 w-6 text-[#00BFA6] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-inter font-semibold text-lg text-[#F9FAFB] mb-2">Lack of Standardization</h4>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      No unified processes or standards across different clients and projects creates inefficiency.
                    </p>
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
