import React from 'react'

export default function SolutionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[#1a1d29]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            The <span className="gradient-text-teal-purple">Future</span> of Disaster Recovery
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Experience the next generation of disaster recovery services with our cutting-edge platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">AI-Powered Matching</h3>
            <p className="text-[#9CA3AF] leading-relaxed">
              Our intelligent algorithms match you with the perfect contractor based on location, expertise, and availability in seconds.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">Lightning Fast</h3>
            <p className="text-[#9CA3AF] leading-relaxed">
              Get matched with qualified contractors in under 60 seconds. No more waiting days for quotes.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-white font-bold text-lg">🛡️</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4">Trusted Network</h3>
            <p className="text-[#9CA3AF] leading-relaxed">
              All contractors are verified, insured, and rated by our community. Quality guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
