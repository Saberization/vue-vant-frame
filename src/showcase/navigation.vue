<template>
  <div class="container">
    <p class="component-title">轻量、可靠的移动端 Vue 组件库</p>

    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="基础组件"
        name="1"
      >
        提供多样店铺模板，快速搭建网上商城
      </van-collapse-item>

      <van-collapse-item
        title="表单组件"
        name="2"
      >
        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
      </van-collapse-item>

      <van-collapse-item
        title="反馈组件"
        name="3"
      >
        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
      </van-collapse-item>

      <van-collapse-item
        title="展示组件"
        name="4"
      >
        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
      </van-collapse-item>

      <van-collapse-item
        title="导航组件"
        name="5"
      >
        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
      </van-collapse-item>

      <van-collapse-item
        title="业务组件"
        name="6"
      >
        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant'

export default {
  name: "Navigation",
  components: {
    "van-collapse": Collapse,
    "van-collapse-item": CollapseItem
  },
  data() {
    return {
      activeNames: ["1"]
    };
  }
}
</script>

<style lang="scss">
.container {
  padding: 10px;

  .component-title {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .van-collapse-item {
    margin-bottom: 20px;
  }

  .van-cell {
    padding-top: 18px;
    padding-bottom: 18px;
  }

  .van-cell__title {
    font-size: 16px;
  }
}
</style>
