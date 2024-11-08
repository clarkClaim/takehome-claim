module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ['.js'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
                workerIdleMemoryLimit: '512MB',
            },
        ],
    },
};
