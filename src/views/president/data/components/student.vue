<template>
<div>
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
  <swiper-table  v-show="!state.isLoading"
    :headData="state.headData"
    :headProps="state.headProps"
    :tableData="state.tableData"
    @editItem="editItem"
    @deleteItem="deleteItem"
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
  <!-- 编辑学生 -->
    <van-dialog v-model:show="state.isEditShow" title="学生信息" show-cancel-button @confirm="editStudent">
      <div class="popbox">
        <van-field
          v-model="state.msg.id"
          name="学号"
          label="学号"
        />
        <van-field
          v-model="state.msg.name"
          name="姓名"
          label="姓名"
        />
        <van-field
          v-model="state.msg.sex"
          name="性别"
          label="性别"
        />
        <van-field
          v-model="state.msg.family"
          name="家长姓名"
          label="家长姓名"
        />
        <van-field
          v-model="state.msg.familyPhone"
          name="家长电话"
          label="家长电话"
        />
        <van-field
          v-model="state.msg.idcard"
          name="身份证后六位"
          label="身份证后六位"
        />
      </div>
    </van-dialog>

    <!-- 新增学生 -->
    <div class="btn-bottom">
      <van-button
        class="btn"
        block
        round
        color="#1989fa"
        typc="primary"
        @click="showPopup"
      >新增学生</van-button>
      </div>
      <van-dialog dialog v-model:show="state.isShow" title="学生信息" show-cancel-button @confirm="addStudent">
        <div class="popbox">
          <van-field
            v-model="state.msg.id"
            name="学号"
            label="学号"
            placeholder="请填写学号"
            />
            <van-field
            v-model="state.msg.name"
            name="姓名"
            label="姓名"
            placeholder="请填写姓名"
            />
            <van-field
            v-model="state.msg.sex"
            name="性别"
            label="性别"
            />
            <van-field
            v-model="state.msg.idcard"
            name="身份证"
            label="身份证"
            placeholder="请填写身份证"
            />
            <van-field
            v-model="state.msg.family"
            name="家长姓名"
            label="家长姓名"
            placeholder="请填写家长姓名"
            />
            <van-field
            v-model="state.msg.familyPhone"
            name="家长电话"
            label="家长电话"
            placeholder="请填写家长电话"
            />
        </div>
      </van-dialog>
      <!-- 删除 -->
      <van-dialog v-model:show="state.isDelectShow" :title="state.delectTitle" show-cancel-button @confirm="delectMyStudent">

      </van-dialog>
    </div>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getOption, delectClass, modify, add, delectStudent } from "/@/api/president/data/student";
import { Notify } from 'vant';

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
        studentId: 0,
        studentName: "",
        sex: "男",
        id: 1,
        name: "",
        family: "",
        familyPhone: "",
        idcard: "",
        team: 0
      },
      count: 0,
      currentPage: 1,
      headData: [
        { text: "学号", value: "id" },
        { text: "学生姓名", value: "name" },
        { text: "性别", value: "sex" },
        { text: "家长姓名", value: "family" },
        { text: "家长电话", value: "familyPhone" },
        { text: "身份证后六位", value: "idcard" },
        { text: "操作", edit:  true, delete: true},
      ],
      msg: {
        name: '',
        sex: '',
        familyPhone: '',
        idcard: '',
        studentId: '',
        id: 0,
        family: '',
        classId: ''
      },
      tableData: [],
      isLoading: false,
      isEditShow: false,
      targetIndex: 0,
      isShow: false,
      isDelectShow: false,
      delectTitle: '',
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

    //删除学生信息
    const deleteItem = (value, index) => {
      state.targetIndex = index
      state.msg = {...value}
      state.delectTitle = `确定删除${state.msg.id}${state.msg.name}吗？`
      state.isDelectShow = true
    }

    const delectMyStudent = (value) => {
      state.msg.classId = state.searchValue.classId
      delectStudent(state.msg).then((res) => {
        if(res.code === 200) {
          state.tableData.splice(state.targetIndex, 1)
          table.value.print()
          Notify({ type: 'success', message: res.detail, duration: 1000 });
        } else {
          Notify({ type: 'danger', message: res.detail, duration:1000 })
        }
      })
    }

    //添加学生
    const showPopup = () =>{
      state.isShow = true;
    }
    const addStudent= () => {
      state.msg.classId = state.searchValue.classId
      add(state.msg).then((res) => {
        if (res.code === 200) {
          state.tableData.unshift(
            {
              id: state.msg.id,
              name: state.msg.name,
              idcard: state.msg.idcard,
              family: state.msg.family,
              familyPhone: state.msg.familyPhone,
              sex: state.msg.sex
            }
          )
          table.value.print()
          Notify({ type:'success', message: res.detail, duration: 1000});
        } else {
          Notify({ type: 'danger', message: res.detail, duration: 1000})
        }
      })
    } 

    const editItem =  (value, index) => {
      state.targetIndex = index
      state.msg = { ...value }
      state.isEditShow = true
    }

    //编辑学生
    const editStudent = (value) => {
      state.msg.classId = state.searchValue.classId
      modify(state.msg).then((res) => {
        if (res.code === 200) {      
          state.tableData[state.targetIndex] = state.msg
          table.value.print()
          Notify({ type: 'success', message: res.detail, duration: 1000 });         
        } else {
          Notify({ type: 'danger', message: res.detail, duration: 1000 })
        }
      })
    }
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
              state.msg.classId = state.searchValue.classId
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
      changeGrade,
      changeOption,
      editStudent,
      editItem,
      showPopup,
      addStudent,
      delectMyStudent,
      deleteItem 
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
  .btn-bottom{
    margin: 16px;
  }
  .popbox {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
