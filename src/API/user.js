// 用户相关的请求模块
import request from '@/utils/request'
export const login = (data) => {
  return request({
    //   请求方法
    method: 'POST',
    // 请示路径

    url: '/app/v1_0/authorizations',

    // body请求体参数
    data
  })
}

export const getSmsCode = (mobile) => {
  return request({

    method: ' GET',
    url: `/app/v1_0/sms/codes/${mobile}`,

    
  })
}
