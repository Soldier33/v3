<template>
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
    </van-dropdown-menu>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.searchValue.week"
        :options="state.weekOption"
        @change="changeValue"
      />
      <van-dropdown-item
        v-model="state.searchValue.type"
        :options="state.typeOption"
        @change="changeValue"
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
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getOption, getTypeOption } from "/@/api/president/rank";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkGrade: "",
      gradeOption: [],
      classOption: [],
      tempOption: [],
      weekOption: [],
      typeOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        keyword: "",
        classId: "",
        week: 0,
        type: 0,
      },
      headData: [
        { text: "名次", value: "id", width: '76px' },
        { text: "姓名", value: "name", width: '150px' },
        { text: "本周得分", value: "scores", width: '150px' },
      ],
      tableData: [],
      isLoading: false,
    });

    const table = ref(null);

    const getMyData = () => {
      state.isLoading = true;
      getData(state.searchValue).then((res) => {
        res.result.data.forEach((item, index) => {
          item['id'] = index + 1
        })
        state.tableData = res.result.data
        state.isLoading = false
        if (res.result.data.length) 
          table.value.print()
      });
    };

    const changeGrade = (value) => {
      const target = state.tempOption.find((item) => {
        return item.id === value;
      });
      state.classOption = [];
      if (!target) {
        state.searchValue.classId = "";
        getMyData();
        return;
      }
      target.data.forEach((item) => {
        state.classOption.push({ text: item.className, value: item.classId });
      });
      if (state.gradeOption.length) {
        state.searchValue.classId = state.classOption[0].value;
      }
      getMyData();
    };

    const changeValue = (value) => {
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
          getTypeOption().then((res) => {
            res.result.data.forEach((item) => {
              state.typeOption.push({
                text: item.title,
                value: item.id,
              });
            })
            state.searchValue.type = state.typeOption[0].value;
            resolve()
          })
        });
      })

      promise1.then(() => {
        getMyData()
      });
    });

    return {
      state,
      getMyData,
      table,
      changeGrade,
      changeValue,
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
