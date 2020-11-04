const { resolve } = require('path');

// module.exports = {
export default {
  devServer: {
    port: '3000',
    proxy: {
      '/api': 'https://qcpj.bnuz.edu.cn/',
    },
  }
}