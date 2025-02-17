import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10);
  const strongHashedPassword = await bcrypt.hash('strongpassword123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {}, // No updates needed if it exists
    create: {
      email: 'admin@company.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      name: 'Admin Test',
    },
  });

  const emp1 = await prisma.user.upsert({
    where: { email: 'emp1@company.com' },
    update: {}, // No updates needed if it exists
    create: {
      email: 'emp1@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Employee Test',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      email: 'john.doe@company.com',
      name: 'John Doe',
      password: strongHashedPassword,
      role: 'USER',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@company.com' },
    update: {},
    create: {
      email: 'jane.smith@company.com',
      name: 'Jane Smith',
      password: strongHashedPassword,
      role: 'USER',
    },
  });

  const place = await prisma.place.upsert({
    where: { googlePlaceId: 'ChIJ2eUgeAK6j4ARbn5u_wAGqWA' },
    update: {},
    create: {
      name: 'GooglePlex',
      address: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
      googlePlaceId: 'ChIJ2eUgeAK6j4ARbn5u_wAGqWA',
    },
  });

  const placeLUTUni = await prisma.place.upsert({
    where: { googlePlaceId: 'ChIJmZVaQ_SUkEYRzaXC3OMePhM' },
    update: {},
    create: {
      name: 'LUT University',
      address: 'Yliopistonkatu 34, 53850 Lappeenranta, Finland',
      googlePlaceId: 'ChIJmZVaQ_SUkEYRzaXC3OMePhM',
    },
  });

  const placeAaltoUni = await prisma.place.upsert({
    where: { googlePlaceId: 'ChIJ0Z4_0ez1jUYRWt0q5qjnQEI' },
    update: {},
    create: {
      name: 'Aalto University',
      address: 'Otakaari 24, 02150 Espoo, Finland',
      googlePlaceId: 'ChIJ0Z4_0ez1jUYRWt0q5qjnQEI',
    },
  });

  const event1 = await prisma.event.create({
    data: {
      title: 'Tech Conference 2025',
      description: 'Annual Tech meetup at Google HQ',
      dateTime: new Date('2025-02-26'),
      status: 'ACTIVE',
      creatorId: user1.id,
      locationId: place.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Startup Networking 2025 Night',
      description: 'Meet startup founders and investors at GooglePlex',
      dateTime: new Date('2025-02-23'),
      status: 'ACTIVE',
      creatorId: user2.id,
      locationId: place.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: 'Daily Standup Meeting',
      description: 'Daily report to team',
      dateTime: new Date('2025-02-18T14:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp1.id,
      locationId: placeLUTUni.id,
      occurrence: 'DAILY',
    },
  });

  await prisma.event.create({
    data: {
      title: 'PhD Interview Spring 2025',
      description: 'Interview for PhD position at Aalto',
      dateTime: new Date('2025-02-18T09:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp1.id,
      locationId: placeAaltoUni.id,
      occurrence: 'SINGLE',
    },
  });

  await prisma.eventParticipant.create({
    data: {
      userId: user2.id,
      eventId: event3.id,
      status: 'ACCEPTED',
    },
  });

  await prisma.eventParticipant.create({
    data: {
      userId: user2.id,
      eventId: event1.id,
      status: 'ACCEPTED',
    },
  });

  await prisma.eventParticipant.create({
    data: {
      userId: user1.id,
      eventId: event2.id,
      status: 'PENDING',
    },
  });
  await prisma.eventParticipant.create({
    data: {
      userId: emp1.id,
      eventId: event1.id,
      status: 'PENDING',
    },
  });
  await prisma.eventParticipant.create({
    data: {
      userId: emp1.id,
      eventId: event2.id,
      status: 'PENDING',
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
