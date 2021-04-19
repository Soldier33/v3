<template>
  <div class="search">
    <van-search
      v-model="state.searchValue.keyword"
      placeholder="请输入学生姓名"
      @search="getMyData"
    />
  </div>
   <van-dropdown-menu>
      <van-dropdown-item
      v-model="state.searchValue.term"
      :options="state.termOption"
      @change="changeOption"
    />
    <van-dropdown-item
      v-model="state.searchValue.gradeId"
      :options="state.gradeOption"
      @change="changeGrade"
    />
    <van-dropdown-item
      v-model="state.searchValue.classId"
      :options="state.classOption"
      @change="changeOption"
    />
    <van-dropdown-item
      v-model="state.searchValue.week"
      :options="state.weekOption"
      @change="changeOption"
    />
    <swiper-table  v-show="!state.isLoading"
    :headData="state.headData"
    :tableData="state.tableData"
    ref="table"
  ></swiper-table>
  </van-dropdown-menu>
  <van-pagination
    v-model="state.currentPage"
    :page-count="state.count"
    mode="simple" 
    @change="getMyData"/>
</template>

<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { getData, getOption, getCurrentWeek, getAllTerms } from "/@/api/teacher/historyEvaluate";
import { Notify, Checkbox, CheckboxGroup} from "vant";
import store from '/@/store'
import swiperTable from "/@/components/swiperTable.vue"

export default {
  components: { swiperTable },
  setup(props, context) {
    const state = reactive({
      searchValue:  {
      pindex: 0,
      week: '',
      number: 10,
      target: 'type',
      gradeId: '',
      classId: '',
      keyword: '',
      term: "",
      termC: ""
      },
      checkWeek: '',
      gradeOption: [],
      classOption: [],
      tempOption: [],
      termOption: [],
      weekOption: [],
      headData: [
        { text: '学号', value: 'id'},
        { text: '学生', value: 'name'}
      ],
      tableData: [],
      checked: false,
      city:'',
      isLoading: true,
      currentPage: 1,
      count: 0,
    });

    const table = ref(null)


    const getMyData = () => {
      state.searchValue.pindex = state.currentPage - 1;
      state.isLoading = true;
      getData(state.searchValue).then((res) => {
        // state.count = Math.ceil(res.result.totalnum / 10)
       
        state.tableData = res.result.data[0].items;
        if (res.result.data && res.result.data.length)  {
          const colsLen = res.result.data[0].cols.length;
          for(let i = 0; i < colsLen ; i++) {
            state.headData.push({text: `${res.result.data[0].cols[i]}`, value:`scores`, index: i});
          }
          table.value.print()
        }

        state.isLoading = false;
      });
    }
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
    
    const changeOption = ((value) => {
      state.currentPage = 1
      getMyData()
    })


    onMounted(() => {
      // 获取年级班级
      const promise1 = new Promise((resolve, reject) => {
       
        getOption(state.searchValue).then((res) => {
          // 改变格式
          var map = {};
          for (let i = 0; i < res.result.data.length; i++) {
            const ai = res.result.data[i];
            if (!map[ai.gradeId]) {
              state.tempOption.push({
                id: ai.gradeId,
                name: ai.gradeName,
                className: ai.className,
                classId: ai.classId,
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
            state.gradeOption.push({ text: item.name, value: item.id})
          })
          //选中
          if (state.gradeOption.length) {
            state.searchValue.gradeId = state.gradeOption[0].value;
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

          // 获取当前周次
          getCurrentWeek(store.state.schoolId).then((res) => {
            store.commit('setCurrentWeek', res)
            sessionStorage.setItem("currentWeek", res);
            for (let i = 1; i <= res; i++) {
              const str = `第${i}周`
              state.weekOption.push({ text: str, value: i })
            }
            const len = state.weekOption.length - 1
            state.searchValue.week = state.weekOption[len].value
          })

          //获取学期
        getAllTerms(state.searchValue).then((res) => {
          for (let i = 0; i < res.result.data.length; i++) {
            const ai = res.result.data[i];
            state.termOption.push({
                text: ai.name,
                value: ai.name
            })
          }
          if (state.termOption.length) {
              state.searchValue.term = state.termOption[0].value;

              //转换学期格式
            state.searchValue.termC = (state.searchValue.term).replace('-','_');
            state.searchValue.termC = (state.searchValue.termC).replace('学年度第一学期','_1');
            state.searchValue.termC = "_" + (state.searchValue.termC).replace('学年度第二学期','_2');
            }
        });

          resolve()
        });
      });

      promise1.then(() => {
        const promise2 = new Promise((resolve, reject) => {
          getMyData()
        });
      })
    });

    return {
      state,
      getMyData,
      getOption,
      changeOption,
      changeGrade,
      table
    };
  },
};

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
