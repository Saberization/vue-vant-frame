<template>
  <van-loading
    :color="color"
    :type="type"
    :size="size"
  />
</template>

<script>
import { Loading } from 'vant'

export default {
  name: 'Loading',
  components: {
    [Loading.name]: Loading
  },
  props: {
    color: {
      type: String,
      default: '#c9c9c9'
    },
    type: {
      type: String,
      default: 'circular'
    },
    size: {
      type: String,
      default: '30px'
    }
  }
}
</script>