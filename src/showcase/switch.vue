<template>
  <div class="container">
    <van-header
      title="Switch 开关"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-switch v-model="checked1" />

      <h4 class="cell-title">禁用状态</h4>
      <van-switch
        v-model="checked2"
        disabled
      />

      <h4 class="cell-title">加载状态</h4>
      <van-switch
        v-model="checked3"
        loading
      />

      <h4 class="cell-title">自定义大小</h4>
      <van-switch
        v-model="checked4"
        size="24px"
      />

      <h4 class="cell-title">自定义颜色</h4>
      <van-switch
        v-model="checked5"
        active-color="#07c160"
        inactive-color="#f44"
      />

      <h4 class="cell-title">异步控制</h4>
      <van-switch
        :value="checked6"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanSwitch from '@components/switch';
import { Dialog } from 'vant';

export default {
  name: 'component_switch',
  components: {
    vanHeader,
    vanSwitch
  },
  data() {
    return {
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: true
    };
  },
  methods: {
    onInput(checked) {
      Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？'
      }).then(() => {
        this.checked6 = checked;
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped>
.van-content {
  padding: 0 10px;
}
</style>
