<template>
  <div class="todo-list">
    <van-row justify="center">
      <h2 class="title">学校评价系统</h2>
    </van-row>
    <div class="card">
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="22">
          <!-- 请选择城市 -->
          <van-field
            readonly
            clickable
            name="picker"
            v-model="state.user.area"
            placeholder="请选择城市"
            left-icon="location-o"
            @click="state.showArea = true"
          />
          <van-popup v-model:show="state.showArea" position="bottom">
            <van-picker
              :columns="state.areaColumns"
              @confirm="onAreaConfirm"
              @cancel="state.showArea = false"
              @change="onChange"
            />
          </van-popup>
          <!-- 请选择学校 -->
          <van-field
            readonly
            clickable
            name="picker"
            v-model="state.user.school"
            placeholder="请选择学校"
            left-icon="wap-home-o"
            @click="state.showPicker = true"
          />
          <van-popup v-model:show="state.showPicker" position="bottom">
            <van-picker
              :columns="state.columns"
              @confirm="onSchoolConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <!-- 请输入用户名 -->
          <van-field
            v-model="state.user.username"
            clearable
            placeholder="请输入用户名"
            left-icon="user-o"
            class="field"
          />
          <!-- 请输入密码 -->
          <van-field
            v-model="state.user.password"
            type="password"
            placeholder="请输入密码"
            left-icon="edit"
            class="field"
          />
        </van-col>
      </van-row>
      <van-row justify="center" class="card-row">
        <van-col span="22">
          <van-row justify="center" align="bottom" class="card-row btn-row">
            <van-button
              block
              round
              :loading="state.loading"
              loading-text="登录中"
              class="btn-login"
              type="primary"
              @click="login"
            >登录</van-button>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script lang="ts">
 // 在vue2中 data 在vue3中使用 reactive代替
import { reactive, computed, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getProvince, getCity, getSchool } from '/@/api/login'
import Cookies from 'js-cookie'
export default {
  // setup相当于vue2.0的 beforeCreate和 created，是vue3新增的一个属性，所有的操作都在此属性中完成
  setup(props, context) {
    const state = reactive({
      user: {
        area: "",
        school: "",
        username: "",
        password: "",
        provinceId: 0,
        cityId: 0,
        schoolId: 0,
      },
      showPicker: false,
      showArea: false,
      loading: false,
      province: [],
      city: [],
      school: [],
      areaColumns: [],
      columns: [],
    })

    function getMyCity(value) {
      getCity(value).then(res => {
        const arr = []
        state.city = res.result.data
        state.city.forEach(item => {
          arr.push(item.name)
        });
        const obj = { values: arr }
        if (state.areaColumns.length > 1) 
          state.areaColumns.splice(1, 1)
        state.areaColumns.push(obj)
      })
    }

    function onChange(value, changeIndex) {
      // 只有变化省份这一栏才发新请求
      if (changeIndex === 0) {
        state.province.forEach(item => {
          if (item.name === value[0]) {
            state.user.provinceId = item.id
          }
        }) 
        getMyCity(state.user.provinceId)
      }
    }
    
    function onAreaConfirm(value) {
      state.user.area = value
        .filter((item) => !!item)
        .map((item) => item)
        .join(' / ');
      state.showArea = false;

      state.city.forEach((item) => {
        if (item.name === value[1])
          state.user.cityId = item.id
      })
      getSchool(state.user.provinceId, state.user.cityId).then(res => {
        const arr = []
        state.school = res.result.data
        state.school.forEach(item => {
          arr.push(item.name)
        });
        const obj = { values: arr }
        if (state.columns.length) 
          state.columns = []
        state.columns.push(obj)
      })
    }

    function onSchoolConfirm(value) {
      state.user.school = value[0]
      state.showPicker = false
      state.school.forEach(item => {
        if (item.name === value[0]) {
          state.user.schoolId = item.id
        }
      }) 
    }
    function login() {
      console.log(state.user);
      Cookies.set('provinceId', state.user.provinceId)
      Cookies.set('cityId', state.user.cityId)
      Cookies.set('schoolId', state.user.schoolId)
    }

    onMounted(() => {
      // 获取省份并整理数据, 结合vant picker文档
      const promise1 = new Promise((resolve, reject) => {
        getProvince().then(res => {
          const arr = []
          state.province = res.result.data
          state.province.forEach(item => {
            arr.push(item.name)
          });
          const obj = { values: arr }
          state.areaColumns.push(obj)
          state.user.provinceId = res.result.data[0].id
          resolve()
        })
      });

      // 初次获取城市
      promise1.then(() => {
        getMyCity(state.user.provinceId)
      });
    })

		// 在Vue3.0中，所有的数据和方法都通过在setup 中 return 出去，然后在template中使用
    return {
      state,
      onAreaConfirm,
      onChange,
      onSchoolConfirm,
      login,
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .van-field__left-icon {
    margin-right: 30px;
  }
</style>
