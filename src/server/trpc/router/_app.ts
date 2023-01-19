import { router } from "../trpc";
import { authRouter } from "./auth";
import { sectionRouter } from "./sections";
import { characterRouter } from "./character";
import { userRouter } from "./user";
import { villageRouter } from "./villages";

export const appRouter = router({
  auth: authRouter,
  sections: sectionRouter,
  character: characterRouter,
  user: userRouter,
  village: villageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
