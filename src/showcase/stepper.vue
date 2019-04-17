<template>
  <div class="container">
    <van-header
      title="Stepper 步进器"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-stepper v-model="value"></van-stepper>

      <h4 class="cell-title">禁用状态</h4>
      <van-stepper
        v-model="value"
        disabled
      />

      <h4 class="cell-title">异步变更</h4>
      <van-stepper
        :value="value"
        async-change
        @change="onChange"
      />

      <h4 class="cell-title">高级用法</h4>
      <van-stepper
        v-model="value"
        integer
        :min="5"
        :max="40"
        :step="2"
      />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanStepper from '@components/stepper';

export default {
  name: 'Stepper',
  components: {
    vanHeader,
    vanStepper
  },
  data () {
    return {
      value: 1
    };
  },
  methods: {
    onChange (value) {
      setTimeout(() => {
        this.value = value;
      }, 500);
    }
  }
};
</script>

<style scoped>
.van-content {
  padding: 0 10px;
}
</style>
