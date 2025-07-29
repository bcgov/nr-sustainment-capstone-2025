import type {Config} from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  setupFilesAfterEnv: ['./jest.setup.ts'],

  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  testEnvironment: "jsdom",

  transformIgnorePatterns: ['/node_modules/(?!@bcgov)'],

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'babel-jest',
  },
  
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
    },
  },
  
};

export default config;
