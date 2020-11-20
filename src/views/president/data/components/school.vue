<template>
  <van-field
    v-model="state.msg.school"
    name="学校名称"
    label="学校名称"
    placeholder="请填写学校名称"
  />
  <van-field
    v-model="state.msg.date"
    name="开学日期"
    label="开学日期"
    placeholder="请选择日期"
      @click="state.showCalendar = true"
  />
  <van-field
    v-model="state.msg.tip"
    rows="1"
    autosize
    label="温馨提示"
    type="textarea"
    placeholder="请输入温馨提示"
  />
  <van-calendar v-model:show="state.showCalendar" @confirm="onConfirm"/>
  <div style="margin: 16px;">
    <van-button
      block
      round
      type="primary"
      @click="onSubmit"
    >保存修改</van-button>
  </div>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick, ref } from "vue";
import store from "/@/store";
import swiperTable from "/@/components/swiperTable.vue";
import { getData, modify } from "/@/api/president/data/school";
import { Notify } from 'vant'

export default {
  components: { swiperTable },
  setup() {
    const state = reactive({
      isLoading: false,
      showCalendar: false,
      msg: {
        date: '',
        school: '',
        tip: ''
      },
    })

    const getMyData = () => {
      getData(store.state.schoolId).then((res) => {
        const data = res.result.data[0]
        if (data) {
          state.msg.date = data.schoolTime
          state.msg.school = data.schoolName
          state.msg.tip = data.prompt
        }
      });
    };

    const onConfirm = (date) => {
      state.showCalendar = false
      state.msg.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(state.msg.date);
    };

    const onSubmit = (value) => {
      modify(state.msg).then((res) => {
        if (res.code === 200) {
          Notify({ type: 'success', message: '修改成功', duration: 1000 });
        }
      });
    };

    onMounted(() => {
      getMyData()
    })

    return {
      state,
      getMyData,
      onConfirm,
      onSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>

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
