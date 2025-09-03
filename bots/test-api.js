/**
 * Simple API Test Script
 * Tests the bot system endpoints
 */

const http = require('http');

// Test endpoints
const endpoints = [
  { path: '/', method: 'GET' },
  { path: '/health', method: 'GET' },
  { path: '/api/guides', method: 'GET' },
  { path: '/api/contractors', method: 'GET' },
  { path: '/api/emergency-guides', method: 'GET' },
  { path: '/api/client/message', method: 'POST', body: JSON.stringify({
    message: "I have a flood emergency",
    sessionId: "test-123",
    channel: "web"
  })}
];

function testEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3005,
      path: endpoint.path,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`\n✅ ${endpoint.method} ${endpoint.path} - Status: ${res.statusCode}`);
        try {
          const json = JSON.parse(data);
          console.log('Response:', JSON.stringify(json, null, 2));
          resolve(json);
        } catch (e) {
          console.log('Response:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`\n❌ ${endpoint.method} ${endpoint.path} - Error:`, error.message);
      reject(error);
    });

    if (endpoint.body) {
      req.write(endpoint.body);
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Bot System API...\n');
  console.log('================================');
  
  for (const endpoint of endpoints) {
    try {
      await testEndpoint(endpoint);
    } catch (error) {
      // Continue with next test
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n================================');
  console.log('✨ Testing complete!');
}

// First check if server is running
const checkReq = http.get('http://localhost:3005/health', (res) => {
  console.log('🚀 Server is running!\n');
  runTests();
}).on('error', () => {
  console.log('⚠️  Server is not running. Please start it first with:');
  console.log('    npm run dev');
  console.log('    or');
  console.log('    npx tsx src/server-express.ts');
  process.exit(1);
});