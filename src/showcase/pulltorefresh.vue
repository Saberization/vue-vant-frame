<template>
  <div class="container">
    <van-header title="Pulltorefresh 下拉刷新上拉加载" right-text="刷新" left-arrow></van-header>
    <div class="van-content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(v, i) in list" :key="i" :title="v.title"/>
      </van-list>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCell from '@components/cell';
import { PullRefresh, List } from 'vant';
import Util from '@utils';

export default {
  name: 'Pulltorefresh',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    vanCell,
    vanHeader
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      pageIndex: 0
    };
  },
  methods: {
    onLoad() {
      Util.ajax({
        url: 'http://115.29.151.25:8012/request.php?action=testV7List',
        data: JSON.stringify({
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: this.pageIndex++,
            pagesize: 10,
            keyword: 'type1'
          }
        }),
        success: ({ custom }) => {
          const infolist = custom.infolist;

          if (Array.isArray(infolist)) {
            infolist.forEach((e) => {
              this.list.push(e);
            });
          }

          this.loading = false;

          if (!Array.isArray(infolist) || infolist.length === 0) {
            this.finished = true;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
</script>
