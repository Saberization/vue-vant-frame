<template>
  <div class="container">
    <van-header
      title="Progress 进度条"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-progress :percentage="50" />

      <h4 class="cell-title">置灰</h4>
      <van-progress
        :percentage="50"
        inactive
      />

      <h4 class="cell-title">样式定制</h4>
      <van-progress
        pivot-text="橙色"
        color="#f2826a"
        :percentage="25"
      />

      <van-progress
        pivot-text="红色"
        color="#f44"
        :percentage="50"
      />

      <van-progress
        :percentage="75"
        pivot-text="紫色"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #be99ff, #7232dd)"
      />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanProgress from '@components/progress';

export default {
  name: 'Progress',
  components: {
    vanHeader,
    vanProgress
  }
};
</script>

<style scoped>
.van-content {
  padding: 10px;
}

.van-progress {
  margin-bottom: 20px;
}
</style>
