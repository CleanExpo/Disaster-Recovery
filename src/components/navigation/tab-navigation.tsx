'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export default function TabNavigation({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  size = 'md',
}: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variants = {
    default: {
      tabButton: (isActive: boolean) =>
        `${sizeClasses[size]} font-medium rounded-t-lg border-b-2 transition-colors ${
          isActive
            ? 'border-blue-600 text-blue-600 bg-blue-50'
            : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`,
      container: 'border-b border-slate-200',
    },
    pills: {
      tabButton: (isActive: boolean) =>
        `${sizeClasses[size]} font-medium rounded-full transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`,
      container: 'gap-2',
    },
    underline: {
      tabButton: (isActive: boolean) =>
        `${sizeClasses[size]} font-medium border-b-2 transition-colors ${
          isActive
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-600 hover:text-slate-900'
        }`,
      container: 'border-b border-slate-200',
    },
  };

  const selectedVariant = variants[variant];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className={`flex flex-wrap ${selectedVariant.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`${selectedVariant.tabButton(activeTab === tab.id)} ${
              tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } flex items-center gap-2 whitespace-nowrap`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 animate-fadeIn">
        {activeTabData && activeTabData.content}
      </div>
    </div>
  );
}

// Vertical Tab Navigation Variant
interface VerticalTabNavigationProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  width?: 'sm' | 'md' | 'lg';
}

export function VerticalTabNavigation({
  tabs,
  defaultTab,
  onChange,
  width = 'md',
}: VerticalTabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const widthClasses = {
    sm: 'w-32',
    md: 'w-40',
    lg: 'w-56',
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex gap-6">
      {/* Tab Buttons */}
      <div className={`${widthClasses[width]} flex-shrink-0 space-y-2`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
            {tab.badge && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 animate-fadeIn">
        {activeTabData && activeTabData.content}
      </div>
    </div>
  );
}
