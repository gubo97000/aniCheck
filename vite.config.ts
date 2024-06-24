import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {ViteAliases} from 'vite-aliases';
import {VitePWA} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: true,
  // },
  plugins: [
    react(),
    ViteAliases({
      depth: 1,
      // useAbsolute: true,
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
        theme_color: '#000000',
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
    // comlink(),
  ],
  // base: "/aniCheck/",
  base: '/',
  // resolve: {
  //   alias: {
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  // },
  worker: {
    plugins: () => [
      // comlink()
    ],
  },

  build: {
    target: 'esnext',
  },
});
