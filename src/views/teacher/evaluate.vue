<template>
  <van-dropdown-menu>
    <van-dropdown-item
      v-model="state.checkGrade"
      :options="state.gradeOption"
    />
    <van-dropdown-item
      v-model="state.checkClass"
      :options="state.classOption"
    />
    <van-dropdown-item
      v-model="state.checkWeek"
      :options="state.weekOption"
    />
    <van-dropdown-item
      v-model="state.checkSubject"
      :options="state.subjectOption"
    />
  </van-dropdown-menu>
  <van-checkbox-group v-model="state.eva">
    <van-checkbox v-for="item of state.evaData" :name="item.templateId">{{ item.content }}</van-checkbox>
  </van-checkbox-group>
  <van-action-bar>
     <van-action-bar-icon icon="shop-o" text="学生" badge="12" />
     <van-action-bar-icon icon="shop-o" text="分数" badge="12" />
    <van-action-bar-button type="danger" text="立即评价" @click="onClickButton" />
  </van-action-bar>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getOption, getTest, getSubject, getStu, getEvaluate } from "/@/api/teacher/evaluate";
import { Notify } from "vant";
export default {
  setup(props, context) {
    const state = reactive({
      checkGrade: "",
      checkClass: "",
      checkSubject: "",
      checkWeek: 10,
      gradeOption: [],
      classOption: [],
      tempOption: [],
      weekOption: [
        {
          text: '第10周', value: 10
        }
      ],
      subjectOption: [],
      headData: ['选择', '学号', '姓名', '本周', '总分'],
      bodyData: [],
      checked: false,
      evaData: [],
      eva: [],
    });

    function getMySubject() {
       getSubject(state.checkClass).then((res) => {
        res.result.data.forEach((item, index) => {
          state.subjectOption.push({ text: item, value: index})
        })
        state.checkSubject = state.subjectOption[0].value
      });
    }

    function getMyStu() {
      getStu(state.checkWeek, state.checkClass).then((res) => {
        state.bodyData = res.result.data
        state.bodyData = state.bodyData.splice(0,5)
      });
    }

    function getMyEvaluate() {
      getEvaluate().then((res) => {
        console.log(res);
        state.evaData = res.result.data
      })
    }

    function onClickButton() {

    }

    onMounted(() => {
      getTest().then((res) => {
        console.log(res);
        
      })
      // 获取年级班级
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
            state.gradeOption.push({ text: item.name, value: item.id})
          })
          if (state.gradeOption.length) {
            state.checkGrade = state.gradeOption[0].value
            const temp = state.tempOption[0]
            temp.data.forEach((item) => {
              state.classOption.push({ text: item.className, value: item.classId})
            })
            if (state.gradeOption.length) {
              state.checkClass = state.classOption[0].value
            }
          }
          resolve()
        });
      });
  
      // 初次获取城市
      promise1.then(() => {
        getMySubject()
        getMyStu()
        getMyEvaluate()
      });
    });

    return {
      state,
      onClickButton
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
