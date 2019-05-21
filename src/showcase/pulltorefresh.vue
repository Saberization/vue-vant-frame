<template>
  <div class="container">
    <van-header title="Pulltorefresh 下拉刷新" left-arrow></van-header>
    <div class="van-content">
      <div id="minirefresh" class="minirefresh-wrap">
        <div class="minirefresh-scroll">
          <div class="data-list" ref="listdata">
            <van-cell v-for="(item, index) in listdata" :key="index" :title="item.title"></van-cell>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanCell from '@components/cell';
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
import Util from '@utils';

export default {
  name: 'Pulltorefresh',
  components: {
    vanHeader,
    vanCell
  },
  data () {
    return {
      miniRefresh: null,
      listdata: [],
      requestDelayTime: 600,
      pageindex: 0
    };
  },
  methods: {
    requestAjax (eventType) {
      if (eventType === 'down') {
        this.pageindex = 0;
      }

      Util.ajax({
        url: 'http://115.29.151.25:8012/request.php?action=testV7List',
        data: JSON.stringify({
          token: 'RXBvaW50X1dlYlNlcml2Y2VfKiojIzA2MDE=',
          params: {
            pageindex: this.pageindex,
            pagesize: 7,
            keyword: 'type1'
          }
        }),
        success: ({ custom }) => {
          const infolist = custom.infolist || [];
          const len = infolist.length;

          if (len > 0) {
            if (eventType === 'down') {
              this.listdata = infolist;
              this.miniRefresh.endDownLoading(true);
            } else {
              infolist.forEach(e => {
                this.listdata.push(e);
              });
            }
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  },
  mounted () {
    this.miniRefresh = new MiniRefresh({
      container: '#minirefresh',
      down: {
        callback: () => {
          this.requestAjax('down');
        }
      },
      up: {
        isAuto: true,
        callback: () => {
          this.requestAjax('up');
        }
      }
    }); 
  }
};
</script>
