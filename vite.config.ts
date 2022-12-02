/*
 * @Author: ND_LJQ
 * @Date: 2022-12-02 14:44:13
 * @LastEditors: ND_LJQ
 * @LastEditTime: 2022-12-02 15:16:21
 * @Description:
 * @Email: ndliujunqi@outlook.com
 */
import { fileURLToPath, URL } from 'node:url';
import { viteMockServe } from 'vite-plugin-mock';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    viteMockServe({
      supportTs: true,
      logger: false,
      mockPath: './src/mock/',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, './src/packages/index.ts'),
      name: 'lvextUI',
      fileName: `lvext-ui`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
