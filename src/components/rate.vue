<template>
  <van-rate
    v-model="rateValue"
    :count="count"
    :size="size"
    :color="color"
    :void-color="voidColor"
    :icon="icon"
    :void-icon="voidIcon"
    :readonly="readonly"
    :disabled="disabled"
    :disabled-color="disabledColor"
    @change="onChange"
  ></van-rate>
</template>

<script>
import { Rate } from 'vant'

export default {
  name: 'Rate',
  components: {
    [Rate.name]: Rate
  },
  model: {
    prop: 'rate',
    event: 'changeRate'
  },
  props: {
    count: {
      type: Number,
      default: 5
    },
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: '#ffd21e'
    },
    voidColor: {
      type: String,
      default: '#c7c7c7'
    },
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledColor: {
      type: String,
      default: '#bdbdbd'
    },
    rate: Number
  },
  data () {
    return {
      rateValue: 1
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
      this.$emit('changeRate', value)
    }
  },
  created () {
    this.rateValue = this.rate
  }
}
</script>
