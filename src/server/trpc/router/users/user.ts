import { router } from "../../trpc";

import { updateUserMetadata } from "./updateUserMetadata";
import { getUserMetadata } from "./getUserMetadata";

export const userRouter = router({
  getUserMetadata: getUserMetadata.procedure,
  updateUserMetadata: updateUserMetadata.procedure
});
