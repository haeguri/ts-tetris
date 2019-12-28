module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      enableTsDiagnostics: true
    }
  },
  moduleNameMapper: {
    "^enums(.*)$": "<rootDir>/src/enums/$1",
    "^types(.*)$": "<rootDir>/src/types/$1",
    "^datas(.*)$": "<rootDir>/src/datas/$1"
  }
};
