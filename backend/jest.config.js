module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: '.(test|spec).tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'node', 'js', 'jsx'],
  bail: true,
};
