import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
    setCurrentCharacter: protectedProcedure
        .input(z.object({
            id: z.string(),
            currentCharacterId: z.number(),
        }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    currentCharacter: input.currentCharacterId,
                }
            })
        })
});