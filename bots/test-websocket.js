/**
 * WebSocket Test Client
 * Tests real-time communication features
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3002';

console.log('🔌 WebSocket Test Client\n');
console.log('Connecting to:', WS_URL);

// Create WebSocket connection
const ws = new WebSocket(WS_URL);

// Connection opened
ws.on('open', () => {
  console.log('✅ Connected to WebSocket server\n');
  
  // Register as a client
  setTimeout(() => {
    console.log('📝 Registering as client...');
    ws.send(JSON.stringify({
      type: 'register',
      payload: {
        type: 'client',
        metadata: {
          sessionId: 'test-client-123',
          location: 'Brisbane'
        }
      }
    }));
  }, 500);
  
  // Subscribe to channels
  setTimeout(() => {
    console.log('📢 Subscribing to channels...');
    ws.send(JSON.stringify({
      type: 'subscribe',
      payload: {
        channel: 'emergency-updates'
      }
    }));
  }, 1500);
  
  // Send an emergency after 3 seconds
  setTimeout(() => {
    console.log('\n🚨 Sending emergency request...');
    ws.send(JSON.stringify({
      type: 'emergency',
      payload: {
        emergencyType: 'flooding',
        location: 'Brisbane CBD',
        address: '123 Test Street',
        description: 'Basement flooding from burst pipe',
        customerName: 'Test User',
        customerPhone: '0400 000 000'
      }
    }));
  }, 3000);
  
  // Send ping every 10 seconds
  setInterval(() => {
    ws.send(JSON.stringify({ type: 'ping' }));
  }, 10000);
});

// Listen for messages
ws.on('message', (data) => {
  const message = JSON.parse(data);
  
  switch (message.type) {
    case 'connected':
      console.log('🎉 Server welcome:', message.payload);
      break;
      
    case 'registered':
      console.log('✅ Registered successfully:', message.payload);
      break;
      
    case 'subscribed':
      console.log('📢 Subscribed to:', message.payload.channel);
      break;
      
    case 'emergency_received':
      console.log('🚨 Emergency confirmed:', message.payload);
      break;
      
    case 'contractor_assigned':
      console.log('🔧 Contractor assigned:', message.payload);
      break;
      
    case 'job_status_update':
      console.log('📊 Status update:', message.payload);
      break;
      
    case 'pong':
      // Silent pong response
      break;
      
    default:
      console.log('📨 Message:', message);
  }
});

// Connection closed
ws.on('close', () => {
  console.log('\n❌ Disconnected from server');
  process.exit(0);
});

// Error handling
ws.on('error', (error) => {
  console.error('❌ WebSocket error:', error.message);
});

// Handle SIGINT
process.on('SIGINT', () => {
  console.log('\n\n👋 Closing connection...');
  ws.close();
  process.exit(0);
});

console.log('\nPress Ctrl+C to exit\n');