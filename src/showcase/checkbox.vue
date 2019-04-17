<template>
  <div class="container">
    <van-header
      title="Checkbox 复选框"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-checkbox v-model="checked">复选框</van-checkbox>

      <h4 class="cell-title">禁用状态</h4>
      <van-checkbox
        v-model="checked"
        disabled
      >复选框</van-checkbox>
      <van-checkbox disabled>复选框</van-checkbox>

      <h4 class="cell-title">自定义颜色</h4>
      <van-checkbox
        v-model="checked"
        checked-color="#07c160"
      >自定义颜色</van-checkbox>

      <h4 class="cell-title">自定义图标</h4>
      <van-checkbox v-model="checked">
        自定义图标
        <img
          slot="icon"
          slot-scope="props"
          :src="props.checked ? icon.active : icon.normal"
          style="height: 20px;"
        >
      </van-checkbox>

      <h4 class="cell-title">复选框组</h4>
      <van-checkbox-group v-model="result">
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item"
        >
          复选框 {{ item }}
        </van-checkbox>
      </van-checkbox-group>

      <h4 class="cell-title">设置最大可选数</h4>
      <van-checkbox-group
        v-model="result"
        :max="2"
      >
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item"
        >
          复选框 {{ item }}
        </van-checkbox>
      </van-checkbox-group>

      <h4 class="cell-title">搭配单元格组件使用</h4>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="`复选框 ${item}`"
            @click="toggle(index)"
          >
            <van-checkbox
              :name="item"
              ref="checkboxes"
              style="padding: 0;"
            />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCheckboxGroup from '@components/checkboxgroup';
import vanCheckbox from '@components/checkbox';
import vanCellGroup from '@components/cellgroup';
import vanCell from '@components/cell';

export default {
  name: 'CheckBox',
  components: {
    vanHeader,
    vanCheckboxGroup,
    vanCheckbox,
    vanCellGroup,
    vanCell
  },
  data () {
    return {
      checked: true,
      icon: {
        active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
        normal: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png'
      },
      list: ['a', 'b', 'c'],
      result: ['a', 'b']
    };
  },
  methods: {
    toggle (index) {
      this.$refs.checkboxes[index].toggle();
    }
  }
};
</script>

<style scoped>
.van-content {
  padding: 10px;
}

.van-checkbox {
  padding: 0 10px 10px 10px;
}
</style>
