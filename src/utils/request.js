/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch {
    return {}
  }
}]

// 请求拦截器

// 响应拦截器
export default request
