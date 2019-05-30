<template>
  <div class="container">
    <van-search
      v-model="searchValue"
      class="search-area"
      placeholder="请输入搜索关键词"
      :show-action="true"
      background="#fff"
      @search="onSearch"
    >
      <div slot="action">
        <van-button type="info" size="small" class="srh-btn" @click="onSearch">搜索</van-button>
      </div>
    </van-search>

    <div class="van-content">
      <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
        <van-list v-model="upLoading" :finished="finished" @load="onLoad" finished-text="没有更多数据了">
          <van-cell-group>
            <van-cell v-for="(item, index) in listdata" :key="index" :title="item.title"></van-cell>
          </van-cell-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Util from '@utils';
import vanSearch from '@components/search';
import vanButton from '@components/button';
import { PullRefresh, List } from 'vant';
import vanCell from '@components/cell';
import vanCellGroup from '@components/cellgroup';

export default {
  name: 'list',
  components: {
    vanSearch,
    vanButton,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    vanCell,
    vanCellGroup
  },
  data() {
    return {
      searchValue: '',
      pullLoading: false,
      upLoading: false,
      finished: false,
      pageSize: 10,
      pageIndex: 0,
      listdata: []
    };
  },
  methods: {
    /**
     * 下拉刷新回调
     */
    onRefresh() {
      this.pageIndex = 0;
      this.finished = false;
      this.upLoading = true;

      setTimeout(() => {
        this.getList();
      }, 500);
    },
    /**
     * 获取列表
     */
    getList() {
      Util.ajax({
        url: 'https://www.easy-mock.com/mock/5cb6ca44f6c8be4af31ae04d/mock/getlist',
        data: JSON.stringify({
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: this.pageIndex,
            pagesize: this.pageSize,
            keyword: this.searchValue
          }
        }),
        success: ({ custom }) => {
          const infolist = custom.infolist || [];
          const len = infolist.length;

          if (this.pageIndex === 0) {
            this.listdata = infolist;
          } else if (len > 1) {
            infolist.forEach(e => {
              this.listdata.push(e);
            });
          }

          // 加载状态结束
          this.upLoading = false;
          this.pullLoading = false;
          this.pageIndex++;

          if (len === 0) {
            this.finished = true;
          }
        }
      });
    },
    /**
     * 上拉刷新回调
     */
    onLoad() {
      setTimeout(() => {
        this.getList();
      }, 500);
    },
    /**
     * 搜索
     */
    onSearch() {
      this.pullLoading = true;
      this.onRefresh();
    }
  }
};
</script>

<style scoped>
.srh-btn {
  height: 34px;
  font-size: 14px;
}

.search-area {
  border-bottom: 1px solid #ebedf0;
}

.van-content {
  top: 55px;
}
</style>
