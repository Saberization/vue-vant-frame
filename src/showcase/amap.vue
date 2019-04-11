<template>
  <div class="container">
    <van-header title="AMap 地图组件" left-arrow></van-header>
    <div class="van-content">
      <geo-map :poicallback="poiCallback"></geo-map>
      <van-cell-group class="mt10">
        <van-cell v-for="(item, index) in pois" :title="item.name" :key="index" :label="item.addr" icon="location-o" size="large"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import Amap from '@components/amap';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
  name: 'AMap',
  components: {
    'geo-map': Amap,
    vanHeader,
    vanCell,
    vanCellGroup
  },
  data() {
    return {
      pois: [],
      poiCallback: ({ result }) => {
        this.pois = result.pois;
      }
    };
  }
};
</script>

<style scoped>
  .mt10 {
    margin-top: 10px;
  }
</style>
