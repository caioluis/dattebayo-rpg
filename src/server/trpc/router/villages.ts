import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const villageRouter = router({
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
        }),
    getNumberOfNinjas: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.character.groupBy({
                by: ['village'],
                _count: true,
            })
        }),
    joinVillage: protectedProcedure
        .input(
            z.object({
                villageId: z.number(),
                characterId: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const village = await ctx.prisma.village.findUnique({
                where: {
                    id: input.villageId,
                },
                select: {
                    id: true,
                    maxNumberOfNinjas: true,
                }
            });
            if (village) {
                return ctx.prisma.character.count({
                    where: {
                        village: {
                            equals: village.id,
                        }
                    }
                }).then((numberOfNinjas) => {
                    if (numberOfNinjas + 1 <= village.maxNumberOfNinjas) {
                        return ctx.prisma.character.update({
                            where: {
                                id: input.characterId,
                            },
                            data: {
                                village: village.id,
                            }
                        });
                    } else {
                        return Promise.reject(`A vila está cheia!`);
                    }
                });
            } else {
                return Promise.reject('Essa vila não existe!');
            }
        })
});
