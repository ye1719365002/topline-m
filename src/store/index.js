import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // null、{ token, refresh_token, 用户id等信息 }
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      // console.log(data)
      // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
      setItem('user', data)
      if (data && data.token) {
        // 解析 data.token
        data.id = decodeJwt(data.token).user_id
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
