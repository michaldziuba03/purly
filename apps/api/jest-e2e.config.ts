/* eslint-disable */
export default {
  displayName: 'API E2E',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.e2e-spec.ts'],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  setupFilesAfterEnv: ['<rootDir>/e2e/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'html'],
};
