/**
 * Mock Stripe Service
 * Simulates all Stripe payment operations for demo purposes
 */

interface MockPaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'requires_payment_method';
  metadata: Record<string, any>;
  created: number;
  client_secret: string;
}

interface MockCustomer {
  id: string;
  email: string;
  name: string;
  metadata: Record<string, any>;
}

interface MockCheckoutSession {
  id: string;
  payment_status: 'paid' | 'unpaid';
  amount_total: number;
  customer: string;
  success_url: string;
  cancel_url: string;
}

class MockStripeService {
  private mockPaymentIntents: Map<string, MockPaymentIntent> = new Map();
  private mockCustomers: Map<string, MockCustomer> = new Map();
  private mockSessions: Map<string, MockCheckoutSession> = new Map();

  // Simulate creating a payment intent
  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    metadata?: Record<string, any>;
  }): Promise<MockPaymentIntent> {
    const paymentIntent: MockPaymentIntent = {
      id: `pi_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: params.amount,
      currency: params.currency,
      status: 'requires_payment_method',
      metadata: params.metadata || {},
      created: Date.now() / 1000,
      client_secret: `pi_mock_secret_${Math.random().toString(36).substr(2, 9)}`
    };
    
    this.mockPaymentIntents.set(paymentIntent.id, paymentIntent);
    
    // Simulate processing delay
    setTimeout(() => {
      paymentIntent.status = 'succeeded';
    }, 2000);
    
    return paymentIntent;
  }

  // Simulate creating a checkout session
  async createCheckoutSession(params: {
    success_url: string;
    cancel_url: string;
    line_items: Array<{ price_data: any; quantity: number }>;
    customer_email?: string;
    metadata?: Record<string, any>;
  }): Promise<MockCheckoutSession> {
    const totalAmount = params.line_items.reduce((sum, item) => {
      return sum + (item.price_data.unit_amount * item.quantity);
    }, 0);

    const session: MockCheckoutSession = {
      id: `cs_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      payment_status: 'unpaid',
      amount_total: totalAmount,
      customer: params.customer_email || 'demo@example.com',
      success_url: params.success_url,
      cancel_url: params.cancel_url
    };
    
    this.mockSessions.set(session.id, session);
    
    // Return mock checkout URL
    const mockUrl = `${params.success_url}?session_id=${session.id}&demo=true`;
    
    return {
      ...session,
      url: mockUrl
    } as any;
  }

  // Simulate retrieving a payment intent
  async retrievePaymentIntent(id: string): Promise<MockPaymentIntent | null> {
    return this.mockPaymentIntents.get(id) || null;
  }

  // Simulate creating a customer
  async createCustomer(params: {
    email: string;
    name: string;
    metadata?: Record<string, any>;
  }): Promise<MockCustomer> {
    const customer: MockCustomer = {
      id: `cus_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: params.email,
      name: params.name,
      metadata: params.metadata || {}
    };
    
    this.mockCustomers.set(customer.id, customer);
    return customer;
  }

  // Simulate contractor payout
  async createTransfer(params: {
    amount: number;
    currency: string;
    destination: string;
    metadata?: Record<string, any>;
  }): Promise<any> {
    return {
      id: `tr_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: params.amount,
      currency: params.currency,
      destination: params.destination,
      status: 'pending',
      created: Date.now() / 1000,
      metadata: params.metadata || {}
    };
  }

  // Simulate refund
  async createRefund(params: {
    payment_intent: string;
    amount?: number;
    reason?: string;
  }): Promise<any> {
    const paymentIntent = this.mockPaymentIntents.get(params.payment_intent);
    
    return {
      id: `re_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: params.amount || paymentIntent?.amount || 0,
      currency: paymentIntent?.currency || 'aud',
      payment_intent: params.payment_intent,
      reason: params.reason || 'requested_by_customer',
      status: 'succeeded',
      created: Date.now() / 1000
    };
  }

  // Simulate webhook event
  constructEvent(payload: any, signature: string, secret: string): any {
    // In mock mode, just return the payload as a valid event
    return {
      id: `evt_mock_${Date.now()}`,
      type: payload.type || 'payment_intent.succeeded',
      data: {
        object: payload.data?.object || {
          id: `pi_mock_${Date.now()}`,
          amount: 275000,
          currency: 'aud',
          status: 'succeeded'
        }
      }
    };
  }
}

export const mockStripeService = new MockStripeService();

// Export mock Stripe object that mimics real Stripe SDK structure
export const getMockStripe = () => ({
  paymentIntents: {
    create: (params: any) => mockStripeService.createPaymentIntent(params),
    retrieve: (id: string) => mockStripeService.retrievePaymentIntent(id)
  },
  checkout: {
    sessions: {
      create: (params: any) => mockStripeService.createCheckoutSession(params)
    }
  },
  customers: {
    create: (params: any) => mockStripeService.createCustomer(params)
  },
  transfers: {
    create: (params: any) => mockStripeService.createTransfer(params)
  },
  refunds: {
    create: (params: any) => mockStripeService.createRefund(params)
  },
  webhooks: {
    constructEvent: (payload: any, sig: string, secret: string) => 
      mockStripeService.constructEvent(payload, sig, secret)
  }
});