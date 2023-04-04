import { z } from "zod";

import { protectedProcedure } from "../../trpc";

export const getCharacter = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.character.findUnique({
        where: {
          id: input.id
        }
      });
    })
};
