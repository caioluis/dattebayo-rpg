import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const sectionRouter = router({
  createSection: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().nullish(),
      parentSectionId: z.number().nullish(),
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.section.create({
        data: {
          title: input.title,
          description: input?.description,
          parentSectionId: input?.parentSectionId,
        },
      })
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.section.findMany();
  }),
  getSection: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(({ input, ctx }) => {
      return {
        allTopics: ctx.prisma.topic.findMany({
          where: {
            parentSectionId: input.id,
          },
        }),
        allSections: ctx.prisma.section.findMany({
          where: {
            parentSectionId: input.id,
          },
        }),
      };
    }),
});
