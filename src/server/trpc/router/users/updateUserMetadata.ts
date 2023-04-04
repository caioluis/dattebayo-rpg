import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import { protectedProcedure } from "../../trpc";

export const updateUserMetadata = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        maxNumberOfCharacters: z.number().optional(),
        currentCharacterId: z.number().optional(),
        characterName: z.string().optional(),
        currentVillageId: z.number().optional(),
        rank: z.string().optional(),
        clan: z.string().optional(),
        avatar: z.string().optional(),
        icon: z.string().optional(),
        cargos: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await clerkClient.users.updateUserMetadata(input.id, {
          publicMetadata: {
            maxNumberOfCharacters: input.maxNumberOfCharacters,
            currentCharacterId: input.currentCharacterId,
            characterName: input.characterName,
            currentVillageId: input.currentVillageId,
            rank: input.rank,
            clan: input.clan,
            avatar: input.avatar,
            icon: input.icon,
            cargos: input.cargos
          }
        });
      } catch (error) {
        return error;
      }
    })
};
