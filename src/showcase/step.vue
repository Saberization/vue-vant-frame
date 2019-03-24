<template>
  <div class="container">
    <van-header
      title="Steps 步骤条"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-steps :active="active">
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import { Step, Steps } from 'vant'

export default {
  name: 'Step',
  components: {
    vanHeader,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data () {
    return {
      active: 1
    }
  }
}
</script>
