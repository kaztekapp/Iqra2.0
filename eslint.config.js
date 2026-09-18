// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*', 'supabase/functions/*', 'scripts/*', 'coverage/*', 'jest.config.js', 'eslint.config.js'],
  },
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      // Story data files are generated and reviewed as content, not as code.
      'no-irregular-whitespace': 'off',
      // An apostrophe inside <Text> renders as an apostrophe.
      'react/no-unescaped-entities': 'off',
      // Components are exported both as default and by name on purpose.
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      // Static assets are loaded with require() in React Native.
      '@typescript-eslint/no-require-imports': 'off',
      // Unused imports are removed automatically; unused variables must be
      // prefixed with an underscore to say they are unused on purpose.
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_', caughtErrors: 'none' }],
      // The React Compiler lints assume the compiler is on. It is not; these
      // patterns (reading a ref during render, setting state in an effect)
      // are used deliberately in the audio and narration code.
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      // Kept as a warning: each one needs a human to decide.
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
