import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product_listing: resolve(__dirname, 'src/product_listing/index.html'),
      }
    }
  }
});

