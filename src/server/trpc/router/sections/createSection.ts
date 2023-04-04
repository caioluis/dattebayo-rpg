import { z } from "zod";

import { adminProcedure } from "../../trpc";

export const createSection = {
  procedure: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullish(),
        parentSectionId: z.number().nullish()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.section.create({
        data: {
          title: input.title,
          description: input?.description,
          parentSectionId: input?.parentSectionId
        }
      });
    })
};
