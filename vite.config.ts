import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    base: "/aniCheck/",
    resolve: {
        alias: [
            {
                find: /^@material-ui\/icons\/(.*)/,
                replacement: '@material-ui/icons/esm/$1',
            },
        ],
    },
    // optimizeDeps: {
    //     keepNames: true,
    // },
    // esbuild: {
    //     // keepNames: true,
    // },
    build: {
        // minify: false,
        terserOptions: {
            mangle: {
                // module: false,
                reserved: ['cytoscape',"__assign"],
                // keep_fnames: /cytoscape/g,
                // keep_classnames: /cytoscape/g,
            }
        }
    }
})
