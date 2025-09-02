// Contractor Portal Implementation - Next.js 14 + TypeScript
// NRP Member Dashboard & Management System

import React from 'react';
import type { Metadata } from 'next';

// ============================================
// 1. CONTRACTOR DASHBOARD LAYOUT
// ============================================

// app/contractor/layout.tsx
export const metadata: Metadata = {
  title: 'NRP Contractor Portal - Member Dashboard',
  description: 'Manage leads, jobs, and grow your restoration business',
};

export default function ContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>
        <ContractorSidebar />
        <main className="ml-64">{children}</main>
        <NexusBot />
        <NotificationCenter />
      </body>
    </html>
  );
}

// ============================================
// 2. MAIN DASHBOARD
// ============================================

// app/contractor/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  LeadFeed, 
  RevenueChart, 
  PerformanceMetrics, 
  QuickActions,
  TerritoryMap
} from '@/components/contractor';

interface DashboardData {
  member: {
    name: string;
    tier: 'foundation' | 'professional' | 'enterprise' | 'franchise';
    memberSince: string;
    territories: string[];
  };
  metrics: {
    monthlyRevenue: number;
    activeJobs: number;
    completedJobs: number;
    averageRating: number;
    responseTime: string;
    conversionRate: number;
  };
  leads: Lead[];
  alerts: Alert[];
}

export default function ContractorDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'leads' | 'jobs'>('overview');

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates
    const ws = new WebSocket('wss://api.nrp.com.au/contractor/stream');
    ws.onmessage = handleRealtimeUpdate;
    return () => ws.close();
  }, []);

  const fetchDashboardData = async () => {
    const response = await fetch('/api/contractor/dashboard', {
      headers: { Authorization: `Bearer ${user?.token}` }
    });
    const dashboardData = await response.json();
    setData(dashboardData);
  };

  const handleRealtimeUpdate = (event: MessageEvent) => {
    const update = JSON.parse(event.data);
    if (update.type === 'NEW_LEAD') {
      // Show notification and update lead feed
      showNotification('New Lead Available!', update.lead);
    }
  };

  if (!data) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {data.member.name}
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-AU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Monthly Revenue"
          value={`$${data.metrics.monthlyRevenue.toLocaleString()}`}
          change="+12%"
          trend="up"
          icon="💰"
        />
        <StatCard
          title="Active Jobs"
          value={data.metrics.activeJobs}
          subtitle="3 urgent"
          icon="🔧"
        />
        <StatCard
          title="Conversion Rate"
          value={`${data.metrics.conversionRate}%`}
          change="+5%"
          trend="up"
          icon="📈"
        />
        <StatCard
          title="Average Rating"
          value={data.metrics.averageRating.toFixed(1)}
          subtitle="Last 30 days"
          icon="⭐"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Lead Feed - Left Column */}
        <div className="col-span-12 lg:col-span-8">
          <LeadFeed 
            leads={data.leads}
            memberTier={data.member.tier}
            onAccept={handleLeadAccept}
            onDecline={handleLeadDecline}
          />
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Performance Metrics */}
          <PerformanceMetrics metrics={data.metrics} />
          
          {/* Territory Map */}
          <TerritoryMap territories={data.member.territories} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. LEAD MANAGEMENT COMPONENT
// ============================================

interface Lead {
  id: string;
  type: 'water' | 'fire' | 'mould' | 'storm' | 'biohazard';
  address: string;
  suburb: string;
  estimatedValue: number;
  urgency: 'emergency' | 'urgent' | 'standard';
  insuranceStatus: 'approved' | 'pending' | 'private';
  postedTime: Date;
  expiresIn: number; // minutes
  competition: number; // other contractors notified
  customerNotes?: string;
  images?: string[];
}

const LeadFeed: React.FC<{
  leads: Lead[];
  memberTier: string;
  onAccept: (leadId: string) => void;
  onDecline: (leadId: string) => void;
}> = ({ leads, memberTier, onAccept, onDecline }) => {
  const [filter, setFilter] = useState<'all' | 'emergency' | 'insurance'>('all');
  const [sortBy, setSortBy] = useState<'value' | 'distance' | 'time'>('time');

  const filteredLeads = leads
    .filter(lead => {
      if (filter === 'emergency') return lead.urgency === 'emergency';
      if (filter === 'insurance') return lead.insuranceStatus === 'approved';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'value') return b.estimatedValue - a.estimatedValue;
      if (sortBy === 'time') return b.postedTime.getTime() - a.postedTime.getTime();
      return 0;
    });

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Available Leads</h2>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="all">All Leads</option>
              <option value="emergency">Emergency Only</option>
              <option value="insurance">Insurance Approved</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="time">Newest First</option>
              <option value="value">Highest Value</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lead Cards */}
      <div className="divide-y">
        {filteredLeads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onAccept={() => onAccept(lead.id)}
            onDecline={() => onDecline(lead.id)}
            isPriority={memberTier === 'enterprise' || memberTier === 'franchise'}
          />
        ))}
      </div>
    </div>
  );
};

