<template>
  <div class="container">
    <van-header
      title="Button 按钮"
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

      <h4 class="cell-title">朴素按钮</h4>
      <div class="btn-area">
        <van-button
          plain
          type="primary"
        >朴素按钮</van-button>
        <van-button
          plain
          type="danger"
        >朴素按钮</van-button>
      </div>

      <h4 class="cell-title">禁用状态</h4>
      <div class="btn-area">
        <van-button
          type="primary"
          disabled
        >朴素按钮</van-button>
        <van-button
          type="danger"
          disabled
        >朴素按钮</van-button>
      </div>

      <h4 class="cell-title">加载状态</h4>
      <div class="btn-area">
        <van-button
          loading
          type="primary"
        />
        <van-button
          loading
          type="danger"
          loading-text="加载中..."
        />
      </div>

      <h4 class="cell-title">按钮形状</h4>
      <div class="btn-area">
        <van-button
          square
          type="primary"
        >方形按钮</van-button>
        <van-button
          round
          type="danger"
        >圆形按钮</van-button>
      </div>

      <h4 class="cell-title">按钮尺寸</h4>
      <div class="btn-area">
        <van-button size="large">大号按钮</van-button>
        <van-button size="normal">普通按钮</van-button>
        <van-button size="small">小型按钮</van-button>
        <van-button size="mini">迷你按钮</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanButton from '@components/button';

export default {
  name: 'Button',
  components: {
    vanHeader,
    vanButton
  }
};
</script>

<style lang="scss" scoped>
.van-content {
  padding-left: 10px;
  padding-right: 10px;

  .cell-title {
    padding-left: 0;
  }

  .van-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
