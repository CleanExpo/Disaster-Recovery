#!/usr/bin/env node

/**
 * Claude Orchestrator Client
 * Submit tasks to the Claude multi-agent system
 */

const http = require('http');
const readline = require('readline');

class ClaudeClient {
  constructor(host = 'localhost', port = 3000) {
    this.host = host;
    this.port = port;
    this.baseUrl = `http://${host}:${port}`;
  }

  async submitTask(type, input, context = {}, priority = 5) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        type,
        input,
        context,
        priority
      });

      const options = {
        hostname: this.host,
        port: this.port,
        path: '/task',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  async getTaskStatus(taskId) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.host,
        port: this.port,
        path: `/task/${taskId}`,
        method: 'GET'
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  async getHealth() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.host,
        port: this.port,
        path: '/health',
        method: 'GET'
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }
}

// Example tasks for Disaster Recovery project
const exampleTasks = [
  {
    type: 'generate',
    input: 'Create SEO-optimized landing page for water damage restoration in Brisbane',
    context: { 
      project: 'Disaster Recovery',
      location: 'Brisbane',
      service: 'water-damage'
    }
  },
  {
    type: 'test',
    input: 'Test the contractor onboarding flow with Playwright',
    context: {
      testType: 'e2e',
      critical: true
    }
  },
  {
    type: 'optimize',
    input: 'Analyze and optimize SEO for disaster recovery services pages',
    context: {
      targetKeywords: ['disaster recovery', 'water damage', 'fire restoration'],
      locations: ['Brisbane', 'Gold Coast', 'Sydney']
    }
  },
  {
    type: 'deploy',
    input: 'Deploy latest changes to Vercel production',
    context: {
      environment: 'production',
      platform: 'vercel'
    }
  }
];

// Interactive CLI
async function interactiveCLI() {
  const client = new ClaudeClient();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n🤖 Claude Orchestrator Client');
  console.log('================================\n');

  // Check health
  try {
    const health = await client.getHealth();
    console.log(`✅ Connected to orchestrator`);
    console.log(`📊 Active agents: ${health.agents.length}`);
    console.log(`📋 Active tasks: ${health.activeTasks}\n`);
  } catch (error) {
    console.error('❌ Failed to connect to orchestrator:', error.message);
    process.exit(1);
  }

  console.log('Available task types:');
  console.log('  1. generate - Generate code or content');
  console.log('  2. test - Run tests');
  console.log('  3. optimize - Optimize code or SEO');
  console.log('  4. deploy - Deploy to production');
  console.log('  5. analyze - Analyze code or performance\n');

  const askQuestion = (question) => {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  };

  while (true) {
    console.log('\n--- New Task ---');
    const taskType = await askQuestion('Task type (or "exit" to quit): ');
    
    if (taskType === 'exit') {
      console.log('\nGoodbye! 👋');
      rl.close();
      break;
    }

    const input = await askQuestion('Task description: ');
    const priorityStr = await askQuestion('Priority (1-10, default 5): ');
    const priority = parseInt(priorityStr) || 5;

    try {
      console.log('\n🚀 Submitting task...');
      const result = await client.submitTask(taskType, input, {}, priority);
      console.log(`✅ Task submitted: ${result.taskId}`);
      
      // Poll for status
      let status = 'pending';
      let attempts = 0;
      while (status !== 'completed' && status !== 'failed' && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const task = await client.getTaskStatus(result.taskId);
        
        if (task.status !== status) {
          status = task.status;
          console.log(`📊 Status: ${status}`);
          
          if (status === 'completed') {
            console.log('\n✅ Task completed!');
            console.log('Result:', JSON.stringify(task.result, null, 2));
          } else if (status === 'failed') {
            console.log('\n❌ Task failed!');
            console.log('Error:', task.error);
          }
        }
        attempts++;
      }
      
      if (attempts >= 30) {
        console.log('\n⏱️ Task timed out');
      }
      
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Command line mode
    const client = new ClaudeClient();
    const [type, ...inputParts] = args;
    const input = inputParts.join(' ');
    
    client.submitTask(type, input)
      .then(result => {
        console.log('Task submitted:', result.taskId);
        return client.getTaskStatus(result.taskId);
      })
      .then(status => {
        console.log('Status:', status);
      })
      .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
      });
  } else {
    // Interactive mode
    interactiveCLI().catch(console.error);
  }
}

module.exports = ClaudeClient;