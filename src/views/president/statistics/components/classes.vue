<template>
  <div class="week">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.searchValue.gradeId"
        :options="state.gradeOption"
        @change="changeOption"
      />
      <van-dropdown-item
        v-model="state.searchValue.week"
        :options="state.weekOption"
        @change="changeOption"
      />
    </van-dropdown-menu>
  </div>
  <swiper-table
    v-show="!state.isLoading"
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
    @change="getMyData"
  />
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getOption } from "/@/api/president/statistics/classes";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkGrade: "",
      gradeOption: [],
      classOption: [],
      tempOption: [],
      weekOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        week: 0,
        gradeId: ''
      },
      count: 0,
      currentPage: 1,
      headData: [
        { text: "名次", value: "rank", index: -1 },
        { text: "班级", value: "className", index: -1 },
        { text: "总分", value: "classWeeklyScores", index: -1 },
      ],
      tableData: [],
      isLoading: false,
    });

    const table = ref(null);

    const getMyData = () => {
      state.searchValue.pindex = state.currentPage - 1;
      state.isLoading = true
      getData(state.searchValue).then((res) => {
        state.count = Math.ceil(res.result.totalnum / 10);
        res.result = res.result.data[0]
        console.log(res.result.integrallist.length);
        
        if (res.result.integrallist && res.result.integrallist.length && res.result.types)  {
          res.result.types.forEach((item, index) => {
            state.headData.push({ text: item, value: 'typeScores', index: index })
          })
          state.tableData = res.result.integrallist
          table.value.print()
        }
        state.isLoading = false;
      });
    }

    const changeOption = (value) => {
      state.currentPage = 1
      getMyData();
    };

    onMounted(() => {
      for (let i = 1; i <= store.state.currentWeek; i++) {
        const str = `第${i}周`;
        state.weekOption.push({ text: str, value: i });
      }
      state.searchValue.week =
        state.weekOption[state.weekOption.length - 1].value;

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
            state.searchValue.gradeId = state.gradeOption[0].value;
          }
          resolve();
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
      changeOption,
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
