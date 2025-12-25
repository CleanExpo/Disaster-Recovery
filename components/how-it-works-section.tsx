import React from 'react'

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1d29]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            How It <span className="gradient-text-teal-purple">Works</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Simple, fast, and reliable. Get your disaster recovery needs handled in 3 easy steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-2xl mb-6 flex items-center justify-center text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">Report Your Emergency</h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">
                Tell us about your disaster situation. Our AI analyzes the details and finds the best contractors for you.
              </p>
              <div className="flex items-center gap-3 text-[#00BFA6] font-semibold">
                <span className="w-2 h-2 bg-[#00BFA6] rounded-full animate-pulse"></span>
                Instant Response
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-2xl mb-6 flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">Get Matched Instantly</h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">
                Our intelligent matching system finds the perfect contractors based on your needs and location.
              </p>
              <div className="flex items-center gap-3 text-[#7C4DFF] font-semibold">
                <span className="w-2 h-2 bg-[#7C4DFF] rounded-full animate-pulse"></span>
                60 Seconds Max
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-2xl mb-6 flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">Get Help Fast</h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">
                Qualified contractors arrive quickly to assess and begin restoration work.
              </p>
              <div className="flex items-center gap-3 text-[#3B82F6] font-semibold">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></span>
                Quality Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
