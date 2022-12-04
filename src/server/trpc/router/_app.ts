import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { sectionRouter } from "./sections";
import { characterRouter } from "./character";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  sections: sectionRouter,
  character: characterRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
