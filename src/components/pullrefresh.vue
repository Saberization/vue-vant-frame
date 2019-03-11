<template>
  <van-pull-refresh
    v-model="loading"
    :style="{top: `${parseInt(top)}px`}"
    :pulling-text="refreshSettings.pullingText"
    :loosing-text="refreshSettings.loosingText"
    :loading-text="refreshSettings.loadingText"
    :success-text="refreshSettings.successText"
    :success-duration="refreshSettings.successDuration"
    :animation-duration="refreshSettings.animationDuration"
    :head-height="refreshSettings.headHeight"
    :disabled="refreshSettings.disabled"
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
      refreshSettings: {
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
      settings: {
        type: 'post',
        initPageIndex: 0,
        pageSize: 10,
        timeout: 6000,
        delay: 300,
        contentType: 'application/x-www-form-urlencoded',
        headers: {}
      },
      requestData: null
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
        }, 30)
      })
      this.$emit('refresh')
    },
    PullRefresh (options) {
      // 合并下拉刷新配置项
      Object.assign(this.refreshSettings, options.setting)
      Object.assign(this.settings, options)
      this.getRequestData()
    },
    getRequestData (complete) {
      const dataRequest = this.settings.dataRequest
      let requestData = null

      if (dataRequest && typeof dataRequest === 'function') {
        this.requestData = dataRequest(this.settings.initPageIndex, (data) => {
          requestData = data
        })
        this.requestData = this.requestData === undefined ? requestData : this.requestData
        if (this.settings.delay > 0) {
          setTimeout(() => {
            this.request(this.settings, complete)
          }, this.settings.delay)
        } else {
          this.request(this.settings, complete)
        }
      } else {
        console.error('请传入 dataRequest')
      }
    },
    request (options, complete) {
      const success = options.success
      const error = options.error

      Util.request({
        url: options.url,
        method: options.type,
        data: this.requestData,
        headers: options.headers,
        timeout: options.timeout
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
