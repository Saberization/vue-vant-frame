<template>
  <van-icon
    :name="name"
    :info="info"
    :color="color"
    :size="size"
    :tag="tag"
    :class-prefix="classPrefix"
    @click="onClick"
  ></van-icon>
</template>

<script>
import { Icon } from 'vant';

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
    },
    tag: {
      type: String,
      default: 'i'
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>
