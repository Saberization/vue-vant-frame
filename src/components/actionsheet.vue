<template>
  <van-actionsheet
    v-model="show"
    :actions="actions"
    :title="title"
    :cancel-text="cancelText"
    :overlay="overlay"
    :close-on-click-overlay="closeOnClickOverlay"
    :lazy-render="lazyRender"
    :get-container="getContainer"
    @select="onSelect"
    @cancel="onCancel"
  >
    <slot></slot>
  </van-actionsheet>
</template>

<script>
import { Actionsheet } from 'vant'

export default {
  name: 'Actionsheet',
  components: {
    [Actionsheet.name]: Actionsheet
  },
  model: {
    prop: 'showVisible',
    event: 'toggleShow'
  },
  props: {
    actions: {
      type: Array,
      default () {
        return []
      }
    },
    title: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    getContainer: {
      default: null
    },
    showVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    showVisible (value) {
      this.show = value
    },
    show (value) {
      this.$emit('toggleShow', value)
    }
  },
  methods: {
    onSelect (item) {
      this.show = false
      this.$emit('toggleShow', false)
      this.$emit('select', item)
    },
    onCancel () {
      this.show = false
      this.$emit('toggleShow', false)
      this.$emit('cancel')
    }
  },
  created () {
    this.show = this.showVisible
  }
}
</script>
