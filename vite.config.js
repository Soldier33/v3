const { resolve } = require('path');

// module.exports = {
export default {
  alias: {
    '/@/': resolve(__dirname, 'src')
  },
  // proxy: {
  //   '/api': 'https://qcpj.bnuz.edu.cn/',
  //   // '/api': {
  //   //   // target: 'http://49.235.41.66:38080/app/mock/17/post/',
  //   //   target: 'https://qcpj.bnuz.edu.cn/',
  //   //   changeOrigin: true,
  //   //   rewrite: path => path.replace(/^\/api/, '')
  //   // }
  // },
}