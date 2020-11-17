<template>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item
      v-model="state.searchValue.subject"
      :options="state.subjectOption"
      @change="changeWeek"
    />
  </van-dropdown-menu>
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
import { getData, getOption } from "/@/api/president/history/check"

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      subjectOption: [],
      searchValue:  {
        pindex: 0,
        number: 10,
        subject: 0,
      },
      currentPage: 1,
      count: 0,
      headData: [
        { text: '年级班级', value: 'rank'},
        { text: '申请人', value: 'name' },
        { text: '申请内容', value: 'totalScores' },
        { text: '分 数', value: 'attentionRate' },
        { text: '申请时间', value: 'classesName', width: '200px'},
        { text: '周 次', value: 'classesName', width: '200px'},
        { text: '审核人', value: 'classesName', width: '200px'},
        { text: '审核时间', value: 'classesName', width: '200px'},
        { text: '结 果', value: 'classesName', width: '200px'},
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
      const promise1 = new Promise((resolve, reject) => {
        getOption().then((res) => {
          res.result.data.forEach((item) => {
              state.subjectOption.push({
                text: item,
                value: item,
              });
          });
          state.searchValue.subject = state.subjectOption[0].value
          resolve()
        });
      });

      promise1.then(() => {
        getMyData();
      });
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
