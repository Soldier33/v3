<template>
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
import { getData } from "/@/api/president/data/league"

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      searchValue:  {
        pindex: 0,
        number: 10,
      },
      currentPage: 1,
      count: 0,
      headData: [
        { text: '社团名称', value: 'leagueName', width: '200px'},
        { text: '社团人数', value: 'number'},
        { text: '入团人数', value: 'menberNumber' },
        { text: '社团年级', value: 'leagueGrade' },
        { text: '招新开放时间', value: 'startDate', width: '200px' },
        { text: '招新截止时间', value: 'endDate', width: '200px' },
        { text: '社团负责人', value: 'managerName', width: '200px' },
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

    onMounted(() => {
      getMyData()
    })

    return {
      state,
      getMyData,
      table,
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
