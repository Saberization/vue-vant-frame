<template>
  <div class="container">
    <van-header
      title="Lazyload 图片懒加载"
      left-arrow
    ></van-header>
    <div class="van-content">
      <img
        v-for="(item, index) in imageList"
        :key="index"
        :src="item"
        alt=""
        v-lazy="item"
      >

      <h4 class="cell-title">背景图懒加载</h4>
      <div
        class="bg-img"
        v-for="(item, index) in imageList"
        v-lazy:background-image="item"
        :key="`bg_${index}`"
      />

      <h4 class="cell-title">懒加载模块(推荐使用)</h4>
      <!-- 需要注册 lazyComponent  -->
      <lazy-component>
        <img
          v-for="(item, index) in imageList"
          v-lazy="item"
          :key="`module_${index}`"
        >
      </lazy-component>
    </div>
  </div>
</template>

<script>
// 需要在 main.js 中引入 Lazyload 模块方可使用 v-lazy
import vanHeader from '@components/header';

export default {
  name: 'Lazyload',
  components: {
    vanHeader
  },
  data() {
    return {
      imageList: [
        'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg'
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.van-content {
  padding-left: 10px;
  padding-right: 10px;

  img,
  .bg-img {
    padding: 15px;
    width: 100%;
    height: 250px;
    margin: 10px 0 0;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background-size: 315px 250px;
    background-position: 15px;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }
}
</style>
