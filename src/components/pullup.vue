<template>
  <van-list
    v-model="isLoad"
    :finished="refreshSetting.finished"
    :error="refreshSetting.error"
    :offset="refreshSetting.offset"
    :loading-text="refreshSetting.loadingText"
    :finished-text="refreshSetting.finishedText"
    :error-text="refreshSetting.errorText"
    :immediate-check="refreshSetting.immediateCheck"
    @load="onLoad"
    ref="pullUp"
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
import Util from '@util/'

export default {
  name: 'PullUp',
  components: {
    [List.name]: List
  },
  model: {
    prop: 'loading',
    event: 'changeState'
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoad: this.loading,
      refreshSetting: {
        finished: false,
        error: false,
        offset: 300,
        loadingText: '加载中...',
        finishedText: '没有更多',
        errorText: '请求失败，点击重新加载',
        immediateCheck: true
      },
      ajaxSetting: {
        type: 'post',
        initPageIndex: 0,
        pageSize: 10,
        timeout: 6000,
        delay: 300,
        contentType: 'application/x-www-form-urlencoded',
        headers: {}
      },
      requestData: {}
    }
  },
  watch: {
    loading (value) {
      this.isLoad = value
    },
    isLoad (value) {
      this.$emit('changeState', value)
    }
  },
  methods: {
    check () {
      this.$refs.pullUp.check()
    },
    onLoad () {
      this.$emit('load')
    },
    pullUp (options) {
      console.log(options)
      this.ajaxSetting = Object.assign(this.ajaxSetting, options.ajaxSetting || {})
      this.refreshSetting = Object.assign(this.refreshSetting, options.setting || {})
    },
    getRequestData () {
      
    }
  }
}
</script>
