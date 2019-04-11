<template>
  <van-cell-group :border="border">
    <slot></slot>
  </van-cell-group>
</template>

<script>
import { CellGroup } from 'vant';

export default {
  name: 'CellGroup',
  components: {
    'van-cell-group': CellGroup
  },
  props: {
    border: {
      type: Boolean,
      default: true
    }
  }
};
</script>
