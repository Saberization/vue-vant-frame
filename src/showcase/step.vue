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
      <van-button @click="nextStep">下一步</van-button>

      <h4 class="cell-title">自定义样式</h4>
      <van-steps
        :active="active"
        active-icon="success"
        active-color="#38f"
      >
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>

      <h4 class="cell-title">竖向步骤条</h4>
      <van-steps
        direction="vertical"
        :active="0"
      >
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanButton from '@components/button'
import { Step, Steps } from 'vant'

export default {
  name: 'Step',
  components: {
    vanHeader,
    vanButton,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data () {
    return {
      active: 1
    }
  },
  methods: {
    nextStep () {
      this.active = this.active >= 3 ? 0 : this.active + 1;
    }
  }
}
</script>

<style scoped>
.van-button {
  margin: 10px;
}
</style>
