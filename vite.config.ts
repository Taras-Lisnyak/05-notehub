import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  base: isGhPages ? "/05-notehub/" : "/"
});