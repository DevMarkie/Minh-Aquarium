import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    open: '/index.html',
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        index:    'index.html',
        products: 'products.html',
        cart:     'cart.html',
        login:    'login.html',
        blog:     'blog.html',
        services: 'services.html',
      }
    }
  }
});
