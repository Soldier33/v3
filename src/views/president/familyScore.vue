<template>
  <div class="search">
    <van-search
      v-model="state.searchValue.keyword"
      placeholder="请输入学生姓名"
      @search="getMyData"
    />
  </div>
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
  </div>
  <swiper-table
    :headData="state.headData"
    :headProps="state.headProps"
    :tableData="state.tableData"
    ref="table"
  ></swiper-table>
  <van-pagination
    v-model="state.searchValue.pindex"
    :page-count="state.count"
    mode="simple"
    @change="getMyData"
  />
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getOption } from "/@/api/president/familyScore";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkGrade: "",
      gradeOption: [],
      classOption: [],
      tempOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        keyword: "",
        classId: "",
      },
      count: 0,
      headData: [
        { text: "全校排名", value: "rank" },
        { text: "学生", value: "name" },
        { text: "班级", value: "className" },
        { text: "在校积分", value: "schoolScores" },
        { text: "家长评分", value: "parentScores" },
        { text: "学生自评", value: "studentScores" },
        { text: "消费积分", value: "consumeScores" },
        { text: "总积分", value: "totalScores" },
        { text: "总财产", value: "properties" },
      ],
      tableData: [],
    });

    const table = ref(null);

    const getMyData = () => {
      if (state.searchValue.pindex) {
        state.searchValue.pindex--;
      }
      getData(state.searchValue).then((res) => {
        state.count = Math.ceil(res.result.totalnum / 10);
        state.tableData = res.result.data;
        table.value.print();
      });
    };

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
      });
    };

    const changeGrade = ((value) => {
      const target = state.tempOption.find((item) => { return item.id === value })
      state.classOption = []
      target.data.forEach((item) => {
        state.classOption.push({ text: item.className, value: item.classId })
      })
      if (state.gradeOption.length) {
        state.searchValue.classId = state.classOption[0].value;
      }
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
</style>
