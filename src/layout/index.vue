<template>
  <van-nav-bar left-text="返回" left-arrow @click-left="toBack">
    <template #right>
      <van-icon v-show="isShowPer" name="contact" size="18" @click="toPersonal"/>
    </template>
  </van-nav-bar>
  <van-tabs :active="state.active" v-show="isShowPer" @click="tabClick" color="#1989fa">
    <van-tab v-for="(item, index) in state.title[store.state.role]" :title="item.text" :name="index"> </van-tab>
  </van-tabs>
  <router-view :key="key" />
</template>
<script lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '/@/store'

export default {
  setup(props, context) {
    const state = reactive({
      title: {
        teacher: [
          {text: "学生评价", value: '/w'},
          {text: "历史评价", value: '/w'},
          {text: "历史积分", value: '/w'},
          {text: "学生信息", value: '/w'},
          {text: "评价统计", value: '/w'},
          {text: "排行榜", value: '/w'},
          {text: "期末评语", value: '/w'},
        ],
        president: [
          {text: "老师积分", value: '/page/pc/s/teacherScore'},
          {text: "家庭积分", value: '/page/pc/s/familyScore'},
          {text: "历史情况", value: '/page/pc/s/history'},
          {text: "统计情况", value: '/page/pc/s/statistics'},
          {text: "排行榜", value: '/page/pc/s/rank'},
          {text: "基础数据", value: '/page/pc/s/data'},
        ],
        admin: [
          {text: "老师积分", value: '/w1'},
        ]
      },
      active: 0
    })
    const route = useRouter()
    const key = computed(() => route.currentRoute.value.fullPath)
    const isShowPer = computed(() => route.currentRoute.value.fullPath !== '/personal/index')
    const { push, go } = useRouter()

    const toBack = (() => {
      go(-1)
    })

    const toPersonal = (() => {
      push('/personal/index')
    })

    const tabClick = ((name, title) => {
      push(state.title[store.state.role][name].value)
    })

    state.active = state.title[store.state.role].findIndex((item) => { return item.value === key.value })

    return {
      state,
      key,
      isShowPer,
      toPersonal,
      toBack,
      tabClick,
      store
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
