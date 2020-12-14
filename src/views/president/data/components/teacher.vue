<template>
  <div class="search">
    <van-search
      v-model="state.searchValue.keyword"
      placeholder="请输入老师姓名"
      @search="changeOption"
    />
  </div>
  <swiper-table
    v-show="!state.isLoading"
    :headData="state.headData"
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
    @change="getMyData"
  />
  <!-- 新增班级 -->
  <div class="btn-bottom">
    <van-button
     class="btn" 
     block 
     round 
     type="primary" 
     @click="showPopup"
      >新增老师</van-button
    >
  </div>
  <van-dialog
    v-model:show="state.isShow"
    title="老师信息"
    show-cancel-button
    @confirm="addTeacher"
  >
    <div class="popbox">
      <van-field
        v-model="state.msg.teacherName"
        name="教师姓名"
        label="教师姓名"
        placeholder="请输入教师姓名"
      />
      <van-field
        v-model="state.msg.idcard"
        name="身份证后六位"
        label="身份证后六位"
        placeholder="请输入身份证后六位"
      />
      <van-field
        v-model="state.msg.teacherPhone"
        name="联系电话"
        label="联系电话"
        placeholder="请输入联系电话"
      />
      <van-field
        v-model="state.msg.offer"
        name="办公室"
        label="办公室"
        placeholder="请输入办公室"
      />
      <van-field
        v-model="state.msg.jobTitle"
        name="职称"
        label="职称"
        placeholder="请输入职称"
      />
    </div>
  </van-dialog>
  <!-- 编辑老师 -->
  <van-dialog
    v-model:show="state.isEditShow"
    title="老师信息"
    show-cancel-button
    @confirm="editTeacher"
  >
    <div class="popbox">
      <van-field
        v-model="state.msg.teacherName"
        name="教师姓名"
        label="教师姓名"
        :disabled="true"
      />
      <van-field
        v-model="state.msg.idcard"
        name="身份证后六位"
        label="身份证后六位"
        placeholder="请输入身份证后六位"
      />
      <van-field
        v-model="state.msg.teacherPhone"
        name="联系电话"
        label="联系电话"
        placeholder="请输入联系电话"
      />
      <van-field
        v-model="state.msg.offer"
        name="办公室"
        label="办公室"
        placeholder="请输入办公室"
      />
      <van-field
        v-model="state.msg.jobTitle"
        name="职称"
        label="职称"
        placeholder="请输入职称"
      />
    </div>
  </van-dialog>
  <!-- 删除老师 -->
  <van-dialog v-model:show="state.isDelectShow" :title="state.delectTitle" show-cancel-button @confirm="delectMyTeacher">
  </van-dialog>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import {  getData, add, modify, delectTeacher } from "/@/api/president/data/teacher";
import { Notify } from "vant";

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      searchValue: {
        pindex: 0,
        number: 10,
        keyword: "",
      },
      currentPage: 1,
      count: 0,
      headData: [
        { text: "教师姓名", value: "teacherName" },
        { text: "身份证后六位", value: "idcard" },
        { text: "联系电话", value: "teacherPhone" },
        { text: "办公室", value: "offer" },
        { text: "职称", value: "jobTitle" },
        { text: "操作", edit: true, delete: true },
      ],
      tableData: [],
      isLoading: false,
      isShow: false,
      msg: {
        teacherId: "",
        teacherName: "",
        idcard: "",
        teacherPhone: "",
        offer: "",
        jobTitle: "",
      },
      isEditShow: false,
      isDelectShow: false,
      targetIndex: 0,
      delectTitle: "",
    });

    const table = ref(null);

    const getMyData = () => {
      state.searchValue.pindex = state.currentPage - 1;
      state.isLoading = true;
      getData(state.searchValue).then((res) => {
        state.count = Math.ceil(res.result.totalnum / 10);
        state.tableData = res.result.data;
        state.isLoading = false;
        if (res.result.data.length) table.value.print();
      });
    };

    const changeOption = (value) => {
      state.currentPage = 1;
      getMyData();
    };

    const showPopup = () => {
      state.isShow = true;
    };

    const addTeacher = () => {
      add(state.msg).then((res) => {
        if (res.code === 200) {
          state.tableData.unshift({
            teacherName: state.msg.teacherName,
            idcard: state.msg.idcard,
            teacherPhone: state.msg.teacherPhone,
            offer: state.msg.offer,
            jobTitle: state.msg.jobTitle,
          });
          table.value.print();
          Notify({ type: "success", message: res.detail, duration: 1000 });
        } else {
          Notify({ type: "danger", message: res.detail, duration: 1000 });
        }
      });
    };

    const editItem = (value, index) => {
      state.targetIndex = index
      state.msg = { ...value }
      state.isEditShow = true
    }

    const editTeacher = (value) => {
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

    const deleteItem = (value, index) => {
      state.targetIndex = index
      state.msg = { ...value }
      state.delectTitle = `确定删除${state.msg.teacherName}吗？`
      state.isDelectShow = true
    }

    const delectMyTeacher = (value) => {
      delectTeacher(state.msg).then((res) => {
        if (res.code === 200) {      
          state.tableData.splice(state.targetIndex, 1)
          table.value.print()
          Notify({ type: 'success', message: res.detail, duration: 1000 });         
        } else {
          Notify({ type: 'danger', message: res.detail, duration: 1000 })
        }
      })
    }

    onMounted(() => {
      getMyData();
    });

    return {
      state,
      getMyData,
      table,
      changeOption,
      showPopup,
      addTeacher,
      editItem,
      editTeacher,
      deleteItem,
      delectMyTeacher 
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
