// Client Portal Implementation - Next.js 14 + TypeScript
// NRP Disaster Recovery Client Interface

import React from 'react';
import type { Metadata } from 'next';

// ============================================
// 1. CLIENT PORTAL LAYOUT STRUCTURE
// ============================================

// app/layout.tsx
export const metadata: Metadata = {
  title: 'Disaster Recovery Australia - 24/7 Emergency Restoration',
  description: 'Immediate response for water damage, fire, mould, and storm restoration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>
        <Header />
        <main>{children}</main>
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}

// ============================================
// 2. LANDING PAGE COMPONENT
// ============================================

// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { EmergencyBanner } from '@/components/EmergencyBanner';
import { ServiceSelector } from '@/components/ServiceSelector';
import { InstantQuote } from '@/components/InstantQuote';
import { TrustIndicators } from '@/components/TrustIndicators';
import { ChatBotTrigger } from '@/components/ChatBotTrigger';

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<string>('');
  const [emergencyMode, setEmergencyMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Emergency Banner - Always Visible */}
      <EmergencyBanner />
      
      {/* Hero Section */}
      <section className="relative px-4 py-16 mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Property Damage? We're Here 24/7
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Australia's fastest emergency restoration response
          </p>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setEmergencyMode(true)}
              className="px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 animate-pulse"
            >
              🚨 Emergency Help Now
            </button>
            <button
              onClick={() => document.getElementById('chat-bot')?.click()}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
            >
              💬 Get Instant Help
            </button>
          </div>
        </div>

        {/* Service Grid */}
        <ServiceGrid />
        
        {/* Trust Indicators */}
        <TrustIndicators />
      </section>

      {/* Emergency Mode Overlay */}
      {emergencyMode && <EmergencyFlow onClose={() => setEmergencyMode(false)} />}
    </div>
  );
}

// ============================================
// 3. SERVICE GRID COMPONENT
// ============================================

