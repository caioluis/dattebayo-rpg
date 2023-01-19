// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema, testServerSchema } from './schema.mjs';
import { env as clientEnv, formatErrors } from './client.mjs';

console.log('Validating server-side environment variables...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_NODE_ENV:', process.env.VITE_NODE_ENV);

const _serverEnv =
  process.env.VITE_NODE_ENV == 'test'
    ? testServerSchema.safeParse(process.env)
    : serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_serverEnv.error.format())
  );
  throw new Error('Invalid environment variables');
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.warn('❌ You are exposing a server-side env-variable:', key);

    throw new Error('You are exposing a server-side env-variable');
  }
}

export const env = { ..._serverEnv.data, ...clientEnv };
