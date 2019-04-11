<template>
  <div class="container">
    <van-header
      title="Pulltorefresh 下拉刷新上拉加载"
      right-text="刷新"
      left-arrow
      @click-right="onClickRight"
    ></van-header>
    <div class="van-content">
      <van-pulltorefresh ref="refresh">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            :key="index"
          >{{item.title}}</van-cell>
        </van-cell-group>
      </van-pulltorefresh>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanPulltorefresh from '@components/pulltorefresh';
import vanCell from '@components/cell';
import vanCellGroup from '@components/cellgroup';

export default {
  name: 'Pulltorefresh',
  components: {
    vanHeader,
    vanPulltorefresh,
    vanCell,
    vanCellGroup
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    onClickRight() {
      this.$refs.refresh.refresh();
    }
  },
  mounted() {
    this.$refs.refresh.pulltorefresh({
      url: 'http://yapi.demo.qunar.com/mock/43176/mock/getlist',
      dataRequest(currPage) {
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
      success: ({ custom }, pageindex) => {
        const { infolist } = custom;

        if (pageindex === 0) {
          this.list = infolist;
        } else {
          infolist.forEach((e) => {
            this.list.push(e);
          });
        }
      },
      error: (error) => {
        console.error(JSON.stringify(error));
      },
      ajaxSetting: {
        contentType: 'application/x-www-form-urlencoded',
        timeout: 6000
      },
      pullDownSetting: {},
      pullUpSetting: {}
    });
  }
};
</script>
