<template>
  <div class="container">
    <van-header
      title="Gallery 轮播"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-gallery
        :data="[1, 2, 3, 4]"
        :autoplay="3000"
        indicator-color="white"
        class="demo-gallery--base"
      ></van-gallery>

      <h4 class="cell-title">图片轮播</h4>
      <van-gallery
        :data="images"
        :autoplay="3000"
        indicator-color="white"
        @click="onClick"
      ></van-gallery>

      <h4 class="cell-title">监听 change 事件</h4>
      <van-gallery
        :data="[1, 2, 3, 4]"
        class="demo-gallery--base"
        @change="onChange"
      ></van-gallery>

      <h4 class="cell-title">纵向滚动</h4>
      <van-gallery
        :data="[1, 2, 3, 4]"
        :autoplay="3000"
        :height="150"
        class="demo-gallery--base demo-swipe--vertical"
        vertical
      ></van-gallery>

      <h4 class="cell-title">设置滑块大小</h4>
      <van-gallery
        :data="[1, 2, 3, 4]"
        :width="300"
        class="demo-gallery--base"
      ></van-gallery>

      <h4 class="cell-title">自定义指示器</h4>
      <van-gallery
        :data="[1, 2, 3, 4]"
        :autoplay="3000"
        class="demo-gallery--base"
        @change="onChange"
      >
        <div
          class="custom-indicator"
          slot="indicator"
        >
          {{ current + 1 }}/4
        </div>
      </van-gallery>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanGallery from '@components/gallery';

export default {
  name: 'Gallery',
  components: {
    vanHeader,
    vanGallery
  },
  data () {
    return {
      current: 0,
      images: [{
        guid: '47ee3fc6-ce5f-40b2-8abc-68bc3091f830',
        title: '标题一',
        pic: 'https://fe.epoint.com.cn/m7showcase/showcase/widgets/gallery/images/testgallery1.jpg'
      },
      {
        guid: 'c0aa1496-f27a-4cd4-a6b6-57175e54ab67',
        title: '标题二',
        pic: 'https://fe.epoint.com.cn/m7showcase/showcase/widgets/gallery/images/testgallery2.jpg'
      }, {
        guid: '47ee3fc6-ce5f-40b2-8abc-68bc3091f832',
        title: '标题三',
        pic: 'https://fe.epoint.com.cn/m7showcase/showcase/widgets/gallery/images/testgallery3.jpg'
      },
      {
        guid: 'c0aa1496-f27a-4cd4-a6b6-57175e54a267',
        title: '标题四',
        pic: 'https://fe.epoint.com.cn/m7showcase/showcase/widgets/gallery/images/testgallery4.jpg'
      }]
    };
  },
  methods: {
    onClick (guid) {
      console.log(`点击了：${guid}`);
    },
    onChange (index) {
      this.current = index;
      console.log(`当前 Gallery 索引：${index}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-gallery--base /deep/ .van-swipe__track {
  & > .van-swipe-item {
    line-height: 150px;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
  & > .van-swipe-item:nth-child(odd) {
    background-color: #66c6f2;
  }
  & > .van-swipe-item:nth-child(even) {
    background-color: #39a9ed;
  }
}

.demo-swipe--vertical {
  height: 150px;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
</style>
