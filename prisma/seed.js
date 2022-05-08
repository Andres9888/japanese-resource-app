const { PrismaClient } = require('@prisma/client');
const { Chance } = require('chance');

const prisma = new PrismaClient();
const chance = new Chance();

const generateNodeData = () => ({
  id: chance.guid(),
  contact: chance.email(),
  name: chance.name(),
  avatar: chance.avatar(),
  committed: chance.bool(),
  token: chance.guid(),
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
