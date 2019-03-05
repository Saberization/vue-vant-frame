<template>
  <div class="container">
    <van-header
      title="Layout 布局"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <div class="van-doc-demo-block">
        <van-row>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
        </van-row>

        <van-row>
          <van-col span="4">span: 4</van-col>
          <van-col
            span="10"
            offset="4"
          >offset: 4, span: 10</van-col>
        </van-row>

        <van-row>
          <van-col
            offset="12"
            span="12"
          >offset: 12, span: 12</van-col>
        </van-row>
      </div>

      <h4 class="cell-title">在列元素之间增加间距</h4>
      <div class="van-doc-demo-block">
        <van-row gutter="20">
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
        </van-row>
      </div>

      <h4 class="cell-title">Flex 布局</h4>
      <div class="van-doc-demo-block">
        <!-- 左对齐 -->
        <van-row type="flex">
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
        </van-row>

        <!-- 居中 -->
        <van-row
          type="flex"
          justify="center"
        >
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
        </van-row>

        <!-- 右对齐 -->
        <van-row
          type="flex"
          justify="end"
        >
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
        </van-row>

        <!-- 两端对齐 -->
        <van-row
          type="flex"
          justify="space-between"
        >
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
        </van-row>

        <!-- 每个元素的两侧间隔相等 -->
        <van-row
          type="flex"
          justify="space-around"
        >
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import { Row, Col } from 'vant'

export default {
  name: 'Layout',
  components: {
    'van-row': Row,
    'van-col': Col,
    vanHeader
  }
}
</script>

<style scoped>
.van-col {
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.van-col:nth-child(odd) {
  background-color: #39a9ed;
}

.van-col:nth-child(even) {
  background-color: #66c6f2;
}

.van-doc-demo-block {
  padding: 0 15px;
}
</style>
