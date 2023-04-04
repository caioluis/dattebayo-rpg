import { router } from "../trpc";
import { sectionRouter } from "./sections/sections";
import { characterRouter } from "./characters/characters";
import { userRouter } from "./users/user";
import { villageRouter } from "./villages/villages";

export const appRouter = router({
  sections: sectionRouter,
  character: characterRouter,
  user: userRouter,
  village: villageRouter
});

export type AppRouter = typeof appRouter;
