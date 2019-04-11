<template>
  <van-swipe-cell
    :left-width="leftWidth"
    :right-width="rightWidth"
    :on-close="onClose"
    :disabled="disabled"
    ref="swipecell"
    @click="onClick"
  >
    <slot></slot>
    <slot
      name="left"
      slot="left"
    ></slot>
    <slot
      name="right"
      slot="right"
    ></slot>
  </van-swipe-cell>
</template>

<script>
import { SwipeCell } from 'vant';

export default {
  name: 'SwipeCell',
  components: {
    [SwipeCell.name]: SwipeCell
  },
  props: {
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClose: Function
  },
  methods: {
    open(position) {
      if (position && typeof position === 'string') {
        this.$refs.swipecell.open(position);
      }
    },
    close() {
      this.$refs.swipecell.close();
    },
    onClick(position) {
      this.$emit('click', position);
    }
  }
};
</script>
