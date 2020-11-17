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
        v-model="state.searchValue.week"
        :options="state.weekOption"
        @change="changeWeek"
      />
    </van-dropdown-menu>
  </div>
  <swiper-table  v-show="!state.isLoading"
    :headData="state.headData"
    :headProps="state.headProps"
    :tableData="state.tableData"
    ref="table"
  ></swiper-table>
  <div v-show="state.isLoading" class="loading">
    <van-loading type="spinner" color="#1989fa" />
  </div>
  <van-pagination
    v-model="state.currentPage"
    :page-count="state.count"
    mode="simple" 
    @change="getMyData"/>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from 'vue'
import store from '/@/store'
import swiperTable from "/@/components/swiperTable.vue"
import { getData, getCurrentWeek } from "/@/api/president/teacherScore"

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      weekOption: [
        {
          text: '总积分', value: 0
        }
      ],
      searchValue:  {
        pindex: 0,
        number: 10,
        keyword: '',
        week: 0,
      },
      currentPage: 1,
      count: 0,
      headData: [
        { text: '排名', value: 'rank'},
        { text: '老师', value: 'name' },
        { text: '总积分', value: 'totalScores' },
        { text: '关注率', value: 'attentionRate' },
        { text: '任课班级', value: 'classesName', width: '200px'},
      ],
      tableData: [],
      isLoading: false,
    })

    const table = ref(null)

    const getMyData = (() => {
      state.searchValue.pindex = state.currentPage - 1
      state.isLoading = true
      getData(state.searchValue).then((res) => {
        state.count = Math.ceil(res.result.totalnum / 10)
        state.tableData = res.result.data
        state.isLoading = false
        if (res.result.data.length) 
          table.value.print()
      })
    })

    const changeWeek = ((value) => {
      getMyData()
    })

    onMounted(() => {
      getMyData()
      getCurrentWeek(store.state.schoolId).then((res) => {
        store.commit('setCurrentWeek', res)
        sessionStorage.setItem("currentWeek", res);
        for (let i = 1; i <= res; i++) {
          const str = `第${i}周`
          state.weekOption.push({ text: str, value: i })
        }
      })
    })

    return {
      state,
      getMyData,
      table,
      changeWeek
    };
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
    height: 30px;
  }

  ::v-deep .van-ellipsis{
		color: #1989fa;
	}

  .loading{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
