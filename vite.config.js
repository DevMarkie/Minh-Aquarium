import { defineConfig } from "vite";
import path from "path";

const srcDir = path.resolve(__dirname, "src");

export default defineConfig({
  base: "./",
  root: srcDir,
  server: {
    open: "/index.html",
    port: 5173,
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
    fs: {
      allow: [srcDir, __dirname],
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(srcDir, "index.html"),
        products: path.resolve(srcDir, "products.html"),
        cart: path.resolve(srcDir, "cart.html"),
        login: path.resolve(srcDir, "login.html"),
        blog: path.resolve(srcDir, "blog.html"),
        services: path.resolve(srcDir, "services.html"),
      },
    },
  },
});
