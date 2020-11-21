import axios from 'axios'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
axios.defaults.withCredentials = true

const service = axios.create({
  // baseURL: 'https://qcpj.bnuz.edu.cn',  // 正式服
  // baseURL: 'http://172.31.44.177/',  // 测试服
  baseURL: 'http://localhost:3000', // 开发
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === -1) {
      Notify({ type: 'danger', message: res.msg })
      setTimeout(() => {
        location.href = '/'
      }, 2000)
    } else if (res.code === 400) {
      Notify({ type: 'danger', message: res.detail })
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
