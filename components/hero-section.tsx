import React from 'react'

export default function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent">
            Disaster Recovery
          </span>
          <br />
          <span className="text-[#F9FAFB]">Made Simple</span>
        </h1>
        <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto mb-8">
          Connect with verified contractors instantly. Get your property restored fast.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] text-white rounded-lg font-semibold hover:opacity-90 transition-all">
            Get Started
          </button>
          <button className="px-8 py-4 border border-[#374151] text-[#F9FAFB] rounded-lg font-semibold hover:border-[#00BFA6] transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
