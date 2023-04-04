import { z } from "zod";

import { protectedProcedure } from "../../trpc";

export const updateVillage = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        kageId: z.number().optional(),
        numberOfNinjas: z.number().optional(),
        maxNumberOfNinjas: z.number().optional(),
        portugueseName: z.string().optional()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.village.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name || undefined,
          kageId: input.kageId || undefined,
          portugueseName: input.portugueseName || undefined,
          numberOfNinjas: input.numberOfNinjas || undefined,
          maxNumberOfNinjas: input.maxNumberOfNinjas || undefined
        }
      });
    }),

  incrementNumberOfNinjas: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.village.update({
        where: {
          id: input.id
        },
        data: {
          numberOfNinjas: {
            increment: 1
          }
        }
      });
    }),

  decrementNumberOfNinjas: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.village.update({
        where: {
          id: input.id
        },
        data: {
          numberOfNinjas: {
            decrement: 1
          }
        }
      });
    })
};
