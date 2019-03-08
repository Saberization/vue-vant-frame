<template>
  <van-slider
    v-model="sliderValue"
    :value="value"
    :disabled="disabled"
    :max="max"
    :min="min"
    :step="step"
    :bar-height="barHeight"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    @change="onChange"
  >
    <slot name="button" slot="button"></slot>
  </van-slider>
</template>

<script>
import { Slider } from 'vant'

export default {
  name: 'Slider',
  components: {
    [Slider.name]: Slider
  },
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    barHeight: {
      type: String,
      default: '2px'
    },
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    inactiveColor: {
      type: String,
      default: '#e5e5e5'
    }
  },
  data () {
    return {
      sliderValue: 0
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
      this.$emit('changeValue', value)
    }
  },
  created () {
    this.sliderValue = this.value
  }
}
</script>
