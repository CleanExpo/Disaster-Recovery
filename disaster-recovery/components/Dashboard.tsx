'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/hooks/useDebounce';

interface DashboardData {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  responseTime: string;
  satisfaction: number;
}

interface ServiceRequest {
  id: string;
  type: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  date: string;
}

export const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useLocalStorage<DashboardData>('dashboardData', {
    totalCases: 1247,
    activeCases: 89,
    completedCases: 1158,
    responseTime: '45 min',
    satisfaction: 98.5,
  });
  
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: 'REQ-001',
      type: 'Water Damage',
      status: 'active',
      priority: 'high',
      location: 'Sydney CBD',
      date: '2024-01-28',
    },
    {
      id: 'REQ-002',
      type: 'Fire Restoration',
      status: 'pending',
      priority: 'critical',
      location: 'Melbourne',
      date: '2024-01-28',
    },
    {
      id: 'REQ-003',
      type: 'Mold Remediation',
      status: 'completed',
      priority: 'medium',
      location: 'Brisbane',
      date: '2024-01-27',
    },
  ]);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = req.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           req.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           req.location.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [requests, debouncedSearch, filterStatus]);

  const handleStatusUpdate = useCallback((id: string, newStatus: ServiceRequest['status']) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    
    setDashboardData(prev => {
      const updatedData = { ...prev };
      if (newStatus === 'completed') {
        updatedData.completedCases += 1;
        updatedData.activeCases -= 1;
      } else if (newStatus === 'active') {
        updatedData.activeCases += 1;
      }
      return updatedData;
    });
  }, [setDashboardData]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDashboardData(prev => ({
      ...prev,
      totalCases: prev.totalCases + Math.floor(Math.random() * 5),
    }));
    setLoading(false);
  }, [setDashboardData]);

  const statCards = [
    {
      title: 'Total Cases',
      value: dashboardData.totalCases,
      change: '+12%',
      color: 'from-primary-500 to-primary-700',
    },
    {
      title: 'Active Cases',
      value: dashboardData.activeCases,
      change: '-5%',
      color: 'from-accent-500 to-accent-700',
    },
    {
      title: 'Completed',
      value: dashboardData.completedCases,
      change: '+18%',
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Avg Response',
      value: dashboardData.responseTime,
      change: '-10min',
      color: 'from-purple-500 to-purple-700',
    },
  ];

  const getPriorityColor = (priority: ServiceRequest['priority']) => {
    const colors = {
      low: 'text-green-400 bg-green-400/10',
      medium: 'text-yellow-400 bg-yellow-400/10',
      high: 'text-orange-400 bg-orange-400/10',
      critical: 'text-red-400 bg-red-400/10',
    };
    return colors[priority];
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    const colors = {
      pending: 'text-yellow-400',
      active: 'text-blue-400',
      completed: 'text-green-400',
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Emergency Dashboard</h2>
          <p className="text-gray-400 mt-1">Real-time disaster recovery operations</p>
        </div>
        <Button 
          onClick={refreshData} 
          loading={loading}
          variant="glass"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          }
        >
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <AnimatedSection 
            key={stat.title} 
            animation="slide" 
            direction="up" 
            delay={index * 100}
          >
            <Card variant="glass" hoverable>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-green-400 text-sm mt-2">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg`} />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection animation="fade">
        <Card>
          <CardHeader>
            <CardTitle>Active Service Requests</CardTitle>
            <CardDescription>Manage and track all emergency requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                className="flex-1"
              />
              <div className="flex gap-2">
                {['all', 'pending', 'active', 'completed'].map(status => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredRequests.map((request, index) => (
                <AnimatedSection
                  key={request.id}
                  animation="slide"
                  direction="left"
                  delay={index * 50}
                >
                  <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg border border-gray-700 hover:border-primary-500 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-12 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{request.id}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{request.type} • {request.location}</p>
                        <p className="text-gray-500 text-xs mt-1">{request.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newStatus = request.status === 'pending' ? 'active' : 
                                          request.status === 'active' ? 'completed' : 'pending';
                          handleStatusUpdate(request.id, newStatus);
                        }}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
};