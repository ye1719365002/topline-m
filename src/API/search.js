/**
 * 搜索接口模块
 */
import request from '@/utils/request'

/**
 * 获取搜索联想建议
 */
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: q
    }
  })
}
/**
 * 获取搜索联想建议
 */
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
