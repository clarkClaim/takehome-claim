module.exports = {
    // Default to using single quotes when possible
    // Keep: 'Hello world!'
    // Change: "Hello world!"
    singleQuote: true,

    // Use 4 spaces for tabs, except in YAML (due to Hasura conflicts)
    tabWidth: 4,
    overrides: [
        {
            files: ['*.yaml', '*package.json', '*package-lock.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