const ServiceGrid = () => {
  const services = [
    {
      icon: '💧',
      title: 'Water Damage',
      description: 'Burst pipes, flooding, storm damage',
      urgency: 'Response in 2 hours',
      link: '/services/water-damage'
    },
    {
      icon: '🔥',
      title: 'Fire & Smoke',
      description: 'Fire damage restoration and smoke removal',
      urgency: 'Response in 2 hours',
      link: '/services/fire-damage'
    },
    {
      icon: '🦠',
      title: 'Mould Remediation',
      description: 'Safe mould removal and prevention',
      urgency: 'Response in 4 hours',
      link: '/services/mould'
    },
    {
      icon: '🌪️',
      title: 'Storm Damage',
      description: 'Emergency tarping and storm restoration',
      urgency: 'Response in 2 hours',
      link: '/services/storm'
    },
    {
      icon: '☣️',
      title: 'Biohazard Cleanup',
      description: 'Sewage and contamination cleanup',
      urgency: 'Response in 2 hours',
      link: '/services/biohazard'
    },
    {
      icon: '🏢',
      title: 'Commercial',
      description: 'Large-scale commercial restoration',
      urgency: 'Custom response',
      link: '/services/commercial'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
};

// ============================================
// 4. EMERGENCY FLOW COMPONENT
// ============================================

interface EmergencyFlowProps {
  onClose: () => void;
}

const EmergencyFlow: React.FC<EmergencyFlowProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [emergencyData, setEmergencyData] = useState({
    isSafe: null,
    damageType: '',
    address: '',
    phone: '',
    name: '',
    insuranceStatus: ''
  });

  const handleEmergencySubmit = async () => {
    // Send to API
    const response = await fetch('/api/emergency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emergencyData)
    });
    
    if (response.ok) {
      const data = await response.json();
      // Show confirmation
      setStep(99); // Confirmation step
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 mx-1 rounded ${
                    s <= step ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Safety Check */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">First, Is Everyone Safe?</h2>
              <p className="mb-6 text-gray-600">
                Your safety is our top priority. Please ensure everyone is safe before proceeding.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setEmergencyData({...emergencyData, isSafe: true});
                    setStep(2);
                  }}
                  className="w-full p-4 border-2 border-green-500 text-green-700 rounded-lg hover:bg-green-50"
                >
                  ✅ Yes, everyone is safe
                </button>
                <button
                  onClick={() => {
                    alert('Please call 000 immediately for emergency services');
                  }}
                  className="w-full p-4 border-2 border-red-500 text-red-700 rounded-lg hover:bg-red-50"
                >
                  ❌ No, we need emergency services
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Damage Type */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">What Type of Damage?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Water', 'Fire', 'Storm', 'Mould', 'Sewage', 'Other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setEmergencyData({...emergencyData, damageType: type});
                      setStep(3);
                    }}
                    className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                  >
                    <div className="text-3xl mb-2">
                      {type === 'Water' && '💧'}
                      {type === 'Fire' && '🔥'}
                      {type === 'Storm' && '🌪️'}
                      {type === 'Mould' && '🦠'}
                      {type === 'Sewage' && '☣️'}
                      {type === 'Other' && '❓'}
                    </div>
                    <div className="font-semibold">{type}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Where Should We Send Help?</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg"
                  value={emergencyData.name}
                  onChange={(e) => setEmergencyData({...emergencyData, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full p-3 border rounded-lg"
                  value={emergencyData.phone}
                  onChange={(e) => setEmergencyData({...emergencyData, phone: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Property Address"
                  className="w-full p-3 border rounded-lg"
                  value={emergencyData.address}
                  onChange={(e) => setEmergencyData({...emergencyData, address: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full p-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Continue →
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Insurance */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Insurance Coverage?</h2>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setEmergencyData({...emergencyData, insuranceStatus: 'insured'});
                    handleEmergencySubmit();
                  }}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500"
                >
                  ✅ Yes, I have insurance
                </button>
                <button
                  onClick={() => {
                    setEmergencyData({...emergencyData, insuranceStatus: 'uninsured'});
                    handleEmergencySubmit();
                  }}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500"
                >
                  ❌ No insurance / Not sure
                </button>
              </div>
            </div>
          )}

          {/* Confirmation */}
          {step === 99 && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-4">Help Is On The Way!</h2>
              <p className="text-gray-600 mb-6">
                A restoration specialist will contact you within 30 minutes.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="font-semibold">Your Reference: #NRP-{Date.now()}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Keep this number for insurance purposes
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 5. CHAT BOT COMPONENT (ARIA)
// ============================================

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm ARIA from National Restoration Professionals. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Send to bot API
    try {
      const response = await fetch('/api/bot/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context: {
            location: navigator.geolocation,
            timestamp: new Date(),
            sessionId: sessionStorage.getItem('sessionId')
          }
        })
      });

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, {
        type: 'bot',
        text: data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Bot error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        id="chat-bot"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-40 flex items-center justify-center"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">ARIA - Your Recovery Assistant</h3>
                <p className="text-xs opacity-90">Available 24/7</p>
              </div>
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Emergency', 'Get Quote', 'Insurance Help', 'Check Status'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => {
                    setInput(quick);
                    sendMessage();
                  }}
                  className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {quick}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// 6. CUSTOMER PORTAL (LOGGED IN)
// ============================================

// app/portal/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

interface Job {
  id: string;
  address: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'drying' | 'complete';
  technician: string;
  nextUpdate: string;
  insuranceClaim?: string;
}

export default function CustomerPortal() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await fetch('/api/customer/jobs', {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    const data = await response.json();
    setJobs(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">Track your restoration progress in real-time</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            {['current', 'history', 'documents', 'invoices'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Current Jobs */}
        {activeTab === 'current' && (
          <div className="space-y-4">
            {jobs.filter(j => j.status !== 'complete').map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Job History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {jobs.filter(j => j.status === 'complete').map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Documents */}
        {activeTab === 'documents' && (
          <DocumentsSection />
        )}

        {/* Invoices */}
        {activeTab === 'invoices' && (
          <InvoicesSection />
        )}
      </div>
    </div>
  );
}

// Job Card Component
const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const statusColors = {
    'scheduled': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'drying': 'bg-purple-100 text-purple-800',
    'complete': 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{job.address}</h3>
          <p className="text-gray-600">{job.type}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Technician:</span>
          <p className="font-medium">{job.technician}</p>
        </div>
        <div>
          <span className="text-gray-500">Next Update:</span>
          <p className="font-medium">{job.nextUpdate}</p>
        </div>
        {job.insuranceClaim && (
          <div>
            <span className="text-gray-500">Claim #:</span>
            <p className="font-medium">{job.insuranceClaim}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex space-x-3">
        <button className="text-blue-600 hover:text-blue-700">View Details</button>
        <button className="text-blue-600 hover:text-blue-700">Live Updates</button>
        <button className="text-blue-600 hover:text-blue-700">Contact Technician</button>
      </div>
    </div>
  );
};

// ============================================
// 7. API ROUTES
// ============================================

// app/api/emergency/route.ts
import { NextResponse } from 'next/server';
import { sendSMS } from '@/lib/twilio';
import { createLead } from '@/lib/crm';
import { notifyContractors } from '@/lib/contractor-notify';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    // Create lead in CRM
    const lead = await createLead({
      ...data,
      priority: 'emergency',
      source: 'web-emergency'
    });
    
    // Notify nearby contractors
    await notifyContractors(lead);
    
    // Send confirmation SMS
    await sendSMS(data.phone, `Help is on the way! Reference: #NRP-${lead.id}`);
    
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      estimatedResponse: '30 minutes'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process emergency' }, { status: 500 });
  }
}

// app/api/bot/client/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message, context } = await request.json();
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are ARIA, the AI assistant for National Restoration Professionals.
          You help customers with property damage emergencies in Australia.
          Be empathetic, professional, and solution-focused.
          Always prioritize safety and quick response.
          Collect: damage type, address, contact details, insurance status.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });
    
    return NextResponse.json({
      response: completion.choices[0].message.content,
      context: context
    });
  } catch (error) {
    return NextResponse.json({ error: 'Bot unavailable' }, { status: 500 });
  }
}

// ============================================
// 8. MOBILE RESPONSIVE DESIGN
// ============================================

// Mobile-first responsive utilities (Tailwind CSS)
const mobileStyles = {
  container: "px-4 sm:px-6 lg:px-8",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  text: {
    heading: "text-3xl sm:text-4xl lg:text-5xl",
    body: "text-base sm:text-lg",
  },
  spacing: {
    section: "py-8 sm:py-12 lg:py-16",
    element: "mb-4 sm:mb-6 lg:mb-8"
  }
};

// ============================================
// 9. SEO COMPONENTS
// ============================================

// components/SEO/LocalSchema.tsx
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DamageRestoration",
    "name": "National Restoration Professionals",
    "image": "https://nrp.com.au/logo.png",
    "telephone": "1300-NRP-247",
    "email": "help@nrp.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4698,
      "longitude": 153.0251
    },
    "url": "https://disasterrecovery.com.au",
    "sameAs": [
      "https://facebook.com/nrpaus",
      "https://linkedin.com/company/nrp-australia"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Restoration Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Damage Restoration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Damage Restoration"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};