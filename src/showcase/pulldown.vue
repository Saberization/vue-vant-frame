<template>
  <div class="container">
    <van-header title="PullDown 下拉刷新" left-arrow></van-header>
    <div class="van-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" ref="pulldown">
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title"></van-cell>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCell from '@components/cell';
import { PullRefresh } from 'vant';
import Util from '@utils';

export default {
  name: 'PullDown',
  components: {
    vanHeader,
    vanCell,
    [PullRefresh.name]: PullRefresh
  },
  data () {
    return {
      isLoading: false,
      list: []
    };
  },
  methods: {
    onRefresh () {
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
          console.log(custom);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  },
  mounted () {
    this.isLoading = false;
  }
};
</script>
