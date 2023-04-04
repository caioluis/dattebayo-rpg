import { router, protectedProcedure } from "../../trpc";

import { createVillage } from "./createVillage";
import { getVillage } from "./getVillage";
import { updateVillage } from "./updateVillage";

export const villageRouter = router({
  createVillage: createVillage.procedure,
  getVillage: getVillage.procedure,
  updateVillage: updateVillage.procedure,
  incrementNumberOfNinjas: updateVillage.incrementNumberOfNinjas,
  decrementNumberOfNinjas: updateVillage.decrementNumberOfNinjas,
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.village.findMany();
  })
});
