<template>
  <div class="search">
    <van-search
      v-model="state.searchValue.keyword"
      placeholder="请输入学生姓名"
      @search="changeOption"
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
        @change="changeOption"
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
import { getData, getOption } from "/@/api/president/familyScore";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkGrade: "",
      gradeOption: [
        { text: "全校", value: "" },
      ],
      classOption: [],
      tempOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        keyword: "",
        classId: "",
      },
      count: 0,
      currentPage: 1,
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
      state.currentPage = 1
      getMyData()
    })

    const changeOption = () => {
      state.currentPage = 1
      getMyData()
    }

    onMounted(() => {
      getMyData()
      getMyOption()
    });

    return {
      state,
      getMyData,
      table,
      changeGrade,
      changeOption
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
