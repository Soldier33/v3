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
        @change="changeClass"
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
import { getData, getOption } from "/@/api/teacher/information";

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
      currentPage: 1,
      headData: [
        { text: "学号", value: "id" },
        { text: "学生姓名", value: "name" },
        { text: "性别", value: "sex" },
        { text: "家长姓名", value: "family" },
        { text: "家长电话", value: "familyPhone" },
        { text: "家长邮箱", value: "mail" },
        { text: "身份证后六位", value: "idcard" },
      ],
      tableData: [],
      isLoading: false,
    });

    const table = ref(null);

    const getMyData = () => {
      state.searchValue.pindex = state.currentPage - 1;
      state.isLoading = true;
      getData(state.searchValue).then((res) => {
        state.count = Math.ceil(res.result.totalnum / 10);
        state.isLoading = false;
        if (res.result.data.length && !!res.result.data[0]) {
          state.tableData = res.result.data;
          table.value.print();
        }
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
            //console.log(type(state.tempOption));
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
            state.searchValue.classId = state.classOption[0].value;
          });
          // if (state.gradeOption.length) {
          //   state.searchValue.classId = state.classOption[0].value;
          // }
        }
      });
    };

    const changeClass = (value) => {
      //console.log(value);
      state.searchValue.classId = value;
      getData();
    };

    const changeGrade = (value) => {
      const target = state.tempOption.find((item) => {
        return item.id === value;
      });
      //console.log(target, state.tempOption);

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
      changeGrade,
      changeClass,

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
