import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/validation.js'
// 加载初始化日期处理
import './utils/datatime'

// 动态设置REM基准值（html标签字体大小）
import 'amfe-flexible'
// 注册vant组件
import './utils/register-vant'
// 加载全局样式
import './styles/index.less'
// // 加载
// import { Button,
//   Cell,
//   CellGroup
// } from 'vant'
// // 注册
// Vue.use(Button).use(Cell).use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
