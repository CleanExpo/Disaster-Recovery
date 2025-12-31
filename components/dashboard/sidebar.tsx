'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { 
  Home, 
  Plus, 
  Award, 
  CheckCircle, 
  BarChart3, 
  User,
  X,
  Search,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'services', label: 'Browse Services', icon: Search },
    { id: 'requests', label: 'My Requests', icon: Plus },
    { id: 'offers', label: 'My Offers', icon: Award },
    { id: 'active-projects', label: 'Active Projects', icon: CheckCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white text-center">NRPG</h2>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#00BFA6] text-white shadow-lg'
                  : 'hover:bg-gray-800 hover:text-white text-gray-300'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          <Avatar className="h-10 w-10 border-2 border-gray-700">
            <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-[#00BFA6] text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400">Client Account</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-center text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
