const path = require('path');

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['.eslintrc.js', 'postcss.config.js', '**/server/**/*'],
            env: {
                browser: false,
                node: true
            }
        }
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
};
