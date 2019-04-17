<template>
  <div class="container">
    <van-header
      title="Uploader 图片上传"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-uploader :after-read="onRead">
        <van-icon
          name="photograph"
          size="24px"
        />
      </van-uploader>

      <h4 class="cell-title">设置 Input 属性</h4>
      <van-uploader
        :after-read="onRead"
        accept="image/gif, image/jpeg"
        multiple
      >
        <van-icon
          name="photograph"
          size="24px"
        />
      </van-uploader>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanUploader from '@components/uploader';
import vanIcon from '@components/icon';

export default {
  name: 'Uploader',
  components: {
    vanHeader,
    vanUploader,
    vanIcon
  },
  methods: {
    onRead (file) {
      const Console = console;

      Console.log(file);
    }
  }
};
</script>

<style scoped>
.van-uploader {
  padding-left: 10px;
}
</style>
