import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "WebComponents",
      fileName: "index",
      formats: ["es"],
    },
    outDir: "dist",
    rollupOptions: {
      external: ["lit"],
      output: {
        globals: {
          lit: "lit",
        },
      },
    },
  },
});
