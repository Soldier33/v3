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
            :value="state.user.province"
            placeholder="请选择城市"
            left-icon="location-o"
            @click="state.showArea = true"
          />
          <van-popup v-model:show="state.showArea" position="bottom">
            <van-area
              :area-list="state.areaList"
              :columns-num="2"
              @confirm="onAreaConfirm"
              @cancel="state.showArea = false"
            />
          </van-popup>
          <!-- 请选择学校 -->
            <!-- :value="state.user.school" -->
          <van-field
            readonly
            clickable
            name="picker"
            :value="state.test"
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
 import { useStore } from 'vuex'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  // setup相当于vue2.0的 beforeCreate和 created，是vue3新增的一个属性，所有的操作都在此属性中完成
  setup(props, context) {
    // 通过reactive 可以初始化一个可响应的数据，与Vue2.0中的Vue.observer很相似
    const state = reactive({
      user: {
        province: "",
        city: "",
        school: "",
        username: "",
        password: ""
      },
      test: '',
      showPicker: false,
      showArea: false,
      loading: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区',
          // ....
        }
      }
    })
    function onAreaConfirm(value) {
      state.user.province = value;
      state.showArea = false;
      console.log(value);
    }
    function onSchoolConfirm(value) {
      // state.user.school = value;
      state.test = value
      state.showPicker = false;
    }
    function login() {
      console.log(state.user);
    }
		// 在Vue3.0中，所有的数据和方法都通过在setup 中 return 出去，然后在template中使用
    return {
      state,
      onAreaConfirm,
      onSchoolConfirm,
      login
    }
  }
}
</script>
<style scoped>

</style>
