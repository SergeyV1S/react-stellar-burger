import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@fonts": path.resolve(__dirname, "./src/fonts"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks")
    }
  },
  define: {
    "process.env": process.env
  },
  build: {
    chunkSizeWarningLimit: 1000
  },
  preview: {
    port: 5173
  },
  server: {
    port: 5173
  },
  envPrefix: ["VITE_", "BASE_"]
});
