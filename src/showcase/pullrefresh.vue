<template>
  <div class="container">
    <van-header
      title="PullRefresh 下拉刷新"
      left-arrow
    ></van-header>
    <van-pull-refresh
      v-model="loading"
      top="56"
      class="mt10"
      ref="refresh"
    >
      <van-cell-group>
        <van-cell v-for="(item, index) in listdata" :key="index" :title="item.title"></van-cell>
      </van-cell-group>
    </van-pull-refresh>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPullRefresh from '@components/pullrefresh'
import vanCell from '@components/cell'
import vanCellGroup from '@components/cellgroup'

export default {
  name: 'PullRefresh',
  components: {
    vanHeader,
    vanPullRefresh,
    vanCell,
    vanCellGroup
  },
  data () {
    return {
      loading: true,
      count: 0,
      listdata: []
    }
  },
  mounted () {
    this.$refs.refresh.PullRefresh({
      url: 'http://yapi.demo.qunar.com/mock/43176/mock/getlist',
      dataRequest: function (currPage, requestCallback) {
        return {
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: currPage,
            pagesize: 10,
            keyword: 'type1'
          }
        }
      },
      initPageIndex: 0,
      pageSize: 10,
      timeout: 6000,
      success: response => {
        this.listdata = response.custom.infolist
      },
      error: err => {
        console.log(err)
      },
      contentType: 'application/x-www-form-urlencoded',
      setting: {
        // 下拉过程中文字
        pullingText: '下拉即可刷新',
        // 释放过程文字
        loosingText: '释放即可刷新',
        // 加载过程文字
        loadingText: '加载中',
        // 加载成功提示文案
        successText: '',
        // 加载成功提示时长(ms)
        successDuration: 500,
        // 动画时长
        animationDuration: 300,
        // 顶部内容高度
        headHeight: 50,
        // 是否禁用
        disabled: false
      }
    })
  }
}
</script>

<style scoped>
.van-content {
  padding-left: 10px;
  padding-right: 10px;
}

.mt10 {
  margin-top: 10px;
}
</style>
