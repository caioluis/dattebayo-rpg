import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const characterRouter = router({
    createVillage: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                cardPhoto: z.string().nullish(),
                maxNumberOfNinjas: z.number(),
            })
        )
        .mutation(({ input, ctx }) => {
            return ctx.prisma.village
                .create({
                    data: {
                        name: input.name,
                        cardPhoto: input.cardPhoto,
                        maxNumberOfNinjas: input.maxNumberOfNinjas as number,
                    },
                })
        }),
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.village.findMany();
        })
});
