import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-[#0F1115] to-[#1a1d29] border-b border-[#374151]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">DR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent">
                  Disaster Recovery
                </h1>
                <p className="text-xs text-[#9CA3AF]">NRPG Platform</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors font-medium">
                How It Works
              </Link>
              <Link href="#pricing" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors font-medium">
                Pricing
              </Link>
              <Link href="#about" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors font-medium">
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-6 py-2 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors font-medium border border-[#374151] rounded-lg hover:border-[#00BFA6] hover:bg-[#00BFA6]/10"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#00BFA6]/20 hover:shadow-[#00BFA6]/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
