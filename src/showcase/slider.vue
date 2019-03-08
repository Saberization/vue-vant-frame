<template>
  <div class="container">
    <van-header
      title="Slider 滑块"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基本用法</h4>
      <van-slider
        v-model="baseValue"
        @change="onChange"
      />

      <h4 class="cell-title">指定选择范围</h4>
      <van-slider
        v-model="value"
        :min="10"
        :max="90"
      />

      <h4 class="cell-title">禁用</h4>
      <van-slider
        v-model="value"
        disabled
      />

      <h4 class="cell-title">指定步长</h4>
      <van-slider
        v-model="value"
        :step="10"
      />

      <h4 class="cell-title">自定义样式</h4>
      <van-slider
        v-model="value"
        bar-height="4px"
        active-color="#f44"
      />

      <h4 class="cell-title">自定义按钮</h4>
      <van-slider
        v-model="value"
        active-color="#f44"
      >
        <div
          slot="button"
          class="custom-button"
        >
          {{ value }}
        </div>
      </van-slider>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanSlider from '@components/slider'
import { Toast } from 'vant'

export default {
  name: 'Slider',
  components: {
    vanHeader,
    vanSlider
  },
  data () {
    return {
      value: 50,
      baseValue: 30
    }
  },
  methods: {
    onChange (value) {
      Toast(`当前值：${value}`)
    }
  }
}
</script>

<style scoped>
.van-content {
  padding: 0 10px;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  border-radius: 100px;
  background-color: #f44;
}
</style>
