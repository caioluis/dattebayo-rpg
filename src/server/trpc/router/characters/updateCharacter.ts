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

export const updateCharacter = {
  procedure: protectedProcedure.input(Character).mutation(async ({ input, ctx }) => {
    console.log(input);
    return await ctx.prisma.character.update({
      where: {
        id: input.id
      },
      data: {
        age: input.age || undefined,
        name: input.name || undefined,
        icon: input.icon || undefined,
        story: input.story || undefined,
        avatar: input.avatar || undefined,
        clanId: input.clanId || undefined,
        rankId: input.rankId || undefined,
        weight: input.weight || undefined,
        height: input.height || undefined,
        villageId: input.villageId || undefined,
        appearance: input.appearance || undefined,
        personality: input.personality || undefined,
        photoplayer: input.photoplayer || undefined,
        kekkeiGenkai: input.kekkeiGenkai || undefined,
        backgroundStory: input.backgroundStory || undefined,
        ninjutsu: input.ninjutsu || undefined,
        genjutsu: input.genjutsu || undefined,
        taijutsu: input.taijutsu || undefined,
        stamina: input.stamina || undefined,
        intelligence: input.intelligence || undefined,
        strength: input.strength || undefined,
        speed: input.speed || undefined,
        handSeals: input.handSeals || undefined,
        yin: input.yin || undefined,
        yang: input.yang || undefined,
        bukijutsu: input.bukijutsu || undefined,
        combat: input.combat || undefined,
        shurikenjutsu: input.shurikenjutsu || undefined,
        fuinjutsu: input.fuinjutsu || undefined,
        raiton: input.raiton || undefined,
        futon: input.futon || undefined,
        doton: input.doton || undefined,
        suiton: input.suiton || undefined,
        katon: input.katon || undefined,
        kekkaijutsu: input.kekkaijutsu || undefined,
        kyuinjutsu: input.kyuinjutsu || undefined,
        nagashi: input.nagashi || undefined,
        kanchi: input.kanchi || undefined,
        hp: input.hp || undefined,
        chakra: input.chakra || undefined,
        hpExtra: input.hpExtra || undefined,
        chakraExtra: input.chakraExtra || undefined,
        luck: input.luck || undefined
      }
    });
  })
};
