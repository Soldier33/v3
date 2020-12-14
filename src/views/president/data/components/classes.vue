<template>
  <div>
    <div class="week">
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item
          v-model="state.searchValue.gradeId"
          :options="state.gradeOption"
          @change="changeGrade"
        />
      </van-dropdown-menu>
    </div>
    <swiper-table  v-show="!state.isLoading"
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
      @change="getMyData"/>
    <!-- 新增班级 -->
    <div class="btn-bottom">
      <van-button
        class="btn"
        block
        round
        type="primary"
        @click="showPopup"
      >新增班级</van-button>
    </div>
    <van-dialog v-model:show="state.isShow" title="班级信息" show-cancel-button @confirm="addClass">
      <div class="popbox">
        <van-field
          v-model="state.msg.gradeName"
          name="年级"
          label="年级"
          placeholder="请选择年级"
          @click="state.showGarde = true"
        />
        <van-field
          v-model="state.msg.className"
          name="班级"
          label="班级"
          placeholder="请选择班级"
          @click="state.showClass = true"
        />
      </div>
    </van-dialog>
    <van-popup v-model:show="state.showGarde" position="bottom">
      <van-picker
        :columns="state.gardeColumns"
        @confirm="gardeConfirm"
        @cancel="state.showGarde = false"
      />
    </van-popup>

    <van-popup v-model:show="state.showClass" position="bottom">
      <van-picker
        :columns="state.classColumns"
        @confirm="classConfirm"
        @cancel="state.showClass = false"
      />
    </van-popup>
    
    <!-- 编辑班级 -->
    <van-dialog v-model:show="state.isEditShow" title="班级信息" show-cancel-button @confirm="editClass">
      <div class="popbox">
        <van-field
          v-model="state.msg.gradeName"
          name="年级"
          label="年级"
          :disabled="true"
        />
        <van-field
          v-model="state.msg.className"
          name="班级"
          label="班级"
        />
      </div>
    </van-dialog>
    <!-- 删除 -->
    <van-dialog v-model:show="state.isDelectShow" :title="state.delectTitle" show-cancel-button @confirm="delectMyClass">
      
    </van-dialog>
  </div>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, getOption, add, modify, delectClass } from "/@/api/president/data/classes"
import { Notify } from 'vant'

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      gradeOption: [
        { text: "全校", value: "" },
      ],
      classOption: [],
      tempOption: [],
      searchValue: {
        pindex: 0,
        number: 10,
        gradeId: "",
      },
      count: 0,
      currentPage: 1,
      headData: [
        { text: "年级号", value: "gradeId" },
        { text: "年级名称", value: "gradeName" },
        { text: "班级号", value: "cid" },
        { text: "班级名称", value: "className" },
        { text: "操作", edit:  true, delete: true},
      ],
      tableData: [],
      isLoading: false,
      isShow: false,
      showGarde: false,
      showClass: false,
      msg: {
        gradeName: '',
        className: '',
        gradeId: 0,
        classId: 0
      },
      gardeColumns: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
      classColumns: [
        '一班', '二班', '三班', '四班', '五班', '六班', '七班', '八班', '九班', '十班',
        '十一班', '十二班', '十三班', '十四班', '十五班', '十六班', '十七班', '十八班', '十九班', '二十班',
        '二十一班', '二十二班', '二十三班', '二十四班', '二十五班', '二十六班', '二十七班', '二十八班', '二十九班', '三十班',
      ],
      isEditShow: false,
      isDelectShow: false,
      targetIndex: 0,
      delectTitle: ''
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
      state.currentPage = 1
      getMyData()
    })

    const showPopup = () => {
      state.isShow = true
    }

    const gardeConfirm = (value) => {
      state.msg.gradeName = value
      state.msg.gradeId = state.gardeColumns.findIndex((item) => value === item) + 1
      state.showGarde = false
    }

    const classConfirm = (value) => {
      state.msg.className = value
      state.msg.classId = state.classColumns.findIndex((item) => value === item) + 1
      state.showClass = false
    }

    const addClass = () => {
      add(state.msg).then((res) => {
        if (res.code === 200) {      
          state.tableData.unshift(
            { gradeId: state.msg.gradeId,
              gradeName: state.msg.gradeName,
              cid: state.msg.classId,
              className: state.msg.className
            }
          )
          table.value.print()
          Notify({ type: 'success', message: res.detail, duration: 1000 });         
        } else {
          Notify({ type: 'danger', message: res.detail, duration: 1000 })
        }
      })
    }

    const editItem =  (value, index) => {
      state.targetIndex = index
      state.msg = { ...value }
      state.isEditShow = true
    }

    const editClass = (value) => {
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
      state.delectTitle = `确定删除${state.msg.gradeName}${state.msg.className}吗？`
      state.isDelectShow = true
    }

    const delectMyClass = (value) => {
      delectClass(state.msg).then((res) => {
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
      getMyData()
      getMyOption()
    });

    return {
      state,
      getMyData,
      table,
      changeGrade,
      showPopup,
      gardeConfirm,
      classConfirm,
      addClass,
      editItem,
      editClass,
      deleteItem,
      delectMyClass
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
    margin: 16px
  }
  .popbox {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
