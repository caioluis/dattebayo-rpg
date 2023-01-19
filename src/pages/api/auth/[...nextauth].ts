import type { Session } from "next-auth";
import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import type { Prisma } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters.js";
import type { JWT } from "next-auth/jwt/types.js";

interface User {
  id: string;
  name: string | null;
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
      clientId: env.NODE_ENV === "production" ? env.DISCORD_CLIENT_ID : env.DEV_DISCORD_CLIENT_ID,
      clientSecret: env.NODE_ENV === "production" ? env.DISCORD_CLIENT_SECRET : env.DEV_DISCORD_CLIENT_SECRET
    })
  ]
};

export default NextAuth(authOptions);
