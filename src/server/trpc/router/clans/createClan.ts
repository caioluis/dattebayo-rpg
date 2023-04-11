import { z } from "zod";

import { adminProcedure } from "../../trpc";

export const createClan = {
  procedure: adminProcedure
    .input(
      z.object({
        name: z.string(),
        hasKekkeiGenkai: z.boolean(),
        description: z.string().nullish(),
        longDescription: z.string().nullish(),
        vacanciesForKekkeiGenkai: z.number().nullish()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.clan.create({
        data: {
          name: input.name,
          hasKekkeiGenkai: input.hasKekkeiGenkai,
          description: input?.description,
          longDescription: input?.longDescription,
          vacanciesForKekkeiGenkai: input?.vacanciesForKekkeiGenkai
        }
      });
    })
};
