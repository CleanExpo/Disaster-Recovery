'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Ticket,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Paperclip,
  Send,
  Eye,
  ChevronRight,
  User,
  Calendar,
  Star,
  Upload,
  Download,
  RefreshCw
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import type {
  SupportTicket,
  TicketMessage,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TICKET_PRIORITIES,
  TICKET_CATEGORIES
} from '@/types/support';

// Mock tickets data
const mockTickets: SupportTicket[] = [
  {
    id: '1',
    ticketNumber: 'TKT-2024-001',
    userId: 'user-1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    category: 'compliance',
    subject: 'IICRC Certification Upload Issue',
    description: 'I\'m unable to upload my renewed IICRC certification. The system shows an error when I try to upload the PDF.',
    status: 'open',
    priority: 'high',
    channel: 'ticket',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 6 * 60 * 60 * 1000)
  },
  {
    id: '2',
    ticketNumber: 'TKT-2024-002',
    userId: 'user-1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    category: 'billing',
    subject: 'Duplicate Charge on Monthly Subscription',
    description: 'I was charged twice for my monthly subscription this month. Please refund the duplicate charge.',
    status: 'in_progress',
    priority: 'urgent',
    assignedTo: 'agent-1',
    assignedToName: 'Sarah Johnson',
    channel: 'email',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    firstResponseAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 1 * 60 * 60 * 1000)
  },
  {
    id: '3',
    ticketNumber: 'TKT-2024-003',
    userId: 'user-1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    category: 'technical',
    subject: 'Login Issues After Password Reset',
    description: 'After resetting my password, I cannot log into the portal. It says invalid credentials.',
    status: 'resolved',
    priority: 'medium',
    assignedTo: 'agent-2',
    assignedToName: 'Mike Chen',
    channel: 'chat',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    satisfaction: 5
  }
];

// Mock messages
const mockMessages: Record<string, TicketMessage[]> = {
  '1': [
    {
      id: 'msg-1',
      ticketId: '1',
      senderId: 'user-1',
      senderName: 'John Doe',
      senderType: 'user',
      message: 'I\'m unable to upload my renewed IICRC certification. The system shows an error when I try to upload the PDF.',
      isInternal: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ],
  '2': [
    {
      id: 'msg-2',
      ticketId: '2',
      senderId: 'user-1',
      senderName: 'John Doe',
      senderType: 'user',
      message: 'I was charged twice for my monthly subscription this month. Please refund the duplicate charge.',
      isInternal: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3',
      ticketId: '2',
      senderId: 'agent-1',
      senderName: 'Sarah Johnson',
      senderType: 'agent',
      message: 'I apologize for the duplicate charge. I\'ve initiated a refund for the extra payment. You should see it reflected in your account within 3-5 business days.',
      isInternal: false,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000)
    }
  ]
};

