<template>
  <div class="container">
    <van-header title="FileInput 选择文件" left-arrow></van-header>
    <div class="van-content">
      <van-button type="primary" plain @click="selectFile">选择文件</van-button>
      <div class="imagelist" v-if="show">
        <div v-for="(item, index) in imagelist" :key="index">
          <img :src="item.value" alt="">
          <p>文件名：{{item.file.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanButton from '@components/button';
import FileInput from '@components/fileinput';

export default {
  name: 'FileInput',
  components: {
    vanHeader,
    vanButton
  },
  data() {
    return {
      inputFile: new FileInput({
        isMulti: false, // 是否开启多选
        type: 'Image'
      }),
      imagelist: [],
      show: false
    };
  },
  methods: {
    selectFile() {
      this.inputFile.triggerClick();
    }
  },
  created() {
    const { inputFile } = this;

    inputFile.on('change', (result) => {
      this.imagelist = result;
      this.show = true;
    });
  }
};
</script>

<style scoped>
  .van-content {
    padding: 10px;
  }

  .imagelist {
    margin-top: 10px;
  }

  .imagelist img {
    width: 50%;
  }
</style>
