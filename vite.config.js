import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});