import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const Akihito = await prisma.user.upsert({
    where: { email: 'akihito@dattebayo.ninja' },
    update: {},
    create: {
      name: 'Akihito',
      email: 'akihito@dattebayo.ninja',
      emailVerified: new Date('2022-01-18T012:30:00.000Z'),
      image:
        'https://cdn.discordapp.com/avatars/466564113531666442/2c27cce69f6616c2588de11ac46aa5f3.webp?size=100',
      birthdate: null,
      narutomakis: 0,
      currentCharacter: null,
      maxNumberOfCharacters: 1,
      createdAt: new Date('2022-01-18T012:15:00.000Z')
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
