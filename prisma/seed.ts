import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminEmail = 'admin@restorationmarketplace.com';
  const adminPassword = 'Admin123!';
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        userType: 'ADMIN',
        avatar: null
      }
    });

    console.log('Admin user created:', admin);
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
