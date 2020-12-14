<template>
  <van-tabs @click="tabClick" color="#1989fa">
    <van-tab v-for="(item, index) in state.title" :title="item.text" :name="index">
    </van-tab>
  </van-tabs>
  <attainment v-if="state.active === 0" />
  <classes v-if="state.active === 1" />
  <classManner v-if="state.active === 2" />
  <convention v-if="state.active === 3" />
  <subject v-if="state.active === 4" />
  <team v-if="state.active === 5" />
</template>
<script lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '/@/store'
import attainment from "./components/attainment.vue"
import subject from "./components/subject.vue"
import classManner from "./components/classManner.vue"
import convention from "./components/convention.vue"
import team from "./components/team.vue"
import classes from "./components/classes.vue"

export default {
  components: { subject, attainment, classManner, classes, convention, team},
  setup(props, context) {
    const state = reactive({
      title: [
        {text: "素养统计", value: 0 },
        {text: "班级统计", value: 1 },
        {text: "班风班纪", value: 2 },
        {text: "公约统计", value: 3 },
        {text: "科目统计", value: 4 },
        {text: "小组统计", value: 5 },
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
