import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Base relativa: funciona sin importar el nombre del repo en GitHub Pages
  // (usuario.github.io/nombre-del-repo/). Si prefieres, puedes reemplazarlo
  // por "/nombre-exacto-de-tu-repo/".
  base: "./",
  plugins: [tailwindcss()],
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
      },
    },
  },
});
