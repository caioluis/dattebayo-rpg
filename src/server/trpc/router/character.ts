import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import { router, protectedProcedure } from "../trpc";

export const characterRouter = router({
  createCharacter: protectedProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.auth.user;

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

      await clerkClient.users.updateUser(input.userId, {
        publicMetadata: {
          currentCharacterId: character.id,
          maxNumberOfCharacters: (user.publicMetadata.NumberOfCharacters as number) - 1
        }
      });

      return character.id;
    }),
  getCharacter: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.character.findUnique({
        where: {
          id: input.id
        }
      });
    }),
  getCurrentCharacter: protectedProcedure
    .input(
      z.object({
        currentCharacter: z.number().nullish()
      })
    )
    .query(({ input, ctx }) => {
      if (!input.currentCharacter) return null;
      return ctx.prisma.character.findUnique({
        where: {
          id: input.currentCharacter
        }
      });
    }),
  getCurrentCharacterVillage: protectedProcedure
    .input(
      z.object({
        currentCharacter: z.number().nullish()
      })
    )
    .query(({ input, ctx }) => {
      if (!input.currentCharacter) return null;
      return ctx.prisma.character.findUnique({
        where: {
          id: input.currentCharacter
        },
        select: {
          id: true,
          villageId: true
        }
      });
    })
});
