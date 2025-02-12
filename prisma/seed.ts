import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10);

  await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {}, // No updates needed if it exists
    create: {
      email: 'admin@company.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      name: 'Admin Test'
    },
  });

  await prisma.user.upsert({
    where: { email: 'emp1@company.com' },
    update: {}, // No updates needed if it exists
    create: {
      email: 'emp1@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Employee Test'
    },
  });

  console.log('✅ Admin and User account seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
