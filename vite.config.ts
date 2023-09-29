import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { comlink } from "vite-plugin-comlink";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // mode: "development",
      // strategies: 'injectManifest',
      // srcDir: 'src',
      // filename: 'service-worker.ts',
      registerType: "autoUpdate",
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
      devOptions: {
        enabled: true,
      },
    }),
    comlink(),
  ],
  // base: "/aniCheck/",
  base: "/",
  worker: {
    plugins: [comlink()],
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: /^@material-ui\/icons\/(.*)/,
  //       replacement: "@mui/icons-material/esm/$1",
  //     },
  //   ],
  // },
  build: {
    target: "esnext",
    // minify: "terser",
    // minify: false,
    // terserOptions: {
    //   mangle: {
    //     reserved: ["cytoscape", "__assign"],
    //   },
    // },
  },
  // esbuild:{
  //   // down here the equivalent of terser option above
  //   keepNames: true,

  // }
});
