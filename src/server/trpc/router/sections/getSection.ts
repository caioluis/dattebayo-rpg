import { z } from "zod";

import { protectedProcedure } from "../../trpc";

export const getSection = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(({ input, ctx }) => {
      return {
        allTopics: ctx.prisma.topic.findMany({
          where: {
            parentSectionId: input.id
          }
        }),
        allSections: ctx.prisma.section.findMany({
          where: {
            parentSectionId: input.id
          }
        })
      };
    })
};
