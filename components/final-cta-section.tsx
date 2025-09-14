import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Briefcase } from "lucide-react"

export default function FinalCtaSection() {
  return (
    <section className="py-24 relative">
      {/* Full-width dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA6]/10 to-[#7C4DFF]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115] via-[#0F1115]/90 to-[#0F1115]" />

      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="2" fill="#00BFA6" opacity="0.3" />
          <circle cx="300" cy="200" r="1" fill="#2196F3" opacity="0.4" />
          <circle cx="800" cy="150" r="2" fill="#7C4DFF" opacity="0.3" />
          <circle cx="1000" cy="300" r="1" fill="#00BFA6" opacity="0.5" />
          <circle cx="200" cy="400" r="1" fill="#2196F3" opacity="0.3" />
          <circle cx="900" cy="450" r="2" fill="#7C4DFF" opacity="0.4" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="font-poppins font-bold text-4xl md:text-6xl text-balance mb-6">
              Join the new standard in <span className="text-[#00BFA6]">restoration services</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#9CA3AF] font-inter leading-relaxed mb-12 max-w-3xl mx-auto">
              Whether you're a client seeking transparent restoration services or a contractor looking to grow your
              business, we're here to transform your experience.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            {/* Client CTA */}
            <div className="bg-gradient-to-br from-[#2196F3]/20 to-[#1976D2]/10 rounded-2xl p-8 border border-[#2196F3]/30 hover:border-[#2196F3] transition-colors duration-200 max-w-md">
              <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-2xl text-[#2196F3] mb-4">For Clients</h3>
              <p className="text-[#9CA3AF] font-inter mb-6 leading-relaxed">
                Get transparent pricing, real-time updates, and expert insurance advocacy for your restoration needs.
              </p>
              <Button
                size="lg"
                className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-poppins font-semibold text-lg px-8 py-4 w-full"
              >
                SUBMIT A REQUEST
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Contractor CTA */}
            <div className="bg-gradient-to-br from-[#7C4DFF]/20 to-[#6A1B9A]/10 rounded-2xl p-8 border border-[#7C4DFF]/30 hover:border-[#7C4DFF] transition-colors duration-200 max-w-md">
              <div className="w-16 h-16 bg-[#7C4DFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-poppins font-semibold text-2xl text-[#7C4DFF] mb-4">For Contractors</h3>
              <p className="text-[#9CA3AF] font-inter mb-6 leading-relaxed">
                Access qualified leads, streamlined workflows, and guaranteed payments to grow your business.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white font-poppins font-semibold text-lg px-8 py-4 w-full bg-transparent"
              >
                GET STARTED
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Bottom message */}
          <div className="mt-16">
            <p className="text-lg text-[#9CA3AF] font-inter">
              Ready to experience restoration services done right?{" "}
              <span className="text-[#00BFA6] font-semibold">Join thousands who already have.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
