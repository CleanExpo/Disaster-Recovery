/**
 * Bot System Integration Tests
 * Tests the complete flow of client and contractor bots
 */

const axios = require('axios');
const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');

const API_URL = process.env.API_URL || 'http://localhost:3005';
const WS_URL = process.env.WS_URL || 'ws://localhost:3002';

const prisma = new PrismaClient();

// Test helpers
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createWebSocketClient = () => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WS_URL);
    
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
    
    setTimeout(() => reject(new Error('WebSocket connection timeout')), 5000);
  });
};

const waitForMessage = (ws, type, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout waiting for message type: ${type}`));
    }, timeout);
    
    const handler = (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === type) {
        clearTimeout(timer);
        ws.removeListener('message', handler);
        resolve(message);
      }
    };
    
    ws.on('message', handler);
  });
};

describe('Bot System Integration Tests', () => {
  let clientWs;
  let contractorWs;
  let contractorToken;
  
  beforeAll(async () => {
    // Wait for servers to be ready
    await sleep(2000);
    
    // Clear test data
    await prisma.job.deleteMany({ where: { customerName: { contains: 'TEST' } } });
  });
  
  afterAll(async () => {
    if (clientWs) clientWs.close();
    if (contractorWs) contractorWs.close();
    await prisma.$disconnect();
  });
  
  describe('API Health Checks', () => {
    test('API server should be healthy', async () => {
      const response = await axios.get(`${API_URL}/health`);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('healthy');
      expect(response.data.database).toBe('connected');
    });
  });
  
  describe('Client Bot Flow', () => {
    test('Client can send message and receive response', async () => {
      const response = await axios.post(`${API_URL}/api/client/message`, {
        message: 'I need help with water damage',
        sessionId: 'test-session-' + Date.now()
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.response).toBeTruthy();
      expect(response.data.sessionId).toBeTruthy();
    });
    
    test('Client can report emergency', async () => {
      const emergency = {
        type: 'flooding',
        location: 'Brisbane',
        address: '123 TEST Street, Brisbane QLD',
        description: 'TEST: Basement flooding from burst pipe',
        customerName: 'TEST Client',
        customerPhone: '0400000000',
        severity: 'high'
      };
      
      const response = await axios.post(`${API_URL}/api/client/emergency`, emergency);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.emergencyId).toMatch(/^EMRG-/);
      expect(response.data.message).toBeTruthy();
      expect(response.data.estimatedResponse).toBe('15-30 minutes');
    });
    
    test('Client can fetch guides', async () => {
      const response = await axios.get(`${API_URL}/api/client/guides`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.guides)).toBe(true);
    });
    
    test('Client can check job status', async () => {
      // First create a job
      const emergency = await axios.post(`${API_URL}/api/client/emergency`, {
        type: 'water_damage',
        location: 'Brisbane',
        customerPhone: '0400000001',
        customerName: 'TEST Status Check'
      });
      
      const jobId = emergency.data.emergencyId;
      
      // Check status
      const response = await axios.get(`${API_URL}/api/client/status/${jobId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.job.id).toBe(jobId);
      expect(response.data.job.status).toBe('pending');
    });
  });
  
  describe('Contractor Bot Flow', () => {
    test('Contractor can login', async () => {
      const response = await axios.post(`${API_URL}/api/contractor/login`, {
        email: 'rapid@example.com',
        password: 'demo123'
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.token).toBeTruthy();
      expect(response.data.contractor).toBeTruthy();
      
      contractorToken = response.data.token;
    });
    
    test('Contractor can view available jobs', async () => {
      if (!contractorToken) {
        // Login first
        const login = await axios.post(`${API_URL}/api/contractor/login`, {
          email: 'rapid@example.com',
          password: 'demo123'
        });
        contractorToken = login.data.token;
      }
      
      const response = await axios.get(`${API_URL}/api/contractor/jobs/available`, {
        headers: { Authorization: `Bearer ${contractorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.jobs)).toBe(true);
    });
    
    test('Contractor can accept job', async () => {
      // Create a job first
      const emergency = await axios.post(`${API_URL}/api/client/emergency`, {
        type: 'flooding',
        location: 'Brisbane',
        customerPhone: '0400000002',
        customerName: 'TEST Accept Job'
      });
      
      // Get job ID
      const jobId = emergency.data.emergencyId.replace('EMRG-', '');
      
      // Accept the job
      const response = await axios.post(
        `${API_URL}/api/contractor/jobs/${jobId}/accept`,
        {
          estimatedArrival: '30 minutes',
          notes: 'On my way'
        },
        {
          headers: { Authorization: `Bearer ${contractorToken}` }
        }
      );
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.job).toBeTruthy();
    });
    
    test('Contractor can update job status', async () => {
      // Create and accept a job first
      const emergency = await axios.post(`${API_URL}/api/client/emergency`, {
        type: 'water_damage',
        location: 'Brisbane',
        customerPhone: '0400000003',
        customerName: 'TEST Update Status'
      });
      
      const jobId = emergency.data.emergencyId.replace('EMRG-', '');
      
      // Accept the job
      await axios.post(
        `${API_URL}/api/contractor/jobs/${jobId}/accept`,
        { estimatedArrival: '20 minutes' },
        { headers: { Authorization: `Bearer ${contractorToken}` } }
      );
      
      // Update status
      const response = await axios.put(
        `${API_URL}/api/contractor/jobs/${jobId}/status`,
        {
          status: 'in_progress',
          notes: 'Started work on site'
        },
        {
          headers: { Authorization: `Bearer ${contractorToken}` }
        }
      );
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.job.status).toBe('in_progress');
    });
    
    test('Contractor can view statistics', async () => {
      const response = await axios.get(`${API_URL}/api/contractor/stats`, {
        headers: { Authorization: `Bearer ${contractorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.stats).toBeTruthy();
      expect(response.data.stats).toHaveProperty('totalCompleted');
      expect(response.data.stats).toHaveProperty('activeJobs');
    });
  });
  
  describe('WebSocket Real-time Communication', () => {
    test('Client can connect to WebSocket', async () => {
      clientWs = await createWebSocketClient();
      expect(clientWs.readyState).toBe(WebSocket.OPEN);
      
      // Wait for connected message
      const connected = await waitForMessage(clientWs, 'connected');
      expect(connected.payload.clientId).toBeTruthy();
    });
    
    test('Client can register via WebSocket', async () => {
      if (!clientWs) {
        clientWs = await createWebSocketClient();
        await waitForMessage(clientWs, 'connected');
      }
      
      clientWs.send(JSON.stringify({
        type: 'register',
        payload: {
          type: 'client',
          metadata: {
            sessionId: 'test-ws-client',
            location: 'Brisbane'
          }
        }
      }));
      
      const registered = await waitForMessage(clientWs, 'registered');
      expect(registered.payload.type).toBe('client');
      expect(Array.isArray(registered.payload.channels)).toBe(true);
    });
    
    test('Contractor can connect and register', async () => {
      contractorWs = await createWebSocketClient();
      
      const connected = await waitForMessage(contractorWs, 'connected');
      expect(connected.payload.clientId).toBeTruthy();
      
      contractorWs.send(JSON.stringify({
        type: 'register',
        payload: {
          type: 'contractor',
          metadata: {
            businessName: 'Test Contractor',
            services: ['flooding', 'water_damage']
          }
        }
      }));
      
      const registered = await waitForMessage(contractorWs, 'registered');
      expect(registered.payload.type).toBe('contractor');
      expect(registered.payload.channels).toContain('contractors');
    });
    
    test('Emergency broadcast reaches contractors', async (done) => {
      if (!contractorWs) {
        contractorWs = await createWebSocketClient();
        await waitForMessage(contractorWs, 'connected');
        
        contractorWs.send(JSON.stringify({
          type: 'register',
          payload: {
            type: 'contractor',
            metadata: { businessName: 'Emergency Test Contractor' }
          }
        }));
        
        await waitForMessage(contractorWs, 'registered');
      }
      
      // Listen for emergency alert
      contractorWs.on('message', (data) => {
        const message = JSON.parse(data.toString());
        if (message.type === 'emergency_alert') {
          expect(message.payload).toBeTruthy();
          expect(message.payload.jobId).toMatch(/^EMRG-/);
          expect(message.payload.priority).toBe('HIGH');
          done();
        }
      });
      
      // Client reports emergency
      if (!clientWs) {
        clientWs = await createWebSocketClient();
        await waitForMessage(clientWs, 'connected');
      }
      
      clientWs.send(JSON.stringify({
        type: 'emergency',
        payload: {
          emergencyType: 'flooding',
          location: 'Brisbane',
          address: '456 TEST Avenue',
          description: 'TEST WebSocket emergency',
          customerName: 'TEST WS Client',
          customerPhone: '0400000004'
        }
      }));
    }, 10000);
  });
  
  describe('End-to-End Emergency Response Flow', () => {
    test('Complete emergency flow from report to completion', async () => {
      // 1. Client reports emergency
      const emergency = await axios.post(`${API_URL}/api/client/emergency`, {
        type: 'flooding',
        location: 'Brisbane',
        address: '789 E2E Test St',
        description: 'E2E test emergency',
        customerName: 'TEST E2E',
        customerPhone: '0400000005',
        severity: 'high'
      });
      
      expect(emergency.data.success).toBe(true);
      const emergencyId = emergency.data.emergencyId;
      const jobId = emergencyId.replace('EMRG-', '');
      
      // 2. Contractor views available jobs
      const jobs = await axios.get(`${API_URL}/api/contractor/jobs/available`, {
        headers: { Authorization: `Bearer ${contractorToken}` }
      });
      
      const jobFound = jobs.data.jobs.some(j => j.id === parseInt(jobId));
      expect(jobFound).toBe(true);
      
      // 3. Contractor accepts the job
      const accept = await axios.post(
        `${API_URL}/api/contractor/jobs/${jobId}/accept`,
        {
          estimatedArrival: '25 minutes',
          notes: 'E2E test acceptance'
        },
        {
          headers: { Authorization: `Bearer ${contractorToken}` }
        }
      );
      
      expect(accept.data.success).toBe(true);
      
      // 4. Client checks job status
      const status1 = await axios.get(`${API_URL}/api/client/status/${emergencyId}`);
      expect(status1.data.job.status).toBe('assigned');
      expect(status1.data.job.contractor).toBeTruthy();
      
      // 5. Contractor updates to in_progress
      await axios.put(
        `${API_URL}/api/contractor/jobs/${jobId}/status`,
        {
          status: 'in_progress',
          notes: 'Started work'
        },
        {
          headers: { Authorization: `Bearer ${contractorToken}` }
        }
      );
      
      // 6. Client checks updated status
      const status2 = await axios.get(`${API_URL}/api/client/status/${emergencyId}`);
      expect(status2.data.job.status).toBe('in_progress');
      
      // 7. Contractor completes the job
      const complete = await axios.put(
        `${API_URL}/api/contractor/jobs/${jobId}/status`,
        {
          status: 'completed',
          notes: 'Job completed successfully',
          photos: ['photo1.jpg', 'photo2.jpg']
        },
        {
          headers: { Authorization: `Bearer ${contractorToken}` }
        }
      );
      
      expect(complete.data.success).toBe(true);
      
      // 8. Client verifies completion
      const finalStatus = await axios.get(`${API_URL}/api/client/status/${emergencyId}`);
      expect(finalStatus.data.job.status).toBe('completed');
      expect(finalStatus.data.job.timeline.completed).toBeTruthy();
      
      // 9. Client submits feedback
      const feedback = await axios.post(`${API_URL}/api/client/feedback`, {
        jobId: emergencyId,
        rating: 5,
        comment: 'Excellent service'
      });
      
      expect(feedback.data.success).toBe(true);
    }, 30000);
  });
});

// Run tests if executed directly
if (require.main === module) {
  console.log('🧪 Running Bot System Integration Tests');
  console.log('Make sure servers are running:');
  console.log('  - API Server: npm run dev');
  console.log('  - WebSocket: npx tsx src/websocket-server.ts');
  console.log('');
  
  // Simple test runner
  const runTests = async () => {
    try {
      // Test API health
      console.log('Testing API health...');
      const health = await axios.get(`${API_URL}/health`);
      console.log('✅ API is healthy:', health.data);
      
      // Test client message
      console.log('\nTesting client message...');
      const message = await axios.post(`${API_URL}/api/client/message`, {
        message: 'Test message',
        sessionId: 'test-' + Date.now()
      });
      console.log('✅ Client message response:', message.data.response);
      
      // Test WebSocket
      console.log('\nTesting WebSocket connection...');
      const ws = await createWebSocketClient();
      console.log('✅ WebSocket connected');
      ws.close();
      
      console.log('\n✅ All basic tests passed!');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
    }
    
    process.exit(0);
  };
  
  runTests();
}