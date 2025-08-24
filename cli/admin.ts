#!/usr/bin/env node

import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import inquirer from 'inquirer'

const prisma = new PrismaClient()
const program = new Command()

program
  .name('admin-cli')
  .description('CLI admin tools for Mass WebPage Creations')
  .version('1.0.0')

// User management commands
program
  .command('user:create')
  .description('Create a new user')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        validate: (input) => input.length >= 8,
      },
      {
        type: 'list',
        name: 'role',
        message: 'Role:',
        choices: ['ADMIN', 'MANAGER', 'CLIENT'],
      },
    ])

    try {
      const hashedPassword = await bcrypt.hash(answers.password, 10)
      const user = await prisma.user.create({
        data: {
          email: answers.email,
          name: answers.name,
          password: hashedPassword,
          role: answers.role,
        },
      })
      console.log(`✅ User created: ${user.email}`)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

program
  .command('user:list')
  .description('List all users')
  .action(async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      })
      console.table(users)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

program
  .command('user:delete <email>')
  .description('Delete a user by email')
  .action(async (email: string) => {
    try {
      await prisma.user.delete({
        where: { email },
      })
      console.log(`✅ User deleted: ${email}`)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

// Agency management commands
program
  .command('agency:create')
  .description('Create a new agency')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Agency Name:',
      },
      {
        type: 'input',
        name: 'slug',
        message: 'Slug (URL-friendly name):',
        validate: (input) => /^[a-z0-9-]+$/.test(input),
      },
      {
        type: 'input',
        name: 'domain',
        message: 'Domain (optional):',
      },
    ])

    try {
      const agency = await prisma.agency.create({
        data: {
          name: answers.name,
          slug: answers.slug,
          domain: answers.domain || null,
        },
      })
      console.log(`✅ Agency created: ${agency.name}`)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

program
  .command('agency:list')
  .description('List all agencies')
  .action(async () => {
    try {
      const agencies = await prisma.agency.findMany({
        include: {
          _count: {
            select: {
              users: true,
              clients: true,
            },
          },
        },
      })
      const data = agencies.map((a) => ({
        id: a.id,
        name: a.name,
        slug: a.slug,
        domain: a.domain || 'N/A',
        users: a._count.users,
        clients: a._count.clients,
      }))
      console.table(data)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

// Client management commands
program
  .command('client:list')
  .description('List all clients')
  .option('-a, --agency <slug>', 'Filter by agency slug')
  .action(async (options) => {
    try {
      const where = options.agency
        ? { agency: { slug: options.agency } }
        : {}
      
      const clients = await prisma.client.findMany({
        where,
        include: {
          agency: {
            select: { name: true },
          },
        },
      })
      
      const data = clients.map((c) => ({
        id: c.id,
        businessName: c.businessName,
        contactName: c.contactName,
        email: c.email,
        agency: c.agency.name,
      }))
      console.table(data)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

// Database commands
program
  .command('db:reset')
  .description('Reset the database (WARNING: This will delete all data!)')
  .action(async () => {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure? This will delete ALL data!',
        default: false,
      },
    ])

    if (!confirm) {
      console.log('Cancelled')
      return
    }

    try {
      // Delete all data in reverse order of dependencies
      await prisma.notification.deleteMany()
      await prisma.enquiry.deleteMany()
      await prisma.invoice.deleteMany()
      await prisma.proposal.deleteMany()
      await prisma.audit.deleteMany()
      await prisma.client.deleteMany()
      await prisma.user.deleteMany()
      await prisma.agency.deleteMany()
      
      console.log('✅ Database reset complete')
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

// Stats command
program
  .command('stats')
  .description('Show database statistics')
  .action(async () => {
    try {
      const stats = {
        agencies: await prisma.agency.count(),
        users: await prisma.user.count(),
        clients: await prisma.client.count(),
        audits: await prisma.audit.count(),
        proposals: await prisma.proposal.count(),
        invoices: await prisma.invoice.count(),
        enquiries: await prisma.enquiry.count(),
      }
      
      console.log('\\n📊 Database Statistics:')
      console.table(stats)
    } catch (error: any) {
      console.error(`❌ Error: ${error.message}`)
    }
  })

// Parse command line arguments
program.parse()

// Cleanup on exit
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})