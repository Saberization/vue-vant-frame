<template>
  <div class="container">
    <van-header
      title="Rate 评分"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-rate v-model="value" @change="onChange" />

      <h4 class="cell-title">自定义图标</h4>
      <van-rate
        v-model="value"
        icon="like"
        void-icon="like-o"
      />

      <h4 class="cell-title">自定义样式</h4>
      <van-rate
        v-model="value"
        :size="25"
        :count="6"
        color="#07c160"
        void-color="#ceefe8"
      />

      <h4 class="cell-title">禁用状态</h4>
      <van-rate v-model="value" disabled />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanRate from '@components/rate';
import { Toast } from 'vant';

export default {
  name: 'Rate',
  components: {
    vanHeader,
    vanRate
  },
  data() {
    return {
      value: 3
    };
  },
  methods: {
    onChange() {
      Toast(`当前评分: ${this.value}`);
    }
  }
};
</script>

<style scoped>
.van-content {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
