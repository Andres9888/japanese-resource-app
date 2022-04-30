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

const TS_CONFIG_PATH = '../tsconfig.json';
const SRC_PATH = '<rootDir>/';

// module.exports = {
//   roots: [SRC_PATH],
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
// };

module.exports = {
  verbose: true,
  testRegex: 'unit.test',
  roots: [SRC_PATH],
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testEnvironment: 'node',
  globals: {
    jsx: 'react',
    'ts-jest': {
      tsConfig: '../tsconfig.jest.json',
    },
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
