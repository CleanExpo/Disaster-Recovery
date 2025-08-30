'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Receipt,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react';

interface BillingSectionProps {
  subscription: {
    tier: string;
    amount: number;
    accountBalance: number;
    creditLimit: number;
    nextBillingDate?: string;
    billingCycle?: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
    paymentMethod?: string;
    autoRenew?: boolean;
  };
}

export function BillingSection({ subscription }: BillingSectionProps) {
  const creditUsage = subscription.creditLimit > 0 
    ? ((subscription.creditLimit - subscription.accountBalance) / subscription.creditLimit) * 100 
    : 0;

  const invoices = [
    { id: 1, date: '2025-01-01', amount: 299, status: 'PAID', description: 'Monthly Subscription' },
    { id: 2, date: '2024-12-01', amount: 299, status: 'PAID', description: 'Monthly Subscription' },
    { id: 3, date: '2024-11-01', amount: 299, status: 'PAID', description: 'Monthly Subscription' },
  ];

  const transactions = [
    { id: 1, date: '2025-01-15', amount: -50, description: 'Job #1234 - Emergency Service', type: 'DEBIT' },
    { id: 2, date: '2025-01-10', amount: 500, description: 'Credit Top-up', type: 'CREDIT' },
    { id: 3, date: '2025-01-05', amount: -75, description: 'Job #1233 - Water Damage', type: 'DEBIT' },
  ];

  return (
    <div className="space-y-6">
      {/* Billing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${subscription.accountBalance.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">Available credit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credit Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditUsage.toFixed(0)}%</div>
            <Progress value={creditUsage} className="mt-2 h-2" />
            <p className="text-xs text-gray-600 mt-1">
              ${subscription.creditLimit - subscription.accountBalance} of ${subscription.creditLimit} used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${subscription.amount}</div>
            <p className="text-xs text-gray-600 mt-1">{subscription.tier} tier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">
              {subscription.nextBillingDate 
                ? new Date(subscription.nextBillingDate).toLocaleDateString()
                : 'N/A'}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {subscription.billingCycle || 'MONTHLY'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">Current Tier</p>
              <div className="flex items-centre gap-2 mt-1">
                <p className="font-semibold">{subscription.tier}</p>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Billing Cycle</p>
              <p className="font-semibold mt-1">{subscription.billingCycle || 'MONTHLY'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold mt-1">{subscription.paymentMethod || 'Credit Card ****1234'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Auto-Renewal</p>
              <div className="flex items-centre gap-2 mt-1">
                {subscription.autoRenew ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">Enabled</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold">Disabled</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline">Update Payment Method</Button>
            <Button variant="outline">Manage Auto-Renewal</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-centre">
                <CardTitle>Recent Invoices</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map(invoice => (
                  <div key={invoice.id} className="flex items-centre justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-centre gap-3">
                      <Receipt className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{invoice.description}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(invoice.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-centre gap-3">
                      <span className="font-semibold">${invoice.amount}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                All credits and debits to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-centre justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-centre gap-3">
                      {transaction.type === 'CREDIT' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'CREDIT' ? '+' : ''}{transaction.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Statements</CardTitle>
              <CardDescription>
                Detailed billing statements for each period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-centre py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Statements will be available here at the end of each billing period</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
