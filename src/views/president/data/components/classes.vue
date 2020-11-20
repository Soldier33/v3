<template>
  <div class="week">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.searchValue.gradeId"
        :options="state.gradeOption"
        @change="changeGrade"
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
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getOption } from "/@/api/president/data/classes";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      gradeOption: [
        { text: "全校", value: "" },
      ],
      classOption: [],
      tempOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        gradeId: "",
      },
      count: 0,
      currentPage: 1,
      headData: [
        { text: "年级号", value: "gradeId" },
        { text: "年级名称", value: "gradeName" },
        { text: "班级号", value: "cid" },
        { text: "班级名称", value: "className" },
      ],
      tableData: [],
      isLoading: false,
    });

    const table = ref(null);

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

    const getMyOption = () => {
      getOption().then((res) => {
        // 改变格式
        var map = {};
        for (let i = 0; i < res.result.data.length; i++) {
          const ai = res.result.data[i];
          if (!map[ai.gradeId]) {
            state.tempOption.push({
              id: ai.gradeId,
              name: ai.gradeName,
              data: [ai],
            });
            map[ai.gradeId] = ai;
          } else {
            for (let j = 0; j < state.tempOption.length; j++) {
              const dj = state.tempOption[j];
              if (dj.id == ai.gradeId) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        // 展示
        state.tempOption.forEach((item) => {
          state.gradeOption.push({ text: item.name, value: item.id });
        });
      });
    };

    const changeGrade = ((value) => {
      state.currentPage = 1
      getMyData()
    })

    onMounted(() => {
      getMyData()
      getMyOption()
    });

    return {
      state,
      getMyData,
      table,
      changeGrade
    };
  },
};
</script>
<style lang="scss" scoped>
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
    height: 30px;
  }

  ::v-deep .van-ellipsis {
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
