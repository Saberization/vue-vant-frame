<template>
  <div class="container">
    <van-header
      title="NoticeBar 通告栏"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-notice-bar
        left-icon="volume-o"
        text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      ></van-notice-bar>

      <h4 class="cell-title">禁用滚动</h4>
      <van-notice-bar :scrollable="false">
        足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
      </van-notice-bar>

      <h4 class="cell-title">通告栏模式</h4>
      <!-- closeable 模式，在右侧显示关闭按钮 -->
      <van-notice-bar mode="closeable" style="margin-bottom: 20px;">
        足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
      </van-notice-bar>
      <!-- link 模式，在右侧显示链接箭头 -->
      <van-notice-bar mode="link">
        足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
      </van-notice-bar>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanNoticeBar from '@components/noticebar';

export default {
  name: 'NoticeBar',
  components: {
    vanHeader,
    vanNoticeBar
  }
};
</script>
