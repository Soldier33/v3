<template>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item
      v-model="state.searchValue.target"
      :options="state.targetOption"
      @change="getMyData"
    />
    <van-dropdown-item
      v-model="state.searchValue.species"
      :options="state.speciesOption"
      @change="changeTypeOption"
    />
  </van-dropdown-menu>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item
      v-model="state.searchValue.type"
      :options="state.typeOption"
      @change="getMyData"
    />
    <van-dropdown-item
      v-model="state.searchValue.grade"
      :options="state.gradeOption"
      @change="getMyData"
    />
  </van-dropdown-menu>
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
import { getData, getGradeOption, getTypeOption, getSubjectOption } from "/@/api/president/data/evaluate";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      targetOption: [
        { text: "学校评价", value: "1" },
        { text: "家庭评价", value: "2" },
        { text: "学生评价", value: "3" },
        { text: "自主评价", value: "4" },
      ],
      speciesOption: [
        { text: "素养", value: "type" },
        { text: "科目", value: "subject" },
      ],
      gradeOption: [
        { text: "全校公共", value: "0" },
      ],
      typeOption: [],
      tempOption: [],
      searchValue: {
        target: "1",
        species: "type",
        type: "type",
        grade: "0",
      },
      headData: [
        { text: "序号", value: "templateId" },
        { text: "分数", value: "scores" },
        { text: "评价内容", value: "content", width: '200px' },
      ],
      tableData: [],
      isLoading: false,
    });

    const table = ref(null);

    const getMyData = () => {
      state.isLoading = true;
      getData(state.searchValue).then((res) => {
        state.tableData = res.result.data;
        state.isLoading = false;
        if (res.result.data.length) table.value.print();
      });
    }

    const getMyGradeOption = () => {
      getGradeOption().then((res) => {
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
    }

    const changeGrade = (value) => {
      getMyData();
    };

    const changeTypeOption = (value) => {
      const promise1 = new Promise((resolve, reject) => {
        if (value === 'type') {
          getTypeOption().then(res => {
            const data = res.result.data
            if (data.length) {
              state.typeOption = []
              data.forEach((item) => {
                state.typeOption.push({text: item.name, value: item.id})
              })
              state.searchValue.type = state.typeOption[0].value
            }
            resolve()
          })
        } else {
          getSubjectOption().then(res => {
            const data = res.result.data
            if (data.length) {
              state.typeOption = []
              data.forEach((item) => {
                state.typeOption.push({text: item, value: item})
              })
              state.searchValue.type = state.typeOption[0].value
            }
            resolve()
          })
        }
      });

      promise1.then(() => {
        getMyData()
      });
    };

    onMounted(() => {
      changeTypeOption('type')
      getMyGradeOption()
    });

    return {
      state,
      getMyData,
      table,
      changeGrade,
      changeTypeOption,
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
