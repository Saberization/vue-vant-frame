<template>
  <div class="container">
    <van-header
      title="Panel 面板"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-panel
        title="标题"
        desc="描述信息"
        status="状态"
      >
        <div class="text-content">内容</div>
      </van-panel>

      <h4 class="cell-title">高级用法</h4>
      <van-panel
        title="标题"
        desc="描述信息"
        status="状态"
      >
        <div class="text-content">内容</div>
        <div slot="footer" class="footer">
          <van-button size="small">按钮</van-button>
          <van-button
            size="small"
            type="danger"
            class="ml10"
          >按钮</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanPanel from '@components/panel';
import vanButton from '@components/button';

export default {
  name: 'Panel',
  components: {
    vanPanel,
    vanHeader,
    vanButton
  }
};
</script>

<style scoped>
.text-content {
  padding: 10px;
}

.ml10 {
  margin-left: 10px;
}

.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
