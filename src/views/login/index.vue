import './utils/validation.js'
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <!--
      vee-validate 验证插件的具体使用
      1、使用 ValidationObserver 把需要校验的整个表单包起来
      2、使用 ValidationProvider 把需要校验的具体表单元素包起来，例如 input
      3、通过 ValidationProvider 配置具体的校验规则
        name      配置验证字段的名称
        rules     验证规则
          rules="requried" 单个验证规则
          rules="required|length:4" 多个验证规则使用 | 分隔
        v-slot="{ errors }" 获取错误消息
     -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required">
        <van-field
          class="form-item"
          v-model="user.mobile"
          clearable
          placeholder="请输入手机号"
        >
          <i class="icon icon-shouji" slot="left-icon"></i>
        </van-field>
        <!-- errors[0] 获取验证失败的错误消息 -->
        <!-- <span>{{ errors[0] }}</span> -->
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required">
        <van-field
          class="form-item"
          v-model="user.code"
          placeholder="请输入验证码"
        >
          <i class="icon icon-mima" slot="left-icon"></i>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            round
            @click="onSendSmsCode"
          >发送验证码</van-button>
        </van-field>
      </ValidationProvider>
    </ValidationObserver>

    <div class="btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, getSmsCode } from '@/API/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1. 获取表单数据
      const user = this.user

      // 2. 表单验证（完事儿了再说）
      const success = await this.$refs.form.validate()

      // 如果验证失败，提示错误消息，停止表单提交
      if (!success) {
        // 这里加定时器的原因是因为获取验证失败的结果有延迟问题，并不是我们的原因
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          // const item = Object.values(errors).find(item => item[0])

          // 找到第1个有错误的字段并弹出提示
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
        }, 100)
        return
      }

      // 表单验证通过，开始 loading 转圈圈
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 3. 请求提交
      try {
        const res = await login(user)
        // console.log(res.data.data)
        this.$store.commit('setUser', res.data.data)

        // 提示登录成功
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }

      // 4. 根据接口返回结果执行后续处理
    },

    async onSendSmsCode () {
      // 1. 获取手机号
      const { mobile } = this.user
      // 2. 校验手机号是否有效
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })

      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }

      // 3. 发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true

        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        console.log(err)

        // 发送失败，关闭倒计时
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }

        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn-wrap {
  padding: 27px 16px;
  .van-button {
    width: 100%;
    background: #6db4fb;
  }
}

.form-item {
  align-items: center;
  height: 45px;
}
</style>
