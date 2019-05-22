<template>
  <div class="container">
    <van-header
      title="PullDown 下拉刷新"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-pull-refresh
        v-model="loading"
        @refresh="onRefresh"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        ></van-cell>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCell from '@components/cell';
import { PullRefresh } from 'vant';
import Util from '@utils';

const Console = console;

export default {
  name: 'PullDown',
  components: {
    vanHeader,
    vanCell,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      loading: false,
      list: []
    };
  },
  methods: {
    onRefresh() {
      Util.ajax({
        url: 'http://115.29.151.25:8012/request.php?action=testV7List',
        data: JSON.stringify({
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: 0,
            pagesize: 10,
            keyword: 'type1'
          }
        }),
        success: ({ custom }) => {
          const infolist = custom.infolist || [];
          const len = infolist.length;

          setTimeout(() => {
            if (len > 0) {
              this.list = infolist;
            }

            this.loading = false;
          }, 600);
        },
        error: err => {
          Console.error(err);
        }
      });
    }
  },
  mounted() {
    this.loading = true;
    this.onRefresh();
  }
};
</script>

<style scoped>
.van-pull-refresh,
/deep/ .van-pull-refresh__track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
