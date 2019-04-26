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
import { PullRefresh } from 'vant';
import Util from '@utils';

export default {
  name: 'PullRefresh',
  components: {
    [PullRefresh.name]: PullRefresh
  },
  props: {
    top: [String, Number],
    setting: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      loading: false,
      refreshSetting: {
        pullingText: '下拉即可刷新',
        loosingText: '释放即可刷新',
        loadingText: '加载中',
        successText: '',
        successDuration: 700,
        animationDuration: 300,
        headHeight: 50,
        disabled: false,
        isLoading: false,
        pullDown () {}
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
        delay: 600
      },
      requestData: {}
    };
  },
  watch: {
    setting (value) {
      this.pullDown(value);
    }
  },
  methods: {
    onRefresh () {
      this.loading = true;
      setTimeout(() => {
        this._getRequestData(() => {
          this.loading = false;
        });
      }, this.options.delay);
      this.refreshSetting.pullDown();
    },
    PullDown (options) {
      // 合并下拉刷新配置项
      Object.assign(this.refreshSetting, options.setting);
      Object.assign(this.ajaxSetting, options.ajaxSetting);
      this.options = Object.assign(this.options, options);
      this.currentPage = this.options.initPageIndex;
      this.onRefresh();
    },
    _getRequestData (complete) {
      const { dataRequest } = this.options;

      if (dataRequest && typeof dataRequest === 'function') {
        let requestData = null;

        this.requestData = dataRequest(this.currentPage, (data) => {
          requestData = data;
        });
        this.requestData = this.requestData ? this.requestData : requestData;
        this._request(complete);
      } else {
        console.error('请传入 dataRequest 函数');
      }
    },
    _request (complete) {
      const { ajaxSetting } = this;
      const { options } = this;
      const { success } = options;
      const { error } = options;

      Util.ajax({
        url: options.url,
        method: ajaxSetting.type,
        data: this.requestData,
        headers: ajaxSetting.headers,
        timeout: ajaxSetting.timeout,
        contentType: ajaxSetting.contentType,
        success: (response) => {
          if (complete && typeof complete === 'function') {
            complete();
          }
          if (success && typeof success === 'function') {
            success(response, this.currentPage++);
          }
        },
        error: (err) => {
          if (complete && typeof complete === 'function') {
            complete();
          }
          if (error && typeof error === 'function') {
            error(err);
          }
        }
      });
    },
    refresh () {
      this.onRefresh();
    }
  },
  created () {
    this.pullDown(this.setting);
  }
};
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
