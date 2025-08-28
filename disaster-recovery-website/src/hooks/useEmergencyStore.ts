import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface EmergencyRequest {
  id: string
  type: 'water' | 'fire' | 'mold' | 'storm' | 'other'
  status: 'pending' | 'dispatched' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  location: string
  description: string
  contactName: string
  contactPhone: string
  contactEmail: string
  createdAt: Date
  updatedAt: Date
  estimatedCost?: number
  assignedTechnician?: string
}

interface EmergencyState {
  requests: EmergencyRequest[]
  searchQuery: string
  filterStatus: string
  filterType: string
  isLoading: boolean
  
  // Actions
  addRequest: (request: Omit<EmergencyRequest, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateRequest: (id: string, updates: Partial<EmergencyRequest>) => void
  deleteRequest: (id: string) => void
  setSearchQuery: (query: string) => void
  setFilterStatus: (status: string) => void
  setFilterType: (type: string) => void
  setLoading: (loading: boolean) => void
  getFilteredRequests: () => EmergencyRequest[]
}

export const useEmergencyStore = create<EmergencyState>()(
  devtools(
    persist(
      (set, get) => ({
        requests: [
          {
            id: 'req-001',
            type: 'water',
            status: 'in-progress',
            priority: 'high',
            location: 'Sydney CBD, NSW',
            description: 'Burst pipe in office building causing flooding on multiple floors',
            contactName: 'John Smith',
            contactPhone: '0412345678',
            contactEmail: 'john.smith@company.com',
            createdAt: new Date('2024-01-28T10:30:00'),
            updatedAt: new Date('2024-01-28T11:15:00'),
            estimatedCost: 15000,
            assignedTechnician: 'Mike Johnson',
          },
          {
            id: 'req-002',
            type: 'fire',
            status: 'pending',
            priority: 'critical',
            location: 'Melbourne VIC',
            description: 'Kitchen fire damage in residential property, smoke throughout house',
            contactName: 'Sarah Wilson',
            contactPhone: '0498765432',
            contactEmail: 'sarah.w@email.com',
            createdAt: new Date('2024-01-28T14:20:00'),
            updatedAt: new Date('2024-01-28T14:20:00'),
            estimatedCost: 25000,
          },
          {
            id: 'req-003',
            type: 'mold',
            status: 'completed',
            priority: 'medium',
            location: 'Brisbane QLD',
            description: 'Mold remediation in basement after water damage',
            contactName: 'Robert Brown',
            contactPhone: '0455123789',
            contactEmail: 'r.brown@email.com',
            createdAt: new Date('2024-01-25T09:00:00'),
            updatedAt: new Date('2024-01-27T16:30:00'),
            estimatedCost: 8500,
            assignedTechnician: 'Lisa Chen',
          },
        ],
        searchQuery: '',
        filterStatus: 'all',
        filterType: 'all',
        isLoading: false,

        addRequest: (request) => {
          const newRequest: EmergencyRequest = {
            ...request,
            id: `req-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          set((state) => ({
            requests: [newRequest, ...state.requests],
          }))
        },

        updateRequest: (id, updates) => {
          set((state) => ({
            requests: state.requests.map((req) =>
              req.id === id
                ? { ...req, ...updates, updatedAt: new Date() }
                : req
            ),
          }))
        },

        deleteRequest: (id) => {
          set((state) => ({
            requests: state.requests.filter((req) => req.id !== id),
          }))
        },

        setSearchQuery: (query) => set({ searchQuery: query }),
        setFilterStatus: (status) => set({ filterStatus: status }),
        setFilterType: (type) => set({ filterType: type }),
        setLoading: (loading) => set({ isLoading: loading }),

        getFilteredRequests: () => {
          const { requests, searchQuery, filterStatus, filterType } = get()
          
          return requests.filter((request) => {
            const matchesSearch = !searchQuery || 
              request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
              request.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              request.description.toLowerCase().includes(searchQuery.toLowerCase())
            
            const matchesStatus = filterStatus === 'all' || request.status === filterStatus
            const matchesType = filterType === 'all' || request.type === filterType
            
            return matchesSearch && matchesStatus && matchesType
          })
        },
      }),
      {
        name: 'emergency-store',
        partialize: (state) => ({ requests: state.requests }),
      }
    )
  )
)