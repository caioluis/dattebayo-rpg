import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      narutomakis: Prisma.Decimal | null
      maxNumberOfCharacters: number | null
      currentCharacter: number | null
      birthdate: Date | null
      createdAt: Date
    } & DefaultSession["user"]
  }
}
