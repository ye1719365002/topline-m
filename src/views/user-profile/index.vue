<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
       <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isEditNameShow = true"
      />
      <!-- <van-cell title="介绍" :value="user." is-link /> -->
      <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
    >
       <edit-name
        :name="user.name"
        @close="isEditNameShow = false"
        @confirm="onSave"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/API/user'
import EditName from './components/edit-name'
export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  props: {},
  data () {
    return {
      user: {}, // 用户资料
      isEditNameShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadProfile()
  },
  mounted () {},
  methods: {
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    },
    async onSave (name) {
      // 修改数据
      this.user.name = name
      await updateUserProfile({
        name
      })
      console.log('更新成功')
    }
  }
}
</script>

<style scoped></style>
