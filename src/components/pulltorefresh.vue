<template>
  <van-pull-refresh
    v-model="isLoading"
    :pulling-text="pullDownSetting.pullingText"
    :loosing-text="pullDownSetting.loosingText"
    :loading-text="pullDownSetting.loadingText"
    :success-text="pullDownSetting.successText"
    :success-duration="pullDownSetting.successDuration"
    :animation-duration="pullDownSetting.animationDuration"
    :head-height="pullDownSetting.headHeight"
    :disabled="pullDownSetting.disabled"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      :error="pullUpSetting.error"
      :offset="pullUpSetting.offset"
      :loading-text="pullUpSetting.loadingText"
      :finished-text="pullUpSetting.finishedText"
      :error-text="pullUpSetting.errorText"
      :immediate-check="pullUpSetting.immediateCheck"
      ref="pullup"
      @load="onLoad"
    >
      <slot></slot>
      <slot
        name="loading"
        slot="pullup-loading"
      ></slot>
    </van-list>
    <slot
      name="normal"
      slot="pulldown-normal"
    ></slot>
    <slot
      name="pulling"
      slot="pulldown-pulling"
    ></slot>
    <slot
      name="loosing"
      slot="pulldown-loosing"
    ></slot>
    <slot
      name="loading"
      slot="pulldown-loading"
    ></slot>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh, List } from 'vant';
import Util from '@utils';

export default {
  name: 'Pulltorefresh',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      pullDownSetting: {
        pullingText: '下拉即可刷新...',
        loosingText: '释放即可刷新...',
        loadingText: '加载中...',
        successText: '',
        successDuration: 500,
        animationDuration: 300,
        headHeight: 50,
        disabled: false,
        pullDown() {}
      },
      pullUpSetting: {
        error: false,
        offset: 100,
        loadingText: '加载中',
        finishedText: '',
        errorText: '',
        immediateCheck: true,
        pullUp() {}
      },
      ajaxSetting: {
        type: 'post',
        timeout: 6000,
        contentType: 'application/x-www-form-urlencoded',
        headers: {}
      },
      options: {
        url: '',
        initPageIndex: 0,
        delay: 400
      },
      currentPage: 0,
      requestData: {}
    };
  },
  methods: {
    check() {
      this.$refs.pullup.check();
    },
    refresh() {
      this.onRefresh();
    },
    onRefresh() {
      this.currentPage = this.options.initPageIndex;
      this.isLoading = true;
      setTimeout(() => {
        this._getRequestData(() => {
          this.isLoading = false;
          this.$nextTick(() => {
            this.check();
          });
        });
      }, this.options.delay);
      this.pullDownSetting.pullDown();
    },
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this._getRequestData(() => {
          this.loading = false;
        });
      }, this.options.delay);
      this.pullUpSetting.pullUp();
    },
    pulltorefresh(options) {
      this.pullDownSetting = Object.assign(this.pullDownSetting, options.pullDownSetting || {});
      this.pullUpSetting = Object.assign(this.pullUpSetting, options.pullUpSetting || {});
      this.ajaxSetting = Object.assign(this.ajaxSetting, options.ajaxSetting || {});
      this.options = Object.assign(this.options, options);
      this.currentPage = this.options.initPageIndex;
    },
    _getRequestData(complete) {
      const { options } = this;
      const { dataRequest } = options;

      if (dataRequest && typeof dataRequest === 'function') {
        let requestData = {};

        this.requestData = dataRequest(this.currentPage, (data) => {
          requestData = data;
        });
        this.requestData = this.requestData ? this.requestData : requestData;
        this._request(complete);
      }
    },
    _request(complete) {
      const { options } = this;
      const { ajaxSetting } = this;
      const { success } = options;
      const { error } = options;

      Util.ajax({
        url: options.url,
        method: ajaxSetting.type,
        data: this.requestData,
        contentType: ajaxSetting.contentType,
        headers: ajaxSetting.headers,
        timeout: ajaxSetting.timeout
      }).then((response) => {
        if (success && typeof success === 'function') {
          success(response.data, this.currentPage++);
        }
        if (complete && typeof complete === 'function') {
          complete();
        }
      }).catch((err) => {
        if (error && typeof error === 'function') {
          error(err);
        }
        if (complete && typeof complete === 'function') {
          complete();
        }
      });
    }
  }
};
</script>
