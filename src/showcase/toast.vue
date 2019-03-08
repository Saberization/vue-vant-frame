<template>
  <div class="container">
    <van-header
      title="Toast 轻提示"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">文字提示</h4>
      <van-button @click="showToast('提示内容')">文字提示</van-button>
      <van-button @click="showToast('这是一条很长的提示内容，超出内容会自动换行的')">长文字提示</van-button>

      <h4 class="cell-title">加载提示</h4>
      <van-button @click="loadingToast">加载提示</van-button>

      <h4 class="cell-title">成功/失败提示</h4>
      <van-button @click="successToast">成功提示</van-button>
      <van-button @click="errorToast">失败提示</van-button>

      <h4 class="cell-title">高级用法</h4>
      <van-button @click="advToast">高级用法</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import vanHeader from '@components/header'
import vanButton from '@components/button'

export default {
  name: 'Toast',
  components: {
    vanHeader,
    vanButton
  },
  methods: {
    showToast (options) {
      Toast(options)
    },
    loadingToast () {
      Toast.loading({
        // 遮罩
        mask: true,
        // 加载信息
        message: '加载中...',
        // 多少毫秒自动关闭toast，0为不关闭toast
        duration: 1300
      })
    },
    successToast () {
      Toast.success('成功文案')
    },
    errorToast () {
      Toast.fail('失败文案')
    },
    advToast () {
      const toast = Toast.loading({
        // 持续展示 toast
        duration: 0,
        // 禁用背景点击
        forbidClick: true,
        loadingType: 'spinner',
        message: '倒计时 3 秒'
      })

      let second = 3
      const timmer = setInterval(() => {
        second--
        if (second) {
          toast.message = `倒计时 ${second} 秒`
        } else {
          clearInterval(timmer)
          // 关闭 toast
          Toast.clear()
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.van-button {
  margin-left: 10px;
}
</style>
