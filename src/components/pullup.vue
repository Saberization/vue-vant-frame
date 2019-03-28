<template>
  <van-list
    :loading="loading"
    :finished="finished"
    :error="error"
    :offset="offset"
    :loading-text="loadingText"
    :finished-text="finishedText"
    :error-text="errorText"
    :immediate-check="immediateCheck"
    @load="onLoad"
    ref="pulldown"
  >
    <slot></slot>
    <slot
      name="loading"
      slot="loading"
    ></slot>
  </van-list>
</template>

<script>
import { List } from 'vant'

export default {
  name: 'PullUp',
  components: {
    [List.name]: List
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: 300
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finishedText: String,
    errorText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    check () {
      this.$refs.pulldown.check()
    },
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
