import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project is served from https://<user>.github.io/sap-learning/ on GitHub Pages,
// so assets must resolve under that base. Routing uses HashRouter to avoid any
// server-side rewrite config.
export default defineConfig({
  base: "/sap-learning/",
  plugins: [react()],
});
