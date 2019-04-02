<template>
  <div class="container">
    <van-header
      title="PullDown 下拉刷新"
      right-text="刷新"
      left-arrow
      @click-right="onClickRight"
    ></van-header>
    <van-pulldown
      top="56"
      class="mt10"
      ref="pulldown"
    >
      <van-cell-group>
        <van-cell v-for="(item, index) in listdata" :key="index" :title="item.title"></van-cell>
      </van-cell-group>
    </van-pulldown>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPulldown from '@components/pulldown'
import vanCell from '@components/cell'
import vanCellGroup from '@components/cellgroup'

export default {
  name: 'PullDown',
  components: {
    vanHeader,
    vanPulldown,
    vanCell,
    vanCellGroup
  },
  data () {
    return {
      count: 0,
      listdata: []
    }
  },
  methods: {
    onClickRight () {
      this.$refs.pulldown.refresh()
    }
  },
  mounted () {
    this.$refs.pulldown.PullDown({
      url: 'http://yapi.demo.qunar.com/mock/43176/mock/getlist',
      dataRequest (currPage) {
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
      delay: 300,
      success: (response) => {
        this.listdata = response.custom.infolist
      },
      error: (error) => {
        console.error(JSON.stringify(error))
      },
      ajaxSetting: {
        contentType: 'application/x-www-form-urlencoded',
        timeout: 6000
      },
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
        disabled: false,
        // 下拉刷新回调事件
        pullDown () {
          console.log('pullDown')
        }
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
