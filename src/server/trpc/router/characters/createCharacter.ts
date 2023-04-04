import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../../trpc";

export const createCharacter = {
  // This function allows a user to create a character.
  // The user can have a maximum of 3 characters.
  // The user's public metadata is updated to reflect the new character.
  // The character is created in the database and the id is returned.

  procedure: protectedProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await clerkClient.users.getUser(ctx.auth.userId);

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado"
        });

      if ((user.publicMetadata?.maxNumberOfCharacters as number) - 1 < 0)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Você atingiu o limite de personagens"
        });

      const character = await ctx.prisma.character.create({
        data: {
          userId: input.userId,
          rank: "Genin"
        },
        select: {
          id: true
        }
      });

      return character.id;
    })
};
