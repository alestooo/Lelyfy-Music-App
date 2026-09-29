import { defineConfig } from "astro/config";

export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  server: {
    port: 4321,
  },

  vite: {
    server: {
      strictPort: true,

      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
        },
      },
    },
  },
});