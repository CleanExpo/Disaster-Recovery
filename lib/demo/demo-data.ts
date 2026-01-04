/**
 * Demo Data for Tradeshow Booth
 * Fake contractors, clients, jobs, and messages for demonstration
 */

import type { JobStatus, ChatMessage } from '@/lib/supabase/types'

// Sydney CBD coordinates for demo
const SYDNEY_CBD = { lat: -33.8688, lng: 151.2093 }

export interface DemoContractor {
  id: string
  businessName: string
  user: {
    name: string
    email: string
  }
  rating: number
  completedJobs: number
  phone: string
  location: {
    lat: number
    lng: number
  }
  specialties: string[]
}

export interface DemoClient {
  id: string
  name: string
  email: string
  phone: string
  address: string
  location: {
    lat: number
    lng: number
  }
}

export interface DemoJob {
  id: string
  serviceType: string
  status: JobStatus
  priority: 'normal' | 'urgent' | 'emergency'
  contractor: DemoContractor | null
  client: DemoClient
  eta: number | null
  distanceKm: number | null
  trafficCondition: 'clear' | 'moderate' | 'heavy' | null
  createdAt: Date
  acceptedAt: Date | null
  completedAt: Date | null
  description: string
}

export interface DemoMessage extends ChatMessage {
  // Same as ChatMessage
}

// Demo Contractors
export const demoContractors: DemoContractor[] = [
  {
    id: 'demo-contractor-1',
    businessName: 'Rapid Restore Solutions',
    user: { name: 'Mike Thompson', email: 'mike@rapidrestore.com.au' },
    rating: 4.9,
    completedJobs: 247,
    phone: '0412 345 678',
    location: { lat: -33.8750, lng: 151.2050 }, // Circular Quay area
    specialties: ['Water Damage', 'Flood Restoration', 'Mould Remediation'],
  },
  {
    id: 'demo-contractor-2',
    businessName: 'FireGuard Restoration',
    user: { name: 'Sarah Chen', email: 'sarah@fireguard.com.au' },
    rating: 4.8,
    completedJobs: 183,
    phone: '0423 456 789',
    location: { lat: -33.8600, lng: 151.2100 }, // North Sydney
    specialties: ['Fire Damage', 'Smoke Damage', 'Odour Removal'],
  },
  {
    id: 'demo-contractor-3',
    businessName: 'StormShield Services',
    user: { name: 'David Wilson', email: 'david@stormshield.com.au' },
    rating: 4.7,
    completedJobs: 156,
    phone: '0434 567 890',
    location: { lat: -33.8800, lng: 151.1900 }, // Pyrmont
    specialties: ['Storm Damage', 'Roof Repairs', 'Emergency Boarding'],
  },
]

// Demo Clients
export const demoClients: DemoClient[] = [
  {
    id: 'demo-client-1',
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    phone: '0401 234 567',
    address: '42 George Street, Sydney NSW 2000',
    location: { lat: -33.8670, lng: 151.2070 },
  },
  {
    id: 'demo-client-2',
    name: 'James Patterson',
    email: 'j.patterson@email.com',
    phone: '0412 345 678',
    address: '15 Pitt Street, Sydney NSW 2000',
    location: { lat: -33.8680, lng: 151.2090 },
  },
  {
    id: 'demo-client-3',
    name: 'Emma Thompson',
    email: 'emma.t@email.com',
    phone: '0423 456 789',
    address: '88 Market Street, Sydney NSW 2000',
    location: { lat: -33.8710, lng: 151.2060 },
  },
]

