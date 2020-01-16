<template>
    <div class="home-container">
    <!-- 导航栏 -->
    <!-- <van-nav-bar title="首页" fixed /> -->
    <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      tab 组件
        v-model="active" 控制被激活的标签
        title 标签标题
     -->
    <van-tabs v-model="active">
      <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
      <van-tab
        :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh> -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
           <!--
        让子组件双向绑定 active
        在组件上使用 v-model
          默认传递一个名字叫 value的数据给子组件 :value="active"
          默认监听名字叫 input 的自定义事件： @input="active = 事件参数"
            当子组件内部发布：this.$emit('input', 123)
        v-model 还是父子通信
        什么时候用？当你想要在子组件和父组件之间同步一些数据的时候，建议使用 v-model，更简洁
        它的本质还是父子组件通信
        在一个组件上，v-mode 只能使用一次
      -->
      <channel-edit
        :user-channels="userChannels"
        v-model="active"
        @close="isChannelEditShow = false"
      />
    </van-popup>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/API/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制激活的标签页
      // list: [],
      // loading: false,
      // finished: false,
      // isLoading: false,
      userChannels: [], // 用户频道列表
      isChannelEditShow: false // 频道编辑的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    // 上拉加载更多调用 onLoad
    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 2000)
    // },
    // // 下拉刷新调用 onRefresh
    // onRefresh () {
    //   setTimeout(() => {
    //     this.$toast('刷新成功')
    //     this.isLoading = false
    //   }, 500)
    // },
    async loadUserChannels () {
      // 1. 定义一个变量用来存储频道列表
      let channels = []
      // 2. 获取本地存储的频道列表
      const localUserChannles = getItem('user-channels')
      // 3. 如果本地存储有，就使用本地存储的
      if (localUserChannles) {
        channels = localUserChannles
      } else {
        // 4. 如果本地存储没有，则请求获取接口推荐的频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      }
      // 5. 最后，把数据赋值到当前组件中
      this.userChannels = channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("../../assets/logo-light.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }
}
/* 在有作用域样式的组件中：默认只能对子组件的根节点样式生效 */
// .vue 文件中有一个专有的特殊语法：让样式作用的更深（主要针对的子组件）
// 使用 >>>、/deep/、::v-deep
::v-deep .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 2;
  }
}
</style>
