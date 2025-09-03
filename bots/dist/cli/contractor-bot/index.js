#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const ora_1 = __importDefault(require("ora"));
const events_1 = require("events");
const API_URL = process.env.API_URL || 'http://localhost:3005';
const contractorEvents = new events_1.EventEmitter();
const banner = `
╔══════════════════════════════════════════════╗
║     🔧 NRP CONTRACTOR PORTAL 🔧              ║
║     Job Management & Dispatch System         ║
╚══════════════════════════════════════════════╝
`;
class ContractorBotCLI {
    session = null;
    jobQueue = [];
    activeJobs = [];
    async start() {
        console.clear();
        console.log(chalk_1.default.blue(banner));
        console.log(chalk_1.default.gray('═'.repeat(50)));
        await this.login();
    }
    async login() {
        console.log(chalk_1.default.cyan('\n🔐 CONTRACTOR LOGIN\n'));
        const credentials = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Email:',
                default: 'contact@rapidresponse.com.au',
                validate: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password:',
                mask: '*',
                default: 'demo123'
            }
        ]);
        const spinner = (0, ora_1.default)('Logging in...').start();
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            this.session = {
                id: 'contractor_' + Date.now(),
                businessName: 'Rapid Response Restoration',
                email: credentials.email
            };
            spinner.succeed('Login successful!');
            console.log(chalk_1.default.green(`\nWelcome, ${this.session.businessName}!`));
            await this.showDashboard();
        }
        catch (error) {
            spinner.fail('Login failed');
            console.error(chalk_1.default.red('Error:'), error.message);
            await this.login();
        }
    }
    async showDashboard() {
        console.clear();
        console.log(chalk_1.default.blue(`\n📊 CONTRACTOR DASHBOARD - ${this.session?.businessName}\n`));
        console.log(chalk_1.default.cyan('Today\'s Stats:'));
        console.log(`  Active Jobs: ${chalk_1.default.yellow('3')}`);
        console.log(`  Pending Jobs: ${chalk_1.default.yellow('5')}`);
        console.log(`  Completed Today: ${chalk_1.default.green('2')}`);
        console.log(`  Emergency Available: ${chalk_1.default.red('YES')}`);
        console.log(chalk_1.default.gray('─'.repeat(50)));
        await this.showMainMenu();
    }
    async showMainMenu() {
        const { choice } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    { name: '🆕 View New Jobs', value: 'new_jobs' },
                    { name: '📋 My Active Jobs', value: 'active_jobs' },
                    { name: '✅ Update Job Status', value: 'update_status' },
                    { name: '🕐 Update Availability', value: 'availability' },
                    { name: '📊 View Performance', value: 'performance' },
                    { name: '📝 Service Procedures', value: 'procedures' },
                    { name: '🔔 Emergency Mode', value: 'emergency_mode' },
                    new inquirer_1.default.Separator(),
                    { name: '🔄 Refresh', value: 'refresh' },
                    { name: '❌ Logout', value: 'logout' }
                ]
            }
        ]);
        await this.handleMenuChoice(choice);
    }
    async handleMenuChoice(choice) {
        switch (choice) {
            case 'new_jobs':
                await this.viewNewJobs();
                break;
            case 'active_jobs':
                await this.viewActiveJobs();
                break;
            case 'update_status':
                await this.updateJobStatus();
                break;
            case 'availability':
                await this.updateAvailability();
                break;
            case 'performance':
                await this.viewPerformance();
                break;
            case 'procedures':
                await this.viewProcedures();
                break;
            case 'emergency_mode':
                await this.toggleEmergencyMode();
                break;
            case 'refresh':
                await this.showDashboard();
                break;
            case 'logout':
                this.logout();
                break;
        }
    }
    async viewNewJobs() {
        const spinner = (0, ora_1.default)('Loading available jobs...').start();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            spinner.stop();
            const jobs = [
                {
                    id: 'JOB-001',
                    type: '🌊 Water Damage',
                    location: 'Brisbane CBD',
                    urgency: '🚨 EMERGENCY',
                    distance: '5km',
                    value: '$3,500'
                },
                {
                    id: 'JOB-002',
                    type: '🔥 Fire Damage',
                    location: 'South Brisbane',
                    urgency: '⚡ Urgent',
                    distance: '8km',
                    value: '$5,200'
                },
                {
                    id: 'JOB-003',
                    type: '🦠 Mould Remediation',
                    location: 'West End',
                    urgency: '📅 Standard',
                    distance: '3km',
                    value: '$2,100'
                }
            ];
            console.log(chalk_1.default.cyan('\n🆕 AVAILABLE JOBS\n'));
            jobs.forEach(job => {
                console.log(chalk_1.default.yellow(`${job.id} - ${job.urgency}`));
                console.log(`  Type: ${job.type}`);
                console.log(`  Location: ${job.location} (${job.distance})`);
                console.log(`  Value: ${chalk_1.default.green(job.value)}`);
                console.log(chalk_1.default.gray('─'.repeat(40)));
            });
            const { action } = await inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Select action:',
                    choices: [
                        { name: 'Accept Job', value: 'accept' },
                        { name: 'View Details', value: 'details' },
                        { name: 'Back to Menu', value: 'back' }
                    ]
                }
            ]);
            if (action === 'accept') {
                await this.acceptJob();
            }
            else if (action === 'details') {
                await this.viewJobDetails();
            }
        }
        catch (error) {
            spinner.fail('Failed to load jobs');
            console.error(chalk_1.default.red('Error:'), error.message);
        }
        await this.showMainMenu();
    }
    async acceptJob() {
        const { jobId } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'jobId',
                message: 'Enter Job ID to accept:',
                validate: (input) => input.length > 0
            }
        ]);
        const spinner = (0, ora_1.default)('Accepting job...').start();
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            spinner.succeed(`Job ${jobId} accepted!`);
            console.log(chalk_1.default.green('\n✅ JOB ACCEPTED'));
            console.log(chalk_1.default.yellow('Customer will be notified'));
            console.log(chalk_1.default.cyan('Estimated arrival: 30-45 minutes'));
            console.log(chalk_1.default.bgRed.white('\n🔔 NEW EMERGENCY JOB ALERT!'));
        }
        catch (error) {
            spinner.fail('Failed to accept job');
            console.error(chalk_1.default.red('Error:'), error.message);
        }
        await this.promptContinue();
    }
    async viewActiveJobs() {
        console.log(chalk_1.default.cyan('\n📋 MY ACTIVE JOBS\n'));
        const activeJobs = [
            {
                id: 'JOB-101',
                customer: 'John Smith',
                type: 'Water Damage',
                status: '🔧 In Progress',
                started: '2 hours ago',
                progress: '60%'
            },
            {
                id: 'JOB-099',
                customer: 'Mary Johnson',
                type: 'Mould Remediation',
                status: '🚗 En Route',
                started: '30 minutes ago',
                progress: '10%'
            },
            {
                id: 'JOB-095',
                customer: 'ABC Company',
                type: 'Fire Damage Assessment',
                status: '📝 Assessment',
                started: 'Today 9:00 AM',
                progress: '80%'
            }
        ];
        activeJobs.forEach(job => {
            console.log(chalk_1.default.yellow(job.id) + ' - ' + job.status);
            console.log(`  Customer: ${job.customer}`);
            console.log(`  Type: ${job.type}`);
            console.log(`  Progress: ${chalk_1.default.green(job.progress)}`);
            console.log(`  Started: ${job.started}`);
            console.log(chalk_1.default.gray('─'.repeat(40)));
        });
        await this.promptContinue();
    }
    async updateJobStatus() {
        const { jobId } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'jobId',
                message: 'Enter Job ID:',
                default: 'JOB-101'
            }
        ]);
        const { status } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'status',
                message: 'Update status to:',
                choices: [
                    { name: '🚗 En Route', value: 'en_route' },
                    { name: '🔧 In Progress', value: 'in_progress' },
                    { name: '⏸️ On Hold', value: 'on_hold' },
                    { name: '✅ Completed', value: 'completed' }
                ]
            }
        ]);
        const spinner = (0, ora_1.default)('Updating job status...').start();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            spinner.succeed('Status updated successfully!');
            console.log(chalk_1.default.green(`\n✅ Job ${jobId} status updated`));
            console.log('Customer has been notified');
        }
        catch (error) {
            spinner.fail('Failed to update status');
            console.error(chalk_1.default.red('Error:'), error.message);
        }
        await this.promptContinue();
    }
    async updateAvailability() {
        console.log(chalk_1.default.cyan('\n🕐 UPDATE AVAILABILITY\n'));
        const availability = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'emergency',
                message: 'Available for emergencies?',
                default: true
            },
            {
                type: 'number',
                name: 'capacity',
                message: 'Current job capacity (1-10):',
                default: 5,
                validate: (input) => input >= 0 && input <= 10
            },
            {
                type: 'checkbox',
                name: 'services',
                message: 'Available services:',
                choices: [
                    { name: 'Water Damage', checked: true },
                    { name: 'Fire Damage', checked: true },
                    { name: 'Mould Remediation', checked: true },
                    { name: 'Storm Damage', checked: false },
                    { name: 'Sewage Cleanup', checked: false }
                ]
            }
        ]);
        const spinner = (0, ora_1.default)('Updating availability...').start();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            spinner.succeed('Availability updated!');
            console.log(chalk_1.default.green('\n✅ Settings saved'));
        }
        catch (error) {
            spinner.fail('Failed to update');
            console.error(chalk_1.default.red('Error:'), error.message);
        }
        await this.promptContinue();
    }
    async viewPerformance() {
        console.log(chalk_1.default.cyan('\n📊 PERFORMANCE METRICS\n'));
        console.log(chalk_1.default.yellow('This Month:'));
        console.log(`  Jobs Completed: ${chalk_1.default.green('47')}`);
        console.log(`  Completion Rate: ${chalk_1.default.green('98.5%')}`);
        console.log(`  Avg Response Time: ${chalk_1.default.yellow('28 minutes')}`);
        console.log(`  Customer Rating: ${chalk_1.default.green('⭐ 4.8/5.0')}`);
        console.log(`  Revenue: ${chalk_1.default.green('$52,340')}`);
        console.log(chalk_1.default.gray('\n─'.repeat(40)));
        console.log(chalk_1.default.yellow('This Week:'));
        console.log(`  Jobs: ${chalk_1.default.green('12 completed')}, ${chalk_1.default.yellow('3 active')}`);
        console.log(`  Emergency Response: ${chalk_1.default.green('100%')}`);
        console.log(`  On-Time Rate: ${chalk_1.default.green('95%')}`);
        await this.promptContinue();
    }
    async viewProcedures() {
        const { procedure } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'procedure',
                message: 'Select procedure guide:',
                choices: [
                    'Water Extraction Process',
                    'Mould Remediation Steps',
                    'Fire Damage Assessment',
                    'Structural Drying',
                    'Biohazard Cleanup',
                    'Back to Menu'
                ]
            }
        ]);
        if (procedure !== 'Back to Menu') {
            console.log(chalk_1.default.cyan(`\n📘 ${procedure}\n`));
            console.log('1. Safety assessment and PPE');
            console.log('2. Document damage with photos');
            console.log('3. Set up containment if needed');
            console.log('4. Begin remediation process');
            console.log('5. Monitor and document progress');
            console.log('6. Final inspection and certification');
            await this.promptContinue();
        }
        else {
            await this.showMainMenu();
        }
    }
    async toggleEmergencyMode() {
        const { toggle } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'toggle',
                message: 'Enable EMERGENCY MODE? (Priority job alerts)',
                default: true
            }
        ]);
        if (toggle) {
            console.log(chalk_1.default.bgRed.white('\n🚨 EMERGENCY MODE ACTIVATED 🚨'));
            console.log(chalk_1.default.yellow('You will receive priority emergency job alerts'));
            setTimeout(() => {
                console.log(chalk_1.default.bgRed.white('\n\n🔔 EMERGENCY JOB ALERT!'));
                console.log(chalk_1.default.red('FLOODING - Brisbane CBD'));
                console.log('Customer: Sarah Wilson');
                console.log('Distance: 3.2km');
                console.log('Value: $4,800');
                console.log(chalk_1.default.yellow('\nPress Enter to view...'));
            }, 3000);
        }
        else {
            console.log(chalk_1.default.gray('\nEmergency mode disabled'));
        }
        await this.promptContinue();
    }
    async viewJobDetails() {
        console.log(chalk_1.default.cyan('\n📄 JOB DETAILS\n'));
        console.log('Job ID: JOB-001');
        console.log('Type: Water Damage - Burst Pipe');
        console.log('Customer: David Thompson');
        console.log('Phone: 0412 345 678');
        console.log('Address: 123 Main St, Brisbane CBD');
        console.log('Insurance: Yes - RACQ');
        console.log('Claim #: CLM-2024-1234');
        console.log('\nDescription:');
        console.log('Burst pipe in bathroom, water damage to floor and walls.');
        console.log('Urgent response needed to prevent further damage.');
        await this.promptContinue();
    }
    async promptContinue() {
        await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'continue',
                message: chalk_1.default.gray('Press Enter to continue...'),
                prefix: ''
            }
        ]);
        await this.showMainMenu();
    }
    logout() {
        console.log(chalk_1.default.yellow(`\n👋 Goodbye, ${this.session?.businessName}!`));
        console.log(chalk_1.default.gray('Session ended'));
        process.exit(0);
    }
}
process.on('unhandledRejection', (error) => {
    console.error(chalk_1.default.red('Error:'), error.message);
    process.exit(1);
});
process.on('SIGINT', () => {
    console.log(chalk_1.default.yellow('\n\n👋 Contractor portal closed'));
    process.exit(0);
});
const cli = new ContractorBotCLI();
cli.start();
//# sourceMappingURL=index.js.map