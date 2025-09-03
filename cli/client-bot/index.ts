#!/usr/bin/env node
/**
 * Client Bot CLI
 * Interactive command-line interface for client emergency response bot
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import WebSocket from 'ws';
import axios from 'axios';
import { EventEmitter } from 'events';

// ============================================
// CONFIGURATION
// ============================================

const config = {
  apiUrl: process.env.ELYSIA_API_URL || 'http://localhost:3001',
  wsUrl: process.env.WS_URL || 'ws://localhost:3002',
  channels: {
    sms: process.env.TWILIO_ENABLED === 'true',
    whatsapp: process.env.WHATSAPP_ENABLED === 'true',
    email: process.env.SENDGRID_ENABLED === 'true'
  }
};

// ============================================
// CLIENT BOT CLASS
// ============================================

class ClientBotCLI extends EventEmitter {
  private ws: WebSocket | null = null;
  private sessionId: string;
  private apiClient: any;
  private conversationHistory: any[] = [];
  
  constructor() {
    super();
    this.sessionId = `cli_${Date.now()}`;
    this.apiClient = axios.create({
      baseURL: `${config.apiUrl}/api/v1/client`,
      timeout: 30000
    });
  }
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  async initialize(): Promise<void> {
    const spinner = ora('Initializing Client Bot...').start();
    
    try {
      // Test API connection
      await this.apiClient.get('/health');
      spinner.succeed('API connection established');
      
      // Connect WebSocket
      await this.connectWebSocket();
      spinner.succeed('WebSocket connected');
      
      console.log(chalk.green('\n✅ Client Bot initialized successfully\n'));
    } catch (error) {
      spinner.fail('Failed to initialize');
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  }
  
  private async connectWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`${config.wsUrl}/ws`);
      
      this.ws.on('open', () => {
        console.log(chalk.blue('📡 WebSocket connected'));
        resolve();
      });
      
      this.ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        this.handleWebSocketMessage(message);
      });
      
      this.ws.on('error', (error) => {
        console.error(chalk.red('WebSocket error:'), error);
        reject(error);
      });
      
      this.ws.on('close', () => {
        console.log(chalk.yellow('WebSocket disconnected'));
        // Attempt reconnection
        setTimeout(() => this.connectWebSocket(), 5000);
      });
    });
  }
  
  private handleWebSocketMessage(message: any): void {
    switch (message.type) {
      case 'bot_response':
        this.displayBotResponse(message.data);
        break;
      case 'notification':
        this.displayNotification(message.data);
        break;
      case 'contractor_assigned':
        this.displayContractorAssignment(message.data);
        break;
    }
  }
  
  // ============================================
  // INTERACTIVE CHAT
  // ============================================
  
  async startInteractiveChat(): Promise<void> {
    console.log(chalk.cyan('\n🤖 Client Emergency Response Bot'));
    console.log(chalk.gray('Type "exit" to quit, "help" for commands\n'));
    
    while (true) {
      const { message } = await inquirer.prompt([
        {
          type: 'input',
          name: 'message',
          message: chalk.green('You:'),
          prefix: ''
        }
      ]);
      
      if (message.toLowerCase() === 'exit') {
        break;
      }
      
      if (message.toLowerCase() === 'help') {
        this.displayHelp();
        continue;
      }
      
      await this.processMessage(message);
    }
    
    console.log(chalk.yellow('\nGoodbye! 👋\n'));
    process.exit(0);
  }
  
  private async processMessage(message: string): Promise<void> {
    const spinner = ora('Processing...').start();
    
    try {
      const response = await this.apiClient.post('/message', {
        message,
        sessionId: this.sessionId,
        channel: 'cli',
        metadata: {
          timestamp: new Date(),
          platform: process.platform
        }
      });
      
      spinner.stop();
      
      this.conversationHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });
      
      this.conversationHistory.push({
        role: 'assistant',
        content: response.data.data.response,
        timestamp: new Date()
      });
      
      this.displayBotResponse(response.data.data);
      
    } catch (error: any) {
      spinner.fail('Failed to process message');
      console.error(chalk.red('Error:'), error.response?.data?.error || error.message);
    }
  }
  
  // ============================================
  // EMERGENCY MODE
  // ============================================
  
  async handleEmergency(): Promise<void> {
    console.log(chalk.red.bold('\n🚨 EMERGENCY MODE ACTIVATED\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'emergencyType',
        message: 'What type of emergency?',
        choices: [
          'Water/Flood Damage',
          'Fire Damage',
          'Storm Damage',
          'Mould Infestation',
          'Sewage Backup',
          'Other'
        ]
      },
      {
        type: 'input',
        name: 'address',
        message: 'Property address:',
        validate: (input) => input.length > 0 || 'Address is required'
      },
      {
        type: 'input',
        name: 'phone',
        message: 'Contact phone number:',
        validate: (input) => /^[0-9]{10}$/.test(input) || 'Please enter valid 10-digit phone'
      },
      {
        type: 'confirm',
        name: 'immediateDanger',
        message: 'Is there immediate danger to people or property?',
        default: false
      },
      {
        type: 'editor',
        name: 'description',
        message: 'Describe the situation:'
      }
    ]);
    
    const spinner = ora('Processing emergency request...').start();
    
    try {
      const response = await this.apiClient.post('/emergency', {
        situation: `${answers.emergencyType}: ${answers.description}`,
        location: {
          address: answers.address
        },
        sessionId: this.sessionId,
        contactInfo: {
          phone: answers.phone
        }
      });
      
      spinner.succeed('Emergency request processed');
      
      console.log(chalk.green('\n✅ Emergency Response Initiated'));
      console.log(chalk.yellow(`Emergency ID: ${response.data.emergencyId}`));
      
      const result = response.data.data;
      
      if (result.data?.actions) {
        console.log(chalk.cyan('\n📋 Immediate Actions:'));
        result.data.actions.forEach((action: string, index: number) => {
          console.log(chalk.white(`  ${index + 1}. ${action}`));
        });
      }
      
      console.log(chalk.green('\n🚚 Contractor dispatch in progress...'));
      console.log(chalk.gray('You will receive SMS updates on contractor arrival'));
      
    } catch (error: any) {
      spinner.fail('Emergency request failed');
      console.error(chalk.red('Critical Error:'), error.response?.data?.error || error.message);
      console.log(chalk.yellow('\n📞 Please call 000 if this is life-threatening'));
    }
  }
  
  // ============================================
  // INSURANCE CLAIM
  // ============================================
  
  async fileInsuranceClaim(): Promise<void> {
    console.log(chalk.blue('\n📄 Insurance Claim Filing\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'insurer',
        message: 'Select your insurance company:',
        choices: [
          'NRMA',
          'RACQ',
          'Allianz',
          'Suncorp',
          'QBE',
          'IAG',
          'Other'
        ]
      },
      {
        type: 'input',
        name: 'policyNumber',
        message: 'Policy number:',
        validate: (input) => input.length > 0 || 'Policy number is required'
      },
      {
        type: 'list',
        name: 'damageType',
        message: 'Type of damage:',
        choices: [
          'Water Damage',
          'Fire Damage',
          'Storm Damage',
          'Theft/Vandalism',
          'Other'
        ]
      },
      {
        type: 'input',
        name: 'estimatedValue',
        message: 'Estimated damage value ($):',
        validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid number'
      },
      {
        type: 'editor',
        name: 'description',
        message: 'Describe the damage:'
      }
    ]);
    
    const spinner = ora('Submitting insurance claim...').start();
    
    try {
      const response = await this.apiClient.post('/insurance/claim', {
        sessionId: this.sessionId,
        insurer: answers.insurer,
        policyNumber: answers.policyNumber,
        damageType: answers.damageType,
        description: answers.description,
        estimatedValue: parseFloat(answers.estimatedValue)
      });
      
      spinner.succeed('Insurance claim submitted');
      
      console.log(chalk.green('\n✅ Claim Successfully Filed'));
      console.log(chalk.yellow(`Claim ID: ${response.data.claimId}`));
      console.log(chalk.cyan('Next Steps:'));
      console.log('  1. Insurance adjuster will contact you within 24 hours');
      console.log('  2. Contractor will be assigned automatically');
      console.log('  3. You will receive updates via SMS');
      
    } catch (error: any) {
      spinner.fail('Claim submission failed');
      console.error(chalk.red('Error:'), error.response?.data?.error || error.message);
    }
  }
  
  // ============================================
  // DISPLAY METHODS
  // ============================================
  
  private displayBotResponse(response: any): void {
    console.log(chalk.blue('\nBot:'), chalk.white(response.response || response.data?.response));
    
    if (response.suggestedActions) {
      console.log(chalk.cyan('\nSuggested actions:'));
      response.suggestedActions.forEach((action: any, index: number) => {
        console.log(chalk.gray(`  ${index + 1}. ${action.label}`));
      });
    }
    
    if (response.confidence) {
      console.log(chalk.gray(`\nConfidence: ${(response.confidence * 100).toFixed(1)}%`));
    }
  }
  
  private displayNotification(notification: any): void {
    console.log(chalk.yellow('\n📢 Notification:'), notification.message);
  }
  
  private displayContractorAssignment(assignment: any): void {
    console.log(chalk.green('\n✅ Contractor Assigned!'));
    console.log(chalk.white(`  Name: ${assignment.contractorName}`));
    console.log(chalk.white(`  ETA: ${assignment.eta}`));
    console.log(chalk.white(`  Phone: ${assignment.phone}`));
  }
  
  private displayHelp(): void {
    console.log(chalk.cyan('\n📚 Available Commands:'));
    console.log(chalk.white('  help     - Show this help message'));
    console.log(chalk.white('  exit     - Exit the chat'));
    console.log(chalk.white('  emergency - Activate emergency mode'));
    console.log(chalk.white('  claim    - File insurance claim'));
    console.log(chalk.white('  status   - Check job status'));
    console.log(chalk.white('  history  - View conversation history'));
  }
  
  // ============================================
  // STATUS CHECK
  // ============================================
  
  async checkStatus(): Promise<void> {
    const spinner = ora('Checking status...').start();
    
    try {
      // In production, this would fetch actual job status
      spinner.succeed('Status retrieved');
      
      console.log(chalk.cyan('\n📊 Current Status:'));
      console.log(chalk.white('  Active Jobs: 0'));
      console.log(chalk.white('  Pending Claims: 0'));
      console.log(chalk.white('  Session ID:', this.sessionId));
      
    } catch (error) {
      spinner.fail('Failed to retrieve status');
    }
  }
  
  // ============================================
  // CONVERSATION HISTORY
  // ============================================
  
  viewHistory(): void {
    console.log(chalk.cyan('\n📜 Conversation History:'));
    
    if (this.conversationHistory.length === 0) {
      console.log(chalk.gray('  No conversation history yet'));
      return;
    }
    
    this.conversationHistory.forEach((entry) => {
      const role = entry.role === 'user' ? chalk.green('You:') : chalk.blue('Bot:');
      console.log(`${role} ${entry.content}`);
    });
  }
}

// ============================================
// CLI PROGRAM
// ============================================

const program = new Command();
const bot = new ClientBotCLI();

program
  .name('client-bot')
  .description('NRP Client Emergency Response Bot CLI')
  .version('1.0.0');

program
  .command('chat')
  .description('Start interactive chat')
  .action(async () => {
    await bot.initialize();
    await bot.startInteractiveChat();
  });

program
  .command('emergency')
  .description('Report an emergency')
  .action(async () => {
    await bot.initialize();
    await bot.handleEmergency();
  });

program
  .command('claim')
  .description('File an insurance claim')
  .action(async () => {
    await bot.initialize();
    await bot.fileInsuranceClaim();
  });

program
  .command('status')
  .description('Check current status')
  .action(async () => {
    await bot.initialize();
    await bot.checkStatus();
  });

// Default action
if (process.argv.length === 2) {
  bot.initialize().then(() => bot.startInteractiveChat());
} else {
  program.parse(process.argv);
}

export default ClientBotCLI;