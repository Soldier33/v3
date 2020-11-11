<template>
  <div class="topNav_all">
    <div class="topNav_left">
      <div class="topNav_title">
        <span class="fix-active">{{ state.firstHead }}</span>
      </div>
      <div v-for="item of data" class="topNav_title">
        <span class="fix-active">{{ item[state.firstProps] }}</span>
      </div>
    </div>
    <ul id="topNav" class="swiper-container">
      <li class="swiper-wrapper">
        <div class="swiper-slide" v-for="item of props.headData.slice(1)"><span>{{ item }}</span></div>
      </li>

      <template v-for="item of data" :key='item'>
        <li class="swiper-wrapper">
          <div class="swiper-slide1" :class="itemProps" v-for="itemProps of props.headProps.slice(1)" ><span> {{ item[itemProps] }}</span></div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { createApp, watch, reactive, computed, onMounted, nextTick } from "vue";
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  props: {
    // headData: [String],
    // headProps: [String],
    headData: Array,
    headProps: Array,
    tableData: Array,
  },
  setup(props) {
    const state = reactive({
      firstHead: '',
      firstProps: '',
      maxWidth: 0
    })

    onMounted(() => {
      
      
    })

    const print = (() => {
      nextTick(() => {
        new Swiper('#topNav', {
            freeMode: true,
            slidesPerView: 'auto',
            resistanceRatio: 0,
            observer:true,
            observeParents:true,
        })

        // var divb = document.getElementsByClassName("classesName")
        // // for (let i = 1; i < divb.length; i++) {
        // //   const max = divb.item(i).offsetWidth : 
        // // }
        // state.maxWidth = divb.item(0).offsetWidth
        // // for (let i = 1; i < divb.length; i++) {
        // //   console.log(divb.item(i));
          
        // //   divb.item(i).style.width = maxWid
        // //   divb.item(i).style.color = 'red'
        // // }
        // console.log(state.maxWidth);
        
      })
      state.firstHead = props.headData[0]
      state.firstProps = props.headProps[0]

      
    })

    

    const getBannerStyle = computed(() => {
      return 'width: ' + state.maxWidth + 'px;';
    })

    const data = computed(() => {
      return props.tableData
    })

    const firstData = computed(() => {
      return props.tableData[0]
    })

    watch(props.tableData, (val) => {
      
      return val
    })

    return {
      state,
      props,
      firstData,
      data,
      print,
      getBannerStyle
    }
  },
};
</script>
<style lang="scss" scoped>
.topNav_all{
  touch-action: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  font-size: 12px;
  color:black;
  background: white;
  .topNav_left{
    // width:114px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space:nowrap;       /* 使文本不可换行 */
    overflow:hidden;          /* 隐藏溢出部分 */ 
    text-overflow:ellipsis;   /* 显示省略符号来代表被隐藏的文本 */
    .fix-active{
      min-width:113px;
      height: 35px;
      line-height: 35px;
      display: flex;
      width: fit-content;
      justify-content: center;
      align-items: center;
    }
    .fix-active:nth-of-type(1){
      border-top:1px solid #ccc;
      border-right: 1px solid  #ccc;
    }
  }
  #topNav {
    width: 100%;
    .swiper-wrapper{
      .swiper-slide {
        padding: 0 5px;
        width:90px;
        height: 35px;
        line-height: 35px;
        text-align:center;
        border-top: 1px solid #ccc;
        background: white;
        span{
          transition:width .3s ease;
          display:block;
        }
      }
      .swiper-slide1 {
        padding: 0 5px;
        min-width:90px;
        text-align:center;
        height: 35px;
        line-height: 35px;
        flex-shrink: 0;
        border-top:1px solid #ccc;
        span{
          transition:width .3s ease;
          display:block;
        }
      }
    }
  }
}
</style>
