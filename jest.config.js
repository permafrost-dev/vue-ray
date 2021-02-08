module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/coverage/', '/tests/TestClasses/', '/tests/TestData/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    coverageDirectory: './coverage',
    coverageReporters: ['html-spa', 'text'],
    collectCoverageFrom: [
        'src/*.ts',
        'src/**/*.{ts,js}',
        '!**/build/**',
        '!**/dist/**',
        "!**/node_modules/**",
        '!**/tests/**',
        "!**/vendor/**",
    ],
};

