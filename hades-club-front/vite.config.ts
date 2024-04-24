import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const path = require('path')

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            common: ['axios', 'lodash', 'pubsub-js', 'wangeditor']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@imgs': path.resolve(__dirname, 'src/imgs'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@features': path.resolve(__dirname, 'src/store/features')
      }
    },
    plugins: [react()],
    server: {
      proxy: {
        '/subject': {
          target: env.VITE_API_HOST,
          changeOrigin: true
        },
        '/auth': {
          target: env.VITE_API_HOST,
          changeOrigin: true
        },
        '/oss': {
          target: env.VITE_API_HOST,
          changeOrigin: true
        },
        '/practice': {
          target: env.VITE_API_HOST,
          changeOrigin: true
        }
      }
    }
  })
}
