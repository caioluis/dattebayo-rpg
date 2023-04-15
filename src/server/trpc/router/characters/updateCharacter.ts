import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateCharacter = {
  procedure: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        age: z.number().optional(),
        name: z.string().optional(),
        icon: z.string().optional(),
        story: z.string().optional(),
        avatar: z.string().optional(),
        clanId: z.number().optional(),
        rankId: z.number().optional(),
        weight: z.number().optional(),
        height: z.number().optional(),
        villageId: z.number().optional(),
        appearance: z.string().optional(),
        personality: z.string().optional(),
        photoplayer: z.string().optional(),
        kekkeiGenkai: z.string().optional(),
        backgroundStory: z.string().optional(),

        ninjutsu: z.number().optional(),
        genjutsu: z.number().optional(),
        taijutsu: z.number().optional(),
        stamina: z.number().optional(),
        intelligence: z.number().optional(),
        strength: z.number().optional(),
        speed: z.number().optional(),
        handSeals: z.number().optional(),

        yin: z.number().optional(),
        yang: z.number().optional(),
        bukijutsu: z.number().optional(),
        combat: z.number().optional(),
        shurikenjutsu: z.number().optional(),
        fuinjutsu: z.number().optional(),
        raiton: z.number().optional(),
        futon: z.number().optional(),
        doton: z.number().optional(),
        suiton: z.number().optional(),
        katon: z.number().optional(),
        kekkaijutsu: z.number().optional(),
        kyuinjutsu: z.number().optional(),
        nagashi: z.number().optional(),
        kanchi: z.number().optional(),

        hp: z.number().optional(),
        chakra: z.number().optional(),

        luck: z.number().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
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

          luck: input.luck || undefined
        }
      });
    })
};
