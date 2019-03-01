<template>
  <div class="container">
    <van-header
      title="Button 按钮"
      left-text="返回"
      :left-arrow="true"
    ></van-header>

    <div class="van-content">
      <h4 class="cell-title">按钮类型</h4>
      <div class="btn-area">
        <van-button type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="info">信息按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@components/header'
import Button from '@components/button'

export default {
  name: 'Button',
  components: {
    'van-button': Button,
    'van-header': Header
  }
}
</script>

<style lang="scss" scoped>
.van-content {
  padding-left: 10px;
  padding-right: 10px;

  .cell-title {
    padding-left: 0;
  }

  .btn-area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
