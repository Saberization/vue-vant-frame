<template>
  <div class="container">
    <van-header
      title="Loading 加载"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">Circular</h4>
      <van-loading size="30px" />
      <van-loading
        color="white"
        size="30px"
        class="van-loading-bg"
      />

      <h4 class="cell-title">Spinner</h4>
      <van-loading
        size="30px"
        type="spinner"
      />
      <van-loading
        color="white"
        size="30px"
        type="spinner"
        class="van-loading-bg"
      />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanLoading from '@components/loading';

export default {
  name: 'Loading',
  components: {
    vanHeader,
    vanLoading
  }
};
</script>

<style scoped>
.van-loading {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}

.van-loading-bg {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}
</style>
