import React from 'react'

export default function SocialProofSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[#1a1d29]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            What Our <span className="gradient-text-teal-purple">Users Say</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#00BFA6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SJ</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#F9FAFB]">Sarah Johnson</h4>
                <p className="text-[#9CA3AF]">Homeowner</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#FBBF24]">★</span>
              ))}
            </div>
            <p className="text-[#9CA3AF] leading-relaxed">
              "After our basement flooded, I was stressed and didn't know who to call. This platform connected me with a qualified contractor in under 5 minutes. They arrived within the hour and had everything under control. Lifesaver!"
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#7C4DFF]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7C4DFF] to-[#8B5CF6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MT</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#F9FAFB]">Mike Thompson</h4>
                <p className="text-[#9CA3AF]">Contractor</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#FBBF24]">★</span>
              ))}
            </div>
            <p className="text-[#9CA3AF] leading-relaxed">
              "I've been using this platform for 6 months now and it's completely transformed my business. I get quality leads every day and the payment system is reliable. My revenue has increased by 40%!"
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-8 rounded-2xl border border-[#374151]/50 hover:border-[#3B82F6]/50 transition-all duration-300 card-hover-lift glow-effect">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#00BFA6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">RL</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#F9FAFB]">Rachel Lee</h4>
                <p className="text-[#9CA3AF]">Property Manager</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#FBBF24]">★</span>
              ))}
            </div>
            <p className="text-[#9CA3AF] leading-relaxed">
              "As a property manager, I deal with emergencies all the time. This platform has made my job so much easier. I can quickly find vetted contractors and track their progress. My tenants are happier and my stress levels are lower."
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 bg-gradient-to-br from-[#0F1115] to-[#1a1d29] p-6 rounded-2xl border border-[#374151]/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00BFA6]">4.8/5</div>
              <div className="text-[#9CA3AF]">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-[#374151]"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#7C4DFF]">50,000+</div>
              <div className="text-[#9CA3AF]">Jobs Completed</div>
            </div>
            <div className="w-px h-12 bg-[#374151]"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3B82F6]">95%</div>
              <div className="text-[#9CA3AF]">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
