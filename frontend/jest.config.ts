import type {Config} from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  testEnvironment: "jsdom",

  transformIgnorePatterns: ['/node_modules/(?!@bcgov)'],

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'babel-jest',
  },
};

export default config;
