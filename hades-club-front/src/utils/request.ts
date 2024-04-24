import { message } from 'antd'
import axios from 'axios'

export default function request(config, url) {
  // const navigate = useNavigate()
  const userInfoStorage = localStorage.getItem('userInfo')
  const userInfo = userInfoStorage ? JSON.parse(userInfoStorage) : {}
  const baseURL = url || '/subject/subject'
  // const baseURL = url || '/subject'
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL,
    timeout: 5 * 60 * 1000, // request timeout
    withCredentials: true, // send cookies when cross-domain requests
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      [userInfo.tokenName]: 'jichi ' + userInfo.tokenValue,
      loginId: userInfo.loginId || ''
    }
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err)
    }
  )

  // 2.2.响应拦截
  instance.interceptors.response.use(
    res => {
      let { code } = res.data
      if (code === 500) {
        // message.error(res.data.message)
      }
      if (code === 401) {
        window.location.replace('/login')
      }
      return res.data
    },
    err => {
      let { status } = err?.response ?? {}
      if (status === 401 || !status) {
        message.info('页面异常')
        window.location.replace('/login')
      } else if (status === 500 || status === 503) {
        message.error('服务器错误')
      }
      return Promise.reject(err)
    }
  )

  // 3.发送真正的网络请求
  return instance(config)
}
