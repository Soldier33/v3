import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://49.235.41.66:38080/app/mock/17/post/',
  // baseURL: 'http://49.235.41.66:38080/app/mock/17/get/',
  baseURL: 'https://qcpj.bnuz.edu.cn',
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://172.31.44.177/',
  // headers: {
  //   "content-type": "application/json; charset=UTF-8",
  // },
  // timeout: 120000
})

service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.code !== 200) {
    //   console.log(res);
      
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
      return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
