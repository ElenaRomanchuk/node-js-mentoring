module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  testRegex: '/.*\\.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/test/mock/',
  ],
};
