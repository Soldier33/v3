<template>
  <van-cell title="用户名" :value="store.state.username" size="large" />
  <van-cell title="学校" :value="store.state.school" size="large" />
  <div class="button-group">
     <van-button
        class="btn"
        block
        round
        type="default"
        @click="changePwd"
      >修改密码</van-button>
      <van-button
        block
        round
        type="danger"
        @click="loginout"
      >退出登录</van-button>
  </div>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick } from 'vue'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
import store from '/@/store'
export default {
  setup() {
    const { push } = useRouter()
    const state = reactive({
    })
    function changePwd() {
      push('/')
    }
    function loginout() {
      push('/')
    }
    onMounted(() => {
      // console.log(store.state);
    }) 
    return {
      state,
      changePwd,
      loginout,
      store
    }
  }
}
</script>
<style lang="scss" scoped>
  .quit{
    margin-top: 60px;
  }
  .button-group {
    padding: 32px 50px;
    .btn{
      margin-bottom: 20px;
    }
  }
</style>
