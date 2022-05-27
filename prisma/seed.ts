import { randEmail, randFullName, randBoolean, randImg, randUuid, randBetweenDate, randRecentDate, randTimeZone } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const seedDate = [
  {
    id: 'cl2wldl9m000009l7di8f00lq',
    contact: 'elsrerera@prisma.io',
    name: 'Elsa Prrerereisma',
    avatar: 'this avatar',
    committed: true,
    token: 'e32rere3',
  },
];

// const user = await prisma.user.create({
//   data: {
//     id: 'cl2wldl9m000009l7di8f00lq',
//     contact: 'elsrerera@prisma.io',
//     name: 'Elsa Prrerereisma',
//     avatar: 'this avatar',
//     committed: true,
//     token: 'e32rere3',
//     committedLog: {
//       create: {},
//     },
//   },
// });
// dateLogged: randBetweenDate({ from: new Date('05/14/2022'), to: new Date() })

const generateNodeData = () => ({
  id: randUuid(),
  contact: randEmail(),
  name: randFullName(),
  avatar: randImg(),
  committed: true,
  dateCommitted: randRecentDate({ days: 7 }),
  token: randUuid(),
  timezone: randTimeZone(),
  committedLog: {
    create: { dateLogged: randBetweenDate({ from: new Date('05/20/2022'), to: new Date() }).toISOString() },
  },
});
const main = async () => {
  console.log(`Start seeding 1 levels of data to play around with ...`);

  const user = await prisma.user.create({
    data: { ...generateNodeData() },
  });
  await axios.post(`http://localhost:3000/api/checkoutSessions`, { viewerId: user.id });

  console.log(user);
};
main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