export function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [ticketMessages, setTicketMessages] = useState<TicketMessage[]>([]);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    category: '' as TicketCategory | '',
    subject: '',
    description: '',
    priority: 'medium' as TicketPriority,
    attachments: [] as File[]
  });

  const handleCreateTicket = async () => {
    if (!newTicket.category || !newTicket.subject || !newTicket.description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const ticket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
      userId: 'current-user',
      userName: 'Current User',
      userEmail: 'user@example.com',
      category: newTicket.category as TicketCategory,
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'open',
      priority: newTicket.priority,
      channel: 'ticket',
      createdAt: new Date(),
      updatedAt: new Date(),
      slaDeadline: new Date(Date.now() + getSLAHours(newTicket.priority) * 60 * 60 * 1000)
    };

    setTickets([ticket, ...tickets]);
    setIsCreatingTicket(false);
    setNewTicket({
      category: '',
      subject: '',
      description: '',
      priority: 'medium',
      attachments: []
    });

    toast({
      title: 'Ticket Created',
      description: `Your ticket ${ticket.ticketNumber} has been created successfully.`
    });
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setTicketMessages(mockMessages[ticket.id] || []);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    const newMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      senderId: 'current-user',
      senderName: 'You',
      senderType: 'user',
      message: replyMessage,
      isInternal: false,
      createdAt: new Date()
    };

    setTicketMessages([...ticketMessages, newMessage]);
    setReplyMessage('');

    // Update ticket status if resolved
    if (selectedTicket.status === 'resolved') {
      setSelectedTicket({ ...selectedTicket, status: 'open', updatedAt: new Date() });
      setTickets(tickets.map(t => 
        t.id === selectedTicket.id 
          ? { ...t, status: 'open', updatedAt: new Date() }
          : t
      ));
    }

    toast({
      title: 'Reply Sent',
      description: 'Your message has been added to the ticket.'
    });
  };

  const getSLAHours = (priority: TicketPriority): number => {
    const priorities: Record<TicketPriority, number> = {
      urgent: 2,
      high: 8,
      medium: 24,
      low: 72
    };
    return priorities[priority];
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
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

  const filteredTickets = tickets.filter(ticket => {
    if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
    if (searchQuery && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            Support Tickets
          </h2>
          <p className="text-gray-600 mt-1">
            Track and manage your support requests
          </p>
        </div>
        <Dialog open={isCreatingTicket} onOpenChange={setIsCreatingTicket}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Submit a new support request. We'll respond within 24-48 hours.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value as TicketCategory })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="compliance">Compliance & Certification</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) => setNewTicket({ ...newTicket, priority: value as TicketPriority })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Provide detailed information about your request..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="attachments">Attachments</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                    <input
                      id="attachments"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setNewTicket({ ...newTicket, attachments: files });
                      }}
                    />
                  </label>
                  {newTicket.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {newTicket.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Paperclip className="h-4 w-4" />
                          <span>{file.name}</span>
                          <span className="text-gray-500">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatingTicket(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTicket}>
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List or Detail View */}
      {!selectedTicket ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {ticket.ticketNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.subject}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[300px]">
                          {ticket.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ticket.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(ticket.status)}
                        <span className="capitalize">{ticket.status.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      {ticket.slaDeadline && (
                        <div className="text-sm">
                          {new Date() > ticket.slaDeadline ? (
                            <span className="text-red-600">Overdue</span>
                          ) : (
                            <span>
                              {formatDistanceToNow(ticket.slaDeadline, { addSuffix: true })}
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* Ticket Detail View */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTicket(null)}
                >
                  ← Back to Tickets
                </Button>
                <div>
                  <CardTitle className="text-xl">
                    {selectedTicket.ticketNumber}: {selectedTicket.subject}
                  </CardTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                    <Badge variant="outline">
                      {selectedTicket.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedTicket.status)}
                      <span className="text-sm capitalize">
                        {selectedTicket.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>Created: {format(selectedTicket.createdAt, 'PPp')}</p>
                {selectedTicket.assignedToName && (
                  <p>Assigned to: {selectedTicket.assignedToName}</p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <ScrollArea className="h-[400px] mb-4 p-4 border rounded-lg">
              <div className="space-y-4">
                {ticketMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%]`}>
                      <div className="flex items-center gap-2 mb-1">
                        {message.senderType === 'agent' && (
                          <User className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="text-sm font-medium">
                          {message.senderName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.senderType === 'user'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply Form */}
            {selectedTicket.status !== 'closed' && (
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-1" />
                      Attach
                    </Button>
                  </div>
                  <Button onClick={handleSendReply} disabled={!replyMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            )}

            {/* Satisfaction Rating */}
            {selectedTicket.status === 'resolved' && !selectedTicket.satisfaction && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium mb-2">How satisfied are you with the resolution?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTicket({ ...selectedTicket, satisfaction: rating });
                        toast({
                          title: 'Thank you for your feedback!',
                          description: 'Your rating helps us improve our support.'
                        });
                      }}
                    >
                      <Star className={`h-4 w-4 ${rating <= 3 ? 'text-gray-400' : 'text-yellow-500'}`} />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}