import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 5000,
  e2e: {
    baseUrl: "http://localhost:5173"
  }
});
