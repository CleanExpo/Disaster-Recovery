'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HeadphonesIcon,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Tag,
  Send,
  Archive,
  RefreshCcw,
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  FileText,
  Paperclip,
  Star
} from 'lucide-react';

interface Ticket {
  id: string;
  contractorId: string;
  contractorName: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'compliance' | 'territory' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_on_customer' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  responseTime?: number;
  resolutionTime?: number;
  assignedTo?: string;
  messages: Array<{
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    isAdmin: boolean;
  }>;
  attachments?: string[];
  satisfaction?: number;
}

export function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('open');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [filterStatus, filterPriority]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/tickets?status=${filterStatus}&priority=${filterPriority}`);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'waiting_on_customer': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReply = async () => {
    if (!selectedTicket || !replyMessage) return;

    try {
      const response = await fetch(`/api/admin/tickets/${selectedTicket.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: replyMessage,
          sender: 'Admin'
        })
      });

      if (response.ok) {
        fetchTickets();
        setReplyMessage('');
        setShowReplyModal(false);
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  const updateTicketStatus = async (ticket: Ticket, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/tickets/${ticket.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchTickets();
      }
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    (filterStatus === 'all' || ticket.status === filterStatus) &&
    (filterPriority === 'all' || ticket.priority === filterPriority) &&
    (searchTerm === '' || 
     ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ticket.contractorName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openTickets = tickets.filter(t => t.status === 'open');
  const urgentTickets = tickets.filter(t => t.priority === 'urgent' && t.status !== 'closed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Support Tickets</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="waiting_on_customer">Waiting</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{openTickets.length}</p>
            <p className="text-xs text-gray-500">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Urgent Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{urgentTickets.length}</p>
            <p className="text-xs text-gray-500">Need immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2.5h</p>
            <p className="text-xs text-gray-500">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Satisfaction Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">94%</p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Alert */}
      {urgentTickets.length > 0 && (
        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>{urgentTickets.length} urgent tickets</strong> require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Tickets List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-medium">{ticket.subject}</p>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {ticket.contractorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {ticket.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      {ticket.messages.length > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {ticket.messages.length} messages
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ticket Details Dialog */}
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTicket.subject}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className={getPriorityColor(selectedTicket.priority)}>
                  {selectedTicket.priority}
                </Badge>
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {selectedTicket.status.replace('_', ' ')}
                </Badge>
                <Badge variant="outline">{selectedTicket.category}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Contractor</Label>
                  <p className="font-medium">{selectedTicket.contractorName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Created</Label>
                  <p className="font-medium">
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Description</Label>
                <p className="mt-1 text-sm">{selectedTicket.description}</p>
              </div>

              {/* Messages */}
              <div>
                <Label className="text-sm text-gray-600 mb-2">Conversation</Label>
                <div className="space-y-3 mt-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                  {selectedTicket.messages.map(message => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.isAdmin
                          ? 'bg-blue-50 ml-8'
                          : 'bg-gray-50 mr-8'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">{message.sender}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply */}
              <div>
                <Label htmlFor="reply">Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Type your reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>

              {/* Status Update */}
              <div>
                <Label>Update Status</Label>
                <Select
                  value={selectedTicket.status}
                  onValueChange={(value) => updateTicketStatus(selectedTicket, value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="waiting_on_customer">Waiting on Customer</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                Close
              </Button>
              <Button onClick={handleReply} disabled={!replyMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}