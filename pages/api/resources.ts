import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (_req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: [
        {
          count: 'desc',
        },
      ],
      include: { tags: true },
    });

    res.status(200).json({ resources });
  } catch (error) {
    throw new Error(`Failed to query listings: ${error}`);
  }
};
