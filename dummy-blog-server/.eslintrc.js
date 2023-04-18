module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': ['off'],
    'import/no-unresolved': ['off'],
    'import/extensions': ['off'],
    'react/prop-types': ['off'],
    'prettier/prettier': ['error'],
  },
};
