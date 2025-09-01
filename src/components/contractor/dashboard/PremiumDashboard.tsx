'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, Shield, TrendingUp, DollarSign, Clock, Star,
  AlertTriangle, CheckCircle, Activity, Users, Award, FileText,
  Droplets, Flame, Wind, Home, Briefcase, MessageSquare,
  User, Camera, Navigation, ChevronRight, Bell,
  Settings, LogOut, Zap, ArrowUp, ArrowDown, Plus,
  Calendar, MapPin, BarChart3, PieChart, Target, Rocket,
  Sparkles, Cpu, Brain, Wifi, WifiOff, Download, Upload,
  Eye, Timer, ThumbsUp, AlertCircle, CreditCard, Package,
  Wrench, FileCheck, GraduationCap, HelpCircle, Search,
  Filter, Grid, List, Maximize2, RefreshCw, MoreVertical,
  TrendingDown, Percent, Hash, DollarSignIcon, UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { useMagneticEffect, use3DRotateEffect } from '@/hooks/useMagneticEffect';

// Premium colour palette
const colours = {
  primary: 'from-blue-500 to-purple-600',
  success: 'from-green-500 to-emerald-600',
  warning: 'from-blue-600 to-blue-700',
  danger: 'from-red-500 to-pink-600',
  info: 'from-cyan-500 to-blue-600',
  dark: 'from-gray-800 to-gray-900'
};

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000, prefix = '', suffix = '' }: any) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// 3D Tilt Card Component  
function TiltCard({ children, className = '' }: any) {
  const cardRef = use3DRotateEffect();
  return (
    <motion.div
      ref={cardRef as any}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Live Activity Feed Component
function LiveActivityFeed() {
  const activities = [
    { id: 1, type: 'job', text: 'New water damage job assigned', time: '2m ago', icon: Droplets, colour: 'text-blue-500' },
    { id: 2, type: 'payment', text: 'Payment received: $3,450', time: '15m ago', icon: DollarSign, colour: 'text-green-500' },
    { id: 3, type: 'rating', text: '5-star review received', time: '1h ago', icon: Star, colour: 'text-blue-600' },
    { id: 4, type: 'alert', text: 'Weather alert: Heavy rain expected', time: '2h ago', icon: AlertTriangle, colour: 'text-blue-600' }
  ];
  
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colours cursor-pointer"
          >
            <div className={`p-2 rounded-lg bg-white/10 ${activity.colour}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Performance Chart Component
function PerformanceChart() {
  const data = [
    { day: 'Mon', jobs: 8, revenue: 12000 },
    { day: 'Tue', jobs: 12, revenue: 18500 },
    { day: 'Wed', jobs: 10, revenue: 15200 },
    { day: 'Thu', jobs: 15, revenue: 22100 },
    { day: 'Fri', jobs: 18, revenue: 28400 },
    { day: 'Sat', jobs: 14, revenue: 21000 },
    { day: 'Sun', jobs: 6, revenue: 8500 }
  ];
  
  const maxJobs = Math.max(...data.map(d => d.jobs));
  
  return (
    <div className="h-48">
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.day}
            className="flex-1 flex flex-col items-center justify-end gap-2"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative w-full flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-1">{item.jobs}</span>
              <motion.div
                className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${(item.jobs / maxJobs) * 120}px` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ y: ['100%', '-100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
            <span className="text-xs text-gray-500">{item.day}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// AI Insights Component
function AIInsights() {
  const insights = [
    { icon: TrendingUp, text: 'Revenue up 23% this month', colour: 'text-emerald-600' },
    { icon: Clock, text: 'Response time improved by 15%', colour: 'text-blue-400' },
    { icon: Target, text: '3 jobs near completion', colour: 'text-purple-400' },
    { icon: AlertCircle, text: '2 invoices overdue', colour: 'text-blue-500' }
  ];
  
  return (
    <div className="space-y-3">
      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colours cursor-pointer"
        >
          <insight.icon className={`h-5 w-5 ${insight.colour}`} />
          <span className="text-sm text-gray-200">{insight.text}</span>
          <Sparkles className="h-4 w-4 text-blue-500 ml-auto" />
        </motion.div>
      ))}
    </div>
  );
}

// Job Card Component
function JobCard({ job }: any) {
  const statusColors: any = {
    urgent: 'from-red-500 to-pink-600',
    active: 'from-blue-500 to-cyan-600',
    pending: 'from-blue-600 to-blue-700',
    completed: 'from-green-500 to-emerald-600'
  };
  
  const typeIcons: any = {
    water: Droplets,
    fire: Flame,
    mould: Wind,
    structural: Building2
  };
  
  const Icon = typeIcons[job.type] || Building2;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card p-4 rounded-xl cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-white">{job.id}</h4>
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${statusColors[job.status]} text-white`}>
              {job.status}
            </div>
          </div>
          <p className="text-sm text-gray-400">{job.client}</p>
        </div>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${statusColors[job.status]} opacity-20 group-hover:opacity-30 transition-opacity`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="h-3 w-3" />
          <span>{job.address}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{job.time}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <DollarSign className="h-3 w-3" />
          <span>${job.value.toLocaleString()}</span>
        </div>
      </div>
      
      <motion.div
        className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <span className="text-xs text-blue-400">View Details</span>
        <ChevronRight className="h-4 w-4 text-blue-400" />
      </motion.div>
    </motion.div>
  );
}

export default function PremiumDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeView, setActiveView] = useState('grid');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Scroll animations
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  
  // Demo data
  const stats = {
    activeJobs: 12,
    completedToday: 3,
    revenue: 28400,
    rating: 4.9,
    responseTime: 42,
    completionRate: 96
  };
  
  const jobs = [
    { id: 'JOB-1248', type: 'water', client: 'Smith Residence', address: '123 Main St, Sydney', time: 'Today 2:00 PM', value: 3450, status: 'urgent' },
    { id: 'JOB-1249', type: 'fire', client: 'Johnson Office', address: '456 Park Ave', time: 'Today 4:00 PM', value: 8900, status: 'active' },
    { id: 'JOB-1250', type: 'mould', client: 'Davis Property', address: '789 Queen St', time: 'Tomorrow 9:00 AM', value: 2100, status: 'pending' }
  ];
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-centre [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%` }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2 }}
          />
        ))}
      </div>
      
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-white/10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NRP Contractor Portal</h1>
                <p className="text-xs text-gray-400">Premium Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Connection Status */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                isOnline ? 'bg-green-500/20 text-emerald-600' : 'bg-blue-600/20 text-blue-500'
              }`}>
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? 'Online' : 'Offline'}
              </div>
              
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colours"
              >
                <Bell className="h-5 w-5 text-white" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              </motion.button>
              
              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colours"
              >
                <Settings className="h-5 w-5 text-white" />
              </motion.button>
              
              {/* Profile */}
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/10">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-white">Demo Services</p>
                  <p className="text-xs text-gray-400">Premium Tier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-red-500/20 border border-blue-600/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-300">Emergency Job Available</p>
                <p className="text-xs text-gray-400">Water damage at 42 Emergency St - High priority</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-red-500 text-white text-sm font-medium"
            >
              Accept Job
            </motion.button>
          </div>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[
            { icon: Briefcase, label: 'Active Jobs', value: stats.activeJobs, colour: colours.primary, trend: '+2' },
            { icon: CheckCircle, label: 'Completed Today', value: stats.completedToday, colour: colours.success, trend: '+1' },
            { icon: DollarSign, label: 'Revenue Today', value: `$${stats.revenue.toLocaleString()}`, colour: colours.warning, trend: '+15%' },
            { icon: Star, label: 'Rating', value: stats.rating, colour: colours.info, trend: '↑' },
            { icon: Clock, label: 'Response Time', value: `${stats.responseTime}m`, colour: colours.danger, trend: '-5m' },
            { icon: Percent, label: 'Completion Rate', value: `${stats.completionRate}%`, colour: colours.dark, trend: '+2%' }
          ].map((stat, index) => (
            <TiltCard key={index} className="glass-card rounded-xl p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.colour} opacity-20`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs text-emerald-600">{stat.trend}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-white">
                  {typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} /> : stat.value}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Jobs Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Jobs Header */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Active Jobs
                </h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg ${activeView === 'grid' ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/20 transition-colours`}
                    onClick={() => setActiveView('grid')}
                  >
                    <Grid className="h-4 w-4 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg ${activeView === 'list' ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/20 transition-colours`}
                    onClick={() => setActiveView('list')}
                  >
                    <List className="h-4 w-4 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colours"
                  >
                    <Filter className="h-4 w-4 text-white" />
                  </motion.button>
                </div>
              </div>
              
              {/* Jobs Grid */}
              <div className={`grid ${activeView === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Performance Chart */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Performance
              </h3>
              <PerformanceChart />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Insights
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  BETA
                </span>
              </h3>
              <AIInsights />
            </div>
            
            {/* Live Activity */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Activity
                <span className="ml-auto h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              </h3>
              <LiveActivityFeed />
            </div>
            
            {/* Quick Actions */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Camera, label: 'Upload Photo', colour: colours.primary },
                  { icon: FileText, label: 'Create Report', colour: colours.success },
                  { icon: Phone, label: 'Call Support', colour: colours.warning },
                  { icon: Navigation, label: 'Get Directions', colour: colours.danger }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colours flex flex-col items-center gap-2"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${action.colour} opacity-20`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs text-gray-300">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  );
}