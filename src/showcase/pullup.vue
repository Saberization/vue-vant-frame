<template>
  <div class="container">
    <van-header
      title="PullUp 上拉加载"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-pullup
        :setting="refreshSetting"
        ref="pull"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        ></van-cell>
      </van-pullup>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanPullup from '@components/pullup';
import vanCell from '@components/cell';

const Console = console;

export default {
  name: 'PullUp',
  components: {
    vanHeader,
    vanCell,
    vanPullup
  },
  data () {
    return {
      list: [],
      refreshSetting: {}
    };
  },
  mounted () {
    this.refreshSetting = {
      url: 'https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getlist',
      dataRequest (currPage) {
        return {
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: currPage,
            pagesize: 10,
            keyword: 'type1'
          }
        };
      },
      initPageIndex: 0,
      success: (response, pageIndex) => {
        const { infolist } = response.custom;

        if (pageIndex === 0) {
          this.list = infolist;
        } else {
          infolist.forEach((e) => {
            this.list.push(e);
          });
        }
      },
      error: (err) => {
        Console.log(err);
      },
      ajaxSetting: {
        contentType: 'application/x-www-form-urlencoded',
        timeout: 6000
      },
      setting: {
        // 滚动条与底部距离小于 offset 时触发load事件
        offset: 30,
        // 加载过程中的提示文案
        loadingText: '加载中...',
        // 加载完成后的提示文案
        finishedText: '没有更多',
        // 加载失败后的提示文案
        errorText: '请求失败，点击重新加载',
        // 是否在初始化时立即执行滚动位置检查
        immediateCheck: true,
        // 上拉加载的时候触发
        pullUp () {
          Console.log('pullUp');
        }
      }
    };
  }
};
</script>
