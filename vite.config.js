import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost.bing.com',
    https: {
      key: './localhost.bing.com-key.pem',
      cert: './localhost.bing.com.pem',
    },
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'New Bing Chat Helper',
        icon: 'https://vitejs.dev/logo.svg',
        author: 'zhangnew',
        license: 'MIT',
        description: '新的对话开头自动加上一些提示; 对话被强制结束的时候,自动复制最后一个问题,并粘贴到下一次对话. Automatic input prompt for new session and Automatic copy the last question when the session is ended',
        namespace: 'https://github.com/zhangnew',
        homepage: 'https://github.com/zhangnew/bing-chat-script',
        match: ['https://www.bing.com/search'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});