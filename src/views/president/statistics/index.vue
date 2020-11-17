<template>
  <van-tabs @click="tabClick" color="#1989fa">
    <van-tab v-for="(item, index) in state.title" :title="item.text" :name="index">
    </van-tab>
  </van-tabs>
  <evaluate v-if="state.active === 0" />
  <subject v-if="state.active === 1" />
  <art v-if="state.active === 2" />
  <classes v-if="state.active === 3" />
</template>
<script lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '/@/store'
import evaluate from "./components/evaluate.vue"
import subject from "./components/subject.vue"
import art from "./components/art.vue"
import classes from "./components/classes.vue"

export default {
  components: { subject, evaluate, art, classes },
  setup(props, context) {
    const state = reactive({
      title: [
        {text: "评价", value: 0 },
        {text: "科目", value: 1 },
        {text: "素养", value: 2 },
        {text: "班级", value: 2 },
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
