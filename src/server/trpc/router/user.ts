import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  setCurrentCharacter: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentCharacterId: z.number()
      })
    )
    .mutation(async ({ input }) => {
      return await clerkClient.users.updateUser(input.id, {
        publicMetadata: {
          currentCharacterId: input.currentCharacterId
        }
      });
    })
});
