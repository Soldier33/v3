<template>
  <div class="topNav_all">
    <div class="topNav_left">
      <div class="topNav_title">
        <span class="fix-active">{{ state.firstHead }}</span>
      </div>
      <div class="topNav_title">
        <span class="fix-active">测试2</span>
      </div>
      <div class="topNav_title">
        <span class="fix-active">测试3</span>
      </div>
      <div class="topNav_title">
        <span class="fix-active">测试4</span>
      </div>
      <div class="topNav_title">
        <span class="fix-active">测试5</span>
      </div>
    </div>
    <ul id="topNav" class="swiper-container">
      <li class="swiper-wrapper">
        <div class="swiper-slide" v-for="item of props.headData.slice(1)"><span>{{ item }}</span></div>
      </li>
      <li class="swiper-wrapper">
        <div class="swiper-slide1"><span>11-02(四)</span></div>
        <div class="swiper-slide1"><span>11-02(四)</span></div>
        <div class="swiper-slide1"><span>11-02(四)</span></div>
        <div class="swiper-slide1"><span>11-02(四)</span></div>
        <div class="swiper-slide1"><span>11-02(四)</span></div>
      </li>
      <li class="swiper-wrapper">
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
      </li>
      <li class="swiper-wrapper">
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>

      </li>
      <li class="swiper-wrapper">
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
        <div class="swiper-slide1"><span>29</span></div>
      </li>

    </ul>
  </div>
</template>
<script lang="ts">
import { createApp, reactive, computed, onMounted, nextTick } from "vue";
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  props: {
    headData: [String]
  },
  setup(props) {
    console.log(props, props.headData);
    
    const state = reactive({
      firstHead: '',
    })

    onMounted(() => {
      new Swiper('#topNav', {
          freeMode: true,
          slidesPerView: 'auto',
          resistanceRatio: 0,
      })

      state.firstHead = props.headData[0]
    })

    return {
      state,
      props,
    }
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.flex-center-h {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.flex-center-all {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
// @nav_height:90px;
.topNav_all{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  font-size: 12px;
  // color:#2c3e50;
  color:black;
  .topNav_left{
    background: white;
    width:114px;
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .topNav_title{
      display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .fix-active{
      width:113px;
      height: 35px;
      line-height: 35px;
      border-right: 1px solid #ccc;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .fix-active:nth-of-type(1){
      border-top:1px solid #ccc;
      border-right: 1px solid  #ccc;
    }
    .topNav_title:last-child{
      border-bottom: 1px solid  #ccc;
    }
  }
  #topNav {
    width: 100%;
    .swiper-wrapper{
      .swiper-slide {
        padding: 0 5px;
        /*letter-spacing:2px;*/
        width:90px;
        height: 35px;
        line-height: 35px;
        text-align:center;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: white;
        span{
          transition:width .3s ease;
          display:block;
        }
      }
      .swiper-slide1 {
        padding: 0 5px;
        /*letter-spacing:2px;*/
        width:90px;
        text-align:center;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #ccc;
        flex-shrink: 0;
        span{
          transition:width .3s ease;
          display:block;
        }
      }
    }
  }
}
</style>
