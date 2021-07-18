module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testTimeout: 20000,
  collectCoverageFrom: [
    "src/**/*"
  ]
};