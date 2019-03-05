<template>
  <van-tree-select
    :items="items"
    :height="height"
    :main-active-index="mainActiveIndex"
    :active-id="activeId"
    @navclick="onNavClick"
    @itemclick="onItemClick"
  ></van-tree-select>
</template>

<script>
import { TreeSelect } from 'vant'

export default {
  name: 'TreeSelect',
  components: {
    [TreeSelect.name]: TreeSelect
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 300
    },
    mainActiveIndex: {
      type: Number,
      default: 0
    },
    activeId: {
      default: 0
    }
  },
  methods: {
    onNavClick (index) {
      this.$emit('navclick', index)
    },
    onItemClick (data) {
      this.$emit('itemclick', data)
    }
  }
}
</script>
