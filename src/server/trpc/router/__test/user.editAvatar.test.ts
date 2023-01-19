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

describe('Editing user image', () => {
  test('should edit the user image', async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewImage = await caller.user.editImage({
      id: 'cld2aoyco00000hl8u74e33m0',
      newImage: 'https://via.placeholder.com/100.png'
    });

    console.log(userWithNewImage);
    expect(userWithNewImage);
  });

  test.fails("should throw error if image isn't a valid URL", async () => {
    const ctx = await createContextInner({
      session: {
        user,
        expires: new Date().toISOString()
      }
    });

    const caller = appRouter.createCaller(ctx);

    const userWithNewImage = await caller.user.editImage({
      id: 'cld2aoyco00000hl8u74e33m0',
      newImage: 'https://via.placeholder.com/100.html'
    });

    console.log(userWithNewImage);
    expect(userWithNewImage);
  });
});
