import { z } from "zod";

import { protectedProcedure } from "../../trpc";

export const getVillage = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.village.findUnique({
        where: {
          id: input.id
        }
      });
    })
};
