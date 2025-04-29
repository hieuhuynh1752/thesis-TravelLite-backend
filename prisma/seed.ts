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
    where: { googlePlaceId: 'ChIJ8TpEXAgKxkcRhM3sl6nX8i0' },
    update: {},
    create: {
      name: 'VU Amsterdam',
      address: 'De Boelelaan 1105, 1081 HV Amsterdam, Netherlands',
      googlePlaceId: 'ChIJ8TpEXAgKxkcRhM3sl6nX8i0',
      latitude: 52.33403212192574,
      longtitude: 4.865698439630396,
    },
  });

  const placeLUTUni = await prisma.place.upsert({
    where: { googlePlaceId: 'ChIJmZVaQ_SUkEYRzaXC3OMePhM' },
    update: {},
    create: {
      name: 'LUT University',
      address: 'Yliopistonkatu 34, 53850 Lappeenranta, Finland',
      googlePlaceId: 'ChIJmZVaQ_SUkEYRzaXC3OMePhM',
      latitude: 61.06508990966687,
      longtitude: 28.094402970867108,
    },
  });

  const placeAaltoUni = await prisma.place.upsert({
    where: { googlePlaceId: 'ChIJ0Z4_0ez1jUYRWt0q5qjnQEI' },
    update: {},
    create: {
      name: 'Aalto University',
      address: 'Otakaari 24, 02150 Espoo, Finland',
      googlePlaceId: 'ChIJ0Z4_0ez1jUYRWt0q5qjnQEI',
      latitude: 60.185224990428,
      longtitude: 24.832372799645032,
    },
  });

  const event1 = await prisma.event.create({
    data: {
      title: 'Tech Conference 2025',
      description: 'Annual Tech meetup',
      dateTime: new Date('2025-05-26T15:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: user1.id,
      locationId: place.id,
      visibility: 'PUBLIC',
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Startup Networking 2025 Night',
      description: 'Meet startup founders and investors at GooglePlex',
      dateTime: new Date('2025-05-28T16:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: user2.id,
      locationId: place.id,
      visibility: 'PUBLIC',
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
      visibility: 'PRIVATE',
    },
  });

  const empEvent2 = await prisma.event.create({
    data: {
      title: 'PhD Interview Spring 2025',
      description: 'Interview for PhD position at Aalto',
      dateTime: new Date('2025-05-01T09:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp1.id,
      locationId: placeAaltoUni.id,
      occurrence: 'SINGLE',
      visibility: 'PRIVATE',
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
      userId: emp1.id,
      eventId: event3.id,
      status: 'ACCEPTED',
    },
  });

  await prisma.eventParticipant.create({
    data: {
      userId: emp1.id,
      eventId: empEvent2.id,
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

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'driving',
      value: 120,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'bus',
      value: 80,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'biking',
      value: 0,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'walking',
      value: 0,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'heavy_rail',
      value: 30,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'cable_car',
      value: 30,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'commuter_train',
      value: 35,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'ferry',
      value: 180,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'funicular',
      value: 40,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'gondola_lift',
      value: 25,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'high_speed_train',
      value: 15,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'intercity_bus',
      value: 60,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'long_distance_train',
      value: 20,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'metro_rail',
      value: 40,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'monorail',
      value: 50,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'rail',
      value: 35,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'share_taxi',
      value: 120,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'subway',
      value: 50,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'tram',
      value: 25,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'trolleybus',
      value: 50,
    },
  });

  await prisma.emissionFactor.create({
    data: {
      vehicleType: 'default',
      value: 120,
    },
  });

  console.log('✅ Seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
