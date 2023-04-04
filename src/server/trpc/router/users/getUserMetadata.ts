import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import { protectedProcedure } from "../../trpc";

export const getUserMetadata = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ input }) => {
      try {
        return await clerkClient.users.getUser(input.id);
      } catch (error) {
        return error;
      }
    })
};
