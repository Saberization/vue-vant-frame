<template>
  <van-pull-refresh
    v-model="loading"
    :style="{top: `${parseInt(top)}px`}"
    :pulling-text="refreshSetting.pullingText"
    :loosing-text="refreshSetting.loosingText"
    :loading-text="refreshSetting.loadingText"
    :success-text="refreshSetting.successText"
    :success-duration="refreshSetting.successDuration"
    :animation-duration="refreshSetting.animationDuration"
    :head-height="refreshSetting.headHeight"
    :disabled="refreshSetting.disabled"
    @refresh="onRefresh"
  >
    <slot></slot>
    <slot
      name="normal"
      slot="normal"
    ></slot>
    <slot
      name="pulling"
      slot="pulling"
    ></slot>
    <slot
      name="loosing"
      slot="loosing"
    ></slot>
    <slot
      name="loading"
      slot="loading"
    ></slot>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh } from 'vant'
import Util from '@util'

export default {
  name: 'PullRefresh',
  components: {
    [PullRefresh.name]: PullRefresh
  },
  model: {
    prop: 'isLoading',
    event: 'changeLoading'
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    top: [String, Number]
  },
  data () {
    return {
      loading: false,
      refreshSetting: {
        pullingText: '下拉即可刷新',
        loosingText: '释放即可刷新',
        loadingText: '加载中',
        successText: '',
        successDuration: 500,
        animationDuration: 300,
        headHeight: 50,
        disabled: false,
        isLoading: false
      },
      ajaxSetting: {
        type: 'post',
        initPageIndex: 0,
        timeout: 6000,
        contentType: 'application/x-www-form-urlencoded',
        headers: {}
      },
      currentPage: 0,
      options: {},
      requestData: {}
    }
  },
  watch: {
    isLoading (value) {
      this.loading = value
    },
    loading (value) {
      this.$emit('changeLoading', value)
    }
  },
  methods: {
    onRefresh () {
      this.getRequestData(() => {
        setTimeout(() => {
          this.loading = false
        }, this.delay);
      })
      this.$emit('refresh')
    },
    PullDown (options) {
      // 合并下拉刷新配置项
      Object.assign(this.refreshSetting, options.setting)
      Object.assign(this.ajaxSetting, options.ajaxSetting)
      this.options = options
      this.currentPage = this.options.initPageIndex
      this.delay = this.options.delay || this.delay
      this.getRequestData()
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
      const ajaxSetting = this.ajaxSetting
      const options = this.options
      const success = options.success
      const error = options.error

      Util.request({
        url: options.url,
        method: ajaxSetting.type,
        data: this.requestData,
        headers: ajaxSetting.headers,
        timeout: ajaxSetting.timeout
      }).then((response) => {
        if (complete && typeof complete === 'function') {
          complete()
        }
        if (success && typeof success === 'function') {
          success(response.data, response)
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
  },
  created () {
    this.loading = this.isLoading
  }
}
</script>

<style lang="scss" scoped>
  .van-pull-refresh {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
</style>
