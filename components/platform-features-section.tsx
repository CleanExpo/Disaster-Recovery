import React from 'react'

export default function PlatformFeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#F9FAFB] mb-4">Platform Features</h2>
          <p className="text-xl text-[#9CA3AF]">Everything you need in one place.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0F1115] p-6 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">Smart Search</h3>
            <p className="text-[#9CA3AF] text-sm">Find the right contractor instantly.</p>
          </div>
          <div className="bg-[#0F1115] p-6 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">Real-time Tracking</h3>
            <p className="text-[#9CA3AF] text-sm">Monitor job progress live.</p>
          </div>
          <div className="bg-[#0F1115] p-6 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">Direct Messaging</h3>
            <p className="text-[#9CA3AF] text-sm">Communicate directly with contractors.</p>
          </div>
          <div className="bg-[#0F1115] p-6 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">Secure Payments</h3>
            <p className="text-[#9CA3AF] text-sm">Protected transactions every time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
