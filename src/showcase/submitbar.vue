<template>
  <div class="container">
    <van-header
      title="SubmitBar 提交订单栏"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
      />

      <h4
        class="cell-title"
        style="margin-top: 80px;"
      >禁用状态</h4>
      <van-submit-bar
        disabled
        :price="3050"
        button-text="提交订单"
        tip="你的收货地址不支持同城送, 我们已为你推荐快递"
        @submit="onSubmit"
      />

      <h4
        class="cell-title"
        style="margin-top: 120px;"
      >加载状态</h4>
      <van-submit-bar
        loading
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
      />

      <h4 class="cell-title" style="margin-top: 86px;">高级用法</h4>
      <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送, <span>修改地址</span>
        </span>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSubmitBar from '@components/submitbar';
import vanCheckbox from '@components/checkbox';
import { Toast } from 'vant';

export default {
  name: 'SubmitBar',
  components: {
    vanHeader,
    vanSubmitBar,
    vanCheckbox
  },
  data() {
    return {
      checked: true
    };
  },
  methods: {
    onSubmit() {
      Toast('提交订单');
    }
  }
};
</script>

<style scoped>
.van-submit-bar {
  bottom: auto;
}

.van-checkbox {
  margin-left: 10px;
}
</style>
