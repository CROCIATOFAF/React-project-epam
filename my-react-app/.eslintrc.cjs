module.exports = {
  root: true,
  env: { 
    browser: true,
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh', 'react-compiler', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    "react-compiler/react-compiler": "error",
    'react-compiler/rules-of-hooks': 'error',
    'react-compiler/react-in-jsx-scope': 'error',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
