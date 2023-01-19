import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

function isImage(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export const userRouter = router({
  editName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentName: z.string(),
        newName: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.currentName === input.newName) {
        throw new Error('O nome atual é o mesmo que o novo nome.');
      }

      console.log(
        new Date(
          Date.now() -
            1000 *
              60 *
              60 *
              24 *
              (Number(process.env.USER_NAME_CHANGE_COOLDOWN_DAYS) || 60)
        )
      );

      // if the name was changed in the last 60 days, throw an error
      const lastChange = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
          name: input.currentName,
          nameWasLastChangedAt: {
            gte: new Date(
              Date.now() -
                1000 *
                  60 *
                  60 *
                  24 *
                  (Number(process.env.USER_NAME_CHANGE_COOLDOWN_DAYS) || 60)
            )
          }
        }
      });

      console.log(lastChange);

      if (lastChange !== null) {
        throw new Error(
          'O nome foi alterado nos últimos 60 dias. Por favor, tente novamente mais tarde.'
        );
      }

      if (input.newName.length < 2) {
        throw new Error('O nome deve ter pelo menos 2 caracteres.');
      }

      if (input.newName.length > 20) {
        throw new Error('O nome deve ter no máximo 20 caracteres.');
      }

      if (
        !/^(?=.{3,20}$)[a-zA-Z][a-zA-Z0-9_.^]*(?: [a-zA-Z0-9]+)*$/.test(
          input.newName
        )
      ) {
        throw new Error(
          'O nome não está de acordo com nossa políticas de nomes válidos.'
        );
      }

      const isThereAnUserWithNewName = await ctx.prisma.user.findFirst({
        where: {
          name: input.newName
        }
      });

      if (isThereAnUserWithNewName !== null) {
        throw new Error('Já existe um usuário com esse nome.');
      }

      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          name: input.newName,
          nameWasLastChangedAt: new Date()
        }
      });
    }),

  editImage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        newImage: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!isImage(input.newImage)) {
        throw new Error('A URL da imagem não é válida.');
      }

      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          image: input.newImage
        }
      });
    }),

  editBirthdate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        newBirthdate: z.date()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const dateToCheck = new Date();
      dateToCheck.setFullYear(dateToCheck.getFullYear() - 10);

      if (input.newBirthdate >= dateToCheck) {
        throw new Error(
          'A data de nascimento não é válida. Você precisa ter 10 anos ou mais.'
        );
      }

      // if birthdate is not null, throw error, because it can only be set once. Otherwise, update it.
      const birthdate = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
          birthdate: {
            not: null
          }
        }
      });

      if (birthdate !== null) {
        throw new Error('A data de nascimento já foi definida.');
      }

      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          birthdate: input.newBirthdate
        }
      });
    }),

  setCurrentCharacter: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentCharacterId: z.number()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          currentCharacter: input.currentCharacterId
        }
      });
    })
});
