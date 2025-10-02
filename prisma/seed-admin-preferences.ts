import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAdminPreferences() {
  console.log('🌱 Seeding admin preferences...');

  // Create themes
  const themes = [
    {
      name: 'Emergency Theme',
      identifier: 'emergency-theme',
      primaryColor: '#F44336',
      secondaryColor: '#FF5722',
      accentColor: '#FF9800',
      backgroundColor: '#0F1115',
      textColor: '#F9FAFB'
    },
    {
      name: 'Restoration Theme',
      identifier: 'restoration-theme',
      primaryColor: '#00BFA6',
      secondaryColor: '#4CAF50',
      accentColor: '#8BC34A',
      backgroundColor: '#0F1115',
      textColor: '#F9FAFB'
    },
    {
      name: 'Construction Theme',
      identifier: 'construction-theme',
      primaryColor: '#FF9800',
      secondaryColor: '#FF5722',
      accentColor: '#FFC107',
      backgroundColor: '#0F1115',
      textColor: '#F9FAFB'
    },
    {
      name: 'Professional Theme',
      identifier: 'professional-theme',
      primaryColor: '#2196F3',
      secondaryColor: '#3F51B5',
      accentColor: '#9C27B0',
      backgroundColor: '#0F1115',
      textColor: '#F9FAFB'
    }
  ];

  for (const theme of themes) {
    await prisma.adminTheme.upsert({
      where: { identifier: theme.identifier },
      update: theme,
      create: theme
    });
  }

  // Create service categories
  const categories = [
    {
      name: 'Emergency Services',
      description: '24/7 emergency response and urgent repairs',
      icon: '🚨',
      theme: 'emergency-theme',
      sortOrder: 1
    },
    {
      name: 'Water Damage Restoration',
      description: 'Water damage cleanup and restoration services',
      icon: '💧',
      theme: 'restoration-theme',
      sortOrder: 2
    },
    {
      name: 'Fire Damage Restoration',
      description: 'Fire damage cleanup and restoration services',
      icon: '🔥',
      theme: 'restoration-theme',
      sortOrder: 3
    },
    {
      name: 'Construction & Renovation',
      description: 'Building, renovation, and construction services',
      icon: '🏗️',
      theme: 'construction-theme',
      sortOrder: 4
    },
    {
      name: 'Professional Services',
      description: 'Legal, consulting, and professional services',
      icon: '💼',
      theme: 'professional-theme',
      sortOrder: 5
    }
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.adminServiceCategory.upsert({
      where: { name: category.name },
      update: category,
      create: category
    });
    createdCategories.push(created);
  }

  // Create services for each category
  const services = [
    // Emergency Services
    {
      categoryName: 'Emergency Services',
      services: [
        { name: '24/7 Emergency Response', description: 'Round-the-clock emergency services', icon: '🚨', theme: 'emergency-theme', sortOrder: 1 },
        { name: 'Emergency Board-Up', description: 'Immediate property security services', icon: '🔒', theme: 'emergency-theme', sortOrder: 2 },
        { name: 'Emergency Plumbing', description: 'Urgent plumbing repairs and fixes', icon: '🔧', theme: 'emergency-theme', sortOrder: 3 },
        { name: 'Emergency Electrical', description: 'Urgent electrical repairs and safety', icon: '⚡', theme: 'emergency-theme', sortOrder: 4 }
      ]
    },
    // Water Damage Restoration
    {
      categoryName: 'Water Damage Restoration',
      services: [
        { name: 'Water Extraction', description: 'Professional water removal services', icon: '💧', theme: 'restoration-theme', sortOrder: 1 },
        { name: 'Drying & Dehumidification', description: 'Complete drying and moisture control', icon: '🌬️', theme: 'restoration-theme', sortOrder: 2 },
        { name: 'Mold Remediation', description: 'Mold inspection and removal services', icon: '🦠', theme: 'restoration-theme', sortOrder: 3 },
        { name: 'Content Restoration', description: 'Personal belongings restoration', icon: '📦', theme: 'restoration-theme', sortOrder: 4 }
      ]
    },
    // Fire Damage Restoration
    {
      categoryName: 'Fire Damage Restoration',
      services: [
        { name: 'Smoke Damage Cleanup', description: 'Professional smoke and soot removal', icon: '💨', theme: 'restoration-theme', sortOrder: 1 },
        { name: 'Odor Removal', description: 'Complete odor elimination services', icon: '🌸', theme: 'restoration-theme', sortOrder: 2 },
        { name: 'Structural Assessment', description: 'Fire damage structural evaluation', icon: '🏠', theme: 'restoration-theme', sortOrder: 3 },
        { name: 'Fire Damage Repair', description: 'Complete fire damage restoration', icon: '🔨', theme: 'restoration-theme', sortOrder: 4 }
      ]
    },
    // Construction & Renovation
    {
      categoryName: 'Construction & Renovation',
      services: [
        { name: 'Kitchen Renovation', description: 'Complete kitchen design and renovation', icon: '🍳', theme: 'construction-theme', sortOrder: 1 },
        { name: 'Bathroom Renovation', description: 'Bathroom design and renovation services', icon: '🚿', theme: 'construction-theme', sortOrder: 2 },
        { name: 'Roof Repair & Replacement', description: 'Roofing services and repairs', icon: '🏠', theme: 'construction-theme', sortOrder: 3 },
        { name: 'Flooring Installation', description: 'Flooring installation and repair', icon: '🪵', theme: 'construction-theme', sortOrder: 4 }
      ]
    },
    // Professional Services
    {
      categoryName: 'Professional Services',
      services: [
        { name: 'Legal Consultation', description: 'Professional legal advice and consultation', icon: '⚖️', theme: 'professional-theme', sortOrder: 1 },
        { name: 'Insurance Claims Assistance', description: 'Insurance claim support and guidance', icon: '📋', theme: 'professional-theme', sortOrder: 2 },
        { name: 'Business Consulting', description: 'Strategic business planning and consulting', icon: '💼', theme: 'professional-theme', sortOrder: 3 },
        { name: 'Property Management', description: 'Complete property management services', icon: '🏘️', theme: 'professional-theme', sortOrder: 4 }
      ]
    }
  ];

  for (const categoryData of services) {
    const category = createdCategories.find(c => c.name === categoryData.categoryName);
    if (category) {
      for (const service of categoryData.services) {
        await prisma.adminService.upsert({
          where: { 
            categoryId_name: {
              categoryId: category.id,
              name: service.name
            }
          },
          update: {
            ...service,
            categoryId: category.id
          },
          create: {
            ...service,
            categoryId: category.id
          }
        });
      }
    }
  }

  console.log('✅ Admin preferences seeded successfully!');
}

export default seedAdminPreferences;

// Run if called directly
if (require.main === module) {
  seedAdminPreferences()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
