/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageReporters: ['html'],
  collectCoverageFrom: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
    './utils/**/.ts',
    '!./pages/_app.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 65,
      lines: 70,
      statements: 65,
    },
  },
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^utils(.*)$': '<rootDir>/utils$1',
    '^public(.*)$': '<rootDir>/public$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  roots: ['pages', 'components', 'utils'],
};
