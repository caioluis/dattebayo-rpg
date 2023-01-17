import { createContextInner } from '../../context';
import { appRouter } from '../_app';
import { expect, test } from 'vitest';

const user = {
  id: '1',
  name: 'test',
  email: 'test@email.com',
  emailVerified: null,
  image: null,
  birthdate: null,
  narutomakis: 0,
  currentCharacter: 1,
  maxNumberOfCharacters: 1,
  createdAt: new Date()
};

test('Edit user name', async () => {
  const ctx = await createContextInner({
    session: {
      user,
      expires: new Date().toISOString()
    }
  });

  const caller = appRouter.createCaller(ctx);

  const userWithNewUsername = await caller.user.editName({
    id: '1',
    currentName: 'test2',
    newName: 'test'
  });

  console.log(userWithNewUsername);
  expect(userWithNewUsername);
});
