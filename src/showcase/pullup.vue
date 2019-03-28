<template>
  <div class="container">
    <van-header
      title="PullDown 上拉加载"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-tabs>
        <van-tab
          v-for="(value, index) in ['基础用法', '错误提示']"
          :key="index"
        >
          <div slot="title">
            {{value}}
          </div>
          <div class="tab-content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPullDown from '@components/pulldown'
import { Tab, Tabs } from 'vant'

export default {
  name: 'PullUp',
  components: {
    vanHeader,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    vanPullDown
  }
}
</script>
