<template>
  <div class="container">
    <van-header
      title="Circle 环形进度条"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :speed="speed"
        :text="text"
      ></van-circle>

      <van-circle
        v-model="currentRate"
        :rate="rate"
        :speed="speed"
        :text="text"
        fill="#fff"
        size="120px"
        color="#07c160"
        layer-color="#ebedf0"
        :clockwise="false"
        :stroke-width="60"
      ></van-circle>

      <div class="btn-area">
        <van-button
          type="primary"
          size="small"
          @click="add"
        >增加</van-button>
        <van-button
          type="danger"
          size="small"
          @click="less"
        >减少</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCircle from '@components/circle';
import vanButton from '@components/button';

export default {
  name: 'component_circle',
  components: {
    vanHeader,
    vanCircle,
    vanButton
  },
  data() {
    return {
      currentRate: 0,
      rate: 30,
      speed: 100
    };
  },
  methods: {
    add() {
      this.rate += 20;
    },
    less() {
      this.rate -= 20;
    }
  },
  computed: {
    text() {
      return `${this.currentRate.toFixed(0)}%`;
    }
  }
};
</script>

<style scoped>
.van-circle {
  margin-left: 10px;
}

.btn-area {
  margin-top: 10px;
  padding-left: 10px;
}

.van-button {
  margin-right: 10px;
}
</style>
