'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Download,
  RefreshCcw,
  User,
  Building,
  Shield,
  Star,
  Zap,
  AlertCircle,
  Receipt,
  FileText,
  Ban,
  Play,
  Pause
} from 'lucide-react';

interface Subscription {
  id: string;
  contractorId: string;
  contractorName: string;
  companyName: string;
  tier: 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'active' | 'paused' | 'cancelled' | 'overdue' | 'trial';
  amount: number;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  nextBillingDate: string;
  lastPaymentDate?: string;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  paymentMethod?: {
    type: 'credit_card' | 'bank_transfer';
    last4?: string;
    brand?: string;
  };
  usage?: {
    territories: number;
    maxTerritories: number;
    apiCalls: number;
    maxApiCalls: number;
    storage: number;
    maxStorage: number;
  };
  balance: number;
  overdueAmount?: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    reason: string;
  };
}

interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  method: string;
  invoiceNumber: string;
}

export function SubscriptionManager() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [modifyModal, setModifyModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
    fetchPayments();
  }, [filterStatus, filterTier]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/subscriptions?status=${filterStatus}&tier=${filterTier}`);
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/admin/payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'ENTERPRISE': return 'bg-purple-100 text-purple-800';
      case 'PROFESSIONAL': return 'bg-blue-100 text-blue-800';
      case 'BASIC': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case 'ENTERPRISE': return 1295;
      case 'PROFESSIONAL': return 895;
      case 'BASIC': return 495;
      default: return 0;
    }
  };

  const handleStatusChange = async (subscription: Subscription, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscription.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchSubscriptions();
      }
    } catch (error) {
      console.error('Failed to update subscription status:', error);
    }
  };

  const handleRefund = async () => {
    if (!selectedSubscription || !refundAmount || !refundReason) return;

    try {
      const response = await fetch(`/api/admin/subscriptions/${selectedSubscription.id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(refundAmount),
          reason: refundReason
        })
      });

      if (response.ok) {
        fetchSubscriptions();
        fetchPayments();
        setRefundModal(false);
        setRefundAmount('');
        setRefundReason('');
      }
    } catch (error) {
      console.error('Failed to process refund:', error);
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    (filterStatus === 'all' || sub.status === filterStatus) &&
    (filterTier === 'all' || sub.tier === filterTier) &&
    (searchTerm === '' || 
     sub.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  const overdueSubscriptions = subscriptions.filter(s => s.status === 'overdue');
  const totalOverdue = overdueSubscriptions.reduce((sum, s) => sum + (s.overdueAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Subscription & Billing Management</h2>
        <div className="flex gap-3">
          <Input
            placeholder="Search contractors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterTier} onValueChange={setFilterTier}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
              <SelectItem value="PROFESSIONAL">Professional</SelectItem>
              <SelectItem value="BASIC">Basic</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Monthly Recurring Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {subscriptions.filter(s => s.status === 'active').length} active subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Overdue Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ${totalOverdue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {overdueSubscriptions.length} accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Average Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${(totalRevenue / (subscriptions.filter(s => s.status === 'active').length || 1)).toFixed(0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Per contractor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Tier Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Enterprise</span>
                <span>{subscriptions.filter(s => s.tier === 'ENTERPRISE').length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Professional</span>
                <span>{subscriptions.filter(s => s.tier === 'PROFESSIONAL').length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Basic</span>
                <span>{subscriptions.filter(s => s.tier === 'BASIC').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {overdueSubscriptions.length > 0 && (
        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>{overdueSubscriptions.length} subscriptions are overdue</strong> with a total outstanding 
            amount of ${totalOverdue.toLocaleString()}. Consider sending payment reminders or suspending services.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Contractor</th>
                      <th className="text-left p-4 font-medium text-sm">Tier</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Amount</th>
                      <th className="text-left p-4 font-medium text-sm">Billing Cycle</th>
                      <th className="text-left p-4 font-medium text-sm">Next Billing</th>
                      <th className="text-left p-4 font-medium text-sm">Usage</th>
                      <th className="text-left p-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map(subscription => (
                      <tr key={subscription.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{subscription.contractorName}</p>
                            <p className="text-sm text-gray-600">{subscription.companyName}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getTierColor(subscription.tier)}>
                            {subscription.tier}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(subscription.status)}>
                            {subscription.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">${subscription.amount}/mo</p>
                            {subscription.discount && (
                              <p className="text-xs text-green-600">
                                -{subscription.discount.type === 'percentage' ? 
                                  `${subscription.discount.value}%` : 
                                  `$${subscription.discount.value}`} discount
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="capitalize">{subscription.billingCycle}</span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">
                            {new Date(subscription.nextBillingDate).toLocaleDateString()}
                          </p>
                          {subscription.overdueAmount && (
                            <p className="text-xs text-red-600">
                              ${subscription.overdueAmount} overdue
                            </p>
                          )}
                        </td>
                        <td className="p-4">
                          {subscription.usage && (
                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-1">
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full"
                                    style={{ 
                                      width: `${(subscription.usage.territories / subscription.usage.maxTerritories) * 100}%` 
                                    }}
                                  />
                                </div>
                                <span>{subscription.usage.territories}/{subscription.usage.maxTerritories}</span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedSubscription(subscription)}
                            >
                              View
                            </Button>
                            {subscription.status === 'active' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(subscription, 'paused')}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            )}
                            {subscription.status === 'paused' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(subscription, 'active')}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {payment.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : payment.status === 'failed' ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium">Invoice #{payment.invoiceNumber}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString()} • {payment.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${payment.amount}</p>
                      <Badge className={
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                        payment.status === 'refunded' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Invoice Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    Invoices are automatically generated on the 1st of each month and sent to contractors via email.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Bulk Send Reminders
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subscription Details Panel */}
      {selectedSubscription && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Contractor</Label>
                  <p className="font-medium">{selectedSubscription.contractorName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Company</Label>
                  <p className="font-medium">{selectedSubscription.companyName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Current Tier</Label>
                  <Badge className={getTierColor(selectedSubscription.tier)}>
                    {selectedSubscription.tier}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Monthly Amount</Label>
                  <p className="font-medium">${selectedSubscription.amount}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Start Date</Label>
                  <p className="font-medium">
                    {new Date(selectedSubscription.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Auto-Renew</Label>
                  <Switch checked={selectedSubscription.autoRenew} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setModifyModal(true)}>
                  Modify Subscription
                </Button>
                <Button variant="outline" onClick={() => setRefundModal(true)}>
                  Process Refund
                </Button>
                <Button variant="outline" className="text-red-600">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Refund Modal */}
      <Dialog open={refundModal} onOpenChange={setRefundModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
          </DialogHeader>
          
          {selectedSubscription && (
            <div className="space-y-4">
              <div>
                <Label>Contractor</Label>
                <p className="text-sm text-gray-600">
                  {selectedSubscription.contractorName} - {selectedSubscription.companyName}
                </p>
              </div>

              <div>
                <Label htmlFor="refund-amount">Refund Amount</Label>
                <Input
                  id="refund-amount"
                  type="number"
                  placeholder="0.00"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current balance: ${selectedSubscription.amount}
                </p>
              </div>

              <div>
                <Label htmlFor="refund-reason">Reason for Refund</Label>
                <Textarea
                  id="refund-reason"
                  placeholder="Enter reason for refund..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  This action will process a refund to the contractor's original payment method. 
                  The refund may take 3-5 business days to appear.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRefund} disabled={!refundAmount || !refundReason}>
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}