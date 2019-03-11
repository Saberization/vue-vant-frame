<template>
  <div class="container">
    <van-header
      title="ImagePreview 图片预览"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">点击图片预览</h4>
      <img
        v-for="(item, index) in imgList"
        :key="index"
        :src="item"
        alt=""
        @click="onShowImg(index)"
      >
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import vanHeader from '@components/header'

export default {
  name: 'ImagePreview',
  components: {
    vanHeader
  },
  data () {
    return {
      imgList: ['https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg', 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg']
    }
  },
  methods: {
    onShowImg (startPosition) {
      ImagePreview({
        images: this.imgList,
        startPosition: startPosition,
        onClose () {
          // close dosomething
        }
      })
    }
  }
}
</script>

<style scoped>
.van-content {
  padding-left: 10px;
  padding-right: 10px;
}

.van-content img {
  width: 100%;
  margin-bottom: 5px;
}
</style>
