import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create demo agency
  const agency = await prisma.agency.create({
    data: {
      name: 'Demo Agency',
      slug: 'demo-agency',
      domain: 'demo.cleanexpo.com',
      primaryColor: '#3B82F6',
    },
  })

  console.log('Created agency:', agency.name)

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      agencyId: agency.id,
    },
  })

  console.log('Created admin user:', admin.email)

  // Create manager user
  const managerPassword = await bcrypt.hash('manager123', 10)
  const manager = await prisma.user.create({
    data: {
      email: 'manager@demo.com',
      password: managerPassword,
      name: 'Manager User',
      role: 'MANAGER',
      agencyId: agency.id,
    },
  })

  console.log('Created manager user:', manager.email)

  // Create sample clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        businessName: 'ABC Plumbing',
        contactName: 'John Smith',
        email: 'john@abcplumbing.com',
        phone: '555-0100',
        website: 'https://abcplumbing.com',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        industry: 'Plumbing',
        agencyId: agency.id,
      },
    }),
    prisma.client.create({
      data: {
        businessName: 'XYZ Electric',
        contactName: 'Jane Doe',
        email: 'jane@xyzelectric.com',
        phone: '555-0200',
        website: 'https://xyzelectric.com',
        address: '456 Oak Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        industry: 'Electrical',
        agencyId: agency.id,
      },
    }),
    prisma.client.create({
      data: {
        businessName: 'Clean Carpets Co',
        contactName: 'Bob Wilson',
        email: 'bob@cleancarpets.com',
        phone: '555-0300',
        website: 'https://cleancarpets.com',
        address: '789 Pine St',
        city: 'Rockford',
        state: 'IL',
        zipCode: '61101',
        industry: 'Cleaning',
        agencyId: agency.id,
      },
    }),
  ])

  console.log(`Created ${clients.length} sample clients`)

  // Create sample audits
  const audit1 = await prisma.audit.create({
    data: {
      title: 'Website Performance Audit',
      description: 'Comprehensive analysis of website performance and SEO',
      status: 'COMPLETED',
      version: 1,
      findings: JSON.stringify({
        seo: { score: 75, issues: ['Missing meta descriptions', 'No sitemap'] },
        performance: { score: 82, issues: ['Large images', 'No caching'] },
        accessibility: { score: 90, issues: ['Missing alt tags'] },
      }),
      metrics: JSON.stringify({
        pageSpeed: 3.2,
        mobileScore: 85,
        desktopScore: 92,
      }),
      agencyId: agency.id,
      clientId: clients[0].id,
      createdById: admin.id,
    },
  })

  const audit2 = await prisma.audit.create({
    data: {
      title: 'Digital Marketing Audit',
      description: 'Review of current digital marketing strategies',
      status: 'IN_PROGRESS',
      version: 1,
      agencyId: agency.id,
      clientId: clients[1].id,
      createdById: manager.id,
    },
  })

  console.log('Created sample audits')

  // Create sample proposals
  const proposal1 = await prisma.proposal.create({
    data: {
      title: 'Website Redesign Proposal',
      description: 'Complete website redesign with modern features',
      content: JSON.stringify({
        sections: [
          { title: 'Overview', content: 'Complete website overhaul' },
          { title: 'Timeline', content: '6-8 weeks' },
          { title: 'Investment', content: '$5,000 - $7,500' },
        ],
      }),
      status: 'SENT',
      price: 5000,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      agencyId: agency.id,
      clientId: clients[0].id,
      auditId: audit1.id,
      createdById: admin.id,
    },
  })

  console.log('Created sample proposals')

  // Create sample invoices
  const invoice1 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-001',
      amount: 5000,
      tax: 500,
      total: 5500,
      status: 'PENDING',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      agencyId: agency.id,
      clientId: clients[0].id,
      proposalId: proposal1.id,
    },
  })

  console.log('Created sample invoices')

  // Create sample enquiries
  const enquiries = await Promise.all([
    prisma.enquiry.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '555-0400',
        message: 'I need help with my website SEO',
        source: 'website',
      },
    }),
    prisma.enquiry.create({
      data: {
        name: 'Mike Brown',
        email: 'mike@example.com',
        message: 'Looking for digital marketing services',
        source: 'referral',
      },
    }),
  ])

  console.log(`Created ${enquiries.length} sample enquiries`)

  // Create sample notifications
  await prisma.notification.createMany({
    data: [
      {
        type: 'NEW_CLIENT',
        title: 'New Client Added',
        message: 'ABC Plumbing has been added as a new client',
        userId: admin.id,
      },
      {
        type: 'AUDIT_COMPLETE',
        title: 'Audit Completed',
        message: 'Website Performance Audit has been completed',
        userId: admin.id,
      },
      {
        type: 'NEW_ENQUIRY',
        title: 'New Enquiry Received',
        message: 'New enquiry from Sarah Johnson',
        userId: manager.id,
      },
    ],
  })

  console.log('Created sample notifications')

  console.log('Seed completed successfully!')
  console.log('\\nYou can now login with:')
  console.log('Admin: admin@demo.com / admin123')
  console.log('Manager: manager@demo.com / manager123')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })