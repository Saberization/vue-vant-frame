<template>
  <div class="container">
    <van-header
      title="基础用法"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button @click="showNotify('通知内容')">显示消息通知</van-button>

      <h4 class="cell-title">自定义配置</h4>
      <van-button @click="showNotify({message: '通知内容', duration: 1000, background: '#1989fa'})">显示自定义消息通知</van-button>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
import vanHeader from '@components/header'
import vanButton from '@components/button'

export default {
  name: 'Notify',
  components: {
    vanHeader,
    vanButton
  },
  methods: {
    showNotify (options) {
      Notify(options)
    }
  }
}
</script>

<style scoped>
.van-button {
  margin-left: 10px;
}
</style>
