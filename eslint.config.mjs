import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat();
export default [
  ...compat.config({
    extends: ['plugin:cypress/recommended'],
    ignorePatterns: ['node_modules']
  })
];
