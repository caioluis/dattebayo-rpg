import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const characterRouter = router({
  createCharacter: protectedProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId
        },
        select: {
          currentCharacter: true,
          maxNumberOfCharacters: true
        }
      });

      if (!user)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado'
        });

      if (user.maxNumberOfCharacters - 1 < 0)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Você atingiu o limite de personagens'
        });

      const character = await ctx.prisma.character.create({
        data: {
          userId: input.userId,
          rank: 'Genin'
        },
        select: {
          id: true
        }
      });

      await ctx.prisma.user.update({
        where: {
          id: input.userId
        },
        data: {
          maxNumberOfCharacters: user.maxNumberOfCharacters - 1,
          currentCharacter: character.id
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
          village: true
        }
      });
    })
});
