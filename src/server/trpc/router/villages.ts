import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const villageRouter = router({
  createVillage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        cardPhoto: z.string().nullish(),
        maxNumberOfNinjas: z.number()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.village.create({
        data: {
          name: input.name,
          cardPhoto: input.cardPhoto,
          maxNumberOfNinjas: input.maxNumberOfNinjas as number
        }
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.village.findMany();
  }),
  joinVillage: protectedProcedure
    .input(
      z.object({
        villageId: z.number(),
        characterId: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const villagePromise = ctx.prisma.village.findUnique({
        where: {
          id: input.villageId
        },
        select: {
          id: true,
          numberOfNinjas: true,
          maxNumberOfNinjas: true
        }
      });
      const characterPromise = ctx.prisma.character.findUnique({
        where: {
          id: input.characterId
        },
        select: {
          id: true,
          villageId: true
        }
      });
      // parallelize the queries
      const [village, character] = await Promise.all([villagePromise, characterPromise]);
      if (village) {
        if (village.numberOfNinjas + 1 <= village.maxNumberOfNinjas) {
          const updatedCharacter = ctx.prisma.character.update({
            where: {
              id: input.characterId
            },
            data: {
              villageId: village.id
            }
          });
          const newVillage = ctx.prisma.village.update({
            where: {
              id: village.id
            },
            data: {
              numberOfNinjas: { increment: 1 }
            }
          });
          const oldVillage = ctx.prisma.village.update({
            where: {
              id: character?.villageId
            },
            data: {
              numberOfNinjas: { decrement: 1 }
            }
          });
          return Promise.all([updatedCharacter, newVillage, oldVillage]);
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Essa vila está cheia!"
          });
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Essa vila não existe"
        });
      }
    })
});
