'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Bell,
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  Archive,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import type {
  Notification,
  NotificationHistory as NotificationHistoryType,
  NotificationType,
  NotificationStatus,
  NotificationChannel,
  NotificationAnalytics
} from '@/types/notifications';

// Mock notification history data
const mockHistory: NotificationHistoryType[] = [
  {
    id: '1',
    notificationId: 'notif-1',
    recipientId: 'contractor-1',
    channel: 'email',
    status: 'delivered',
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    deliveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
    readAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    retryCount: 0,
    metadata: {
      type: 'compliance',
      title: 'IICRC Certification Expiring Soon',
      priority: 'high'
    }
  },
  {
    id: '2',
    notificationId: 'notif-2',
    recipientId: 'contractor-1',
    channel: 'sms',
    status: 'delivered',
    sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    deliveredAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 5000),
    retryCount: 0,
    metadata: {
      type: 'job',
      title: 'New Emergency Job Assignment',
      priority: 'urgent'
    }
  },
  {
    id: '3',
    notificationId: 'notif-3',
    recipientId: 'contractor-1',
    channel: 'in_app',
    status: 'read',
    sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    deliveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    retryCount: 0,
    metadata: {
      type: 'billing',
      title: 'Invoice Payment Received',
      priority: 'medium'
    }
  },
  {
    id: '4',
    notificationId: 'notif-4',
    recipientId: 'contractor-1',
    channel: 'email',
    status: 'failed',
    sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    failedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60000),
    errorMessage: 'Invalid email address',
    retryCount: 3,
    metadata: {
      type: 'system',
      title: 'System Maintenance Notice',
      priority: 'low'
    }
  }
];

// Mock analytics data
const mockAnalytics: NotificationAnalytics = {
  totalSent: 1250,
  totalDelivered: 1180,
  totalRead: 890,
  totalFailed: 70,
  byType: {
    compliance: 320,
    billing: 280,
    job: 450,
    system: 150,
    custom: 50
  },
  byChannel: {
    in_app: 600,
    email: 400,
    sms: 200,
    push: 50
  },
  byPriority: {
    low: 200,
    medium: 500,
    high: 400,
    urgent: 150
  },
  averageReadTime: 180, // 3 minutes
  topUnreadTypes: [
    { type: 'system', count: 45 },
    { type: 'billing', count: 32 },
    { type: 'compliance', count: 28 }
  ],
  deliveryRate: 94.4,
  readRate: 75.4
};

export function NotificationHistory() {
  const [history, setHistory] = useState<NotificationHistoryType[]>(mockHistory);
  const [analytics, setAnalytics] = useState<NotificationAnalytics>(mockAnalytics);
  const [selectedType, setSelectedType] = useState<'all' | NotificationType>('all');
  const [selectedChannel, setSelectedChannel] = useState<'all' | NotificationChannel>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | NotificationStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter history
  const filteredHistory = history.filter(item => {
    if (selectedType !== 'all' && item.metadata?.type !== selectedType) return false;
    if (selectedChannel !== 'all' && item.channel !== selectedChannel) return false;
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    if (searchQuery && !item.metadata?.title?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (dateRange.from && item.sentAt < startOfDay(dateRange.from)) return false;
    if (dateRange.to && item.sentAt > endOfDay(dateRange.to)) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusIcon = (status: NotificationStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'read':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'sent':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChannelIcon = (channel: NotificationChannel) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'push':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'compliance':
        return 'bg-yellow-100 text-yellow-800';
      case 'billing':
        return 'bg-blue-100 text-blue-800';
      case 'job':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const exportHistory = () => {
    // In production, this would export to CSV/Excel
    const csv = [
      ['Date', 'Type', 'Title', 'Channel', 'Status', 'Delivery Time', 'Read Time'],
      ...filteredHistory.map(item => [
        format(item.sentAt, 'yyyy-MM-dd HH:mm'),
        item.metadata?.type || '',
        item.metadata?.title || '',
        item.channel,
        item.status,
        item.deliveredAt ? format(item.deliveredAt, 'HH:mm:ss') : '',
        item.readAt ? format(item.readAt, 'HH:mm:ss') : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notification-history-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-centre">
        <div>
          <h2 className="text-2xl font-bold flex items-centre gap-2">
            <Clock className="h-6 w-6" />
            Notification History
          </h2>
          <p className="text-gray-600 mt-1">
            Track and analyse all sent notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportHistory}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics.totalSent.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics.deliveryRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {analytics.totalDelivered} delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Read Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{analytics.readRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              Avg. {Math.floor(analytics.averageReadTime / 60)}m to read
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{analytics.totalFailed}</p>
            <p className="text-xs text-gray-500 mt-1">
              {((analytics.totalFailed / analytics.totalSent) * 100).toFixed(1)}% failure rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="job">Job</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedChannel} onValueChange={(value: any) => setSelectedChannel(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All channels</SelectItem>
                      <SelectItem value="in_app">In-App</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from && dateRange.to ? (
                          <>
                            {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d')}
                          </>
                        ) : (
                          'Pick a date range'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{
                          from: dateRange.from,
                          to: dateRange.to
                        }}
                        onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* History Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-centre gap-2">
                          {getStatusIcon(item.status)}
                          <span className="text-sm capitalize">{item.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(item.sentAt, 'MMM d, HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getTypeColor(item.metadata?.type || '')}>
                          {item.metadata?.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {item.metadata?.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-centre gap-1">
                          {getChannelIcon(item.channel)}
                          <span className="text-sm capitalize">{item.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.deliveredAt ? (
                          <span className="text-green-600">
                            {Math.round((item.deliveredAt.getTime() - item.sentAt.getTime()) / 1000)}s
                          </span>
                        ) : item.failedAt ? (
                          <span className="text-red-600">Failed</span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {item.status === 'failed' && (
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-centre justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of{' '}
                    {filteredHistory.length} notifications
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-centre gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === totalPages || 
                          Math.abs(page - currentPage) <= 1
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By Type */}
            <Card>
              <CardHeader>
                <CardTitle>By Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.byType).map(([type, count]) => (
                    <div key={type} className="flex items-centre justify-between">
                      <div className="flex items-centre gap-2">
                        <Badge variant="outline" className={getTypeColor(type)}>
                          {type}
                        </Badge>
                      </div>
                      <div className="flex items-centre gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(count / analytics.totalSent) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* By Channel */}
            <Card>
              <CardHeader>
                <CardTitle>By Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.byChannel).map(([channel, count]) => (
                    <div key={channel} className="flex items-centre justify-between">
                      <div className="flex items-centre gap-2">
                        {getChannelIcon(channel as NotificationChannel)}
                        <span className="text-sm capitalize">{channel}</span>
                      </div>
                      <div className="flex items-centre gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(count / analytics.totalSent) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Unread Types */}
            <Card>
              <CardHeader>
                <CardTitle>Top Unread Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topUnreadTypes.map((item, index) => (
                    <div key={item.type} className="flex items-centre justify-between">
                      <div className="flex items-centre gap-2">
                        <span className="text-sm font-medium">#{index + 1}</span>
                        <Badge variant="outline" className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">{item.count} unread</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* By Priority */}
            <Card>
              <CardHeader>
                <CardTitle>By Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.byPriority).map(([priority, count]) => (
                    <div key={priority} className="flex items-centre justify-between">
                      <Badge
                        variant="outline"
                        className={
                          priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {priority}
                      </Badge>
                      <div className="flex items-centre gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              priority === 'urgent' ? 'bg-red-500' :
                              priority === 'high' ? 'bg-orange-500' :
                              priority === 'medium' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: `${(count / analytics.totalSent) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}