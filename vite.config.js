import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    // Use root '/' for local dev server ('serve'), and GitHub Pages path for production builds ('build')
    base: command === "serve" ? "/" : "/wdd330-sleepoutside-team17/",
    root: "src/",

    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          cart: resolve(__dirname, "src/cart/index.html"),
          checkout: resolve(__dirname, "src/checkout/index.html"),
          checkoutSuccess: resolve(__dirname, "src/checkout/success.html"),
          product: resolve(__dirname, "src/product_pages/index.html"),
          productListing: resolve(__dirname, "src/product_listing/index.html"),
          wishlist: resolve(__dirname, "src/wishlist/index.html"),
        },
      },
    },
  };
});