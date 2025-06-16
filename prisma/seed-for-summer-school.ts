import { EventParticipantStatus, PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10);
  const strongHashedPassword = await bcrypt.hash('se4greenTravel', 10);

  // Core users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@se4gd.com' },
    update: {},
    create: {
      email: 'admin@se4gd.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      name: 'SE4GD Admin',
    },
  });

  // Human-named employees
  const emp1 = await prisma.user.upsert({
    where: { email: 'anusha.annengala@se4gd.com' },
    update: {},
    create: {
      email: 'anusha.annengala@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Anusha Annengala',
    },
  });

  const emp2 = await prisma.user.upsert({
    where: { email: 'hiba.bouhlal@se4gd.com' },
    update: {},
    create: {
      email: 'hiba.bouhlal@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Hiba Bouhlal',
    },
  });

  const emp3 = await prisma.user.upsert({
    where: { email: 'vidya.dhopate@se4gd.com' },
    update: {},
    create: {
      email: 'vidya.dhopate@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Vidya Dhopate',
    },
  });

  const emp4 = await prisma.user.upsert({
    where: { email: 'mhreteabe.dula@se4gd.com' },
    update: {},
    create: {
      email: 'mhreteabe.dula@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Mhreteabe Dula',
    },
  });
  const emp5 = await prisma.user.upsert({
    where: { email: 'ahnaf.huq@se4gd.com' },
    update: {},
    create: {
      email: 'ahnaf.huq@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Ahnaf Huq',
    },
  });
  const emp6 = await prisma.user.upsert({
    where: { email: 'ruben.huygens@se4gd.com' },
    update: {},
    create: {
      email: 'ruben.huygens@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Ruben Huygens',
    },
  });
  const emp7 = await prisma.user.upsert({
    where: { email: 'wisdom.kalu@se4gd.com' },
    update: {},
    create: {
      email: 'wisdom.kalu@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Wisdom Kalu',
    },
  });
  const emp8 = await prisma.user.upsert({
    where: { email: 'taranjot.kaur@se4gd.com' },
    update: {},
    create: {
      email: 'taranjot.kaur@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Taranjot Kaur',
    },
  });
  const emp9 = await prisma.user.upsert({
    where: { email: 'sharjeel.maqsood@se4gd.com' },
    update: {},
    create: {
      email: 'sharjeel.maqsood@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Sharjeel Maqsood',
    },
  });
  const emp10 = await prisma.user.upsert({
    where: { email: 'ichchha.moktan@se4gd.com' },
    update: {},
    create: {
      email: 'ichchha.moktan@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Ichchha Moktan',
    },
  });
  const emp11 = await prisma.user.upsert({
    where: { email: 'vince.nguyen@se4gd.com' },
    update: {},
    create: {
      email: 'vince.nguyen@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Vince Nguyen',
    },
  });
  const emp12 = await prisma.user.upsert({
    where: { email: 'quazi.rafi@se4gd.com' },
    update: {},
    create: {
      email: 'quazi.rafi@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Quazi Rafi',
    },
  });
  const emp13 = await prisma.user.upsert({
    where: { email: 'arshia.saleem@se4gd.com' },
    update: {},
    create: {
      email: 'arshia.saleem@se4gd.com',
      password: strongHashedPassword,
      role: UserRole.USER,
      name: 'Arshia Saleem',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'kiran.saud@se4gd.com' },
    update: {},
    create: {
      email: 'kiran.saud@se4gd.com',
      name: 'Kiran Saud',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'aleksa.stanivuk@se4gd.com' },
    update: {},
    create: {
      email: 'aleksa.stanivuk@se4gd.com',
      name: 'Aleksa Stanivuk',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user3 = await prisma.user.upsert({
    where: { email: 'salsabeel.tantoush@se4gd.com' },
    update: {},
    create: {
      email: 'salsabeel.tantoush@se4gd.com',
      name: 'Salsabeel Tantoush',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user4 = await prisma.user.upsert({
    where: { email: 'nawshin.ulfat@se4gd.com' },
    update: {},
    create: {
      email: 'nawshin.ulfat@se4gd.com',
      name: 'Nawshin Ulfat',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user5 = await prisma.user.upsert({
    where: { email: 'juliette.waltregny@se4gd.com' },
    update: {},
    create: {
      email: 'juliette.waltregny@se4gd.com',
      name: 'Juliette Waltregny',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user6 = await prisma.user.upsert({
    where: { email: 'jacob.white@se4gd.com' },
    update: {},
    create: {
      email: 'jacob.white@se4gd.com',
      name: 'Jacob White',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user7 = await prisma.user.upsert({
    where: { email: 'nimrah.yousuf@se4gd.com' },
    update: {},
    create: {
      email: 'nimrah.yousuf@se4gd.com',
      name: 'Nimrah Yousuf',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user8 = await prisma.user.upsert({
    where: { email: 'jari.porras@se4gd.com' },
    update: {},
    create: {
      email: 'jari.porras@se4gd.com',
      name: 'Jari Porras',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user9 = await prisma.user.upsert({
    where: { email: 'shola.oyedeji@se4gd.com' },
    update: {},
    create: {
      email: 'shola.oyedeji@se4gd.com',
      name: 'Shola Oyedeji',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user10 = await prisma.user.upsert({
    where: { email: 'susanna.koponen@se4gd.com' },
    update: {},
    create: {
      email: 'susanna.koponen@se4gd.com',
      name: 'Susanna Koponen',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user11 = await prisma.user.upsert({
    where: { email: 'patricia.lago@se4gd.com' },
    update: {},
    create: {
      email: 'patricia.lago@se4gd.com',
      name: 'Patricia Lago',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user12 = await prisma.user.upsert({
    where: { email: 'lima.kohestani@se4gd.com' },
    update: {},
    create: {
      email: 'lima.kohestani@se4gd.com',
      name: 'Lima Kohestani',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });

  const user13 = await prisma.user.upsert({
    where: { email: 'letizia.giorgetta@se4gd.com' },
    update: {},
    create: {
      email: 'letizia.giorgetta@se4gd.com',
      name: 'Letizia Giorgetta',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user14 = await prisma.user.upsert({
    where: { email: 'birgit.penzenstadler@se4gd.com' },
    update: {},
    create: {
      email: 'birgit.penzenstadler@se4gd.com',
      name: 'Birgit Penzenstadler',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user15 = await prisma.user.upsert({
    where: { email: 'olaf.droegehorn@se4gd.com' },
    update: {},
    create: {
      email: 'olaf.droegehorn@se4gd.com',
      name: 'Olaf Droegehorn',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user16 = await prisma.user.upsert({
    where: { email: 'stefanie.betz@se4gd.com' },
    update: {},
    create: {
      email: 'stefanie.betz@se4gd.com',
      name: 'Stefanie Betz',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });
  const user17 = await prisma.user.upsert({
    where: { email: 'nelly.condori.fernandez@se4gd.com' },
    update: {},
    create: {
      email: 'nelly.condori.fernandez@se4gd.com',
      name: 'Nelly Condori-Fernandez',
      password: strongHashedPassword,
      role: UserRole.USER,
    },
  });

  // Places
  const placeChalmers = await prisma.place.upsert({
    where: { googlePlaceId: '14609963032858095375' },
    update: {},
    create: {
      name: 'Chalmers Lindholmen University College',
      address: 'Hörselgången 4, 417 56 Göteborg, Sweden',
      googlePlaceId: '14609963032858095375',
      latitude: 57.706615,
      longtitude: 11.93666,
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

  // Events
  const event1 = await prisma.event.create({
    data: {
      title: 'SE4GD Summer School 2025 (Last day)',
      description:
        'Last day of 2025 Summer School for SE4GD Cohort 3 & 4 at Chalmers University of Technology, Gothenburg, Sweden.',
      dateTime: new Date('2025-06-27T11:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: admin.id,
      locationId: placeChalmers.id,
      visibility: 'PRIVATE',
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Tech Conference 2025',
      description: 'Annual Tech meetup',
      dateTime: new Date('2025-07-26T15:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: admin.id,
      locationId: placeAms.id,
      visibility: 'PUBLIC',
    },
  });
  const event3 = await prisma.event.create({
    data: {
      title: 'Startup Networking 2025 Night',
      description: 'Meet startup founders and investors at GooglePlex',
      dateTime: new Date('2025-08-28T16:30:00.000Z'),
      status: 'ACTIVE',
      creatorId: admin.id,
      locationId: placeAms.id,
      visibility: 'PUBLIC',
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: 'Annual Hackathon',
      description: '24-hour coding event',
      dateTime: new Date('2025-07-15T10:00:00.000Z'),
      status: 'ACTIVE',
      creatorId: admin.id,
      locationId: placeLUT.id,
      visibility: 'PUBLIC',
    },
  });

  const participants = [
    { user: user1, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user2, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user3, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user4, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user5, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user6, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user7, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user8, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user9, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user10, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user11, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user12, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user13, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user14, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user15, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user16, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: user17, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp1, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp2, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp3, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp4, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp5, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp6, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp7, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp8, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp9, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp10, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp11, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp12, event: event1, status: EventParticipantStatus.ACCEPTED },
    { user: emp13, event: event1, status: EventParticipantStatus.ACCEPTED },
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

  console.log('✅ Summer School DB Seeded successfully! Fully populated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
