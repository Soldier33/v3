<template>
  <div class="search">
    <van-search
    v-model="state.searchValue.keyword"
    placeholder="请输入老师姓名"
    @search="getMyData" />
  </div>
  <div class="week">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.checkWeek"
        :options="state.weekOption"
      />
    </van-dropdown-menu>
  </div>
  <swiper-table
    :headData="state.headData"
    :headProps="state.headProps"
    :tableData="state.tableData"
    ref="table"
  ></swiper-table>
  <van-pagination v-model="state.currentPage" :page-count="state.count" mode="simple" />
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from 'vue'
import store from '/@/store'
import swiperTable from "/@/components/swiperTable.vue"
import { getData } from "/@/api/president/teacherScore";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkWeek: 10,
      weekOption: [
        {
          text: '第10周', value: 10
        }
      ],
      searchValue:  {
        pindex: 0,
        number: 10,
        keyword: '',
        week: 0,
      },
      currentPage: 0,
      count: 0,
      headData: ['排名', '老师', '总积分', '关注率', '任课班级'],
      headProps: ['rank', 'name', 'totalScores', 'attentionRate', 'classesName'],
      tableData: [],
    })

    const table = ref(null)

    const getMyData = (() => {
      getData(state.searchValue).then((res) => {
        state.count = Math.ceil(res.result.totalnum / 10)
        state.tableData = res.result.data
        table.value.print()
      })
    })

    onMounted(() => {
      getMyData()
    })

    return {
      state,
      getMyData,
      table
    };
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
  }

  ::v-deep .van-ellipsis{
		color: #1989fa;
	}

</style>
