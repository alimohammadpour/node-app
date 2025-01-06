module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  // transform: {
  //   "^.+.tsx?$": ["ts-jest",{}],
  // },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};