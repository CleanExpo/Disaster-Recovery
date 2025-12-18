import { TrendingUp, Users, Clock, DollarSign } from "lucide-react"

export default function StatsVisual() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0F1115] to-[#1F2937]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#00BFA6] mb-2">10,000+</div>
            <div className="text-[#9CA3AF] font-inter">Happy Clients</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#2196F3] mb-2">500+</div>
            <div className="text-[#9CA3AF] font-inter">Verified Contractors</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#7C4DFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#7C4DFF] mb-2">24/7</div>
            <div className="text-[#9CA3AF] font-inter">Support Available</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#00BFA6] mb-2">$50M+</div>
            <div className="text-[#9CA3AF] font-inter">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
