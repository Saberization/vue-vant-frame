<template>
  <div class="container">
    <van-header
      title="Radio 单选框"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-radio-group v-model="radio">
        <van-radio name="1">单选框 1</van-radio>
        <van-radio name="2">单选框 2</van-radio>
      </van-radio-group>

      <h4 class="cell-title">禁用状态</h4>
      <van-radio-group v-model="radio">
        <van-radio
          name="1"
          disabled
        >单选框 1</van-radio>
        <van-radio
          name="2"
          disabled
        >单选框 2</van-radio>
      </van-radio-group>

      <h4 class="cell-title">自定义颜色</h4>
      <van-radio checked-color="#07c160">复选框</van-radio>

      <h4 class="cell-title">自定义图标</h4>
      <van-radio v-model="checked">
        自定义图标
        <img
          slot="icon"
          slot-scope="props"
          :src="props.checked ? icon.active : icon.normal"
          style="height: 20px"
        >
      </van-radio>

      <h4 class="cell-title">与 Cell 组件一起使用</h4>
      <van-radio-group v-model="cellRadio">
        <van-cell-group>
          <van-cell
            title="单选框 1"
            :is-link="false"
            @click="cellRadio = '1'"
          >
            <van-radio name="1" />
          </van-cell>
          <van-cell
            title="单选框 2"
            :is-link="false"
            @click="cellRadio = '2'"
          >
            <van-radio name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanRadio from '@components/radio';
import vanRadioGroup from '@components/radiogroup';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
  name: 'Radio',
  components: {
    vanHeader,
    vanRadio,
    vanRadioGroup,
    vanCellGroup,
    vanCell
  },
  data () {
    return {
      radio: '1',
      cellRadio: '1',
      checked: true,
      icon: {
        active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
        normal: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png'
      }
    };
  }
};
</script>

<style scoped>
.van-radio {
  margin: 0 10px 10px 10px;
}

.van-cell__value > .van-radio {
  margin: 0;
}
</style>
