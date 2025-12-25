'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  X,
  Trash2,
  Check,
  BookOpen,
  AlertCircle,
  MessageSquare,
  Users,
  Settings,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking' | 'claim' | 'contractor' | 'system' | 'chat';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: Record<string, any>;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead?: (notificationId: string) => void;
  onDelete?: (notificationId: string) => void;
  onPreferences?: () => void;
}

const notificationIcons: Record<string, React.ReactNode> = {
  booking: <BookOpen className="w-5 h-5 text-blue-500" />,
  claim: <AlertCircle className="w-5 h-5 text-amber-500" />,
  contractor: <Users className="w-5 h-5 text-green-500" />,
  system: <AlertCircle className="w-5 h-5 text-slate-500" />,
  chat: <MessageSquare className="w-5 h-5 text-purple-500" />,
};

const notificationColors: Record<string, string> = {
  booking: 'bg-blue-50 border-blue-200',
  claim: 'bg-amber-50 border-amber-200',
  contractor: 'bg-green-50 border-green-200',
  system: 'bg-slate-50 border-slate-200',
  chat: 'bg-purple-50 border-purple-200',
};

export default function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onDelete,
  onPreferences,
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [displayNotifications, setDisplayNotifications] = useState<Notification[]>(notifications);

  useEffect(() => {
    if (filter === 'unread') {
      setDisplayNotifications(notifications.filter((n) => !n.read));
    } else {
      setDisplayNotifications(notifications);
    }
  }, [filter, notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Notification Center Panel */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-slate-500 mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-6 py-4 border-b border-slate-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === 'unread'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {displayNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-6 text-center">
              <Bell className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">No notifications</p>
              <p className="text-sm text-slate-500 mt-1">
                {filter === 'unread'
                  ? 'All caught up!'
                  : 'You will see notifications here'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {displayNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 transition-colors hover:bg-slate-50 ${
                    notificationColors[notification.type]
                  } ${notification.read ? 'opacity-75' : ''}`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 pt-1">
                      {notificationIcons[notification.type]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 text-sm">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {formatTime(new Date(notification.createdAt))}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0">
                      {!notification.read && onMarkAsRead && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-slate-600" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(notification.id)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-slate-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 flex gap-2">
          <button
            onClick={onPreferences}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-sm text-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Preferences
          </button>
        </div>
      </div>
    </>
  );
}

/**
 * Format time relative to now
 */
function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}
