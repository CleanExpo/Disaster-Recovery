"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Sparkles, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0F1115]/98 backdrop-blur-xl border-b border-[#00BFA6]/20 shadow-2xl shadow-[#00BFA6]/5' 
        : 'bg-[#0F1115]/90 backdrop-blur-sm border-b border-[#374151]/50'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 via-transparent to-[#7C4DFF]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img
                src="/images/brand/nrpg-logo-full.png"
                alt="NRPG - National Restoration Professionals Group"
                className="w-12 h-12 object-contain group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#7C4DFF] rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold text-xl text-[#F9FAFB] group-hover:text-[#00BFA6] transition-colors duration-300">NRPG</span>
              <span className="font-inter text-xs text-[#9CA3AF] -mt-1 group-hover:text-[#00BFA6]/70 transition-colors duration-300">National Restoration Professionals</span>
            </div>
          </Link>

          {/* Enhanced Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/services" className="relative px-4 py-2 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group">
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/about" className="relative px-4 py-2 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group">
              <span className="relative z-10">About Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/contractors" className="relative px-4 py-2 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group">
              <span className="relative z-10">For Contractors</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/property-owners" className="relative px-4 py-2 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group">
              <span className="relative z-10">For Property Owners</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/contact" className="relative px-4 py-2 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group">
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>

          {/* Enhanced CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button variant="outline" className="relative overflow-hidden text-[#F9FAFB] border-[#374151] hover:border-[#00BFA6] hover:bg-[#00BFA6]/10 transition-all duration-300 group">
                    <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Dashboard
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="relative overflow-hidden text-[#F9FAFB] border-[#374151] hover:border-[#7C4DFF] hover:bg-[#7C4DFF]/10 transition-all duration-300 group"
                >
                  <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Logout
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7C4DFF]/5 to-[#00BFA6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="relative overflow-hidden text-[#F9FAFB] border-[#374151] hover:border-[#00BFA6] hover:bg-[#00BFA6]/10 transition-all duration-300 group"
                  >
                    Sign In
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/5 to-[#7C4DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] hover:from-[#00A693] hover:to-[#6A1B9A] text-[#0F1115] font-semibold transition-all duration-300 group shadow-lg shadow-[#00BFA6]/25 hover:shadow-[#00BFA6]/40">
                    <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button 
            className="md:hidden relative p-2 text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              {isMenuOpen ? (
                <X className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-[#374151]/50 bg-gradient-to-b from-[#0F1115]/95 to-[#0F1115] backdrop-blur-xl">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/services" 
                className="relative px-4 py-3 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/about" 
                className="relative px-4 py-3 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">About Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/contractors" 
                className="relative px-4 py-3 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">For Contractors</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/property-owners"
                className="relative px-4 py-3 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">For Property Owners</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/contact" 
                className="relative px-4 py-3 font-inter text-[#F9FAFB] hover:text-[#00BFA6] transition-all duration-300 group rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-[#374151]/50">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start text-[#F9FAFB] border-[#374151] hover:bg-[#00BFA6]/10 hover:border-[#00BFA6] transition-all duration-300 group">
                        <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full justify-start text-[#F9FAFB] border-[#374151] hover:bg-[#7C4DFF]/10 hover:border-[#7C4DFF] transition-all duration-300 group"
                    >
                      <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-[#F9FAFB] border-[#374151] hover:bg-[#00BFA6]/10 hover:border-[#00BFA6] transition-all duration-300 group"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] hover:from-[#00A693] hover:to-[#6A1B9A] text-[#0F1115] font-semibold transition-all duration-300 group shadow-lg shadow-[#00BFA6]/25">
                        <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
