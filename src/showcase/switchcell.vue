<template>
  <div class="container">
    <van-header
      title="SwitchCell 开关单元格"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="标题"
          @change="onChange"
        />
      </van-cell-group>

      <h4 class="cell-title">禁用状态</h4>
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="标题"
          disabled
        />
      </van-cell-group>

      <h4 class="cell-title">加载状态</h4>
      <van-cell-group>
        <van-switch-cell
          v-model="checked"
          title="标题"
          loading
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanSwitchCell from '@components/switchcell'
import vanCellGroup from '@components/cellgroup'
import { Toast } from 'vant'

export default {
  name: 'SwitchCell',
  components: {
    vanHeader,
    vanSwitchCell,
    vanCellGroup
  },
  data () {
    return {
      checked: true
    }
  },
  methods: {
    onChange (checked) {
      Toast(`当前选中状态 ${checked}`)
    }
  }
}
</script>
