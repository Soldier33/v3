<template>
  <van-tabs @click="tabClick" color="#1989fa">
    <van-tab v-for="(item, index) in state.title" :title="item.text" :name="index">
    </van-tab>
  </van-tabs>
  <evaluate v-if="state.active === 0" />
  <informs v-if="state.active === 1" />
  <check v-if="state.active === 2" />
</template>
<script lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '/@/store'
import evaluate from "./components/evaluate.vue"
import informs from "./components/informs.vue"
import check from "./components/check.vue"

export default {
  components: { informs, evaluate, check },
  setup(props, context) {
    const state = reactive({
      title: [
        {text: "评价", value: 0 },
        {text: "通知", value: 1 },
        {text: "审核", value: 2 },
      ],
      active: 0
    })

    const { push, go } = useRouter()

    const tabClick = ((name, title) => {
      state.active = name
    })

    return {
      state,
      tabClick,
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
