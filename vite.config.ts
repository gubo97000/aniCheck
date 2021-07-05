import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      // mode: "development",
      // strategies: 'injectManifest',
      // srcDir: 'src',
      // filename: 'service-worker.ts',
      manifest: {
        name: "AniCheck",
        short_name: "AniCheck",
        description: "Check you Anime/Manga completion status",
        icons: [
          {
            src: "pwaicon.png",
            sizes: "640x640",
            type: "image/png",
            purpose: " any maskable",
          },
        ],
      },
      workbox: {
        // workbox options for generateSW
      },
    }),
  ],
  base: "/aniCheck/",
  resolve: {
    alias: [
      {
        find: /^@material-ui\/icons\/(.*)/,
        replacement: "@material-ui/icons/esm/$1",
      },
    ],
  },
  build: {
    terserOptions: {
      mangle: {
        reserved: ["cytoscape", "__assign"],
      },
    },
  },
});
