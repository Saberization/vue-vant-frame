<template>
  <div class="container">
    <van-header
      title="Tag 标记"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-tag>标签</van-tag>
      <van-tag type="danger">标签</van-tag>
      <van-tag type="primary">标签</van-tag>
      <van-tag type="success">标签</van-tag>

      <h4 class="cell-title">空心样式</h4>
      <van-tag plain>标签</van-tag>
      <van-tag
        plain
        type="danger"
      >标签</van-tag>
      <van-tag
        plain
        type="primary"
      >标签</van-tag>
      <van-tag
        plain
        type="success"
      >标签</van-tag>

      <h4 class="cell-title">圆角样式</h4>
      <van-tag round>标签</van-tag>
      <van-tag
        round
        type="danger"
      >标签</van-tag>
      <van-tag
        round
        type="primary"
      >标签</van-tag>
      <van-tag
        round
        type="success"
      >标签</van-tag>

      <h4 class="cell-title">标记样式</h4>
      <van-tag mark>标签</van-tag>
      <van-tag
        mark
        type="danger"
      >标签</van-tag>
      <van-tag
        mark
        type="primary"
      >标签</van-tag>
      <van-tag
        mark
        type="success"
      >标签</van-tag>

      <h4 class="cell-title">自定义颜色</h4>
      <van-tag color="#f2826a">标签</van-tag>
      <van-tag
        color="#f2826a"
        plain
      >标签</van-tag>
      <van-tag color="#7232dd">标签</van-tag>
      <van-tag
        color="#7232dd"
        plain
      >标签</van-tag>
      <van-tag
        color="#ffe1e1"
        text-color="#ad0000"
      >标签</van-tag>

      <h4 class="cell-title">标签大小</h4>
      <van-tag text-color="#fff" color="rgb(255, 68, 68)">标签</van-tag>
      <van-tag size="medium" text-color="#fff" color="rgb(255, 68, 68)">标签</van-tag>
      <van-tag size="large" text-color="#fff" color="rgb(255, 68, 68)">标签</van-tag>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanTag from '@components/tag'

export default {
  name: 'Tag',
  components: {
    vanHeader,
    vanTag
  }
}
</script>

<style scoped>
.van-tag {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
