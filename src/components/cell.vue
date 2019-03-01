<template>
  <van-cell></van-cell>
</template>

<script>
import { Cell } from 'vant'

export default {
  name: 'Cell',
  components: {
    'van-cell': Cell
  },
  props: {
    icon: String,
    title: {
      default: ''
    },
    value: {
      default: ''
    },
    label: String,
    size: String,
    url: String,
    to: {
      default: null
    },
    border: {
      type: Boolean,
      default: true
    },
    replace: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
</style>