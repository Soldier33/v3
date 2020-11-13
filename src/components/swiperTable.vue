<template>
  <div v-if="props.tableData.length" class="topNav_all">
    <div class="topNav_left">
      <div class="topNav_title">
        <span class="fix-active" :style="titleClass">{{ firstHead.text }}</span>
      </div>
      <div v-for="item of data" class="topNav_title">
        <span class="fix-active" :style="titleClass">{{ item[firstHead.value] }}</span>
      </div>
    </div>
    <ul id="topNav" class="swiper-container">
      <li class="swiper-wrapper">
        <div 
          :class="['swiper-slide',item.width ? 'default-'+item.width : 'default-100px']"
          v-for="(item, index) in otherHead"
          :key="item.text"
        ><span>{{ item.text }}</span></div>
      </li>

      <template v-for="itemTable of data" :key='itemTable'>
        <li class="swiper-wrapper">
          <div class="swiper-slide1"
            v-for="item of otherHead"
            :style="{ width: item.width ? item.width : '100px '}"
            :key="item.text"><span> {{ itemTable[item.value] }}</span></div>
        </li>
      </template>
    </ul>
  </div>

  <div class="no-message" v-else>
      <van-empty description="没能找到符合的数据！" />
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
      swiper: null,
    })

    const print = (() => {
      nextTick(() => {
        if (state.swiper) {
          state.swiper.destroy(false)
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
        // width:  100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-top: 1px solid #ccc;
        background: white;
        white-space:nowrap;       /* 使文本不可换行 */
        overflow:hidden;          /* 隐藏溢出部分 */ 
        text-overflow:ellipsis;   /* 显示省略符号来代表被隐藏的文本 */
        span{
          transition:width .3s ease;
        }
      }
      .swiper-slide1 {
        padding: 0 5px;
        text-align: center;
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
.default-76px{
  width: 76px;
}
.default-100px{
  width:100px
}
.default-200px{
  width: 200px;
}
.default-150px{
  width: 150px;
}
</style>
