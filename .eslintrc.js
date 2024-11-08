module.exports = {
    // Tells ESLint that this is the project root, which
    // prevents searching for other config files in
    // ancestor directories
    root: true,
    // Tells ESLint that we are using node
    env: {
        node: true,
    },
    // Tells ESLint Jest is available globally in test env
    globals: {
        jest: true,
    },
    // Specifies the ESLint parser
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2020,

        // Allows for the use of imports
        sourceType: 'module',
    },
    extends: [
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',

        // Enables eslint-plugin-prettier and eslint-config-prettier.
        // This will display prettier errors as ESLint errors.
        // Make sure this is always the last configuration in the extends array.
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        '@typescript-eslint/no-unused-vars': [
            'error',
            { ignoreRestSiblings: true },
        ],
    },
};
