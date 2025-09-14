import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0F1115] border-t border-[#374151]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00BFA6] to-[#2196F3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-lg text-[#F9FAFB]">NRP</span>
                <span className="font-inter text-xs text-[#9CA3AF] -mt-1">Unite Group Australia</span>
              </div>
            </Link>
            <p className="font-inter text-[#9CA3AF] text-sm leading-relaxed">
              Connecting clients and contractors through transparent, trusted restoration services across Australia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#9CA3AF] hover:text-[#00BFA6] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#00BFA6] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#00BFA6] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-[#F9FAFB]">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contractors"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  For Contractors
                </Link>
              </li>
              <li>
                <Link
                  href="/property-owners"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  For Property Owners
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-[#F9FAFB]">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-[#F9FAFB]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#00BFA6]" />
                <span className="font-inter text-[#9CA3AF] text-sm">1800 NRP AUS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#00BFA6]" />
                <span className="font-inter text-[#9CA3AF] text-sm">hello@nrp.com.au</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#00BFA6] mt-0.5" />
                <span className="font-inter text-[#9CA3AF] text-sm">
                  Level 10, 123 Collins Street
                  <br />
                  Melbourne VIC 3000
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#374151] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-[#9CA3AF] text-sm">
              © 2024 NRP - Unite Group Australia. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link href="/terms" className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm">
                Terms
              </Link>
              <Link
                href="/support"
                className="font-inter text-[#9CA3AF] hover:text-[#00BFA6] transition-colors text-sm"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
