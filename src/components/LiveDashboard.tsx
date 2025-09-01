'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EmergencyRequest {
  id: string;
  type: 'water' | 'fire' | 'mould' | 'storm';
  location: string;
  status: 'pending' | 'dispatched' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  technician?: string;
  eta?: string;
}

interface TechnicianStatus {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: { lat: number; lng: number };
  currentJob?: string;
}

export default function LiveDashboard() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [technicians, setTechnicians] = useState<TechnicianStatus[]>([]);
  const [stats, setStats] = useState({
    activeRequests: 0,
    avgResponseTime: '8 min',
    techsAvailable: 0,
    completedToday: 0
  });
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Simulate WebSocket connection
  useEffect(() => {
    // In production, connect to actual WebSocket server
    const simulateRealTimeData = () => {
      // Simulate incoming emergency requests
      const mockRequests: EmergencyRequest[] = [
        {
          id: '1',
          type: 'water',
          location: 'Sydney CBD',
          status: 'dispatched',
          priority: 'critical',
          timestamp: new Date(),
          technician: 'John Smith',
          eta: '12 min'
        },
        {
          id: '2',
          type: 'fire',
          location: 'North Shore',
          status: 'in-progress',
          priority: 'high',
          timestamp: new Date(Date.now() - 30 * 60000),
          technician: 'Sarah Johnson'
        },
        {
          id: '3',
          type: 'mould',
          location: 'Eastern Suburbs',
          status: 'pending',
          priority: 'medium',
          timestamp: new Date(Date.now() - 5 * 60000)
        }
      ];

      const mockTechnicians: TechnicianStatus[] = [
        {
          id: '1',
          name: 'John Smith',
          status: 'busy',
          location: { lat: -33.8688, lng: 151.2093 },
          currentJob: '1'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          status: 'busy',
          location: { lat: -33.8523, lng: 151.2108 },
          currentJob: '2'
        },
        {
          id: '3',
          name: 'Mike Chen',
          status: 'available',
          location: { lat: -33.8915, lng: 151.2767 }
        }
      ];

      setRequests(mockRequests);
      setTechnicians(mockTechnicians);
      setIsConnected(true);
      
      setStats({
        activeRequests: mockRequests.filter(r => r.status !== 'completed').length,
        avgResponseTime: '8 min',
        techsAvailable: mockTechnicians.filter(t => t.status === 'available').length,
        completedToday: 47
      });
    };

    simulateRealTimeData();
    const interval = setInterval(() => {
      // Simulate updates
      setStats(prev => ({
        ...prev,
        completedToday: prev.completedToday + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-blue-600';
      case 'medium': return 'bg-blue-600';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-blue-500';
      case 'dispatched': return 'text-blue-400';
      case 'in-progress': return 'text-purple-400';
      case 'completed': return 'text-emerald-600';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'water': return '💧';
      case 'fire': return '🔥';
      case 'mould': return '🦠';
      case 'storm': return '⛈️';
      default: return '⚠️';
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
            <div className="relative">
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <span className="text-sm font-medium text-emerald-600">
              {isConnected ? 'Live Dashboard Connected' : 'Connecting...'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real-Time Emergency Response
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Monitor live emergency requests, technician status, and response metrics in real-time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Requests', value: stats.activeRequests, colour: 'text-red-400', icon: '🚨' },
            { label: 'Avg Response', value: stats.avgResponseTime, colour: 'text-blue-400', icon: '⏱️' },
            { label: 'Techs Available', value: stats.techsAvailable, colour: 'text-emerald-600', icon: '👷' },
            { label: 'Completed Today', value: stats.completedToday, colour: 'text-purple-400', icon: '✅' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-3xl font-bold ${stat.colour}`}>{stat.value}</span>
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Requests */}
          <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Active Emergency Requests</h3>
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-black/30 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(request.type)}</span>
                      <div>
                        <p className="text-white font-medium">{request.location}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(request.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)} bg-opacity-20 text-white`}>
                        {request.priority.toUpperCase()}
                      </span>
                      <span className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {request.technician && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Technician: <span className="text-white">{request.technician}</span>
                      </span>
                      {request.eta && (
                        <span className="text-gray-400">
                          ETA: <span className="text-blue-400">{request.eta}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technician Status */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Technician Status</h3>
            <div className="space-y-3">
              {technicians.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-black/30 rounded-lg p-3 border border-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        tech.status === 'available' ? 'bg-green-500' :
                        tech.status === 'busy' ? 'bg-blue-600' : 'bg-gray-500'
                      }`} />
                      <span className="text-white font-medium text-sm">{tech.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{tech.status}</span>
                  </div>
                  {tech.currentJob && (
                    <p className="text-xs text-gray-400 mt-1">
                      Job #{tech.currentJob}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-2">
              <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-white transition-colours">
                Dispatch Technician
              </button>
              <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium text-white transition-colours">
                View Full Map
              </button>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mt-6 bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Live Activity Feed</h3>
          <div className="space-y-2">
            {[
              { time: '2 min ago', event: 'New emergency request from Sydney CBD', type: 'new' },
              { time: '5 min ago', event: 'John Smith dispatched to North Shore', type: 'dispatch' },
              { time: '8 min ago', event: 'Water damage assessment completed - Eastern Suburbs', type: 'complete' },
              { time: '12 min ago', event: 'High priority fire damage request received', type: 'priority' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <span className="text-gray-500 w-20 text-right">{activity.time}</span>
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'new' ? 'bg-blue-500' :
                  activity.type === 'dispatch' ? 'bg-blue-600' :
                  activity.type === 'complete' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-gray-300">{activity.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}