const LeadCard: React.FC<{
  lead: Lead;
  onAccept: () => void;
  onDecline: () => void;
  isPriority: boolean;
}> = ({ lead, onAccept, onDecline, isPriority }) => {
  const [timeLeft, setTimeLeft] = useState(lead.expiresIn);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const urgencyColors = {
    emergency: 'bg-red-100 text-red-800 animate-pulse',
    urgent: 'bg-orange-100 text-orange-800',
    standard: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Lead Header */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">
              {lead.type === 'water' && '💧'}
              {lead.type === 'fire' && '🔥'}
              {lead.type === 'mould' && '🦠'}
              {lead.type === 'storm' && '🌪️'}
              {lead.type === 'biohazard' && '☣️'}
            </span>
            <div>
              <h3 className="font-semibold text-lg">{lead.suburb}</h3>
              <p className="text-sm text-gray-600">{lead.address}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${urgencyColors[lead.urgency]}`}>
              {lead.urgency.toUpperCase()}
            </span>
          </div>

          {/* Lead Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <span className="text-xs text-gray-500">Est. Value</span>
              <p className="font-semibold text-green-600">
                ${lead.estimatedValue.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Insurance</span>
              <p className="font-medium">
                {lead.insuranceStatus === 'approved' && '✅ Approved'}
                {lead.insuranceStatus === 'pending' && '⏳ Pending'}
                {lead.insuranceStatus === 'private' && '💵 Private'}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Competition</span>
              <p className="font-medium">
                {lead.competition} contractors
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Expires</span>
              <p className={`font-medium ${timeLeft < 10 ? 'text-red-600' : ''}`}>
                {timeLeft} min
              </p>
            </div>
          </div>

          {/* Customer Notes */}
          {lead.customerNotes && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm">📝 {lead.customerNotes}</p>
            </div>
          )}

          {/* AI Analysis (for paid tiers) */}
          {isPriority && (
            <AILeadAnalysis lead={lead} />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 ml-4">
          <button
            onClick={onAccept}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Decline
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-6 py-2 text-blue-600 hover:text-blue-700"
          >
            {showDetails ? 'Less' : 'More'}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <LeadDetailsExpanded lead={lead} />
      )}
    </div>
  );
};

// ============================================
// 4. JOB MANAGEMENT
// ============================================

// app/contractor/jobs/page.tsx
export default function JobsManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [view, setView] = useState<'list' | 'calendar' | 'map'>('list');

  return (
    <div className="p-6">
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Management</h1>
        <div className="flex space-x-2">
          {['list', 'calendar', 'map'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-4 py-2 rounded-lg ${
                view === v
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Job Views */}
      {view === 'list' && <JobListView jobs={jobs} />}
      {view === 'calendar' && <JobCalendarView jobs={jobs} />}
      {view === 'map' && <JobMapView jobs={jobs} />}
    </div>
  );
}

// ============================================
// 5. FINANCIAL DASHBOARD
// ============================================

// app/contractor/financials/page.tsx
export default function FinancialDashboard() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Financial Overview</h1>
        <div className="flex space-x-4">
          {['week', 'month', 'quarter', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p as any)}
              className={`px-4 py-2 rounded-lg ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart data={financialData?.revenue} period={period} />
        <ProfitMarginChart data={financialData?.margins} />
      </div>

      {/* Outstanding Invoices */}
      <OutstandingInvoices invoices={financialData?.outstanding} />

      {/* Tax Summary */}
      <TaxSummary data={financialData?.tax} />
    </div>
  );
}

// ============================================
// 6. NEXUS BOT (CONTRACTOR AI ASSISTANT)
// ============================================

const NexusBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "G'day! I'm NEXUS, your business assistant. How can I help grow your restoration business today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, {
      type: 'user',
      text: input,
      timestamp: new Date()
    }]);

    // Send to NEXUS API
    const response = await fetch('/api/bot/contractor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: input,
        context: {
          memberTier: 'professional',
          currentJobs: 5,
          revenue: 45000
        }
      })
    });

    const data = await response.json();
    
    setMessages(prev => [...prev, {
      type: 'bot',
      text: data.response,
      timestamp: new Date(),
      actions: data.actions // Quick action buttons
    }]);

    setInput('');
  };

  return (
    <>
      {/* Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 z-50 flex items-center justify-center"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Bot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">NEXUS - Business Assistant</h3>
                <p className="text-xs opacity-90">Powered by AI</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b bg-gray-50">
            <div className="flex space-x-2 overflow-x-auto">
              {['Lead Analysis', 'Revenue Report', 'Next Actions', 'Training'].map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setInput(action);
                    sendMessage();
                  }}
                  className="px-3 py-1 bg-white border rounded-full text-xs whitespace-nowrap hover:bg-gray-100"
                >
                  {action}
                </button>
              ))}
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
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div>{msg.text}</div>
                  {msg.actions && (
                    <div className="mt-2 space-y-1">
                      {msg.actions.map((action: any, i: number) => (
                        <button
                          key={i}
                          className="block w-full text-left px-2 py-1 bg-white/20 rounded text-sm hover:bg-white/30"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about leads, revenue, training..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// 7. TRAINING & CERTIFICATION
// ============================================

// app/contractor/training/page.tsx
export default function TrainingCenter() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCertifications, setMyCertifications] = useState<Certification[]>([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">NRP University</h1>

      {/* Recommended Courses */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.filter(c => c.recommended).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* My Certifications */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Certifications</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {myCertifications.map(cert => (
              <CertificationRow key={cert.id} certification={cert} />
            ))}
          </div>
        </div>
      </div>

      {/* Course Catalog */}
      <CourseCatalog />
    </div>
  );
}

// ============================================
// 8. TERRITORY MANAGEMENT
// ============================================

// app/contractor/territories/page.tsx
export default function TerritoryManagement() {
  const [myTerritories, setMyTerritories] = useState<Territory[]>([]);
  const [availableTerritories, setAvailableTerritories] = useState<Territory[]>([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Territory Management</h1>

      {/* Territory Map */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <TerritoryMapInteractive
          myTerritories={myTerritories}
          availableTerritories={availableTerritories}
          onTerritoryClick={handleTerritoryClick}
        />
      </div>

      {/* Territory Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TerritoryPerformance territories={myTerritories} />
        <TerritoryOpportunities availableTerritories={availableTerritories} />
      </div>
    </div>
  );
}

// ============================================
// 9. VENDOR PERKS MARKETPLACE
// ============================================

// app/contractor/perks/page.tsx
export default function VendorPerks() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [savings, setSavings] = useState<SavingsData | null>(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">NRP Perks Marketplace</h1>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <p className="font-semibold">
            Total Savings This Year: ${savings?.yearToDate.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Vendor Categories */}
      <VendorCategories />

      {/* Featured Deals */}
      <FeaturedDeals />

      {/* Vendor Grid */}
      <VendorGrid vendors={vendors} />
    </div>
  );
}

// ============================================
// 10. API ROUTES FOR CONTRACTOR PORTAL
// ============================================

// app/api/contractor/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getContractorData } from '@/lib/contractor';

export async function GET(request: Request) {
  const contractorId = await getContractorFromToken(request);
  
  const data = await getContractorData(contractorId);
  
  return NextResponse.json({
    member: data.member,
    metrics: data.metrics,
    leads: data.recentLeads,
    alerts: data.alerts
  });
}

// app/api/contractor/lead/accept/route.ts
export async function POST(request: Request) {
  const { leadId } = await request.json();
  const contractorId = await getContractorFromToken(request);
  
  try {
    // Check lead availability
    const lead = await checkLeadAvailable(leadId);
    if (!lead.available) {
      return NextResponse.json({ error: 'Lead no longer available' }, { status: 410 });
    }
    
    // Assign lead to contractor
    await assignLead(leadId, contractorId);
    
    // Send confirmation
    await sendLeadAcceptanceNotification(contractorId, leadId);
    
    return NextResponse.json({
      success: true,
      jobId: lead.jobId,
      customerContact: lead.customerContact
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to accept lead' }, { status: 500 });
  }
}

// app/api/bot/contractor/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message, context } = await request.json();
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are NEXUS, the AI assistant for NRP contractor members.
        You help contractors grow their restoration business.
        Provide actionable insights on leads, revenue, and performance.
        Current context: ${JSON.stringify(context)}`
      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.7,
    max_tokens: 300
  });
  
  return NextResponse.json({
    response: completion.choices[0].message.content,
    actions: generateQuickActions(message, context)
  });
}

// ============================================
// 11. REAL-TIME NOTIFICATIONS
// ============================================

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Connect to WebSocket for real-time notifications
    const ws = new WebSocket('wss://api.nrp.com.au/notifications');
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.body,
          icon: '/nrp-icon.png'
        });
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <button
                onClick={() => {
                  setUnreadCount(0);
                  markAllRead();
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mark all read
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500">No notifications</p>
            ) : (
              notifications.map((notif) => (
                <NotificationItem key={notif.id} notification={notif} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};