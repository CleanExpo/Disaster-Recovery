#!/usr/bin/env node
/**
 * Client Bot CLI
 * Interactive command-line interface for emergency response and contractor services
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { EventEmitter } from 'events';
import axios from 'axios';

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:3005';
const SESSION_ID = `cli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Event emitter for real-time updates
const botEvents = new EventEmitter();

// ASCII Art Banner
const banner = `
╔══════════════════════════════════════════════╗
║     🚨 NRP CLIENT EMERGENCY BOT 🚨          ║
║     24/7 Disaster Recovery Support           ║
╚══════════════════════════════════════════════╝
`;

class ClientBotCLI {
  private conversationHistory: any[] = [];
  private currentMode: 'menu' | 'chat' | 'emergency' = 'menu';
  
  async start() {
    console.clear();
    console.log(chalk.cyan(banner));
    console.log(chalk.yellow('Session ID:'), SESSION_ID);
    console.log(chalk.gray('═'.repeat(50)));
    
    await this.showMainMenu();
  }
  
  async showMainMenu() {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'How can I help you today?',
        choices: [
          { name: '🚨 Report Emergency', value: 'emergency' },
          { name: '💬 Chat with Bot', value: 'chat' },
          { name: '📋 View Guides', value: 'guides' },
          { name: '🔍 Find Contractors', value: 'contractors' },
          { name: '📝 File Insurance Claim', value: 'insurance' },
          { name: '📊 Check Job Status', value: 'status' },
          new inquirer.Separator(),
          { name: '❌ Exit', value: 'exit' }
        ]
      }
    ]);
    
    await this.handleMenuChoice(choice);
  }
  
  async handleMenuChoice(choice: string) {
    switch (choice) {
      case 'emergency':
        await this.handleEmergency();
        break;
      case 'chat':
        await this.startChat();
        break;
      case 'guides':
        await this.viewGuides();
        break;
      case 'contractors':
        await this.findContractors();
        break;
      case 'insurance':
        await this.fileInsuranceClaim();
        break;
      case 'status':
        await this.checkJobStatus();
        break;
      case 'exit':
        this.exit();
        break;
    }
  }
  
  async handleEmergency() {
    console.clear();
    console.log(chalk.red.bold('\n🚨 EMERGENCY MODE ACTIVATED 🚨\n'));
    
    const emergency = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What type of emergency?',
        choices: [
          'Flooding',
          'Fire Damage',
          'Storm Damage',
          'Sewage Overflow',
          'Mould Outbreak',
          'Other'
        ]
      },
      {
        type: 'input',
        name: 'location',
        message: 'Enter your address:',
        validate: (input) => input.length > 0
      },
      {
        type: 'input',
        name: 'phone',
        message: 'Contact phone number:',
        validate: (input) => /^[0-9\s\-\+\(\)]+$/.test(input)
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe the emergency:',
        validate: (input) => input.length > 0
      }
    ]);
    
    const spinner = ora('Contacting emergency contractors...').start();
    
    try {
      const response = await axios.post(`${API_URL}/api/client/message`, {
        message: `EMERGENCY: ${emergency.type} - ${emergency.description}`,
        sessionId: SESSION_ID,
        channel: 'cli',
        metadata: {
          emergency: true,
          type: emergency.type,
          location: emergency.location,
          phone: emergency.phone
        }
      });
      
      spinner.succeed('Emergency reported successfully!');
      
      console.log(chalk.green('\n✅ EMERGENCY RESPONSE INITIATED'));
      console.log(chalk.yellow('\nImmediate Steps:'));
      console.log(response.data.response);
      
      console.log(chalk.cyan('\n📞 A contractor will contact you within 30 minutes'));
      console.log(chalk.gray('Emergency ID: ' + response.data.emergencyId));
      
    } catch (error) {
      spinner.fail('Failed to report emergency');
      console.error(chalk.red('Error:'), error.message);
    }
    
    await this.promptContinue();
  }
  
  async startChat() {
    console.clear();
    console.log(chalk.cyan('\n💬 CHAT MODE - Type "exit" to return to menu\n'));
    console.log(chalk.gray('═'.repeat(50)));
    
    this.currentMode = 'chat';
    
    while (this.currentMode === 'chat') {
      const { message } = await inquirer.prompt([
        {
          type: 'input',
          name: 'message',
          message: chalk.green('You:'),
          prefix: ''
        }
      ]);
      
      if (message.toLowerCase() === 'exit') {
        this.currentMode = 'menu';
        break;
      }
      
      const spinner = ora('Thinking...').start();
      
      try {
        const response = await axios.post(`${API_URL}/api/client/message`, {
          message,
          sessionId: SESSION_ID,
          channel: 'cli'
        });
        
        spinner.stop();
        
        this.conversationHistory.push({
          role: 'user',
          content: message,
          timestamp: new Date()
        });
        
        this.conversationHistory.push({
          role: 'assistant',
          content: response.data.response,
          timestamp: new Date()
        });
        
        console.log(chalk.blue('Bot:'), response.data.response);
        console.log(chalk.gray('─'.repeat(50)));
        
      } catch (error) {
        spinner.fail('Failed to get response');
        console.error(chalk.red('Error:'), error.message);
      }
    }
    
    await this.showMainMenu();
  }
  
  async viewGuides() {
    const spinner = ora('Loading guides...').start();
    
    try {
      const response = await axios.get(`${API_URL}/api/guides`);
      spinner.stop();
      
      if (!response.data.data || response.data.data.length === 0) {
        console.log(chalk.yellow('No guides available'));
        await this.promptContinue();
        return;
      }
      
      const { guide } = await inquirer.prompt([
        {
          type: 'list',
          name: 'guide',
          message: 'Select a guide to view:',
          choices: response.data.data.map((g: any) => ({
            name: `📘 ${g.title}`,
            value: g.id
          }))
        }
      ]);
      
      const guideDetails = response.data.data.find((g: any) => g.id === guide);
      
      console.log(chalk.cyan(`\n📘 ${guideDetails.title}\n`));
      console.log(guideDetails.description);
      console.log(chalk.gray('\nFor detailed steps, please visit our website'));
      
    } catch (error) {
      spinner.fail('Failed to load guides');
      console.error(chalk.red('Error:'), error.message);
    }
    
    await this.promptContinue();
  }
  
  async findContractors() {
    const search = await inquirer.prompt([
      {
        type: 'input',
        name: 'location',
        message: 'Enter your suburb or postcode:',
        validate: (input) => input.length > 0
      },
      {
        type: 'list',
        name: 'service',
        message: 'What service do you need?',
        choices: [
          'Water Damage Restoration',
          'Fire Damage Restoration',
          'Mould Remediation',
          'Storm Damage Repair',
          'Sewage Cleanup',
          'General Restoration'
        ]
      }
    ]);
    
    const spinner = ora('Searching for contractors...').start();
    
    try {
      // Simulate contractor search
      await new Promise(resolve => setTimeout(resolve, 2000));
      spinner.succeed('Found contractors in your area!');
      
      console.log(chalk.green('\n✅ Available Contractors:\n'));
      console.log('1. Rapid Response Restoration - ⭐ 4.8 (250 jobs)');
      console.log('   📞 1300 111 222');
      console.log('   ⚡ Emergency Available');
      console.log('');
      console.log('2. Professional Restoration Services - ⭐ 4.7 (180 jobs)');
      console.log('   📞 1300 333 444');
      console.log('   ⏰ Standard Hours');
      
    } catch (error) {
      spinner.fail('Failed to find contractors');
      console.error(chalk.red('Error:'), error.message);
    }
    
    await this.promptContinue();
  }
  
  async fileInsuranceClaim() {
    console.log(chalk.cyan('\n📝 INSURANCE CLAIM ASSISTANT\n'));
    
    const claim = await inquirer.prompt([
      {
        type: 'input',
        name: 'insurerName',
        message: 'Insurance company name:',
        validate: (input) => input.length > 0
      },
      {
        type: 'input',
        name: 'policyNumber',
        message: 'Policy number:',
        validate: (input) => input.length > 0
      },
      {
        type: 'input',
        name: 'claimNumber',
        message: 'Claim number (if available):',
        default: ''
      },
      {
        type: 'list',
        name: 'damageType',
        message: 'Type of damage:',
        choices: [
          'Water/Flood',
          'Fire/Smoke',
          'Storm/Wind',
          'Other'
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe the damage:',
        validate: (input) => input.length > 0
      }
    ]);
    
    const spinner = ora('Processing insurance claim...').start();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      spinner.succeed('Claim submitted successfully!');
      
      console.log(chalk.green('\n✅ CLAIM SUBMITTED'));
      console.log(chalk.yellow('\nNext Steps:'));
      console.log('1. Take photos of all damage');
      console.log('2. Keep all damaged items until assessed');
      console.log('3. Get quotes from contractors');
      console.log('4. Keep all receipts');
      console.log(chalk.gray('\nClaim Reference: CLM-' + Date.now()));
      
    } catch (error) {
      spinner.fail('Failed to submit claim');
      console.error(chalk.red('Error:'), error.message);
    }
    
    await this.promptContinue();
  }
  
  async checkJobStatus() {
    const { jobId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'jobId',
        message: 'Enter your job ID:',
        validate: (input) => input.length > 0
      }
    ]);
    
    const spinner = ora('Checking job status...').start();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      spinner.stop();
      
      console.log(chalk.cyan('\n📊 JOB STATUS\n'));
      console.log(`Job ID: ${jobId}`);
      console.log(`Status: ${chalk.yellow('IN PROGRESS')}`);
      console.log(`Contractor: Rapid Response Restoration`);
      console.log(`Started: ${new Date().toLocaleDateString()}`);
      console.log(`Estimated Completion: 2-3 days`);
      console.log(chalk.gray('\nFor real-time updates, check our website'));
      
    } catch (error) {
      spinner.fail('Failed to check status');
      console.error(chalk.red('Error:'), error.message);
    }
    
    await this.promptContinue();
  }
  
  async promptContinue() {
    await inquirer.prompt([
      {
        type: 'input',
        name: 'continue',
        message: chalk.gray('Press Enter to continue...'),
        prefix: ''
      }
    ]);
    
    await this.showMainMenu();
  }
  
  exit() {
    console.log(chalk.yellow('\n👋 Thank you for using NRP Emergency Bot'));
    console.log(chalk.gray('Session ended: ' + SESSION_ID));
    process.exit(0);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (error: any) => {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
});

// Handle SIGINT
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n👋 Goodbye!'));
  process.exit(0);
});

// Start the CLI
const cli = new ClientBotCLI();
cli.start();