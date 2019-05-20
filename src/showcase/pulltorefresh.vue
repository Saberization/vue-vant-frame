<template>
  <div class="contaienr">
    <van-header title="Pulltorefresh 下拉刷新" left-arrow></van-header>
    <div class="van-content">
      <div ref="mescroll" class="mescroll">
        <div>
          <van-cell v-for="(item, index) in listdata" :key="index" :title="item.title"></van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCell from '@components/cell';
import MeScroll from 'mescroll.js';
import 'mescroll.js/mescroll.min.css';
import Util from '@utils';

export default {
  name: 'Pulltorefresh',
  components: {
    vanHeader,
    vanCell
  },
  data () {
    return {
      mescroll: null,
      listdata: []
    };
  },
  methods: {
    upCallback (page) {
      Util.ajax({
        url: 'http://115.29.151.25:8012/request.php?action=testV7List',
        data: JSON.stringify({
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: page.num,
            pagesize: 10,
            keyword: 'type1'
          }
        }),
        success: ({ custom }) => {
          const infolist = custom.infolist || [];

          console.log('upCallback');

          if (Array.isArray(infolist) && infolist.length >= 1) {
            infolist.forEach(e => {
              this.listdata.push(e);
            });
          }

          this.$nextTick(() => {
            this.mescroll.endSuccess(infolist.length, infolist.length >= 1);
          });
        },
        error: () => {
          this.mescroll.endErr();
        }
      });
    },
    downCallback () {
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

          this.listdata = infolist;
          setTimeout(() => {
            this.mescroll.endSuccess();
          }, 600);
        },
        error: () => {
          this.mescroll.endErr();
        }
      });
    }
  },
  mounted () {
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      up: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 7
        },
        htmlNodata: '<p class="van-list__finished-text">没有更多数据了</p>'
      },
      down: {
        callback: this.downCallback,
        htmlNodata: '<p class="van-list__finished-text">没有更多数据了</p>'
      }
    });
  }
};
</script>
