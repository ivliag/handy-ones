module.exports = {
    root: true,
    extends: ["@handy-ones/eslint-config"],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
    }
};
