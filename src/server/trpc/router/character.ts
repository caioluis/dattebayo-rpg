import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const characterRouter = router({
    createCharacter: protectedProcedure
        .input(
            z.object({
                userId: z.string()
            })
        )
        .mutation(({ input, ctx }) => {
            return ctx.prisma.character
                .create({
                    data: {
                        userId: input.userId,
                        rank: 'Genin'
                    },
                    select: {
                        id: true
                    }
                })
                .then((character) => {
                    return ctx.prisma.user.update({
                        where: {
                            id: input.userId
                        },
                        data: {
                            currentCharacter: character.id
                        }
                    });
                });
        }),
    getCharacter: protectedProcedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .query(({ input, ctx }) => {
            return ctx.prisma.character.findUnique({
                where: {
                    id: input.id
                }
            });
        }),
    getCurrentCharacter: protectedProcedure
        .input(
            z.object({
                currentCharacter: z.number().nullish()
            })
        )
        .query(({ input, ctx }) => {
            if (!input.currentCharacter) return null;
            return ctx.prisma.character.findUnique({
                where: {
                    id: input.currentCharacter
                }
            });
        })
});
