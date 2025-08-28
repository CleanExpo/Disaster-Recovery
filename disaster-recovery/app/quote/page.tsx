'use client'

import { useState } from 'react'

export default function QuotePage() {
  const [formData, setFormData] = useState({
    propertyType: '',
    damageType: '',
    damageExtent: '',
    propertySize: '',
    insuranceClaim: false,
    urgency: '',
    location: '',
    name: '',
    email: '',
    phone: '',
  })

  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyType: formData.propertyType,
          damageType: formData.damageType,
          damageExtent: formData.damageExtent,
          propertySize: parseFloat(formData.propertySize),
          insuranceClaim: formData.insuranceClaim,
          urgency: formData.urgency,
          location: formData.location,
          contact: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }
        }),
      })
      
      const data = await response.json()
      setQuote(data)
    } catch (error) {
      alert('Error generating quote. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (quote) {
    return (
      <div className="pt-20 min-h-screen bg-dark-900">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="card">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Quote Generated Successfully!</h2>
                <p className="text-gray-400">Quote ID: {quote.quoteId}</p>
              </div>

              <div className="bg-dark-700/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Estimated Cost Range</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-sm">Low Estimate</p>
                    <p className="text-2xl font-bold text-primary-400">
                      ${quote.estimate.lowRange.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Average</p>
                    <p className="text-3xl font-bold gradient-text">
                      ${quote.estimate.averageCost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">High Estimate</p>
                    <p className="text-2xl font-bold text-accent-400">
                      ${quote.estimate.highRange.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm mt-4">
                  Completion Time: {quote.timeEstimate}
                </p>
              </div>

              {quote.insuranceNote && (
                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-6">
                  <p className="text-primary-300">{quote.insuranceNote}</p>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Next Steps:</h4>
                <ul className="space-y-2">
                  {quote.nextSteps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-primary-400 mr-2">{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:1800DISASTER"
                  className="btn-primary text-center"
                >
                  Call to Discuss Quote
                </a>
                <button
                  onClick={() => {
                    setQuote(null)
                    setFormData({
                      propertyType: '',
                      damageType: '',
                      damageExtent: '',
                      propertySize: '',
                      insuranceClaim: false,
                      urgency: '',
                      location: '',
                      name: '',
                      email: '',
                      phone: '',
                    })
                  }}
                  className="btn-secondary text-center"
                >
                  Get Another Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-dark-900">
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Get Instant</span>
              <span className="text-white"> Quote</span>
            </h1>
            <p className="text-xl text-gray-400">
              Receive an estimated cost for your restoration needs in seconds
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Damage Type *
                  </label>
                  <select
                    name="damageType"
                    required
                    value={formData.damageType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Select damage type</option>
                    <option value="water">Water Damage</option>
                    <option value="fire">Fire & Smoke</option>
                    <option value="mold">Mold</option>
                    <option value="storm">Storm Damage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Damage Extent *
                  </label>
                  <select
                    name="damageExtent"
                    required
                    value={formData.damageExtent}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Select extent</option>
                    <option value="minor">Minor (1-2 rooms)</option>
                    <option value="moderate">Moderate (3-5 rooms)</option>
                    <option value="severe">Severe (Entire property)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Size (sqm) *
                  </label>
                  <input
                    type="number"
                    name="propertySize"
                    required
                    value={formData.propertySize}
                    onChange={handleChange}
                    placeholder="e.g., 200"
                    className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Urgency *
                  </label>
                  <select
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Select urgency</option>
                    <option value="immediate">Immediate (Emergency)</option>
                    <option value="within-week">Within a Week</option>
                    <option value="flexible">Flexible Timeline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City or Suburb"
                    className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="insuranceClaim"
                  id="insuranceClaim"
                  checked={formData.insuranceClaim}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-500 bg-dark-700 border-gray-600 rounded focus:ring-primary-500"
                />
                <label htmlFor="insuranceClaim" className="ml-2 text-gray-300">
                  This will be an insurance claim
                </label>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating Quote...' : 'Get Instant Quote'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}