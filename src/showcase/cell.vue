<template>
  <div class="container">
    <van-header
      title="Cell 单元格"
      :left-arrow="true"
    ></van-header>

    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-cell-group>
        <van-cell
          title="单元格"
          value="内容"
          :is-link="false"
        ></van-cell>
        <van-cell
          title="单元格"
          value="内容"
          label="描述信息"
          :is-link="false"
        ></van-cell>
      </van-cell-group>

      <h4 class="cell-title mt30">单元格大小</h4>
      <van-cell-group>
        <van-cell
          title="单元格"
          value="内容"
          size="large"
          :is-link="false"
        ></van-cell>
        <van-cell
          title="单元格"
          value="内容"
          size="large"
          :is-link="false"
          label="描述信息"
        ></van-cell>
      </van-cell-group>

      <h4 class="cell-title mt30">展示图标</h4>
      <van-cell-group>
        <van-cell
          title="单元格"
          icon="location-o"
          :is-link="false"
        ></van-cell>
      </van-cell-group>

      <h4 class="cell-title mt30">只设置 value</h4>
      <van-cell-group>
        <van-cell
          value="内容"
          :is-link="false"
        ></van-cell>
      </van-cell-group>

      <h4 class="cell-title mt30">展示箭头</h4>
      <van-cell-group>
        <van-cell value="内容"></van-cell>
        <van-cell
          title="单元格"
          value="内容"
        ></van-cell>
        <van-cell title="单元格" value="内容" arrow-direction="down"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
  name: 'Cell',
  components: {
    vanCell,
    vanHeader,
    vanCellGroup
  }
};
</script>

<style scoped>
.mt30 {
  margin-top: 30px;
}
</style>
