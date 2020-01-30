<template>
  <div class="edit-name">
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
    />
    <van-field
      class="field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="20"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  name: 'EditName',
  components: {},
  props: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #fff;
  .van-nav-bar__title {
    color: #333;
  }
}
.field {
  background: #fff;
  /deep/ .van-cell__value {
    background: #f5f5f5;
    padding: 10px;
  }
}
</style>
