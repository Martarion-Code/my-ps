const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // The root directory for your Next.js project
});

// Add custom Jest configuration
const jestConfig = {
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Collect coverage from all files in the src folder
    '!src/pages/**', // Exclude pages folder (optional, if you don't want to test pages)
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
  ],
  coverageDirectory: 'coverage', // Where to store the coverage report
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!antd|some-other-module-to-transform).*/',
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // preset: 'next/jest', // Explicitly set the jest preset
  // transform: {
  //   '^.+\\.[t|j]sx?$': 'babel-jest', // Use babel-jest to transform files
  // },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'jsdom', // Use jsdom for the test environment
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  //   '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock static files
  // },
};

module.exports = createJestConfig(jestConfig);
