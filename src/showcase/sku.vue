<template>
  <div class="container">
    <van-header title="Sku 商品规格" left-arrow></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button size="large" type="primary">基础用法</van-button>

      <h4 class="cell-title">自定义步进器</h4>
      <van-button size="large" type="primary">自定义步进器</van-button>

      <h4 class="cell-title">隐藏售罄规格</h4>
      <van-button size="large" type="primary">隐藏售罄规格</van-button>

      <h4 class="cell-title">高级用法</h4>
      <van-button size="large" type="primary">高级用法</van-button>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanButton from '@components/button'
import vanSku from '@components/sku'

export default {
  name: 'Sku',
  components: {
    vanHeader,
    vanButton,
    vanSku
  }
}
</script>

<style scoped>
  .van-button {
    display: block;
    width: 94%;
    margin: 0 auto;
  }
</style>
