<template>
  <van-tabs @click="tabClick" color="#1989fa">
    <van-tab v-for="(item, index) in state.title" :title="item.text" :name="index" :key="item.title">
    </van-tab>
  </van-tabs>
  <school v-if="state.active === 0" />
  <evaluate v-if="state.active === 1" />
  <classes v-if="state.active === 2" />
  <teacher v-if="state.active === 3" />
</template>
<script lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '/@/store'
import evaluate from "./components/evaluate.vue"
import school from "./components/school.vue"
import teacher from "./components/teacher.vue"
import classes from "./components/classes.vue"

export default {
  components: { school, evaluate, teacher, classes },
  setup(props, context) {
    const state = reactive({
      title: [
        {text: "学校", value: 0 },
        {text: "评价", value: 1 },
        {text: "班级", value: 2 },
        {text: "老师", value: 3 },
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
