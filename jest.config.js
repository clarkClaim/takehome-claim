module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ['.js'],
    setupFilesAfterEnv: ['./jest.setup.js'],
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