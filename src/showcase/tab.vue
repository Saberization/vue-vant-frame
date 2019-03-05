<template>
  <div class="container">
    <van-header
      title="Tab 标签页"
      left-arrow
    ></van-header>

    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-tabs v-model="active1">
        <van-tab title="标签 1">
          <div class="tab-content">内容 1</div>
        </van-tab>
        <van-tab title="标签 2">
          <div class="tab-content">内容 2</div>
        </van-tab>
        <van-tab title="标签 3">
          <div class="tab-content">内容 3</div>
        </van-tab>
        <van-tab title="标签 4">
          <div class="tab-content">内容 4</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">横向滚动</h4>
      <van-tabs v-model="active2">
        <van-tab
          v-for="index in 12"
          :key="index"
          :title="'栏目' + index"
        >
          <div class="tab-content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">禁用标签</h4>
      <van-tabs @disabled="onClickDisabled">
        <van-tab title="标签 1">
          <div class="tab-content">内容 1</div>
        </van-tab>
        <van-tab
          title="标签 2"
          disabled
        >
          <div class="tab-content">内容 2</div>
        </van-tab>
        <van-tab title="标签 3">
          <div class="tab-content">内容 3</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">样式风格 card</h4>
      <van-tabs type="card">
        <van-tab title="标签 1"></van-tab>
        <van-tab title="标签 2"></van-tab>
        <van-tab title="标签 3"></van-tab>
      </van-tabs>

      <h4 class="cell-title">点击事件</h4>
      <van-tabs @click="onClick">
        <van-tab title="标签 1">
          <div class="tab-content">内容 1</div>
        </van-tab>
        <van-tab title="标签 2">
          <div class="tab-content">内容 2</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">粘性布局</h4>
      <van-tabs sticky>
        <van-tab
          v-for="index in 12"
          :title="'选项 ' + index"
          :key="index"
        >
          <div class="tab-content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">自定义标签</h4>
      <van-tabs>
        <van-tab
          v-for="index in 2"
          :key="index"
        >
          <div slot="title">
            <van-icon name="more-o" />选项 {{ index }}
          </div>
          <div class="tab-content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">切换动画</h4>
      <van-tabs animated>
        <van-tab
          v-for="index in 12"
          :key="index"
          :title="'选项 ' + index"
        >
          <div class="tab-content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>

      <h4 class="cell-title">滑动切换</h4>
      <van-tabs swipeable>
        <van-tab
          v-for="index in 12"
          :key="index"
          :title="'选项 ' + index"
        >
          <div class="tab-content">内容 {{ index }}</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanIcon from '@components/icon'
import { Tab, Tabs, Toast } from 'vant'

export default {
  name: 'Tab',
  components: {
    vanHeader,
    'van-tab': Tab,
    'van-tabs': Tabs,
    vanIcon
  },
  data () {
    return {
      active1: 2,
      active2: 0
    }
  },
  methods: {
    onClickDisabled (index, title) {
      Toast(`${title} 已被禁用`)
    },
    onClick (index, title) {
      Toast(`当前选中 ${title}`)
    }
  }
}
</script>

<style scoped>
.tab-content {
  height: 50px;
  line-height: 50px;
  padding: 10px;
  background-color: #fff;
}
.van-tabs {
  margin-bottom: 20px;
}
.van-icon {
  margin-right: 5px;
  vertical-align: -2px;
}
</style>
