import { randEmail, randFullName, randBoolean, randImg, randUuid, randBetweenDate } from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateNodeData = () => ({
  id: randUuid(),
  contact: randEmail(),
  name: randFullName(),
  avatar: randImg(),
  committed: randBoolean(),
  token: randUuid(),
  committedLog: {
    create: { dateLogged: randBetweenDate({ from: new Date('05/08/2022'), to: new Date() }) },
  },
});

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

const main = async () => {
  console.log(`Start seeding 1 levels of data to play around with ...`);
  await prisma.user.create({
    data: { ...generateNodeData() },
  });
};
main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
