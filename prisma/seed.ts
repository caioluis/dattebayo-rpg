import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const Akihito = await prisma.user.upsert({
    where: { email: 'akihito@dattebayo.ninja' },
    update: {},
    create: {
      id: 'cld2aoyco00000hl8u74e33m0',
      name: 'Akihito',
      nameWasLastChangedAt: '2022-01-17T15:25:31.476Z',
      email: 'akihito@dattebayo.ninja',
      emailVerified: null,
      image:
        'https://cdn.discordapp.com/avatars/466564113531666442/2c27cce69f6616c2588de11ac46aa5f3.webp?size=100',
      birthdate: null,
      narutomakis: 0,
      currentCharacter: null,
      maxNumberOfCharacters: 1,
      createdAt: '2023-01-18T19:25:31.476Z'
    }
  });
  console.log({ Akihito });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
