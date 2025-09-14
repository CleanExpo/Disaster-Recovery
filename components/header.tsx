"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1115]/95 backdrop-blur-sm border-b border-[#374151]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00BFA6] to-[#2196F3] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold text-lg text-[#F9FAFB]">NRP</span>
              <span className="font-inter text-xs text-[#9CA3AF] -mt-1">Unite Group Australia</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
              Services
            </Link>
            <Link href="/about" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
              About Us
            </Link>
            <Link href="/contractors" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
              For Contractors
            </Link>
            <Link href="/property-owners" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
              For Property Owners
            </Link>
            <Link href="/contact" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold">Submit Request</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#F9FAFB]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#374151]">
            <nav className="flex flex-col space-y-4">
              <Link href="/services" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
                Services
              </Link>
              <Link href="/about" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
                About Us
              </Link>
              <Link href="/contractors" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
                For Contractors
              </Link>
              <Link
                href="/property-owners"
                className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors"
              >
                For Property Owners
              </Link>
              <Link href="/contact" className="font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-colors">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold justify-start">
                  Submit Request
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
