import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
      "/ws": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
  },
});
