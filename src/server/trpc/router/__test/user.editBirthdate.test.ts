import { createContextInner } from "../../context";
import { appRouter } from "../_app";
import { describe, expect, test } from "vitest";

const user = {
  id: "cld2aoyco00000hl8u74e33m0",
  name: "Akihito",
  nameWasLastChangedAt: null,
  email: "akihito@dattebayo.ninja",
  emailVerified: null,
  image: "https://cdn.discordapp.com/avatars/466564113531666442/2c27cce69f6616c2588de11ac46aa5f3.webp?size=100",
  birthdate: null,
  createdAt: new Date("2023-01-18T19:25:31.476Z"),
  currentCharacter: null,
  maxNumberOfCharacters: 1,
  narutomakis: 0
};

describe("Editing user birthdate", () => {
  test.fails("should throw error if birthdate is less than 10 years ago", async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewBirthdate = await caller.user.editBirthdate({
      id: "cld2aoyco00000hl8u74e33m0",
      newBirthdate: new Date()
    });

    console.log(userWithNewBirthdate);
    expect(userWithNewBirthdate);
  });

  test("should edit the user birthdate", async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewBirthdate = await caller.user.editBirthdate({
      id: "cld2aoyco00000hl8u74e33m0",
      newBirthdate: new Date("2000-01-01")
    });

    console.log(userWithNewBirthdate);
    expect(userWithNewBirthdate);
  });

  test.fails("should throw error if birthdate is already set", async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewBirthdate = await caller.user.editBirthdate({
      id: "cld2aoyco00000hl8u74e33m0",
      newBirthdate: new Date("2000-01-01")
    });

    console.log(userWithNewBirthdate);
    expect(userWithNewBirthdate);
  });
});
