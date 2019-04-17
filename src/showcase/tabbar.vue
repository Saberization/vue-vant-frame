<template>
  <div class="container">
    <van-header
      title="Tabbar 标签栏"
      left-arrow
    ></van-header>

    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-tabbar
        v-model="active1"
        style="position: static;"
        @change="onChangeTabbar"
      >
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item
          icon="search"
          dot
        >标签</van-tabbar-item>
        <van-tabbar-item
          icon="friends-o"
          info="5"
        >标签</van-tabbar-item>
        <van-tabbar-item
          icon="setting-o"
          info="20"
        >标签</van-tabbar-item>
      </van-tabbar>

      <h4 class="cell-title">自定义图标</h4>
      <van-tabbar
        v-model="active2"
        style="position: static;"
        @change="onChangeTabbar"
      >
        <van-tabbar-item info="3">
          <span>自定义</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon.active : icon.normal"
          >
        </van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>

      <h4 class="cell-title">自定义颜色</h4>
      <van-tabbar
        v-model="active3"
        active-color="#07c160"
        style="position: static;"
        @change="onChangeTabbar"
      >
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import { Tabbar, TabbarItem, Toast } from 'vant';

export default {
  name: 'Tabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    vanHeader
  },
  data () {
    return {
      active1: 0,
      active2: 0,
      active3: 0,
      icon: {
        active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
        normal: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png'
      }
    };
  },
  methods: {
    onChangeTabbar (active) {
      Toast(`当前点击index： ${active}`);
    }
  }
};
</script>
