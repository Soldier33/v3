<template>
  <!-- <div class="search">
    <van-search
      v-model="state.searchValue.keyword"
      placeholder="请输入学生姓名"
      @search="getMyData"
    />
  </div> -->
  <div class="week">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.checkGrade"
        :options="state.gradeOption"
        @change="changeGrade"
      />
      <van-dropdown-item
        v-model="state.searchValue.classId"
        :options="state.classOption"
      />
      <van-dropdown-item
        v-model="state.searchValue.type"
        :options="state.typeOption"
      />
    </van-dropdown-menu>
  </div>
  <swiper-table  v-show="!state.isLoading"
    :headData="state.headData"
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
import { getData, getOption } from "/@/api/president/history/informs";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkGrade: "",
      gradeOption: [],
      classOption: [],
      tempOption: [],
      typeOption: [
        { text: '通知', value: 0 },
        { text: '特殊奖励', value: 1 },
        { text: '特殊惩罚', value: 2 },
      ],
      searchValue: {
        pindex: 0,
        number: 10,
        keyword: "",
        classId: "",
        type: 0,
        week: store.state.currentWeek
      },
      count: 0,
      currentPage: 1,
      headData: [
        { text: "学生", value: "studentNames" },
        { text: "发送人", value: "teacherName" },
        { text: "通知内容", value: "message" },
        { text: "发送时间", value: "schoolScores" },
        // { text: "已读 / 发送人数", value: "parentScores" },
        // { text: "操作", value: "studentScores" },
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
        table.value.print()
      })
    })
    const changeGrade = ((value) => {
      const target = state.tempOption.find((item) => { return item.id === value })
      state.classOption = []
      if (!target) {
        state.searchValue.classId = ''
        getMyData()
        return
      }
      target.data.forEach((item) => {
        state.classOption.push({ text: item.className, value: item.classId })
      })
      if (state.gradeOption.length) {
        state.searchValue.classId = state.classOption[0].value;
      }
      getMyData()
    })

    onMounted(() => {
      const promise1 = new Promise((resolve, reject) => {
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
          // 选中
          if (state.gradeOption.length) {
            state.checkGrade = state.gradeOption[0].value;
            const temp = state.tempOption[0];
            temp.data.forEach((item) => {
              state.classOption.push({
                text: item.className,
                value: item.classId,
              });
            });
            if (state.gradeOption.length) {
              state.searchValue.classId = state.classOption[0].value;
            }
          }
          resolve()
        });
      });

      promise1.then(() => {
        getMyData();
      });
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
  // ::v-deep .van-dropdown-menu__bar {
  //   box-shadow: none;
  //   height: 30px;
  // }

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
