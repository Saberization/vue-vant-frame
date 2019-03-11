<template>
  <van-circle
    v-model="currentRate"
    :rate="rate"
    :size="size"
    :color="color"
    :layer-color="layerColor"
    :fill="fill"
    :speed="speed"
    :text="text"
    :stroke-width="strokeWidth"
    :clockwise="clockwise"
  >
    <slot></slot>
  </van-circle>
</template>

<script>
import { Circle } from 'vant'

export default {
  name: 'component_circle',
  model: {
    prop: 'rateValue',
    event: 'changeRate'
  },
  components: {
    [Circle.name]: Circle
  },
  props: {
    rate: {
      type: Number,
      default: 100
    },
    size: {
      type: String,
      default: '100px'
    },
    color: {
      type: String,
      default: '#1989fa'
    },
    layerColor: {
      type: String,
      default: '#fff'
    },
    fill: {
      type: String,
      default: 'none'
    },
    speed: Number,
    text: String,
    strokeWidth: {
      type: Number,
      default: 40
    },
    clockwise: {
      type: Boolean,
      default: true
    },
    rateValue: {
      type: Number,
      default: 0
    }
  },
  watch: {
    rateValue (value) {
      this.currentRate = value
    },
    currentRate (value) {
      this.$emit('changeRate', value)
    }
  },
  data () {
    return {
      currentRate: 0
    }
  },
  created () {
    this.currentRate = this.rateValue
  }
}
</script>
