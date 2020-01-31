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
       <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="isEditGenderShow = true"
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isEditBirthdayShow = true"
      />
    </van-cell-group>
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
    >
       <edit-name
        :name="user.name"
        @close="isEditNameShow = false"
        @confirm="onNameConfirm"
      />
    </van-popup>
     <!-- 更新用户性别 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      cancel-text="取消"
      :actions="actions"
      @select="onGenderSelect"
    />
    <!-- /更新用户性别 -->
     <!-- 更新用户生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <!--
        v-model="currentDate" 控制默认时间
        min-date 最小时间
        max-date 最大时间
       -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthdayShow = false"
        @confirm="onBirthdayConfirm"
      />
    </van-popup>
    <!-- /更新用户生日 -->

  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/API/user'
import EditName from './components/edit-name'
import moment from 'moment'
export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  props: {},
  data () {
    return {
      user: {}, // 用户资料
      isEditNameShow: false,
      isEditGenderShow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      isEditBirthdayShow: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
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
    async saveProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
          [field]: value
        })
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
    async onNameConfirm (name) {
      // 提交更新
      await this.saveProfile('name', name)
      // 更新视图
      this.user.name = name
      // 关闭弹层
      this.isEditNameShow = false
    },
    async onGenderSelect ({ value }) {
      // 请求更新
      await this.saveProfile('gender', value)
      // 更新视图
      this.user.gender = value
      // 关闭上拉菜单
      this.isEditGenderShow = false
    },
    async onBirthdayConfirm (value) {
      // 处理时间格式
      value = moment(value).format('YYYY-MM-DD')
      // 请求更新
      await this.saveProfile('birthday', value)
      // 更新视图
      this.user.birthday = value
      // 关闭弹层
      this.isEditBirthdayShow = false
    }
  }
}
</script>

<style scoped></style>
