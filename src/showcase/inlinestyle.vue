<template>
  <div class="container">
    <van-header
      title="内置样式"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">文字省略</h4>
      <p
        class="van-ellipsis"
        style="padding-left: 10px; padding-right: 10px;"
      >这是一段宽度限制 250px 的文字，后面的内容会省略</p>

      <h4 class="cell-title">1px 边框</h4>
      <div style="background: #fff; padding: 15px;">
        <!-- 上边框 -->
        <div class="van-hairline--top"></div>

        <!-- 下边框 -->
        <div class="van-hairline--bottom"></div>

        <!-- 左边框 -->
        <div class="van-hairline--left"></div>

        <!-- 右边框 -->
        <div class="van-hairline--right"></div>

        <!-- 上下边框 -->
        <div class="van-hairline--top-bottom"></div>

        <!-- 全边框 -->
        <div class="van-hairline--surround"></div>
      </div>

      <h4 class="cell-title">动画</h4>
      <van-cell-group>
        <van-cell @click="toggleShow('Fade')">Fade</van-cell>
        <van-cell @click="toggleShow('SlideUp')">Slide Up</van-cell>
        <van-cell @click="toggleShow('SlideDown')">Slide Down</van-cell>
        <van-cell @click="toggleShow('SlideLeft')">Slide Left</van-cell>
        <van-cell @click="toggleShow('SlideRight')">Slide Right</van-cell>
      </van-cell-group>
    </div>

    <!-- 淡入 -->
    <transition name="van-fade">
      <div class="rectangle" v-show="visibleFade"></div>
    </transition>

    <!-- 上滑进入 -->
    <transition name="van-slide-up">
      <div class="rectangle" v-show="visibleSlideUp"></div>
    </transition>

    <!-- 下滑进入 -->
    <transition name="van-slide-down">
      <div class="rectangle" v-show="visibleSlideDown"></div>
    </transition>

    <!-- 左滑进入 -->
    <transition name="van-slide-left">
      <div class="rectangle" v-show="visibleSlideLeft"></div>
    </transition>

    <!-- 右滑进入 -->
    <transition name="van-slide-right">
      <div class="rectangle" v-show="visibleSlideRight"></div>
    </transition>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
  name: 'InlineStyle',
  components: {
    vanHeader,
    vanCellGroup,
    vanCell
  },
  data () {
    return {
      visibleFade: false,
      visibleSlideUp: false,
      visibleSlideDown: false,
      visibleSlideLeft: false,
      visibleSlideRight: false
    };
  },
  methods: {
    toggleShow (type) {
      switch (type) {
        case 'Fade':
          this.visibleFade = true;
          setTimeout(() => {
            this.visibleFade = false;
          }, 600);
          break;

        case 'SlideUp':
          this.visibleSlideUp = true;
          setTimeout(() => {
            this.visibleSlideUp = false;
          }, 600);
          break;

        case 'SlideDown':
          this.visibleSlideDown = true;
          setTimeout(() => {
            this.visibleSlideDown = false;
          }, 600);
          break;

        case 'SlideLeft':
          this.visibleSlideLeft = true;
          setTimeout(() => {
            this.visibleSlideLeft = false;
          }, 600);
          break;

        case 'SlideRight':
          this.visibleSlideRight = true;
          setTimeout(() => {
            this.visibleSlideRight = false;
          }, 600);
          break;
      }
    }
  }
};
</script>

<style scoped>
  .rectangle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    background-color: #1989fa;
  }
</style>
