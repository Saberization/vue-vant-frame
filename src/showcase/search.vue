<template>
  <div class="container">
    <van-header
      title="Search 搜索"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-search
        placeholder="请输入搜索关键词"
        v-model="value"
        background="#fff"
      ></van-search>

      <h4 class="cell-title">监听对应事件</h4>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      ></van-search>

      <h4 class="cell-title">高级用法</h4>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="label" class="search-label">地址</div>
        <div
          slot="action"
          @click="onSearch"
        >搜索</div>
      </van-search>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSearch from '@components/search';
import { Toast } from 'vant';

export default {
  name: 'Search',
  components: {
    vanHeader,
    vanSearch
  },
  data () {
    return {
      value: ''
    };
  },
  methods: {
    onSearch () {
      Toast(`搜索值为：${this.value}`);
    },
    onCancel () {
      Toast('点击了取消按钮');
    }
  }
};
</script>

<style scoped>
  .search-label {
    font-size: 14px;
    color: #323233;
    line-height: 34px;
    padding: 0 5px;
  }
</style>
