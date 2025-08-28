'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-lg border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DR</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:inline">
                Disaster Recovery
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <a
              href="tel:1800DISASTER"
              className="btn-primary text-sm"
            >
              Emergency: 1800 DISASTER
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-800 rounded-lg mt-2 p-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 rounded transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 rounded transition-colors"
            >
              Services
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 rounded transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 rounded transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 rounded transition-colors"
            >
              Contact
            </Link>
            <a
              href="tel:1800DISASTER"
              className="block text-center btn-primary text-sm"
            >
              Emergency: 1800 DISASTER
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header