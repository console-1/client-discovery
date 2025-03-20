import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Configure SWC for better security
      jsxImportSource: "@emotion/react",
      plugins: [
        ["@swc/plugin-emotion", {
          sourceMap: true,
          autoLabel: true,
          labelFormat: "[local]",
          cssPropOptimization: true,
        }],
      ],
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
