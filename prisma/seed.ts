import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    contact: 'test@gmail.com',
    name: 'andres',

    token: 'token',
  },
});

const main = async () => {
  for (let index = 0; index < 100; index++) {
    await prisma.resource.create({
      data: {
        image: 'https://res.cloudinary.com/andres9888/image/upload/v1635012796/533228467534_fegpeb.png',
        url: 'https://jpdb.io/',
        title: '\nJPDB',
        description:
          'JPDB is a combination of Anki and dictionary. It has a bunch of premade decks from various sources like textbooks,anime,novels, etc.\nIt also aims to be a better version of remember the kanji.   ',

        count: 6,

        tags: {
          create: [{ name: 'srs' }],
        },
      },
    });
  }
};

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
