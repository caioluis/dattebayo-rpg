import { router } from "../../trpc";

import { createCharacter } from "./createCharacter";
import { getCharacter } from "./getCharacter";
import { updateCharacter } from "./updateCharacter";

export const characterRouter = router({
  createCharacter: createCharacter.procedure,
  getCharacter: getCharacter.procedure,
  getSpecificAttributes: getCharacter.getSpecificAttributes,
  updateCharacter: updateCharacter.procedure
});
