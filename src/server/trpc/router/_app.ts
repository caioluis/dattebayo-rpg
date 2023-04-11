import { router } from "../trpc";
import { sectionRouter } from "./sections/sections";
import { characterRouter } from "./characters/characters";
import { userRouter } from "./users/user";
import { villageRouter } from "./villages/villages";
import { clanRouter } from "./clans/clans";

export const appRouter = router({
  sections: sectionRouter,
  characters: characterRouter,
  users: userRouter,
  villages: villageRouter,
  clans: clanRouter
});

export type AppRouter = typeof appRouter;
