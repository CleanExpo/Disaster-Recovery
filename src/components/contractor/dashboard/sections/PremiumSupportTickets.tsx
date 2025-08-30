'use client';

import React, { useState, useEffect } from 'react';
import {
  HeadphonesIcon,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Send,
  Paperclip,
  Star,
  TrendingUp,
  AlertTriangle,
  Activity,
  ChevronRight,
  Zap,
  Shield,
  Users,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: string;
  createdAt: string;
  updatedAt: string;
  responseCount: number;
  assignee?: string;
  satisfaction?: number;
}

interface SupportTicketsProps {
  tickets?: Ticket[];
}

export function PremiumSupportTickets({ tickets = [] }: SupportTicketsProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  // Premium mock data with richer information
  const mockTickets: Ticket[] = tickets.length > 0 ? tickets : [
    {
      id: 'TKT-001',
      subject: 'Unable to update insurance documentation',
      description: 'Getting error when trying to upload new insurance certificate. The system shows "File type not supported" even though it\'s a PDF.',
      status: 'OPEN',
      priority: 'HIGH',
      category: 'Compliance',
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
      responseCount: 0,
      assignee: 'Support Team'
    },
    {
      id: 'TKT-002',
      subject: 'Payment not reflecting in account',
      description: 'Made payment 3 days ago but balance not updated. Transaction ID: TXN-98765432',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      category: 'Billing',
      createdAt: '2025-01-18T14:30:00Z',
      updatedAt: '2025-01-19T09:15:00Z',
      responseCount: 2,
      assignee: 'Finance Team',
      satisfaction: 4
    },
    {
      id: 'TKT-003',
      subject: 'New feature request: Bulk invoice export',
      description: 'Would like to export multiple invoices at once for accounting purposes',
      status: 'RESOLVED',
      priority: 'LOW',
      category: 'Feature Request',
      createdAt: '2025-01-15T11:20:00Z',
      updatedAt: '2025-01-19T16:45:00Z',
      responseCount: 5,
      assignee: 'Product Team',
      satisfaction: 5
    }
  ];

  // Animate numbers on mount
  useEffect(() => {
    const openCount = mockTickets.filter(t => t.status === 'OPEN').length;
    const inProgressCount = mockTickets.filter(t => t.status === 'IN_PROGRESS').length;
    const resolvedCount = mockTickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length;
    
    const animateValue = (start: number, end: number, key: keyof typeof animatedNumbers) => {
      const duration = 1000;
      const steps = 30;
      const increment = (end - start) / steps;
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, duration / steps);
    };

    animateValue(0, mockTickets.length, 'total');
    animateValue(0, openCount, 'open');
    animateValue(0, inProgressCount, 'inProgress');
    animateValue(0, resolvedCount, 'resolved');
  }, []);

  const getStatusConfig = (status: Ticket['status']) => {
    switch (status) {
      case 'OPEN':
        return {
          icon: AlertCircle,
          colour: 'text-amber-600',
          bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
          border: 'border-amber-200',
          badge: 'bg-gradient-to-r from-amber-500 to-yellow-500'
        };
      case 'IN_PROGRESS':
        return {
          icon: Clock,
          colour: 'text-blue-600',
          bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          badge: 'bg-gradient-to-r from-blue-500 to-cyan-500'
        };
      case 'RESOLVED':
        return {
          icon: CheckCircle,
          colour: 'text-emerald-600',
          bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
          border: 'border-emerald-200',
          badge: 'bg-gradient-to-r from-emerald-500 to-green-500'
        };
      case 'CLOSED':
        return {
          icon: CheckCircle,
          colour: 'text-gray-500',
          bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
          border: 'border-gray-200',
          badge: 'bg-gradient-to-r from-gray-400 to-slate-400'
        };
    }
  };

  const getPriorityConfig = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'URGENT':
        return {
          icon: Zap,
          colour: 'text-red-600',
          bg: 'bg-gradient-to-r from-red-500 to-rose-500',
          animation: 'animate-pulse'
        };
      case 'HIGH':
        return {
          icon: ArrowUp,
          colour: 'text-orange-600',
          bg: 'bg-gradient-to-r from-orange-500 to-amber-500',
          animation: ''
        };
      case 'MEDIUM':
        return {
          icon: Activity,
          colour: 'text-yellow-600',
          bg: 'bg-gradient-to-r from-yellow-500 to-amber-500',
          animation: ''
        };
      case 'LOW':
        return {
          icon: ArrowDown,
          colour: 'text-green-600',
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          animation: ''
        };
    }
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'open' && ticket.status === 'OPEN') ||
      (selectedTab === 'in_progress' && ticket.status === 'IN_PROGRESS') ||
      (selectedTab === 'resolved' && (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED'));
    
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Premium Stats Cards with Glass Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tickets', value: animatedNumbers.total, icon: FileText, gradient: 'from-violet-600 to-indigo-600', trend: '+12%' },
          { label: 'Open', value: animatedNumbers.open, icon: AlertCircle, gradient: 'from-amber-600 to-yellow-600', trend: '-5%' },
          { label: 'In Progress', value: animatedNumbers.inProgress, icon: Clock, gradient: 'from-blue-600 to-cyan-600', trend: '+8%' },
          { label: 'Resolved', value: animatedNumbers.resolved, icon: CheckCircle, gradient: 'from-emerald-600 to-green-600', trend: '+15%' }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="relative group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glass Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Gradient Background */}
              <div className={cn(
                "absolute inset-0 opacity-5 bg-gradient-to-br",
                `${stat.gradient}`
              )} />
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "p-3 rounded-xl bg-gradient-to-br",
                    stat.gradient,
                    "shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                  )}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.trend && (
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                      stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    )}>
                      <TrendingUp className={cn(
                        "w-3 h-3",
                        !stat.trend.startsWith('+') && "rotate-180"
                      )} />
                      {stat.trend}
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full bg-gradient-to-r rounded-full transition-all duration-1000", stat.gradient)}
                    style={{ width: `${(stat.value / animatedNumbers.total) * 100 || 0}%` }}
                  />
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Ticket Management Panel */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                  <HeadphonesIcon className="w-6 h-6" />
                </div>
                Support Centre
              </h2>
              <p className="text-gray-300 mt-1">Manage and track all support requests</p>
            </div>
            
            {/* Premium Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all duration-300 w-full sm:w-64"
                />
              </div>
              
              <button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold">
                <Plus className="w-4 h-4" />
                <span>New Ticket</span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Tabs */}
        <div className="border-b border-gray-200 bg-gray-50/50">
          <div className="flex overflow-x-auto">
            {[
              { id: 'all', label: 'All Tickets', count: mockTickets.length },
              { id: 'open', label: 'Open', count: animatedNumbers.open },
              { id: 'in_progress', label: 'In Progress', count: animatedNumbers.inProgress },
              { id: 'resolved', label: 'Resolved', count: animatedNumbers.resolved }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={cn(
                  "px-6 py-4 font-medium text-sm transition-all duration-300 relative whitespace-nowrap",
                  selectedTab === tab.id
                    ? "text-blue-600 bg-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span className="flex items-center gap-2">
                  {tab.label}
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    selectedTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-500"
                  )}>
                    {tab.count}
                  </span>
                </span>
                {selectedTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket List with Premium Cards */}
        <div className="p-6 space-y-4">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredTickets.map((ticket, index) => {
              const statusConfig = getStatusConfig(ticket.status);
              const priorityConfig = getPriorityConfig(ticket.priority);
              const StatusIcon = statusConfig.icon;
              const PriorityIcon = priorityConfig.icon;
              
              return (
                <div
                  key={ticket.id}
                  className={cn(
                    "group relative rounded-xl border transition-all duration-500",
                    "hover:shadow-xl hover:-translate-y-0.5",
                    selectedTicket === ticket.id ? 'ring-2 ring-blue-500' : '',
                    statusConfig.border,
                    statusConfig.bg
                  )}
                  onClick={() => setSelectedTicket(ticket.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Section */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Status Icon */}
                        <div className={cn(
                          "p-3 rounded-xl bg-white/80 shadow-lg",
                          "transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                        )}>
                          <StatusIcon className={cn("w-6 h-6", statusConfig.colour)} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-semibold text-gray-500">#{ticket.id}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{ticket.category}</span>
                                {ticket.assignee && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      {ticket.assignee}
                                    </span>
                                  </>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colours">
                                {ticket.subject}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {ticket.description}
                          </p>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              {ticket.responseCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {ticket.responseCount} responses
                                </span>
                              )}
                              {ticket.satisfaction && (
                                <span className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-3 h-3",
                                        i < ticket.satisfaction
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      )}
                                    />
                                  ))}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section - Badges and Actions */}
                      <div className="flex flex-col items-end gap-3">
                        {/* Priority Badge */}
                        <div className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1",
                          priorityConfig.bg,
                          priorityConfig.animation
                        )}>
                          <PriorityIcon className="w-3 h-3" />
                          {ticket.priority}
                        </div>
                        
                        {/* Status Badge */}
                        <div className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg",
                          statusConfig.badge
                        )}>
                          {ticket.status.replace('_', ' ')}
                        </div>
                        
                        {/* Action Button */}
                        <button className="p-2 rounded-lg bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 group">
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Actions Panel with Glass Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: 'Live Chat', description: 'Start instant chat', colour: 'from-blue-500 to-cyan-500' },
          { icon: HeadphonesIcon, label: 'Request Call', description: 'Schedule callback', colour: 'from-purple-500 to-pink-500' },
          { icon: Shield, label: 'Priority Support', description: '24/7 premium help', colour: 'from-green-500 to-emerald-500' }
        ].map((action, index) => (
          <button
            key={action.label}
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 p-6 text-left"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
              action.colour
            )} />
            
            {/* Content */}
            <div className="relative flex items-start gap-4">
              <div className={cn(
                "p-3 rounded-xl bg-gradient-to-br shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                action.colour
              )}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}