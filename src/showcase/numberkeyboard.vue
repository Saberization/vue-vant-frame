<template>
  <div class="container">
    <van-header
      title="NumberKeyboard 数字键盘"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">默认样式</h4>
      <van-button @click="show = !show; theme = 'default'">弹出默认键盘</van-button>

      <h4 class="cell-title">默认样式</h4>
      <van-button @click="show = !show; theme = 'custom'">弹出自定义键盘</van-button>
    </div>

    <van-number-keyboard
      :show="show"
      extra-key="."
      :theme="theme"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    ></van-number-keyboard>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanNumberKeyboard from '@components/numberkeyboard'
import vanButton from '@components/button'
import { Toast } from 'vant'

export default {
  name: 'NumberKeyboard',
  components: {
    vanHeader,
    vanNumberKeyboard,
    vanButton
  },
  data () {
    return {
      show: false,
      theme: 'default'
    }
  },
  methods: {
    onInput (keyValue) {
      Toast(`input ${keyValue}`)
    },
    onDelete () {
      Toast(`Delete`)
    }
  }
}
</script>

<style scoped>
.van-button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
