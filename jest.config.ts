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
    "^.+\\.css$": "identity-obj-proxy"
  }
};

export default config;
