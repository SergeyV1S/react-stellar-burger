import type { Config } from "jest";

const config: Config = {
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@images/(.*)$": "<rootDir>/src/images/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1"
  }
};

export default config;
