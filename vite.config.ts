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
    build: {
        terserOptions: {
            mangle: {
                reserved: ['cytoscape',"__assign"],
            }
        }
    }
})
