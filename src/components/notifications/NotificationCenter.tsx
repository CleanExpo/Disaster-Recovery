'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Check,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Archive,
  Settings,
  Filter,
  Clock,
  Mail,
  MessageSquare,
  Smartphone,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import type {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
  ComplianceNotification,
  BillingNotification,
  JobNotification,
  SystemNotification,
  CustomNotification
} from '@/types/notifications';

// Mock data for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'compliance',
    priority: 'high',
    title: 'IICRC Certification Expiring Soon',
    message: 'Your IICRC Water Damage Restoration certification expires in 15 days. Renew now to maintain compliance.',
    recipientId: 'contractor-1',
    recipientType: 'contractor',
    channels: ['in_app', 'email'],
    status: 'delivered',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    actions: [
      { id: '1', label: 'Renew Now', type: 'link', url: '/compliance/renew/iicrc', style: 'primary' },
      { id: '2', label: 'View Details', type: 'link', url: '/compliance/certifications' }
    ]
  } as ComplianceNotification,
  {
    id: '2',
    type: 'billing',
    priority: 'urgent',
    title: 'Invoice Due Tomorrow',
    message: 'Your monthly subscription invoice of $995.00 is due tomorrow. Ensure funds are available.',
    recipientId: 'contractor-1',
    recipientType: 'contractor',
    channels: ['in_app', 'email', 'sms'],
    status: 'read',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    readAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    actions: [
      { id: '1', label: 'Pay Now', type: 'link', url: '/billing/pay', style: 'primary' },
      { id: '2', label: 'View Invoice', type: 'link', url: '/billing/invoice/INV-2024-001' }
    ]
  } as BillingNotification,
  {
    id: '3',
    type: 'job',
    priority: 'medium',
    title: 'New Emergency Job Assignment',
    message: 'Emergency water damage restoration job in Sydney CBD requires immediate attention.',
    recipientId: 'contractor-1',
    recipientType: 'contractor',
    channels: ['in_app', 'sms', 'push'],
    status: 'delivered',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    actions: [
      { id: '1', label: 'Accept Job', type: 'button', action: 'accept_job', style: 'primary' },
      { id: '2', label: 'View Details', type: 'link', url: '/jobs/JOB-2024-0142' },
      { id: '3', label: 'Decline', type: 'button', action: 'decline_job', style: 'danger' }
    ]
  } as JobNotification,
  {
    id: '4',
    type: 'system',
    priority: 'low',
    title: 'System Maintenance Scheduled',
    message: 'The platform will undergo scheduled maintenance on Sunday, 2 AM - 4 AM AEDT.',
    recipientId: 'contractor-1',
    recipientType: 'contractor',
    channels: ['in_app', 'email'],
    status: 'delivered',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  } as SystemNotification
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | NotificationType>('all');
  const [selectedTab, setSelectedTab] = useState<'unread' | 'all' | 'archived'>('unread');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Calculate unread count
    const unread = notifications.filter(n => n.status !== 'read').length;
    setUnreadCount(unread);
  }, [notifications]);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, status: 'read' as NotificationStatus, readAt: new Date() }
          : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({
        ...n,
        status: 'read' as NotificationStatus,
        readAt: new Date()
      }))
    );
  };

  const handleArchive = (notificationId: string) => {
    // In production, this would update the database
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleAction = (notification: Notification, actionId: string) => {
    const action = notification.actions?.find(a => a.id === actionId);
    if (action) {
      if (action.type === 'link' && action.url) {
        window.location.href = action.url;
      } else if (action.type === 'button' && action.action) {
        // Handle button action
        console.log('Handling action:', action.action);
      }
    }
    handleMarkAsRead(notification.id);
  };

  const getNotificationIcon = (type: NotificationType, priority: NotificationPriority) => {
    if (priority === 'urgent') return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (priority === 'high') return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    
    switch (type) {
      case 'compliance':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'billing':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case 'job':
        return <Briefcase className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-3 w-3" />;
      case 'sms':
        return <MessageSquare className="h-3 w-3" />;
      case 'push':
        return <Smartphone className="h-3 w-3" />;
      default:
        return <Bell className="h-3 w-3" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (selectedFilter !== 'all' && n.type !== selectedFilter) return false;
    if (selectedTab === 'unread' && n.status === 'read') return false;
    return true;
  });

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const isUnread = notification.status !== 'read';

    return (
      <div
        className={`p-4 border-b hover:bg-gray-50 transition-colors ${
          isUnread ? 'bg-blue-50/50' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1">{getNotificationIcon(notification.type, notification.priority)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${isUnread ? 'font-semibold' : ''}`}>
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                
                {/* Actions */}
                {notification.actions && notification.actions.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {notification.actions.map(action => (
                      <Button
                        key={action.id}
                        size="sm"
                        variant={action.style === 'primary' ? 'default' : action.style === 'danger' ? 'destructive' : 'outline'}
                        onClick={() => handleAction(notification, action.id)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
                
                {/* Metadata */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                  </span>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                    {notification.priority}
                  </Badge>
                  <div className="flex gap-1">
                    {notification.channels.map(channel => (
                      <span key={channel} className="text-gray-400">
                        {getChannelIcon(channel)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Options Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isUnread && (
                    <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                      <Check className="h-4 w-4 mr-2" />
                      Mark as read
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleArchive(notification.id)}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Notification settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Notification Bell Icon */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-[400px] sm:w-[540px] p-0">
          <SheetHeader className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </SheetTitle>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>
          
          {/* Filter Tabs */}
          <div className="border-b">
            <div className="px-6 py-2">
              <div className="flex gap-2 overflow-x-auto">
                <Button
                  size="sm"
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('all')}
                  className="whitespace-nowrap"
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={selectedFilter === 'compliance' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('compliance')}
                  className="whitespace-nowrap"
                >
                  Compliance
                </Button>
                <Button
                  size="sm"
                  variant={selectedFilter === 'billing' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('billing')}
                  className="whitespace-nowrap"
                >
                  Billing
                </Button>
                <Button
                  size="sm"
                  variant={selectedFilter === 'job' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('job')}
                  className="whitespace-nowrap"
                >
                  Jobs
                </Button>
                <Button
                  size="sm"
                  variant={selectedFilter === 'system' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('system')}
                  className="whitespace-nowrap"
                >
                  System
                </Button>
              </div>
            </div>
          </div>
          
          {/* Notifications List */}
          <ScrollArea className="h-[calc(100vh-180px)]">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Bell className="h-12 w-12 mb-3 text-gray-300" />
                <p className="text-sm">No notifications</p>
                <p className="text-xs mt-1">You're all caught up!</p>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
      
      {/* Banner Alerts for Urgent Notifications */}
      {notifications.filter(n => n.priority === 'urgent' && n.status !== 'read').map(notification => (
        <div
          key={notification.id}
          className="fixed top-16 right-4 z-50 max-w-md animate-slide-in-right"
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex gap-2 mt-3">
                    {notification.actions?.map(action => (
                      <Button
                        key={action.id}
                        size="sm"
                        variant={action.style === 'primary' ? 'default' : 'outline'}
                        onClick={() => handleAction(notification, action.id)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}

// Add missing import
import { Briefcase } from 'lucide-react';