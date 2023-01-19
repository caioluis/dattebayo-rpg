import type { Session } from 'next-auth';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '../../../server/db/client';
import type { Prisma } from '@prisma/client';
import type { JWT } from 'next-auth/jwt/types.js';

interface User {
  id: string;
  name: string | null;
  nameWasLastChangedAt: Date | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  narutomakis: Prisma.Decimal | null;
  maxNumberOfCharacters: number;
  currentCharacter: number | null;
  birthdate: Date | null;
  createdAt: Date;
}

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session(params: { session: Session; user: User; token: JWT }) {
      const { session, user } = params;
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.nameWasLastChangedAt = user.nameWasLastChangedAt;
        session.user.email = user.email;
        session.user.emailVerified = user.emailVerified;
        session.user.image = user.image;
        session.user.narutomakis = user.narutomakis;
        session.user.maxNumberOfCharacters = user.maxNumberOfCharacters;
        session.user.currentCharacter = user.currentCharacter;
        session.user.birthdate = user.birthdate;
        session.user.createdAt = user.createdAt;
      }
      return session;
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId:
        (process.env.NODE_ENV === 'production'
          ? process.env.DISCORD_CLIENT_ID
          : process.env.DEV_DISCORD_CLIENT_ID) ?? 'DISCORD_CLIENT_ID_DUMMY',
      clientSecret:
        (process.env.NODE_ENV === 'production'
          ? process.env.DISCORD_CLIENT_SECRET
          : process.env.DEV_DISCORD_CLIENT_SECRET) ??
        'DISCORD_CLIENT_SECRET_DUMMY'
    })
  ]
};

export default NextAuth(authOptions);
