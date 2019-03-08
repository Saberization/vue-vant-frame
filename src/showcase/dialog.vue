<template>
  <div class="container">
    <van-header
      title="Dialog 弹出框"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">消息提示</h4>
      <van-button
        type="primary"
        plain
        @click="openDialog({title: '标题', message: '弹窗内容'})"
      >消息提示</van-button>
      <van-button
        type="primary"
        plain
        @click="openDialog({message: '弹窗内容'})"
      >无标题提示</van-button>

      <h4 class="cell-title">消息确认</h4>
      <van-button
        type="primary"
        plain
        @click="openConfirmDialog({title: '标题', message: '弹窗内容', showCancelButton: true})"
      >消息确认</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import vanHeader from '@components/header'
import vanButton from '@components/button'

export default {
  name: 'Dialog',
  components: {
    vanHeader,
    vanButton
  },
  methods: {
    openDialog (options) {
      Dialog.alert(options).then(() => {
        // close
      })
    },
    openConfirmDialog (options) {
      Dialog.alert(options).then(() => {
        // confirm
      }).catch(() => {
        // close
      })
    }
  }
}
</script>

<style scoped>
.van-button {
  margin-left: 10px;
}
</style>
