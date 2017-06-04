<template>
  <div id="swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="imgload" :src="srcImage.pic1" alt="首页banner图片01">
        </div>
        <div class="swiper-slide">
          <img class="imgload" :src="srcImage.pic2"  alt="首页banner图片02">
        </div>
        <div class="swiper-slide">
          <img class="imgload" :src="srcImage.pic3" alt="首页banner图片03">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from '../../../static/swiper-3.4.2.min.js';
import {
  mapGetters
} from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'srcImage'
    ])
  },
  mounted() {
    this.mySwiper = new Swiper('.swiper-container', {
      // 滑动方向
      direction: 'horizontal',
      loop: true,
      // 自动播放时间
      autoplay: 2000,
      // 使用分页器
      pagination: '.swiper-pagination',
      // 用户操作后是否停止 autoplay ,默认为 true：停止
      autoplayDisableOnInteraction: false
    });
  },
  components: {}
};
</script>
<style lang="scss" type="text/css">
@import '../../../static/swiper-3.4.2.min.css';
#swiper {
  width: 100%;
  text-align: center;
  .swiper-container {
    width: 100%;
    .imgload {
      width: 100%;
    }
    .swiper-pagination {
      // 更改分页器圆点颜色
      .swiper-pagination-bullet-active {
        background: rgba(240, 20, 20, 0.8);
      }
    }
  }
}
</style>
