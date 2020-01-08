<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- 导航栏 -->

    <!-- 表单 -->
    <van-cell-group>
  <van-field
    v-model="user.mobile"
    required
    clearable
    label="手机号"
    placeholder="请输入手机号"/>

  <van-field
  v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
    required>
    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
    </van-field>
</van-cell-group>
    <!-- 表单 -->
    <!-- 登录按钮 -->
    <div class="btn-wrap">
        <van-button type="info" @click="onLogin">登录</van-button>

    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
import { login } from '@/API/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810'// 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3.请求提交
      try {
        const res = await login(user)
        console.log(res)
        // 提示登录成功

        this.$toast.success('登陆成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
      // 4.根据接口返回结果执行后续处理
    }
  }
}
</script>

<style scoped lang="less">
.btn-wrap{
    padding: 27px 16px;
    .van-button{
        width: 100%;
        background:#6db4fb;
    }
}
</style>
