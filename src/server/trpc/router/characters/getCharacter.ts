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
    }),
  getSpecificAttributes: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        attributes: z.array(z.string())
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.$queryRawUnsafe(
        `SELECT ${input.attributes.join(", ")} FROM character WHERE id = ${input.id}`
      );
    })
};
