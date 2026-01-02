'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Step = 'service' | 'location' | 'details' | 'contact' | 'confirm'

interface FormData {
  serviceType: string
  urgency: string
  state: string
  suburb: string
  postcode: string
  propertyType: string
  description: string
  name: string
  email: string
  preferredContact: 'email' | 'form'
}

const SERVICES = [
  { id: 'water-damage', label: 'Water Damage Restoration', icon: '💧' },
  { id: 'fire-damage', label: 'Fire & Smoke Restoration', icon: '🔥' },
  { id: 'mould-remediation', label: 'Mould Remediation', icon: '🦠' },
  { id: 'storm-damage', label: 'Storm Damage Repair', icon: '⛈️' },
  { id: 'biohazard', label: 'Biohazard Cleanup', icon: '☣️' },
  { id: 'carpet-cleaning', label: 'Carpet & Upholstery', icon: '🧹' },
]

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT']

export default function ClientOnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('service')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    urgency: 'standard',
    state: '',
    suburb: '',
    postcode: '',
    propertyType: 'residential',
    description: '',
    name: '',
    email: '',
    preferredContact: 'email',
  })

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    const steps: Step[] = ['service', 'location', 'details', 'contact', 'confirm']
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const steps: Step[] = ['service', 'location', 'details', 'contact', 'confirm']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/public/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/request-submitted?id=${data.id}`)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepIndicator = (
    <div className="flex justify-center mb-8">
      {['service', 'location', 'details', 'contact', 'confirm'].map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
            ${step === s ? 'bg-blue-600 text-white' :
              ['service', 'location', 'details', 'contact', 'confirm'].indexOf(step) > i
                ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
            {i + 1}
          </div>
          {i < 4 && <div className="w-12 h-1 bg-slate-200 mx-1" />}
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {stepIndicator}

      {step === 'service' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">What service do you need?</h2>
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map(service => (
              <button
                key={service.id}
                onClick={() => updateForm('serviceType', service.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all
                  ${formData.serviceType === service.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'}`}
              >
                <span className="text-2xl">{service.icon}</span>
                <p className="mt-2 font-medium text-slate-900">{service.label}</p>
              </button>
            ))}
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
            <div className="flex gap-4">
              {[
                { id: 'emergency', label: 'Emergency (24hr)' },
                { id: 'urgent', label: 'Urgent (48hr)' },
                { id: 'standard', label: 'Standard' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => updateForm('urgency', opt.id)}
                  className={`px-4 py-2 rounded-lg border transition-all
                    ${formData.urgency === opt.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={nextStep}
            disabled={!formData.serviceType}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-medium
              disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      {step === 'location' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Where is the property?</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
              <select
                value={formData.state}
                onChange={(e) => updateForm('state', e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl"
              >
                <option value="">Select state</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Postcode</label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => updateForm('postcode', e.target.value)}
                placeholder="2000"
                maxLength={4}
                className="w-full p-3 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Suburb</label>
            <input
              type="text"
              value={formData.suburb}
              onChange={(e) => updateForm('suburb', e.target.value)}
              placeholder="Enter suburb"
              className="w-full p-3 border border-slate-200 rounded-xl"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.state || !formData.suburb || !formData.postcode}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium
                disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Tell us more</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
            <div className="flex gap-4">
              {[
                { id: 'residential', label: 'Residential' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'industrial', label: 'Industrial' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => updateForm('propertyType', opt.id)}
                  className={`flex-1 py-3 rounded-xl border transition-all
                    ${formData.propertyType === opt.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Describe the situation
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateForm('description', e.target.value)}
              rows={4}
              placeholder="Please describe what happened and the extent of the damage..."
              className="w-full p-3 border border-slate-200 rounded-xl resize-none"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.description}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium
                disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 'contact' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Your contact details</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateForm('name', e.target.value)}
              placeholder="John Smith"
              className="w-full p-3 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateForm('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full p-3 border border-slate-200 rounded-xl"
            />
          </div>
          <p className="text-sm text-slate-500">
            A matched contractor will contact you directly via email.
            You can also reach our support team at support@disasterrecovery.com.au
          </p>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.name || !formData.email}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium
                disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Confirm your request</h2>
          <div className="bg-slate-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-600">Service</span>
              <span className="font-medium">{SERVICES.find(s => s.id === formData.serviceType)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Location</span>
              <span className="font-medium">{formData.suburb}, {formData.state} {formData.postcode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Property</span>
              <span className="font-medium capitalize">{formData.propertyType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Urgency</span>
              <span className="font-medium capitalize">{formData.urgency}</span>
            </div>
            <div className="border-t pt-4">
              <span className="text-slate-600">Contact</span>
              <p className="font-medium">{formData.name}</p>
              <p className="text-sm text-slate-500">{formData.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={prevStep} className="flex-1 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50">
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium
                disabled:bg-slate-300 hover:bg-green-700 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
