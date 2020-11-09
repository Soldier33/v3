const { resolve } = require('path');
const proxyPlugin = require('vite-plugin-proxy')

export default {
  proxy: {
    '/api': {
      target: 'http://172.31.44.177',
      changeOrigin: true,
      secure: false,
    },
    '/test': {
      target: 'http://49.235.41.66:38080/app/mock/17/get/',
      changeOrigin: true,
      secure: false,
    }
  },
  alias: {
    '/@/': resolve(__dirname, 'src')
  },  
}