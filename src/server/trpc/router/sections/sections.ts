import { router, protectedProcedure } from "../../trpc";
import { createSection } from "./createSection";
import { getSection } from "./getSection";

export const sectionRouter = router({
  createSection: createSection.procedure,
  getAll: protectedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.section.findMany();
    } catch (error) {
      console.log(error.message);
    }
  }),
  getSection: getSection.procedure
});
