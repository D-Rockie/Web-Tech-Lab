import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Every request the React app makes to /posts is forwarded to the Express
    // API on port 5050. The browser therefore sees a same-origin request and
    // no CORS problem can occur during development.
    proxy: {
      "/posts": "http://localhost:5050",
    },
  },
});
