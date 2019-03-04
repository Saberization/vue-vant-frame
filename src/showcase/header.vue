<template>
  <div class="container">
    <van-header
      title="Header 导航栏"
      :left-arrow="true"
    ></van-header>

    <div class="van-content">
      <van-header
        title="标题"
        :left-arrow="true"
        left-text="返回"
        right-text="按钮"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        style="top: 80px;"
      ></van-header>
      <van-header
        title="标题"
        :left-arrow="true"
        left-text="返回"
        @click-left="onClickLeft"
        style="top: 160px;"
      >
        <van-icon name="search" slot="right"></van-icon>
      </van-header>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanIcon from '@components/icon'
import { Toast } from 'vant'

export default {
  name: 'Header',
  components: {
    vanHeader,
    vanIcon
  },
  methods: {
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
  }
}
</script>
