import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import dotenv from "dotenv";
import checker from "vite-plugin-checker";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), checker({ typescript: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  css: {
    modules: {},
  },
});
