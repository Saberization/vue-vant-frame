<template>
  <div class="container">
    <van-header title="Badge 徽章" left-arrow></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <div class="van-doc-demo-block">
        <van-badge-group
          :active-key="activeKey"
          @change="onChange"
          class="wh85 block-center"
        >
          <van-badge title="标签名称" />
          <van-badge
            title="标签名称"
            info="8"
          />
          <van-badge
            title="标签名称"
            info="99"
          />
          <van-badge
            title="标签名称"
            info="99+"
          />
        </van-badge-group>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import { Badge, BadgeGroup } from 'vant'

export default {
  name: 'Badge',
  components: {
    'van-badge': Badge,
    'van-badge-group': BadgeGroup,
    vanHeader
  },
  data () {
    return {
      activeKey: 0
    }
  },
  methods: {
    onChange (key) {
      this.activeKey = key
    }
  }
}
</script>

<style scoped>
.wh85 {
  width: 85px;
}

.van-doc-demo-block {
  padding: 20px;
  background-color: #fff;
}

.block-center {
  margin: 0 auto;
}
</style>
