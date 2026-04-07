'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    window.location.href = '/claim/start'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Logo / brand mark */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-900 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
            aria-hidden="true"
          >
            <path d="M1 6l4 4 4-4 4 4 4-4 4 4" />
            <path d="M1 12l4 4 4-4 4 4 4-4 4 4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-blue-900">
          Disaster Recovery Australia
        </h1>
      </div>

      {/* Status indicator */}
      <div className="w-full max-w-md bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`}
            aria-hidden="true"
          />
          <span className="font-semibold text-gray-800">
            {isOnline ? 'Connection restored' : 'You are offline'}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {isOnline
            ? 'Your connection is back. You can continue your claim.'
            : 'No internet connection detected. Some features may be unavailable in your area.'}
        </p>
      </div>

      {/* Main message */}
      <div className="w-full max-w-md text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Need help right now?
        </h2>
        <p className="text-gray-600 mb-4">
          If you are in immediate danger, call{' '}
          <strong>Triple Zero (000)</strong> first.
        </p>
        <p className="text-gray-600">
          When your connection returns, your claim form will be available.
          Your browser has cached the key pages for offline access.
        </p>
      </div>

      {/* Emergency contact numbers */}
      <div className="w-full max-w-md bg-blue-900 text-white rounded-xl p-6 mb-6">
        <h3 className="font-bold text-lg mb-4 text-center">
          Key Emergency Numbers
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span className="text-blue-200 text-sm">Police / Fire / Ambulance</span>
            <a
              href="tel:000"
              className="text-white font-bold text-xl hover:text-blue-200 transition-colors"
              aria-label="Call Triple Zero"
            >
              000
            </a>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-blue-200 text-sm">State Emergency Service</span>
            <a
              href="tel:132500"
              className="text-white font-bold text-xl hover:text-blue-200 transition-colors"
              aria-label="Call State Emergency Service"
            >
              13 25 00
            </a>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-blue-200 text-sm">Disaster Recovery AU</span>
            <a
              href="tel:1800000000"
              className="text-white font-bold text-xl hover:text-blue-200 transition-colors"
              aria-label="Call Disaster Recovery Australia"
            >
              1800 DR HELP
            </a>
          </li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <button
          onClick={handleRetry}
          className="w-full py-4 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 active:bg-blue-950 transition-colors text-lg"
        >
          Try Again — Lodge My Claim
        </button>

        <Link
          href="/claim"
          className="w-full py-4 bg-white text-blue-900 font-semibold rounded-xl border-2 border-blue-900 hover:bg-blue-50 active:bg-blue-100 transition-colors text-lg text-center"
        >
          Claim Overview
        </Link>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-gray-400 text-center max-w-xs">
        This page is available offline. Key claim and contact pages are stored
        on your device for use in low-coverage disaster zones.
      </p>
    </div>
  )
}
