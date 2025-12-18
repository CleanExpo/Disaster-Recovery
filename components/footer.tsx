import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight, Sparkles, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0F1115] to-[#1a1d29] border-t border-[#374151]/50 relative z-10 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-[#00BFA6]/10 to-[#3B82F6]/10 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#00BFA6]/5"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[#7C4DFF]/10 to-[#00BFA6]/10 rounded-full blur-3xl animate-pulse animation-delay-2000 shadow-2xl shadow-[#7C4DFF]/5"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-20 right-1/4 w-32 h-32 border-2 border-[#00BFA6]/20 rotate-45 animate-pulse rounded-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-[#7C4DFF] to-[#00BFA6] rounded-full opacity-10 animate-bounce"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-[#00BFA6] rounded-full animate-ping shadow-lg shadow-[#00BFA6]/30"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-ping animation-delay-1000 shadow-lg shadow-[#3B82F6]/30"></div>
        <div className="absolute top-2/3 left-2/3 w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-ping animation-delay-2000 shadow-lg shadow-[#8B5CF6]/30"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-3xl p-8 border border-[#00BFA6]/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00BFA6]/20 to-[#7C4DFF]/20 rounded-full border border-[#00BFA6]/30 mb-4">
                <Sparkles className="h-4 w-4 mr-2 animate-pulse text-[#00BFA6]" />
                <span className="font-poppins font-semibold text-[#00BFA6] text-sm">Stay Updated</span>
              </div>
              <h3 className="font-poppins font-bold text-3xl text-[#F9FAFB] mb-4">
                Get the Latest Restoration Insights
              </h3>
              <p className="text-[#9CA3AF] font-inter max-w-2xl mx-auto">
                Join thousands of property owners and contractors who trust NRPG for transparent, reliable restoration services.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#0F1115] border border-[#374151] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#00BFA6] focus:outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] hover:from-[#00A693] hover:to-[#6A1B9A] text-[#0F1115] font-semibold rounded-lg transition-all duration-300 group shadow-lg shadow-[#00BFA6]/25 hover:shadow-[#00BFA6]/40">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6] to-[#2196F3] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00BFA6]/25 group-hover:shadow-[#00BFA6]/40 transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#7C4DFF] rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl text-[#F9FAFB] group-hover:text-[#00BFA6] transition-colors duration-300">NRPG</span>
                <span className="font-inter text-xs text-[#9CA3AF] -mt-1 group-hover:text-[#00BFA6]/70 transition-colors duration-300">Unite Group Australia</span>
              </div>
            </Link>
            <p className="font-inter text-[#9CA3AF] text-sm leading-relaxed">
              Connecting clients and contractors through transparent, trusted restoration services across Australia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="relative p-2 text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 group">
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="relative p-2 text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 group">
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="relative p-2 text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 group">
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-6">
            <h3 className="font-poppins font-semibold text-lg text-[#F9FAFB]">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">About Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/contractors"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">For Contractors</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/property-owners"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">For Property Owners</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="font-poppins font-semibold text-lg text-[#F9FAFB]">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/support"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">Support Center</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">Help Center</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">Privacy Policy</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
                >
                  <span className="relative z-10">Terms of Service</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Contact */}
          <div className="space-y-6">
            <h3 className="font-poppins font-semibold text-lg text-[#F9FAFB]">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00BFA6]/20 to-[#00A693]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5 text-[#00BFA6]" />
                </div>
                <span className="font-inter text-[#9CA3AF] text-sm group-hover:text-[#F9FAFB] transition-colors duration-300">1800 NRPG AUS</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C4DFF]/20 to-[#6A1B9A]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-[#7C4DFF]" />
                </div>
                <span className="font-inter text-[#9CA3AF] text-sm group-hover:text-[#F9FAFB] transition-colors duration-300">hello@nrp.com.au</span>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6]/20 to-[#1976D2]/10 rounded-lg flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <span className="font-inter text-[#9CA3AF] text-sm group-hover:text-[#F9FAFB] transition-colors duration-300">
                  Level 10, 123 Collins Street
                  <br />
                  Melbourne VIC 3000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-[#374151]/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="font-inter text-[#9CA3AF] text-sm">
                © 2024 NRPG - Unite Group Australia. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[#00BFA6]" />
                <span className="text-[#9CA3AF] text-sm">Secure & Trusted Platform</span>
              </div>
            </div>
            <div className="flex space-x-8">
              <Link
                href="/privacy"
                className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
              >
                <span className="relative z-10">Privacy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/terms" 
                className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
              >
                <span className="relative z-10">Terms</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/support"
                className="relative font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-all duration-300 text-sm group"
              >
                <span className="relative z-10">Support</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
