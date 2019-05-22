<template>
  <div class="container">
    <van-header
      title="PullUp 上拉加载"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title"></van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCell from '@components/cell';
import { List } from 'vant';
import Util from '@utils';

const Console = console;

export default {
  name: 'PullUp',
  components: {
    vanHeader,
    vanCell,
    [List.name]: List
  },
  data() {
    return {
      pageIndex: 0,
      loading: false,
      list: [],
      finished: false
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
          const infolist = custom.infolist || [];
          const len = infolist.length;

          setTimeout(() => {
            if (len > 0) {
              infolist.forEach(e => {
                this.list.push(e);
              });
            } else if (len === 0) {
              this.finished = true;
            }

            this.loading = false;
          }, 600);
        },
        error: err => {
          Console.error(err);
        }
      });
    }
  }
};
</script>
