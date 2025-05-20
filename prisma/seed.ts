import { EventParticipantStatus, PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10);
  const strongHashedPassword = await bcrypt.hash('strongpassword123', 10);

  // Core users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      name: 'Admin Test',
    },
  });

  // Human-named employees
  const emp1 = await prisma.user.upsert({
    where: { email: 'robert.smith@company.com' },
    update: {},
    create: {
      email: 'robert.smith@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Robert Smith',
    },
  });

  const emp2 = await prisma.user.upsert({
    where: { email: 'linda.jones@company.com' },
    update: {},
    create: {
      email: 'linda.jones@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Linda Jones',
    },
  });

  const emp3 = await prisma.user.upsert({
    where: { email: 'kevin.wilson@company.com' },
    update: {},
    create: {
      email: 'kevin.wilson@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Kevin Wilson',
    },
  });

  const emp4 = await prisma.user.upsert({
    where: { email: 'michael.brown@company.com' },
    update: {},
    create: {
      email: 'michael.brown@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Michael Brown',
    },
  });
  const emp5 = await prisma.user.upsert({
    where: { email: 'emma.johnson@company.com' },
    update: {},
    create: {
      email: 'emma.johnson@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Emma Johnson',
    },
  });
  const emp6 = await prisma.user.upsert({
    where: { email: 'christopher.martinez@company.com' },
    update: {},
    create: {
      email: 'christopher.martinez@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Christopher Martinez',
    },
  });
  const emp7 = await prisma.user.upsert({
    where: { email: 'sarah.wilson@company.com' },
    update: {},
    create: {
      email: 'sarah.wilson@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Sarah Wilson',
    },
  });
  const emp8 = await prisma.user.upsert({
    where: { email: 'david.lee@company.com' },
    update: {},
    create: {
      email: 'david.lee@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'David Lee',
    },
  });
  const emp9 = await prisma.user.upsert({
    where: { email: 'jessica.garcia@company.com' },
    update: {},
    create: {
      email: 'jessica.garcia@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Jessica Garcia',
    },
  });
  const emp10 = await prisma.user.upsert({
    where: { email: 'daniel.rodriguez@company.com' },
    update: {},
    create: {
      email: 'daniel.rodriguez@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Daniel Rodriguez',
    },
  });
  const emp11 = await prisma.user.upsert({
    where: { email: 'laura.hernandez@company.com' },
    update: {},
    create: {
      email: 'laura.hernandez@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Laura Hernandez',
    },
  });
  const emp12 = await prisma.user.upsert({
    where: { email: 'james.smith@company.com' },
    update: {},
    create: {
      email: 'james.smith@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'James Smith',
    },
  });
  const emp13 = await prisma.user.upsert({
    where: { email: 'olivia.thompson@company.com' },
    update: {},
    create: {
      email: 'olivia.thompson@company.com',
      password: hashedPassword,
      role: UserRole.USER,
      name: 'Olivia Thompson',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      email: 'john.doe@company.com',
      name: 'John Doe',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@company.com' },
    update: {},
    create: {
      email: 'jane.smith@company.com',
      name: 'Jane Smith',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user3 = await prisma.user.upsert({
    where: { email: 'alice.wonder@company.com' },
    update: {},
    create: {
      email: 'alice.wonder@company.com',
      name: 'Alice Wonder',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user4 = await prisma.user.upsert({
    where: { email: 'bob.builder@company.com' },
    update: {},
    create: {
      email: 'bob.builder@company.com',
      name: 'Bob Builder',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });

  // Places
  const placeAms = await prisma.place.upsert({
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
  const placeLUT = await prisma.place.upsert({
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
  const placeAalto = await prisma.place.upsert({
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
  const placeHelsinki = await prisma.place.upsert({
    where: { googlePlaceId: 'ChIJZQ3K2Sk1kkYRegw4X4dQLVk' },
    update: {},
    create: {
      name: 'Helsinki Central Station',
      address: 'Kaivokatu 1, 00100 Helsinki, Finland',
      googlePlaceId: 'ChIJZQ3K2Sk1kkYRegw4X4dQLVk',
      latitude: 60.171944,
      longtitude: 24.941389,
    },
  });
  // 10 New places
  const placeTechPark = await prisma.place.upsert({
    where: { googlePlaceId: 'PLACE_001' },
    update: {},
    create: {
      name: 'Tech Park Helsinki',
      address: 'Technopolis City, Espoo, Finland',
      googlePlaceId: 'PLACE_001',
      latitude: 60.20622,
      longtitude: 24.6559,
    },
  });

  const placeEspooHub = await prisma.place.upsert({
    where: { googlePlaceId: 'PLACE_004' },
    update: {},
    create: {
      name: 'Espoo Innovation Hub',
      address: 'WeLand, Otaniemi, Espoo, Finland',
      googlePlaceId: 'PLACE_004',
      latitude: 60.1847,
      longtitude: 24.8305,
    },
  });
  const placeConvCenter = await prisma.place.upsert({
    where: { googlePlaceId: 'PLACE_006' },
    update: {},
    create: {
      name: 'International Convention Center',
      address: 'Mikonkatu 23, 00100 Helsinki, Finland',
      googlePlaceId: 'PLACE_006',
      latitude: 60.1692,
      longtitude: 24.9402,
    },
  });
  const placeNordicMuseum = await prisma.place.upsert({
    where: { googlePlaceId: 'PLACE_007' },
    update: {},
    create: {
      name: 'Nordic Museum',
      address: 'Djurgården, 115 93 Stockholm, Sweden',
      googlePlaceId: 'PLACE_007',
      latitude: 59.3266,
      longtitude: 18.097,
    },
  });
  const placeSeaside = await prisma.place.upsert({
    where: { googlePlaceId: 'PLACE_008' },
    update: {},
    create: {
      name: 'Seaside Park',
      address: 'Myllypuro, Helsinki, Finland',
      googlePlaceId: 'PLACE_008',
      latitude: 60.2317,
      longtitude: 25.0353,
    },
  });
  const placeMountainResort = await prisma.place.upsert({
    where: { googlePlaceId: 'PLACE_009' },
    update: {},
    create: {
      name: 'Mountain Resort',
      address: 'Levi Fell, 99130 Kittilä, Finland',
      googlePlaceId: 'PLACE_009',
      latitude: 67.8047,
      longtitude: 24.8106,
    },
  });

  // Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Tech Conference 2025',
      description: 'Annual Tech meetup',
      dateTime: new Date('2025-04-26T15:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: user1.id,
      locationId: placeAms.id,
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
      locationId: placeAms.id,
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
      locationId: placeLUT.id,
      occurrence: 'DAILY',
      visibility: 'PRIVATE',
    },
  });
  const eventWeekly = await prisma.event.create({
    data: {
      title: 'Sprint Retrospective',
      description: 'Sprint lookback and planning',
      dateTime: new Date('2025-02-18T14:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp1.id,
      locationId: placeLUT.id,
      occurrence: 'WEEKLY',
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
      locationId: placeAalto.id,
      occurrence: 'SINGLE',
      visibility: 'PRIVATE',
    },
  });
  const event4 = await prisma.event.create({
    data: {
      title: 'Annual Hackathon',
      description: '24-hour coding event',
      dateTime: new Date('2025-04-15T10:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: user3.id,
      locationId: placeLUT.id,
      visibility: 'PUBLIC',
    },
  });
  const event5 = await prisma.event.create({
    data: {
      title: 'Board Meeting Q1',
      description: 'Quarterly board meeting',
      dateTime: new Date('2025-03-10T13:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp1.id,
      locationId: placeAalto.id,
      visibility: 'PRIVATE',
    },
  });
  const event6 = await prisma.event.create({
    data: {
      title: 'Monthly Townhall',
      description: 'Company-wide update',
      dateTime: new Date('2025-06-01T09:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: user1.id,
      locationId: placeConvCenter.id,
      occurrence: 'MONTHLY',
      visibility: 'PUBLIC',
    },
  });
  const event7 = await prisma.event.create({
    data: {
      title: 'Espoo Marathon',
      description: 'Charity marathon event',
      dateTime: new Date('2025-08-20T07:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: user4.id,
      locationId: placeAalto.id,
      visibility: 'PUBLIC',
    },
  });
  const event8 = await prisma.event.create({
    data: {
      title: 'Product Launch 2025',
      description: 'Launching the new product line',
      dateTime: new Date('2025-09-01T11:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp4.id,
      locationId: placeAalto.id,
      visibility: 'PUBLIC',
    },
  });
  const event9 = await prisma.event.create({
    data: {
      title: 'Team Building Retreat',
      description: 'Weekend retreat in the countryside',
      dateTime: new Date('2025-09-12T08:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp5.id,
      locationId: placeMountainResort.id,
      visibility: 'PRIVATE',
    },
  });
  const event10 = await prisma.event.create({
    data: {
      title: 'Cross-Team Workshop',
      description: 'Collaborative workshop for teams',
      dateTime: new Date('2025-10-05T10:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp6.id,
      locationId: placeNordicMuseum.id,
      visibility: 'PUBLIC',
    },
  });
  const event11 = await prisma.event.create({
    data: {
      title: 'Holiday Party',
      description: 'End-of-year celebration',
      dateTime: new Date('2025-12-20T18:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp7.id,
      locationId: placeSeaside.id,
      visibility: 'PRIVATE',
    },
  });
  const event12 = await prisma.event.create({
    data: {
      title: 'Customer Feedback Session',
      description: 'Gathering feedback from key clients',
      dateTime: new Date('2025-11-15T14:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp8.id,
      locationId: placeTechPark.id,
      visibility: 'PUBLIC',
    },
  });
  const event13 = await prisma.event.create({
    data: {
      title: 'Strategy Planning',
      description: 'Planning session for 2026 roadmap',
      dateTime: new Date('2025-10-20T09:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp9.id,
      locationId: placeAalto.id,
      visibility: 'PRIVATE',
    },
  });
  const event14 = await prisma.event.create({
    data: {
      title: 'Health & Safety Training',
      description: 'Mandatory training for all staff',
      dateTime: new Date('2025-11-01T13:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp10.id,
      locationId: placeConvCenter.id,
      visibility: 'PUBLIC',
    },
  });
  const event15 = await prisma.event.create({
    data: {
      title: 'Marketing Summit',
      description: 'Global marketing strategies meet-up',
      dateTime: new Date('2025-09-25T10:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp11.id,
      locationId: placeEspooHub.id,
      visibility: 'PUBLIC',
    },
  });
  const event16 = await prisma.event.create({
    data: {
      title: 'Security Drill',
      description: 'Fire and emergency evacuation drill',
      dateTime: new Date('2025-10-30T15:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp12.id,
      locationId: placeHelsinki.id,
      visibility: 'PRIVATE',
    },
  });
  const event17 = await prisma.event.create({
    data: {
      title: 'Innovation Day',
      description: 'Employees pitch new ideas',
      dateTime: new Date('2025-11-10T09:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: emp13.id,
      locationId: placeAalto.id,
      visibility: 'PUBLIC',
    },
  });

  // Event participants
  const participants = [
    { user: user1, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user3, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user4, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event2, status: EventParticipantStatus.ACCEPTED },
    { user: emp3, event: event2, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event2, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event2, status: EventParticipantStatus.PENDING },
    { user: emp11, event: event2, status: EventParticipantStatus.PENDING },
    { user: emp12, event: event2, status: EventParticipantStatus.PENDING },
    { user: emp13, event: event2, status: EventParticipantStatus.PENDING },
    { user: user3, event: event3, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event3, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event3, status: EventParticipantStatus.ACCEPTED },
    {
      user: user3,
      event: eventWeekly,
      status: EventParticipantStatus.ACCEPTED,
    },
    { user: emp1, event: eventWeekly, status: EventParticipantStatus.ACCEPTED },
    {
      user: user2,
      event: eventWeekly,
      status: EventParticipantStatus.ACCEPTED,
    },
    { user: emp1, event: empEvent2, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: empEvent2, status: EventParticipantStatus.ACCEPTED },
    { user: user3, event: empEvent2, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event4, status: EventParticipantStatus.ACCEPTED },
    { user: emp2, event: event4, status: EventParticipantStatus.ACCEPTED },
    { user: user3, event: event4, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event4, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event5, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event5, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event5, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event6, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event6, status: EventParticipantStatus.ACCEPTED },
    { user: user3, event: event6, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event6, status: EventParticipantStatus.ACCEPTED },
    { user: emp3, event: event7, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event7, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event7, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event7, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event8, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event8, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event8, status: EventParticipantStatus.ACCEPTED },
    { user: emp2, event: event9, status: EventParticipantStatus.ACCEPTED },
    { user: emp3, event: event9, status: EventParticipantStatus.ACCEPTED },
    { user: emp4, event: event9, status: EventParticipantStatus.ACCEPTED },
    { user: emp5, event: event10, status: EventParticipantStatus.ACCEPTED },
    { user: emp6, event: event10, status: EventParticipantStatus.ACCEPTED },
    { user: emp7, event: event10, status: EventParticipantStatus.ACCEPTED },
    { user: emp8, event: event11, status: EventParticipantStatus.ACCEPTED },
    { user: emp9, event: event11, status: EventParticipantStatus.ACCEPTED },
    { user: emp10, event: event11, status: EventParticipantStatus.ACCEPTED },
    { user: emp11, event: event12, status: EventParticipantStatus.ACCEPTED },
    { user: emp12, event: event12, status: EventParticipantStatus.ACCEPTED },
    { user: emp13, event: event12, status: EventParticipantStatus.ACCEPTED },
    { user: admin, event: event13, status: EventParticipantStatus.ACCEPTED },
    { user: user4, event: event13, status: EventParticipantStatus.ACCEPTED },
    { user: user3, event: event13, status: EventParticipantStatus.ACCEPTED },
    { user: user1, event: event14, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event14, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event14, status: EventParticipantStatus.ACCEPTED },
    { user: emp2, event: event15, status: EventParticipantStatus.ACCEPTED },
    { user: emp3, event: event15, status: EventParticipantStatus.ACCEPTED },
    { user: emp4, event: event15, status: EventParticipantStatus.ACCEPTED },
    { user: emp5, event: event16, status: EventParticipantStatus.ACCEPTED },
    { user: emp6, event: event16, status: EventParticipantStatus.ACCEPTED },
    { user: emp7, event: event16, status: EventParticipantStatus.ACCEPTED },
    { user: emp8, event: event17, status: EventParticipantStatus.ACCEPTED },
    { user: emp9, event: event17, status: EventParticipantStatus.ACCEPTED },
    { user: emp10, event: event17, status: EventParticipantStatus.ACCEPTED },
  ];

  for (const p of participants) {
    await prisma.eventParticipant.create({
      data: { userId: p.user.id, eventId: p.event.id, status: p.status },
    });
  }

  // Emission factors
  const factors = [
    'driving',
    'bus',
    'biking',
    'walking',
    'heavy_rail',
    'cable_car',
    'commuter_train',
    'ferry',
    'funicular',
    'gondola_lift',
    'high_speed_train',
    'intercity_bus',
    'long_distance_train',
    'metro_rail',
    'monorail',
    'rail',
    'share_taxi',
    'subway',
    'tram',
    'trolleybus',
    'electric_scooter',
    'electric_vehicle',
    'carpool',
    'motorbike',
    'default',
  ].map((type, index) => ({
    type,
    value: [
      120, 80, 0, 0, 30, 30, 35, 180, 40, 25, 15, 60, 20, 40, 50, 35, 120, 50,
      25, 50, 15, 30, 60, 90, 120,
    ][index],
  }));

  for (const f of factors) {
    await prisma.emissionFactor.upsert({
      where: { vehicleType: f.type },
      update: {},
      create: { vehicleType: f.type, value: f.value },
    });
  }

  console.log('✅ Seeded successfully! Fully populated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
