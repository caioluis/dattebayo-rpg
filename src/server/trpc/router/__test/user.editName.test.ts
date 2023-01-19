import { createContextInner } from '../../context';
import { appRouter } from '../_app';
import { describe, expect, test } from 'vitest';

const user = {
  id: 'cld2aoyco00000hl8u74e33m0',
  name: 'Akihito',
  nameWasLastChangedAt: new Date('2022-01-17T15:25:31.476Z'),
  email: 'akihito@dattebayo.ninja',
  emailVerified: null,
  image:
    'https://cdn.discordapp.com/avatars/466564113531666442/2c27cce69f6616c2588de11ac46aa5f3.webp?size=100',
  birthdate: null,
  createdAt: new Date('2023-01-18T19:25:31.476Z'),
  currentCharacter: null,
  maxNumberOfCharacters: 1,
  narutomakis: 0
};

describe('Editing user name', () => {
  test.fails('should throw error saying the name is too long', async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewUsername = await caller.user.editName({
      id: 'cld2aoyco00000hl8u74e33m0',
      currentName: 'Akihito',
      newName: 'Wesley Alves de Oliveira'
    });

    console.log(userWithNewUsername);
    expect(userWithNewUsername);
  });

  test.fails('should throw error saying the name is too short', async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewUsername = await caller.user.editName({
      id: 'cld2aoyco00000hl8u74e33m0',
      currentName: 'Akihito',
      newName: 'W'
    });

    console.log(userWithNewUsername);
    expect(userWithNewUsername);
  });

  test('should update the user name', async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewUsername = await caller.user.editName({
      id: 'cld2aoyco00000hl8u74e33m0',
      currentName: 'Akihito',
      newName: 'WyAlves'
    });

    console.log(userWithNewUsername);
    expect(userWithNewUsername);
  });

  test.fails(
    'should throw error if the user name was updated recently',
    async () => {
      const ctx = await createContextInner({
        session: {
          ...user,
          expires: new Date().toISOString()
        }
      });

      const caller = appRouter.createCaller(ctx);

      const userWithNewUsername = await caller.user.editName({
        id: 'cld2aoyco00000hl8u74e33m0',
        currentName: 'WyAlves',
        newName: 'Akihito'
      });

      console.log(userWithNewUsername);
      expect(userWithNewUsername);
    }
  );

  test.fails(
    'should throw error saying there is a user with this name',
    async () => {
      const ctx = await createContextInner({
        session: {
          user,
          expires: new Date().toISOString()
        }
      });

      const caller = appRouter.createCaller(ctx);

      const userWithNewUsername = await caller.user.editName({
        id: 'cld2aoyco00000hl8u74e33m0',
        currentName: 'Akihito',
        newName: 'WyAlves'
      });

      console.log(userWithNewUsername);
      expect(userWithNewUsername);
    }
  );
});
