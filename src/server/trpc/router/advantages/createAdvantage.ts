import { z } from "zod";

import { adminProcedure } from "../../trpc";

export const createAdvantage = {
  procedure: adminProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.number(),
        points: z.number(),
        requirementsDescription: z.string(),
        requiresManualApproval: z.boolean(),
        effects: z.string(),
        requirements: z.string(),
        modifiers: z.object({
          speed: z.number(),
          stamina: z.number(),
          strength: z.number(),
          ninjutsu: z.number(),
          genjutsu: z.number(),
          taijutsu: z.number(),
          handSeals: z.number(),
          intelligence: z.number(),
          hpExtra: z.number(),
          chakraExtra: z.number()
        })
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.advantage.create({
        data: {
          ...input
        }
      });
    })
};
