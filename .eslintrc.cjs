module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } },
  plugins: ['@typescript-eslint','react'],
  extends: ['eslint:recommended','plugin:react/recommended','plugin:@typescript-eslint/recommended'],
  settings: { react: { version: 'detect' } },
  env: { browser: true, node: true, es2022: true }
}
