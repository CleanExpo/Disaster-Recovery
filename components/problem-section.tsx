import React from 'react'

export default function ProblemSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[#1a1d29]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#F9FAFB] mb-4">The Problem</h2>
          <p className="text-xl text-[#9CA3AF]">When disaster strikes, finding help shouldn't be another disaster.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#374151]/50">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Time Wasted</h3>
            <p className="text-[#9CA3AF]">Hours spent searching for available contractors during emergencies.</p>
          </div>
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#374151]/50">
            <div className="text-4xl mb-4">❓</div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Unknown Quality</h3>
            <p className="text-[#9CA3AF]">No way to verify contractor credentials or past work quality.</p>
          </div>
          <div className="bg-[#0F1115] p-8 rounded-2xl border border-[#374151]/50">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">Price Gouging</h3>
            <p className="text-[#9CA3AF]">Emergency situations often lead to inflated prices and hidden fees.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
