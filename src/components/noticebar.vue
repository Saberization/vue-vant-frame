<template>
  <van-notice-bar
    :mode="mode"
    :text="text"
    :delay="delay"
    :speed="speed"
    :scrollable="scrollable"
    :left-icon="leftIcon"
    :color="color"
    :background="background"
    @click="onClick"
    @close="onClose"
  >
    <slot></slot>
  </van-notice-bar>
</template>

<script>
import { NoticeBar } from 'vant'

export default {
  name: 'NoticeBar',
  components: {
    [NoticeBar.name]: NoticeBar
  },
  props: {
    text: String,
    mode: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 1
    },
    speed: {
      type: Number,
      default: 50
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    leftIcon: String,
    color: {
      type: String,
      default: '#f60'
    },
    background: {
      type: String,
      default: '#fff7cc'
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
