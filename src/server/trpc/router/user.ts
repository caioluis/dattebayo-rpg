import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const userRouter = router({
  editName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentName: z.string(),
        newName: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.currentName === input.newName) {
        throw new Error('O nome atual é o mesmo que o novo nome.');
      }

      const isThereAnUserWithNewName = await ctx.prisma.user.findUnique({
        where: {
          name: input.newName
        }
      });

      if (isThereAnUserWithNewName !== null) {
        throw new Error('Já existe um usuário com esse nome.');
      }

      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          name: input.newName
        }
      });
    }),
  setCurrentCharacter: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentCharacterId: z.number()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          currentCharacter: input.currentCharacterId
        }
      });
    })
});
