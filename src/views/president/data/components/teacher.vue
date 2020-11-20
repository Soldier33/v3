<template>
  <div class="search">
    <van-search
    v-model="state.searchValue.keyword"
    placeholder="请输入老师姓名"
    @search="changeOption" />
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
import { getData } from "/@/api/president/data/teacher"

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      searchValue:  {
        pindex: 0,
        number: 10,
        keyword: '',
      },
      currentPage: 1,
      count: 0,
      headData: [
        { text: '教师姓名', value: 'teacherName'},
        { text: '身份证后六位', value: 'idcard'},
        { text: '联系电话', value: 'teacherPhone' },
        { text: '办公室', value: 'totalScores' },
        { text: '职称', value: 'offer' },
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

    const changeOption = ((value) => {
      state.currentPage = 1
      getMyData()
    })

    onMounted(() => {
      getMyData()
    })

    return {
      state,
      getMyData,
      table,
      changeOption
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
