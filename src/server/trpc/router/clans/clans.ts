import { router, protectedProcedure } from "../../trpc";
import { createClan } from "./createClan";

export const clanRouter = router({
  createClan: createClan.procedure,
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.clan.findMany();
    } catch (error) {
      console.log(error.message);
    }
  })
});
