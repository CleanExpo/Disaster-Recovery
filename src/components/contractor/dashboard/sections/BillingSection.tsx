'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Gift,
  Zap,
  Shield,
  Star,
  ArrowRight,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import {
  PRICING_PLANS,
  ONBOARDING_DISCOUNTS,
  calculateOnboardingPrice,
  calculateBillingCyclePrice,
  formatCurrency,
  type SubscriptionPlan,
  type BillingCycle,
  type ContractorSubscription,
  type Invoice,
  type PaymentMethod
} from '@/types/billing';

interface BillingSectionProps {
  contractorId: string;
}

export default function BillingSection({ contractorId }: BillingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('professional');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [currentSubscription, setCurrentSubscription] = useState<ContractorSubscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading subscription data
  useEffect(() => {
    // In production, fetch from API
    setTimeout(() => {
      setCurrentSubscription({
        id: 'sub_123',
        contractorId,
        plan: 'basic',
        status: 'active',
        billingCycle: 'monthly',
        currentPeriodStart: new Date('2024-01-01'),
        currentPeriodEnd: new Date('2024-01-31'),
        onboardingMonth: 2, // Currently in 2nd month (60% off)
        nextBillingDate: new Date('2024-02-01'),
        currentMonthlyPrice: 119.60, // $299 with 60% off
        regularMonthlyPrice: 299
      });
      setIsLoading(false);
    }, 1000);
  }, [contractorId]);

  const getPlanPrice = (plan: SubscriptionPlan, month: number) => {
    const basePlan = PRICING_PLANS.find(p => p.plan === plan);
    if (!basePlan) return 0;
    return calculateOnboardingPrice(basePlan.basePrice, month);
  };

  const getOnboardingStatus = () => {
    if (!currentSubscription) return null;
    const { onboardingMonth } = currentSubscription;
    
    if (onboardingMonth <= 3) {
      const discount = ONBOARDING_DISCOUNTS.find(d => d.month === onboardingMonth);
      return discount;
    }
    return null;
  };

  const onboardingDiscount = getOnboardingStatus();

  return (
    <div className="space-y-6">
      {/* Onboarding Promotion Banner */}
      {onboardingDiscount && (
        <div className="alert alert-success">
          <Gift className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            <strong className="block text-base">Special Onboarding Pricing Active!</strong>
            <span className="text-sm">
              Month {currentSubscription?.onboardingMonth} of 3: {onboardingDiscount.description}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success-700">
              {formatCurrency(currentSubscription?.currentMonthlyPrice || 0)}
            </div>
            <div className="text-xs text-success-600 line-through">
              {formatCurrency(currentSubscription?.regularMonthlyPrice || 0)}
            </div>
          </div>
        </div>
      )}

      {/* Current Plan Overview */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Current Subscription</h3>
          <span className="badge badge-success">Active</span>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Current Plan</p>
              <p className="text-xl font-bold capitalize">{currentSubscription?.plan || 'Basic'}</p>
              <p className="text-sm text-primary-600 mt-1">
                {PRICING_PLANS.find(p => p.plan === currentSubscription?.plan)?.maxJobs || 20} jobs/month
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Billing Cycle</p>
              <p className="text-xl font-bold capitalize">{currentSubscription?.billingCycle || 'Monthly'}</p>
              <p className="text-sm text-neutral-500 mt-1">
                Next billing: {currentSubscription?.nextBillingDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Monthly Cost</p>
              <p className="text-xl font-bold">
                {formatCurrency(currentSubscription?.currentMonthlyPrice || 0)}
              </p>
              {onboardingDiscount && (
                <p className="text-sm text-success-600 mt-1">
                  Saving {formatCurrency((currentSubscription?.regularMonthlyPrice || 0) - (currentSubscription?.currentMonthlyPrice || 0))}/mo
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="btn btn-primary btn-sm"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Onboarding Pricing Timeline */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Your Onboarding Journey</h3>
          <Info className="h-5 w-5 text-primary-600" />
        </div>
        <div className="card-body">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full">
              <div 
                className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${((currentSubscription?.onboardingMonth || 1) / 4) * 100}%` }}
              />
            </div>
            
            {/* Timeline Items */}
            <div className="relative grid grid-cols-4 gap-4">
              {[
                { month: 1, label: 'Month 1', discount: '100% OFF', price: 0, status: 'FREE' },
                { month: 2, label: 'Month 2', discount: '60% OFF', price: 119.60, status: 'DISCOUNTED' },
                { month: 3, label: 'Month 3', discount: '50% OFF', price: 149.50, status: 'DISCOUNTED' },
                { month: 4, label: 'Month 4+', discount: 'Regular', price: 299, status: 'REGULAR' }
              ].map((item) => {
                const isActive = currentSubscription?.onboardingMonth === item.month;
                const isPast = (currentSubscription?.onboardingMonth || 0) > item.month;
                const isFuture = (currentSubscription?.onboardingMonth || 0) < item.month;
                
                return (
                  <div key={item.month} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg
                        ${isActive ? 'bg-primary-600 text-white shadow-lg scale-110' : ''}
                        ${isPast ? 'bg-success-600 text-white' : ''}
                        ${isFuture ? 'bg-neutral-200 text-neutral-600' : ''}
                        transition-all duration-300
                      `}>
                        {isPast ? <CheckCircle className="h-6 w-6" /> : item.month}
                      </div>
                    </div>
                    <p className="font-semibold text-sm mb-1">{item.label}</p>
                    <p className={`text-xs mb-1 ${item.month <= 3 ? 'text-success-600 font-bold' : 'text-neutral-600'}`}>
                      {item.discount}
                    </p>
                    <p className="text-sm font-bold">
                      {item.month === 1 ? (
                        <span className="text-success-600">FREE</span>
                      ) : (
                        formatCurrency(item.price)
                      )}
                    </p>
                    {isActive && (
                      <span className="badge badge-primary mt-2">Current</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="alert alert-info mt-6">
            <Info className="h-4 w-4 flex-shrink-0" />
            <div className="text-sm">
              After your 3-month onboarding period, you'll automatically transition to regular pricing. 
              You can change or cancel your plan anytime.
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Available Plans</h3>
          <div className="flex gap-2">
            {(['monthly', 'quarterly', 'annual'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`btn btn-sm ${billingCycle === cycle ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cycle === 'annual' && <span className="badge badge-success mr-1">Save 15%</span>}
                {cycle === 'quarterly' && <span className="badge badge-info mr-1">Save 5%</span>}
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => {
              const isCurrentPlan = currentSubscription?.plan === plan.plan;
              const monthlyPrice = calculateBillingCyclePrice(plan.basePrice, billingCycle);
              const onboardingPrice = currentSubscription?.onboardingMonth && currentSubscription.onboardingMonth <= 3
                ? getPlanPrice(plan.plan, currentSubscription.onboardingMonth)
                : monthlyPrice;
              
              return (
                <div 
                  key={plan.id}
                  className={`
                    card hover:shadow-lg transition-all
                    ${isCurrentPlan ? 'ring-2 ring-primary-600' : ''}
                    ${plan.plan === 'professional' ? 'scale-105' : ''}
                  `}
                >
                  {plan.plan === 'professional' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="badge badge-primary">
                        <Star className="mr-1 h-3 w-3" />
                        RECOMMENDED
                      </span>
                    </div>
                  )}
                  
                  <div className="card-header text-center">
                    <h4 className="text-xl font-bold">{plan.name}</h4>
                    <div className="mt-4">
                      {currentSubscription?.onboardingMonth && currentSubscription.onboardingMonth <= 3 ? (
                        <>
                          <p className="text-3xl font-bold text-primary-600">
                            {formatCurrency(onboardingPrice)}
                          </p>
                          <p className="text-sm text-neutral-500 line-through">
                            {formatCurrency(monthlyPrice)}
                          </p>
                          <p className="text-xs text-success-600 mt-1">
                            Onboarding price
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-3xl font-bold">
                            {formatCurrency(monthlyPrice)}
                          </p>
                          <p className="text-sm text-neutral-500">
                            per {billingCycle === 'annual' ? 'year' : billingCycle === 'quarterly' ? 'quarter' : 'month'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="card-footer">
                    {isCurrentPlan ? (
                      <button className="btn btn-secondary btn-sm w-full" disabled>
                        Current Plan
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setSelectedPlan(plan.plan);
                          setShowUpgradeModal(true);
                        }}
                        className="btn btn-primary btn-sm w-full"
                      >
                        {plan.plan === 'basic' ? 'Downgrade' : 'Upgrade'} to {plan.name}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <button className="btn btn-primary btn-sm">
            <CreditCard className="mr-2 h-4 w-4" />
            Add Card
          </button>
        </div>
        <div className="card-body">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600 mb-4">No payment methods added yet</p>
              <button className="btn btn-primary btn-sm">
                Add Your First Payment Method
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-neutral-600" />
                    <div>
                      <p className="font-medium">
                        {method.brand} ending in {method.last4}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="badge badge-primary">Default</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Billing History</h3>
          <button className="btn btn-secondary btn-sm">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </button>
        </div>
        <div className="card-body">
          {invoices.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No invoices yet</p>
              <p className="text-sm text-neutral-500 mt-1">
                Your first invoice will appear here after your free month
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-neutral-50">
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg
                      ${invoice.status === 'completed' ? 'bg-success-100 text-success-600' : ''}
                      ${invoice.status === 'pending' ? 'bg-warning-100 text-warning-600' : ''}
                      ${invoice.status === 'failed' ? 'bg-emergency-100 text-emergency-600' : ''}
                    `}>
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Invoice #{invoice.invoiceNumber}</p>
                      <p className="text-sm text-neutral-600">
                        {new Date(invoice.billingPeriodStart).toLocaleDateString()} - {formatCurrency(invoice.totalAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`
                      badge
                      ${invoice.status === 'completed' ? 'badge-success' : ''}
                      ${invoice.status === 'pending' ? 'badge-warning' : ''}
                      ${invoice.status === 'failed' ? 'badge-emergency' : ''}
                    `}>
                      {invoice.status}
                    </span>
                    <button className="btn btn-sm">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Confirm Plan Change</h3>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-1 hover:bg-neutral-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="font-semibold mb-2">Upgrading to {selectedPlan} Plan</p>
                  <p className="text-sm text-neutral-600">
                    Your onboarding discount will continue to apply for the remaining months.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New monthly price:</span>
                    <span className="font-bold">
                      {formatCurrency(getPlanPrice(selectedPlan, currentSubscription?.onboardingMonth || 1))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Regular price after onboarding:</span>
                    <span>{formatCurrency(PRICING_PLANS.find(p => p.plan === selectedPlan)?.basePrice || 0)}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary flex-1">
                    Confirm Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}