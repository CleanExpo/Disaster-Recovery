'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardData {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  responseTime: string;
}

interface ServiceRequest {
  id: string;
  type: string;
  status: 'pending' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  date: string;
}

export const ModernDashboard: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  
  const [dashboardData, setDashboardData] = useLocalStorage<DashboardData>('dashboardData', {
    totalCases: 1247,
    activeCases: 89,
    completedCases: 1158,
    responseTime: '45 min',
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

  // Memoized filtered requests using React patterns
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = req.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           req.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           req.location.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [requests, debouncedSearch, filterStatus]);

  // Callback for status updates
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

  // Async data refresh
  const refreshData = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDashboardData(prev => ({
      ...prev,
      totalCases: prev.totalCases + Math.floor(Math.random() * 5),
    }));
    setLoading(false);
  }, [setDashboardData]);

  const statCards = [
    { title: 'Total Cases', value: dashboardData.totalCases, change: '+12%' },
    { title: 'Active Cases', value: dashboardData.activeCases, change: '-5%' },
    { title: 'Completed', value: dashboardData.completedCases, change: '+18%' },
    { title: 'Avg Response', value: dashboardData.responseTime, change: '-10min' },
  ];

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#111827',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: 0,
    },
    subtitle: {
      color: '#9ca3af',
      margin: '0.5rem 0 0 0',
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#0ea5e9',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    card: {
      backgroundColor: 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(16px)',
      border: '1px solid #374151',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      borderColor: '#0ea5e9',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    },
    cardValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0.5rem 0',
    },
    searchContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      minWidth: '250px',
      padding: '0.75rem 1rem',
      backgroundColor: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '0.5rem',
      color: 'white',
    },
    filterButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    filterButton: {
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      color: '#9ca3af',
      border: '1px solid #4b5563',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    filterButtonActive: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      borderColor: '#0ea5e9',
    },
    requestItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      border: '1px solid #374151',
      borderRadius: '0.5rem',
      marginBottom: '0.75rem',
      transition: 'all 0.3s ease',
    },
    themeToggle: {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      padding: '0.5rem',
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '0.5rem',
      color: 'white',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={styles.themeToggle}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Emergency Dashboard</h2>
          <p style={styles.subtitle}>Real-time disaster recovery operations</p>
        </div>
        <button 
          onClick={refreshData}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div style={styles.grid}>
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            style={styles.card}
            onMouseEnter={e => {
              Object.assign(e.currentTarget.style, styles.cardHover);
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#374151';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>{stat.title}</p>
            <p style={styles.cardValue}>{stat.value}</p>
            <p style={{ color: '#4ade80', fontSize: '0.875rem', margin: 0 }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem' }}>Active Service Requests</h3>
        
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />
          <div style={styles.filterButtons}>
            {['all', 'pending', 'active', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  ...styles.filterButton,
                  ...(filterStatus === status ? styles.filterButtonActive : {})
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          {filteredRequests.map((request) => (
            <div key={request.id} style={styles.requestItem}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong>{request.id}</strong>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    backgroundColor: request.priority === 'critical' ? '#dc2626' :
                                   request.priority === 'high' ? '#ea580c' :
                                   request.priority === 'medium' ? '#ca8a04' : '#16a34a',
                  }}>
                    {request.priority}
                  </span>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                  {request.type} • {request.location}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0 }}>
                  {request.date}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  color: request.status === 'active' ? '#60a5fa' :
                         request.status === 'pending' ? '#fbbf24' : '#4ade80'
                }}>
                  {request.status}
                </span>
                <button
                  onClick={() => {
                    const newStatus = request.status === 'pending' ? 'active' : 
                                    request.status === 'active' ? 'completed' : 'pending';
                    handleStatusUpdate(request.id, newStatus);
                  }}
                  style={{
                    ...styles.filterButton,
                    fontSize: '0.875rem',
                    padding: '0.375rem 0.75rem'
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};