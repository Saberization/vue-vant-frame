<template>
  <van-list
    v-model="loading"
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
    prop: 'isload',
    event: 'changeState'
  },
  props: {
    isload: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: this.isload,
      refreshSetting: {
        finished: false,
        error: false,
        offset: 100,
        loadingText: '加载中...',
        finishedText: '没有更多',
        errorText: '请求失败，点击重新加载',
        immediateCheck: true
      },
      ajaxSetting: {
        type: 'post',
        timeout: 6000,
        contentType: 'application/x-www-form-urlencoded',
        headers: {}
      },
      currentPage: 0,
      options: {
        url: '',
        initPageIndex: 0,
        delay: 300
      },
      requestData: {}
    }
  },
  watch: {
    isload (value) {
      this.loading = value
    },
    loading (value) {
      this.$emit('changeState', value)
    }
  },
  methods: {
    check () {
      this.$refs.pullUp.check()
    },
    onLoad () {
      setTimeout(() => {
        this.getRequestData(() => {
          this.loading = false
        })
        this.$emit('load')
      }, this.options.delay)
    },
    pullUp (options) {
      this.ajaxSetting = Object.assign(this.ajaxSetting, options.ajaxSetting || {})
      this.refreshSetting = Object.assign(this.refreshSetting, options.setting || {})
      this.options = Object.assign(this.options, options)
      this.currentPage = this.options.initPageIndex
    },
    getRequestData (complete) {
      const dataRequest = this.options.dataRequest

      if (dataRequest && typeof dataRequest === 'function') {
        let requestData = null

        this.requestData = dataRequest(this.currentPage, (data) => {
          requestData = data
        })
        this.requestData = this.requestData ? this.requestData : requestData
        this.request(complete)
      } else {
        console.error('请传入 dataRequest 函数')
      }
    },
    request (complete) {
      const options = this.options
      const ajaxSetting = this.ajaxSetting
      const success = options.success
      const error = options.error

      Util.request({
        url: options.url,
        method: ajaxSetting.type,
        data: this.requestData,
        contentType: ajaxSetting.contentType,
        headers: ajaxSetting.headers,
        timeout: ajaxSetting.timeout
      }).then(response => {
        if (complete && typeof complete === 'function') {
          complete()
        }
        if (success && typeof success === 'function') {
          success(response.data, this.currentPage++)
        }
      }).catch(err => {
        if (complete && typeof complete === 'function') {
          complete()
        }
        if (error && typeof error === 'function') {
          error(err)
        }
      })
    }
  }
}
</script>
