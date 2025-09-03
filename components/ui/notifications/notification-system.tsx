'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, X, AlertTriangle, Info, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';
import { useWebSocket } from '@/lib/websocket-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxNotifications?: number;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  position = 'top-right',
  maxNotifications = 5
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { on, off } = useWebSocket();

  useEffect(() => {
    // WebSocket notification handler
    const handleNotification = (data: any) => {
      const notification: Notification = {
        id: data.id || `notif-${Date.now()}`,
        type: data.type || 'info',
        title: data.title || 'Notification',
        message: data.message,
        timestamp: new Date(data.timestamp || Date.now()),
        read: false,
        priority: data.priority,
        action: data.action
      };

      setNotifications(prev => {
        const updated = [notification, ...prev];
        return updated.slice(0, maxNotifications);
      });

      // Auto-dismiss non-critical notifications
      if (notification.priority !== 'critical') {
        setTimeout(() => {
          dismissNotification(notification.id);
        }, 5000);
      }
    };

    on('notification:receive', handleNotification);
    
    return () => {
      off('notification:receive', handleNotification);
    };
  }, [on, off, maxNotifications]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const positionClasses = {
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'fixed z-50 w-96 max-h-[500px] overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800',
              positionClasses[position]
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                  >
                    Clear all
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className={cn(
                        'p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
                        !notification.read && 'bg-blue-50/50 dark:bg-blue-900/10'
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              {notification.action && (
                                <Button
                                  size="sm"
                                  variant="link"
                                  className="p-0 h-auto mt-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    notification.action?.onClick();
                                  }}
                                >
                                  {notification.action.label}
                                </Button>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-6 h-6 -mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissNotification(notification.id);
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </span>
                            {notification.priority && (
                              <Badge
                                variant={
                                  notification.priority === 'critical' ? 'destructive' :
                                  notification.priority === 'high' ? 'default' :
                                  'secondary'
                                }
                                className="text-xs"
                              >
                                {notification.priority}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Notifications */}
      <div className={cn('fixed z-50', positionClasses[position])}>
        <AnimatePresence>
          {notifications.slice(0, 3).map((notification) => (
            <motion.div
              key={`float-${notification.id}`}
              initial={{ x: position.includes('right') ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: position.includes('right') ? 100 : -100, opacity: 0 }}
              className="mb-3"
            >
              <div
                className={cn(
                  'bg-white dark:bg-gray-900 rounded-lg shadow-lg border p-4 min-w-[300px] max-w-[400px]',
                  notification.priority === 'critical' && 'border-red-500',
                  notification.priority === 'high' && 'border-yellow-500'
                )}
              >
                <div className="flex gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

// Toast notification helper
export const notify = {
  success: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('notification', {
      detail: { type: 'success', title, message }
    }));
  },
  error: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('notification', {
      detail: { type: 'error', title, message, priority: 'high' }
    }));
  },
  warning: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('notification', {
      detail: { type: 'warning', title, message }
    }));
  },
  info: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('notification', {
      detail: { type: 'info', title, message }
    }));
  },
  message: (title: string, message: string) => {
    window.dispatchEvent(new CustomEvent('notification', {
      detail: { type: 'message', title, message }
    }));
  }
};