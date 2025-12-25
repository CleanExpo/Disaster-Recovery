import React from 'react'

export default function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1d29]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            Simple, <span className="gradient-text-teal-purple">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the plan that works for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2">Basic</h3>
              <div className="text-4xl font-bold text-[#00BFA6] mb-2">$0</div>
              <p className="text-[#9CA3AF]">Free forever</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#00BFA6] rounded-full"></span>
                3 job posts per month
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#00BFA6] rounded-full"></span>
                Basic contractor matching
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#00BFA6] rounded-full"></span>
                Email support
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#00BFA6] rounded-full"></span>
                Standard response time
              </li>
            </ul>
            <button className="w-full bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300">
              Get Started
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <div className="text-center mb-8 mt-6">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2">Premium</h3>
              <div className="text-4xl font-bold text-[#7C4DFF] mb-2">$29</div>
              <p className="text-[#9CA3AF]">per month</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                Unlimited job posts
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                Priority contractor matching
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                24/7 priority support
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                Instant response time
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#7C4DFF] rounded-full"></span>
                Job progress tracking
              </li>
            </ul>
            <button className="w-full bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300">
              Get Premium
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-[#3B82F6] mb-2">Custom</div>
              <p className="text-[#9CA3AF]">Contact us</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full"></span>
                Dedicated account manager
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full"></span>
                Custom integrations
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full"></span>
                Advanced analytics
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full"></span>
                SLA guarantees
              </li>
              <li className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full"></span>
                White-label solution
              </li>
            </ul>
            <button className="w-full bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-[#9CA3AF]">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
