'use client';

import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Menu } from 'lucide-react';
import Sidebar from '@/components/dashboard/sidebar';

interface ClientLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showServiceModal: boolean;
  setShowServiceModal: (show: boolean) => void;
  unreadCount: number;
}

export default function ClientLayout({
  children,
  activeTab,
  setActiveTab,
  showServiceModal,
  setShowServiceModal,
  unreadCount
}: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2 text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-[#00BFA6] hover:bg-[#00A693] text-white"
                onClick={() => setShowServiceModal(true)}
              >
                Request Service
              </Button>
              
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-gray-700">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
