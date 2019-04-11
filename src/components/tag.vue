<template>
  <van-tag
    :type="type"
    :size="size"
    :color="color"
    :plain="plain"
    :round="round"
    :mark="mark"
    :text-color="textColor"
    @click="onClick"
  >
    <slot></slot>
  </van-tag>
</template>

<script>
import { Tag } from 'vant';

export default {
  name: 'Tag',
  components: {
    [Tag.name]: Tag
  },
  props: {
    type: String,
    size: String,
    color: String,
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    mark: {
      type: Boolean,
      default: false
    },
    textColor: String
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>
