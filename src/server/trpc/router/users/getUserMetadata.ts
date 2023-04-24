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
        const user = await clerkClient.users.getUser(input.id);
        return user.publicMetadata;
      } catch (error) {
        return error;
      }
    })
};
