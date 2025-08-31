'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HeadphonesIcon,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: string;
  createdAt: string;
  updatedAt: string;
  responseCount: number;
}

interface SupportTicketsProps {
  tickets?: Ticket[];
}

export function SupportTickets({ tickets = [] }: SupportTicketsProps) {
  // Mock data for demonstration
  const mockTickets: Ticket[] = tickets.length > 0 ? tickets : [
    {
      id: '1',
      subject: 'Unable to update insurance documentation',
      description: 'Getting error when trying to upload new insurance certificate',
      status: 'OPEN',
      priority: 'HIGH',
      category: 'Compliance',
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
      responseCount: 0
    },
    {
      id: '2',
      subject: 'Payment not reflecting in account',
      description: 'Made payment 3 days ago but balance not updated',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      category: 'Billing',
      createdAt: '2025-01-18T14:30:00Z',
      updatedAt: '2025-01-19T09:15:00Z',
      responseCount: 2
    }
  ];

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CLOSED':
        return <CheckCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'OPEN':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openTickets = mockTickets.filter(t => t.status === 'OPEN');
  const inProgressTickets = mockTickets.filter(t => t.status === 'IN_PROGRESS');
  const resolvedTickets = mockTickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED');

  const renderTicketList = (ticketList: Ticket[]) => (
    <div className="space-y-3">
      {ticketList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tickets found
        </div>
      ) : (
        ticketList.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getStatusIcon(ticket.status)}
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm">{ticket.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>#{ticket.id}</span>
                      <span>•</span>
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      {ticket.responseCount > 0 && (
                        <>
                          <span>•</span>
                          <span>{ticket.responseCount} response(s)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTickets.length}</div>
            <p className="text-xs text-gray-600">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets.length}</div>
            <p className="text-xs text-gray-600">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets.length}</div>
            <p className="text-xs text-gray-600">Being resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets.length}</div>
            <p className="text-xs text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HeadphonesIcon className="h-5 w-5" />
                Support Tickets
              </CardTitle>
              <CardDescription>
                Manage your support requests and inquiries
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="open" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="open">Open ({openTickets.length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({inProgressTickets.length})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({resolvedTickets.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="open" className="mt-4">
              {renderTicketList(openTickets)}
            </TabsContent>
            <TabsContent value="in-progress" className="mt-4">
              {renderTicketList(inProgressTickets)}
            </TabsContent>
            <TabsContent value="resolved" className="mt-4">
              {renderTicketList(resolvedTickets)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Quick access to support resources and documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <MessageSquare className="h-4 w-4 mr-2" />
              Live Chat Support
            </Button>
            <Button variant="outline" className="justify-start">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              Request Callback
            </Button>
            <Button variant="outline" className="justify-start">
              📚 Knowledge Base
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
