import { router } from "../../trpc";

import { createAdvantage } from "./createAdvantage";

export const advantageRouter = router({
  createAdvantage: createAdvantage.procedure
});