// Demo Jobs
export const createDemoJobs = (): DemoJob[] => [
  {
    id: 'demo-job-1',
    serviceType: 'Water Damage Restoration',
    status: 'pending',
    priority: 'urgent',
    contractor: null,
    client: demoClients[0],
    eta: null,
    distanceKm: null,
    trafficCondition: null,
    createdAt: new Date(),
    acceptedAt: null,
    completedAt: null,
    description: 'Burst pipe in kitchen causing flooding to ground floor. Water spreading to living room.',
  },
  {
    id: 'demo-job-2',
    serviceType: 'Fire Damage Assessment',
    status: 'en_route',
    priority: 'emergency',
    contractor: demoContractors[1],
    client: demoClients[1],
    eta: 12,
    distanceKm: 4.2,
    trafficCondition: 'moderate',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 10 * 60 * 1000),
    completedAt: null,
    description: 'Kitchen fire damage. Fire department has cleared the scene. Smoke damage throughout.',
  },
  {
    id: 'demo-job-3',
    serviceType: 'Storm Damage Repair',
    status: 'on_site',
    priority: 'normal',
    contractor: demoContractors[2],
    client: demoClients[2],
    eta: 0,
    distanceKm: 0,
    trafficCondition: null,
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 40 * 60 * 1000),
    completedAt: null,
    description: 'Roof damage from last night\'s storm. Multiple tiles displaced, possible water ingress.',
  },
  {
    id: 'demo-job-4',
    serviceType: 'Mould Remediation',
    status: 'in_progress',
    priority: 'normal',
    contractor: demoContractors[0],
    client: {
      id: 'demo-client-4',
      name: 'Robert Chen',
      email: 'r.chen@email.com',
      phone: '0434 567 890',
      address: '120 Sussex Street, Sydney NSW 2000',
      location: { lat: -33.8695, lng: 151.2040 },
    },
    eta: null,
    distanceKm: null,
    trafficCondition: null,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 90 * 60 * 1000),
    completedAt: null,
    description: 'Mould discovered in bathroom and bedroom. Requires assessment and remediation quote.',
  },
  {
    id: 'demo-job-5',
    serviceType: 'Water Extraction',
    status: 'completed',
    priority: 'urgent',
    contractor: demoContractors[0],
    client: {
      id: 'demo-client-5',
      name: 'Lisa Wong',
      email: 'l.wong@email.com',
      phone: '0445 678 901',
      address: '55 Clarence Street, Sydney NSW 2000',
      location: { lat: -33.8685, lng: 151.2055 },
    },
    eta: null,
    distanceKm: null,
    trafficCondition: null,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    acceptedAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    description: 'Emergency water extraction completed. Drying equipment installed.',
  },
]

// Demo Messages for messaging scenario
export const createDemoMessages = (jobId: string): DemoMessage[] => [
  {
    id: 'demo-msg-1',
    jobId,
    senderId: 'demo-client-1',
    senderType: 'client',
    content: "Hi, what's your ETA?",
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-msg-2',
    jobId,
    senderId: 'demo-contractor-1',
    senderType: 'contractor',
    content: "About 15 minutes away. Traffic is light today.",
    isRead: true,
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-msg-3',
    jobId,
    senderId: 'demo-client-1',
    senderType: 'client',
    content: "Great, I'll open the front gate for you.",
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-msg-4',
    jobId,
    senderId: 'demo-contractor-1',
    senderType: 'contractor',
    content: "Perfect, see you soon!",
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
]

// Route waypoints for live tracking demo (Sydney CBD route)
export const demoRoute: { lat: number; lng: number }[] = [
  { lat: -33.8750, lng: 151.2050 }, // Start: Circular Quay
  { lat: -33.8740, lng: 151.2060 },
  { lat: -33.8730, lng: 151.2065 },
  { lat: -33.8720, lng: 151.2068 },
  { lat: -33.8710, lng: 151.2070 },
  { lat: -33.8700, lng: 151.2072 },
  { lat: -33.8690, lng: 151.2073 },
  { lat: -33.8680, lng: 151.2072 },
  { lat: -33.8670, lng: 151.2070 }, // End: Client location
]

// Status flow for demos
export const statusFlow: JobStatus[] = [
  'pending',
  'accepted',
  'en_route',
  'on_site',
  'in_progress',
  'completed',
]

// Service types for variety
export const serviceTypes = [
  'Water Damage Restoration',
  'Fire Damage Assessment',
  'Storm Damage Repair',
  'Mould Remediation',
  'Flood Cleanup',
  'Smoke Damage Restoration',
  'Emergency Water Extraction',
  'Structural Drying',
]

// Priority labels
export const priorityConfig = {
  normal: { label: 'Normal', color: 'bg-blue-100 text-blue-700' },
  urgent: { label: 'Urgent', color: 'bg-orange-100 text-orange-700' },
  emergency: { label: 'Emergency', color: 'bg-red-100 text-red-700' },
}

// Status labels
export const statusConfig: Record<JobStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700' },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-700' },
  en_route: { label: 'En Route', color: 'bg-amber-100 text-amber-700' },
  on_site: { label: 'On Site', color: 'bg-purple-100 text-purple-700' },
  in_progress: { label: 'In Progress', color: 'bg-teal-100 text-teal-700' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
}
