<template>
  <div class="topNav_all">
    <div class="topNav_left">
      <div class="topNav_title">
        <span class="fix-active" :style="titleClass">{{ firstHead.text }}</span>
      </div>
      <div v-for="item of data" :key="item" class="topNav_title">
        <span class="fix-active" :style="titleClass">{{ item[firstHead.value] }}</span>
      </div>
    </div>
    <ul id="topNav" class="swiper-container">
      <li class="swiper-wrapper">
        <div class="swiper-slide" :style="{ 'width': item.width ? item.width : '100px'}" v-for="item of otherHead" :key="item.text"><span>{{ item.text }}</span></div>
      </li>

      <template v-for="itemTable of data" :key='itemTable'>
        <li class="swiper-wrapper">
          <div class="swiper-slide1" :style="{ 'width': item.width ? item.width : '100px'}" v-for="item of otherHead" :key="item.text"><span> {{ itemTable[item.value] }}</span></div>
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
    headData: Array,
    tableData: Array,
  },
  setup(props) {
    const state = reactive({
      swiper: null
    })

    const print = (() => {
      nextTick(() => {
        if (state.swiper) {
          state.swiper.destroy()
        }
        state.swiper = new Swiper('#topNav', {
            freeMode: true,
            slidesPerView: 'auto',
            resistanceRatio: 0,
            observer:true,
            observeParents:true,
        })      
      })
    })

    const data = computed(() => {
      return props.tableData
    })

    const firstHead = computed(() => {
      return props.headData[0]
    })

    const otherHead = computed(() => {
      return props.headData.slice(1)
    })

    const titleClass = computed(() => {
      const newWidth = props.headData[0]['width']
      return {
        'width': newWidth ? newWidth : '100px',
      }
    })

    watch(props.tableData, (val) => {
      return val
    })

    return {
      state,
      props,
      firstHead,
      otherHead,
      data,
      print,
      titleClass,
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space:nowrap;       /* 使文本不可换行 */
    overflow:hidden;          /* 隐藏溢出部分 */ 
    text-overflow:ellipsis;   /* 显示省略符号来代表被隐藏的文本 */
    .fix-active{
      height: 35px;
      line-height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space:nowrap;       /* 使文本不可换行 */
      overflow:hidden;          /* 隐藏溢出部分 */ 
      text-overflow:ellipsis;   /* 显示省略符号来代表被隐藏的文本 */
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
        // min-width:  0px;
        height: 35px;
        line-height: 35px;
        text-align:center;
        border-top: 1px solid #ccc;
        background: white;
        span{
          transition:width .3s ease;
          // display:block;
        }
      }
      .swiper-slide1 {
        padding: 0 5px;
        text-align:center;
        height: 35px;
        line-height: 35px;
        flex-shrink: 0;
        border-top:1px solid #ccc;
        white-space:nowrap;       /* 使文本不可换行 */
        overflow:hidden;          /* 隐藏溢出部分 */ 
        text-overflow:ellipsis;   /* 显示省略符号来代表被隐藏的文本 */
        span{
          transition:width .3s ease;
        }
      }
    }
  }
}
</style>
