import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    deps: {
      interopDefault: true
    }
  }
});
