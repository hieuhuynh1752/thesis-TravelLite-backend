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
    },
  });

  console.log('✅ Admin account seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
