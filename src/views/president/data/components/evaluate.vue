<template>
  <div>

    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.checkEva"
        :options="state.evaOption"
        @change="changeOption"
      />
      <van-dropdown-item
        v-model="state.searchValue.week"
        :options="state.weekOption"
        @change="changeOption"
      />
    </van-dropdown-menu>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        v-model="state.checkGrade"
        :options="state.gradeOption"
        @change="changeGrade"
      />
      <van-dropdown-item
        v-model="state.checkGrade"
        :options="state.gradeOption"
        @change="changeGrade"
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
  </div>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getGradeOption } from "/@/api/president/data/evaluate";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      checkGrade: "",
      checkEva: "1",
      gradeOption: [],
      evaOption: [
        { text: "学校评价", value: "1" },
        { text: "家庭评价", value: "2" },
        { text: "学生评价", value: "3" },
        { text: "自主评价", value: "4" },
      ],
      tempOption: [],
      weekOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        keyword: "",
        classId: "",
        week: 0,
      },
      headData: [
        { text: "序号", value: "templateId" },
        { text: "评价内容", value: "content" },
        { text: "分数", value: "scores" },
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

      });
    }

    const changeGrade = (value) => {
      getMyData();
    };

    const changeOption = (value) => {
      getMyData();
    };

    onMounted(() => {
      getMyData();
    });

    return {
      state,
      getMyData,
      table,
      changeGrade,
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
