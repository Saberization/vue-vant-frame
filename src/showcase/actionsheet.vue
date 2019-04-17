<template>
  <div class="container">
    <van-header
      title="Actionsheet 上拉菜单"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button @click="show = !show; cancelText = ''">弹出 Actionsheet</van-button>

      <h4 class="cell-title">带取消按钮的 Actionsheet</h4>
      <van-button @click="show = !show; cancelText = '取消'">弹出带取消按钮的 Actionsheet</van-button>

      <h4 class="cell-title">带标题的 Actionsheet</h4>
      <van-button @click="showTitle = !showTitle">弹出带标题的 Actionsheet</van-button>
    </div>

    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      :cancel-text="cancelText"
    />

    <van-actionsheet
      v-model="showTitle"
      cancel-text=""
      title="标题"
      @select="onSelect"
    >
      <p style="padding: 20px;">一些内容</p>
    </van-actionsheet>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanActionsheet from '@components/actionsheet';
import vanButton from '@components/button';

export default {
  name: 'Actionsheet',
  components: {
    vanHeader,
    vanActionsheet,
    vanButton
  },
  data () {
    return {
      show: false,
      showTitle: false,
      cancelText: '',
      actions: [
        {
          name: '选项一',
          id: '选项一'
        },
        {
          name: '选项二',
          subname: '描述信息',
          id: '选项二'
        },
        {
          loading: true
        },
        {
          name: '禁用选项',
          disabled: true
        }
      ]
    };
  },
  methods: {
    onSelect (item) {
      console.log(JSON.stringify(item));
    }
  }
};
</script>

<style scoped>
.van-button {
  margin-left: 10px;
}
</style>
