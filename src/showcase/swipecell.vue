<template>
  <div class="container">
    <van-header
      title="SwipeCell 滑动单元格"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-swipe-cell
        :right-width="78"
        :left-width="156"
      >
        <div
          slot="left"
          class="swipe"
        >
          <div
            class="swipe-btn"
            style="background: #f00"
          >菜单一</div>
          <div
            class="swipe-btn"
            style="background: #03a9f4"
          >菜单二</div>
        </div>
        <van-cell-group>
          <van-cell
            title="单元格"
            value="内容"
            :is-link="false"
          />
        </van-cell-group>
        <div
          slot="right"
          class="swipe"
        >
          <div
            class="swipe-btn"
            style="background: #00bcd4"
          >菜单三</div>
        </div>
      </van-swipe-cell>

      <h4 class="cell-title">异步关闭</h4>
      <van-swipe-cell
        :right-width="62"
        :left-width="62"
        :on-close="onClose"
      >
        <div
          slot="left"
          class="swipe"
        >
          <div
            class="swipe-btn"
            style="background: #f00"
          >选择</div>
        </div>
        <van-cell-group>
          <van-cell
            title="单元格"
            value="内容"
            :is-link="false"
          />
        </van-cell-group>
        <div
          slot="right"
          class="swipe"
        >
          <div
            class="swipe-btn"
            style="background: #00bcd4"
          >删除</div>
        </div>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanSwipeCell from '@components/swipecell'
import vanCellGroup from '@components/cellgroup'
import vanCell from '@components/cell'
import { Dialog } from 'vant'

export default {
  name: 'SwipeCell',
  components: {
    vanHeader,
    vanSwipeCell,
    vanCellGroup,
    vanCell
  },
  methods: {
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe {
  display: flex;
  height: 44px;
  line-height: 44px;

  .swipe-btn {
    padding: 0 15px;
    height: 100%;
    color: #fff;
  }
}
</style>
