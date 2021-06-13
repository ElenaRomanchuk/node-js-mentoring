module.exports = {
  moduleFileExtensions: ['js'],
  testRegex: '/test/.*\\.test.(js)$',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/test/mock/',
  ],
};
