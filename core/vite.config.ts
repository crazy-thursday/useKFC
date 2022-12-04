import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: ['src/vite-env.d.ts', 'src/test/**']
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'use-kfc',
      fileName: (formate) => `use-kfc.${formate}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
