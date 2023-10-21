import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {comlink} from 'vite-plugin-comlink';
import {VitePWA} from 'vite-plugin-pwa';
// import path from "path";
import {ViteAliases} from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: true,
  // },
  plugins: [
    react(),
    ViteAliases({
      useAbsolute: true,
    }),
    // mkcert({
    //   // hosts:
    // }),
    VitePWA({
      // mode: "development",
      // strategies: 'injectManifest',
      // srcDir: 'src',
      // filename: 'service-worker.ts',
      registerType: 'autoUpdate',
      manifest: {
        name: 'AniCheck',
        short_name: 'AniCheck',
        description: 'Check you Anime/Manga completion status',
        display: 'standalone',
        start_url: '/?standalone=true',
        icons: [
          {
            src: 'pwaicon.png',
            sizes: '640x640',
            type: 'image/png',
            purpose: 'any maskable',
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
  base: '/',
  // resolve: {
  //   alias: {
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  // },
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
    target: 'esnext',
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
