import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 8080,
    },
    headers: {
      'Content-Security-Policy': mode === 'development' 
        ? "default-src 'self'; script-src 'unsafe-eval' 'self' 'unsafe-inline' localhost:* https://cdn.gpteng.co; connect-src 'self' localhost:* ws://localhost:* wss://localhost:* https://infragrid.v.network; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; worker-src 'self' blob:;"
        : undefined
    }
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
}));
