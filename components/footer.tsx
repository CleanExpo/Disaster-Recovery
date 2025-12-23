import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0F1115] to-transparent py-16 border-t border-[#374151]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BFA6] to-[#7C4DFF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DR</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F9FAFB]">Disaster Recovery</h3>
                <p className="text-sm text-[#9CA3AF]">NRPG Platform</p>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Connecting disaster recovery professionals with clients who need help, fast.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#F9FAFB] mb-4">For Clients</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Find Contractors</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Get Help Fast</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Track Progress</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Reviews</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#F9FAFB] mb-4">For Contractors</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Get More Jobs</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Grow Your Business</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Manage Projects</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Get Paid Fast</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#F9FAFB] mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#374151]/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#9CA3AF] text-sm">
            © 2025 Disaster Recovery NRPG Platform. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors text-sm">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
