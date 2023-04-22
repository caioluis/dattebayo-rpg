import { z } from "zod";
import { protectedProcedure } from "../../trpc";

const CharacterBasicInfo = z
  .object({
    id: z.number(),
    age: z.number(),
    name: z.string(),
    icon: z.string(),
    story: z.string(),
    avatar: z.string(),
    clanId: z.number(),
    rankId: z.number(),
    weight: z.number(),
    height: z.number(),
    villageId: z.number(),
    appearance: z.string(),
    personality: z.string(),
    photoplayer: z.string(),
    kekkeiGenkai: z.string(),
    backgroundStory: z.string()
  })
  .partial();

const CharacterPrimaryAttributes = z
  .object({
    ninjutsu: z.number(),
    genjutsu: z.number(),
    taijutsu: z.number(),
    stamina: z.number(),
    intelligence: z.number(),
    strength: z.number(),
    speed: z.number(),
    handSeals: z.number()
  })
  .partial();

const CharacterSecondaryAttributes = z
  .object({
    yin: z.number(),
    yang: z.number(),
    bukijutsu: z.number(),
    combat: z.number(),
    shurikenjutsu: z.number(),
    fuinjutsu: z.number(),
    raiton: z.number(),
    futon: z.number(),
    doton: z.number(),
    suiton: z.number(),
    katon: z.number(),
    kekkaijutsu: z.number(),
    kyuinjutsu: z.number(),
    nagashi: z.number(),
    kanchi: z.number()
  })
  .partial();

const CharacterStatus = z
  .object({
    hp: z.number(),
    chakra: z.number(),
    hpExtra: z.number(),
    chakraExtra: z.number(),
    luck: z.number()
  })
  .partial();

const CharacterAndPrimaryAttributes = CharacterBasicInfo.merge(CharacterPrimaryAttributes);
const CharacterAndAttributes = CharacterAndPrimaryAttributes.merge(CharacterSecondaryAttributes);
const Character = CharacterAndAttributes.merge(CharacterStatus);

type Character = z.infer<typeof Character>;

export const updateCharacter = {
  procedure: protectedProcedure.input(Character).mutation(async ({ input, ctx }: { input: Character; ctx }) => {
    return await ctx.prisma.character.update({
      where: {
        id: input.id
      },
      data: {
        ...input
      }
    });
  })
};
