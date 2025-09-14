import { CheckCircle, XCircle } from "lucide-react"

export default function PricingSection() {
  return (
    <section className="py-24 relative bg-gradient-to-b from-[#1F2937] to-[#0F1115]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-balance mb-6">
            Pricing <span className="text-[#00BFA6]">Transparency</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Standardized industry pricing — no postcode bias, no hidden fees
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Traditional pricing (left) */}
            <div>
              <div className="bg-gradient-to-br from-[#374151] to-[#1F2937] rounded-2xl p-8 border border-[#6B7280] relative">
                <div className="absolute -top-3 left-6 bg-[#6B7280] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Traditional Pricing
                </div>

                <div className="mt-4 space-y-6">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Varies by postcode</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Hidden markup fees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Inconsistent quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">No price guarantees</span>
                  </div>
                </div>

                {/* Example pricing */}
                <div className="mt-8 bg-[#1F2937] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-semibold text-[#F9FAFB] mb-3">Water Damage Example</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Premium suburb</span>
                      <span className="text-red-400 font-semibold">$4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Standard suburb</span>
                      <span className="text-red-400 font-semibold">$3,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Budget suburb</span>
                      <span className="text-red-400 font-semibold">$2,400</span>
                    </div>
                    <div className="border-t border-[#374151] pt-2 text-xs text-[#6B7280]">
                      *Plus hidden fees and markups
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our pricing (right) */}
            <div>
              <div className="bg-gradient-to-br from-[#00BFA6]/20 to-[#00A693]/10 rounded-2xl p-8 border border-[#00BFA6]/30 relative">
                <div className="absolute -top-3 left-6 bg-[#00BFA6] text-[#0F1115] px-4 py-1 rounded-full text-sm font-semibold">
                  Our Standardized Pricing
                </div>

                <div className="mt-4 space-y-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Same price everywhere</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Transparent, upfront costs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Guaranteed quality standards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Price protection guarantee</span>
                  </div>
                </div>

                {/* Example pricing */}
                <div className="mt-8 bg-[#0F1115] rounded-lg p-4 border border-[#00BFA6]/30">
                  <h4 className="font-inter font-semibold text-[#F9FAFB] mb-3">Water Damage Example</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Any location</span>
                      <span className="text-[#00BFA6] font-semibold">$2,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Any location</span>
                      <span className="text-[#00BFA6] font-semibold">$2,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Any location</span>
                      <span className="text-[#00BFA6] font-semibold">$2,600</span>
                    </div>
                    <div className="border-t border-[#00BFA6]/30 pt-2 text-xs text-[#00BFA6]">
                      *All fees included, no surprises
                    </div>
                  </div>
                </div>

                {/* Savings indicator */}
                <div className="mt-6 text-center">
                  <div className="bg-[#00BFA6] text-[#0F1115] rounded-lg p-4">
                    <div className="text-2xl font-bold font-poppins">Save up to 38%</div>
                    <div className="text-sm">compared to traditional pricing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom message */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-2xl p-8 border border-[#00BFA6]/20">
              <h3 className="font-poppins font-semibold text-2xl text-[#00BFA6] mb-4">Fair Pricing for Everyone</h3>
              <p className="text-[#9CA3AF] font-inter text-lg max-w-2xl mx-auto">
                Our standardized pricing ensures that quality restoration services are accessible to everyone,
                regardless of location or economic status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
