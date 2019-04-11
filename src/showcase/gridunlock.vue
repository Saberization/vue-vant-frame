<template>
  <div class="container">
    <van-header title="Gridunlock 网格解锁" left-arrow></van-header>
    <div class="van-content">
      <grid-unlock @success="onSuccess"></grid-unlock>
      <p style="text-align: center">选择结果：{{result}}</p>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import gridUnlock from '@components/gridunlock';

export default {
  name: 'GridUnlock',
  components: {
    vanHeader,
    gridUnlock
  },
  data() {
    return {
      result: null
    };
  },
  methods: {
    /**
     * 连线成功回调
     * @param {Array} result 每一个选中圆的索引值，格式为[0, 1, 2, 3]
     */
    onSuccess(result) {
      this.result = result;
    }
  }
};
</script>

<style scoped>

</style>
