function makeModuleNameMapper(sourcePath, tsconfigPath) {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  // Iterate over paths and convert them into moduleNameMapper format
  for (const item of Object.keys(paths)) {
    const key = item.replace('/*', '/(.*)');
    const path = paths[item][0].replace('/*', '/$1');
    aliases[key] = `${sourcePath}/${path}`;
  }
  return aliases;
}

const TS_CONFIG_PATH = './tsconfig.json';
const SRC_PATH = '<rootDir>/';

module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  preset: 'ts-jest',

  testEnvironment: 'jsdom',
  globals: {
    jsx: 'react',
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  setupFiles: ['<rootDir>/tests/test-setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
  // moduleNameMapper: {
  //   '~graphql/(.*)': '<rootDir>/graphql/$1',
  //   '~graphqlQ/(.*)': '<rootDir>/graphql/queries/$1',
  //   '~graphqlM/(.*)': '<rootDir>/graphql/mutations/$1',
  //   '~views/(.*)': '<rootDir>/views/$1',
  //   '~viewsUi/(.*)': '<rootDir>/views/ui/$1',
  //   '~viewsComp/(.*)': '<rootDir>/views/components/$1',
  //   '~viewsLay/(.*)': '<rootDir>/views/layouts/$1',
  //   '~styles/(.*)': '<rootDir>/styles/$1',
  //   '~lib/(.*)': '<rootDir>/lib/$1',
  //   '~assets/(.*)': '<rootDir>/assets/$1',
  //   '~static/(.*)': '<rootDir>/public/static/$1',
  //   '~pages/(.*)': '<rootDir>/pages/$1',
  // },
};
