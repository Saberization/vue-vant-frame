<template>
  <van-icon
    :name="name"
    :info="info"
    :color="color"
    :size="size"
    :class-prefix="classPrefix"
  ></van-icon>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: 'Icon',
  components: {
    'van-icon': Icon
  },
  props: {
    name: String,
    info: {
      default: null
    },
    color: {
      type: String,
      default: 'inherit'
    },
    size: {
      type: String,
      default: 'inherit'
    },
    classPrefix: {
      type: String,
      default: 'van-icon'
    }
  }
}
</script>
