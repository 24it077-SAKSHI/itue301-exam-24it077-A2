import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config — adds a dev proxy so frontend calls to /api
// automatically forward to the backend on port 5000.
// This avoids CORS issues during development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
