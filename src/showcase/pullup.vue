<template>
  <div class="container">
    <van-header
      title="PullDown 上拉加载"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-pullup
        v-model="loading"
        ref="pull"
      >
        <van-cell
          v-for="(value, index) in list"
          :key="index"
        >value</van-cell>
      </van-pullup>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPullup from '@components/pullup'
import vanCell from '@components/cell'

export default {
  name: 'PullUp',
  components: {
    vanHeader,
    vanCell,
    vanPullup
  },
  data () {
    return {
      loading: false,
      list: []
    }
  },
  mounted () {
    this.$refs.pull.pullUp({
      url: 'http://yapi.demo.qunar.com/mock/43176/mock/getlist',
      dataRequest (currPage, requestCallback) {
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
      success: response => {
        console.log(response)
      },
      error: err => {
        console.log(err)
      },
      ajaxSetting: {
        contentType: 'application/x-www-form-urlencoded'
      },
      setting: {
        // 滚动条与底部距离小于 offset 时触发load事件
        offset: 300,
        // 加载过程中的提示文案
        loadingText: '加载中...',
        // 加载完成后的提示文案
        finishedText: '没有更多',
        // 加载失败后的提示文案
        errorText: '请求失败，点击重新加载',
        // 是否在初始化时立即执行滚动位置检查
        immediateCheck: true
      }
    });
  }
}
</script>
