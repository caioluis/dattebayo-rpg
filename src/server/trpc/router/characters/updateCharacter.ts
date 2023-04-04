import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateCharacter = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        avatar: z.string().optional(),
        icon: z.string().optional(),
        villageId: z.number().optional(),
        clan: z.string().optional(),
        rank: z.string().optional(),
        kekkeiGenkai: z.string().optional(),
        age: z.number().optional(),
        height: z.number().optional(),
        weight: z.number().optional(),
        personality: z.string().optional(),
        appearance: z.string().optional(),
        photoplayer: z.string().optional(),
        backgroundStory: z.string().optional(),
        story: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.character.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name || undefined,
          avatar: input.avatar || undefined,
          icon: input.icon || undefined,
          villageId: input.villageId || undefined,
          clan: input.clan || undefined,
          rank: input.rank || undefined,
          kekkeiGenkai: input.kekkeiGenkai || undefined,
          age: input.age || undefined,
          height: input.height || undefined,
          weight: input.weight || undefined,
          personality: input.personality || undefined,
          appearance: input.appearance || undefined,
          photoplayer: input.photoplayer || undefined,
          backgroundStory: input.backgroundStory || undefined,
          story: input.story || undefined
        }
      });
    })
};
