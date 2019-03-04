<template>
  <div class="container">
    <van-header title="Popup 弹出层" left-arrow left-text="返回"></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button @click="onClickCenterPopup">弹出 Popup</van-button>

      <h4 class="cell-title">弹出位置</h4>
      <van-button @click="onClickBottomPopup">底部弹出</van-button>
      <van-button @click="onClickTopPopup">顶部弹出</van-button>
      <van-button @click="onClickRightPopup">右侧弹出</van-button>
    </div>

    <van-popup v-model="show" :position="position" :overlay="overlay">
      <div v-if="position === ''" class="position-center">内容</div>
      <div v-else-if="position === 'top'" class="position-top">内容</div>
      <div v-else-if="position === 'bottom'" class="position-bottom">内容</div>
      <div v-else class="position-right">
        <van-button @click="closePopup">关闭弹层</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPopup from '@components/popup'
import vanButton from '@components/button'

export default {
  name: 'Popup',
  components: {
    vanPopup,
    vanHeader,
    vanButton
  },
  data() {
    return {
      show: false,
      position: '',
      overlay: true
    }
  },
  methods: {
    onClickCenterPopup () {
      this.show = true
    },
    onClickBottomPopup () {
      this.show = true
      this.position = 'bottom'

      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    onClickTopPopup () {
      this.show = true
      this.overlay = false
      this.position = 'top'

      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    onClickRightPopup () {
      this.show = true
      this.position = 'right'
    },
    closePopup() {
      this.show = false
      this.overlay = true
    }
  }
}
</script>

<style scoped>
  .van-content {
    padding-left: 10px;
    padding-right: 10px;
  }
  .van-button {
    margin-right: 10px;
  }
  .position-center {
    width: 150px;
    height: 50px;
    padding: 10px;
  }
  .position-top,
  .position-bottom {
    color: #fff;
    border-radius: 0;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
  }
  .van-popup--right {
    width: 70%;
    height: 100%;
  }
  .position-right {
    padding: 20px;
  }
</style>
