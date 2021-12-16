import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// https://vitejs.dev/config/

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/',
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${pathResolve('src/style/CONST.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    brotliSize: true //启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
  }
})
