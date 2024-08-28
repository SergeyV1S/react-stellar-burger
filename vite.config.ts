import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@fonts": path.resolve(__dirname, "./src/fonts"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces")
    }
  },
  build: {
    chunkSizeWarningLimit: 1000
  },
  preview: {
    port: 5173
  },
  server: {
    port: 5173
  }
});
