import { z } from "zod";

import { adminProcedure } from "../../trpc";

export const createVillage = {
  procedure: adminProcedure
    .input(
      z.object({
        name: z.string(),
        maxNumberOfNinjas: z.number(),
        portugueseName: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.village.create({
          data: {
            name: input.name,
            portugueseName: input.portugueseName,
            maxNumberOfNinjas: input.maxNumberOfNinjas
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    })
};
