<template>
  <div class="container">
    <van-header
      title="Pagination 分页"
      left-arrow
      left-text="返回"
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-pagination
        v-model="currentPage"
        :total-items="50"
        :items-per-page="10"
        @change="onChangePage"
      ></van-pagination>

      <h4 class="cell-title">简单模式</h4>
      <van-pagination
        v-model="currentPage"
        mode="simple"
        :total-items="120"
        :items-per-page="10"
        @change="onChangePage"
      />

      <van-pagination
        v-model="currentPage"
        :total-items="240"
        :items-per-page="10"
        :show-page-size="3"
        :force-ellipses="true"
        @change="onChangePage"
        style="margin-top: 40px;"
      />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPagination from '@components/pagination'
import { Toast } from 'vant'

export default {
  name: 'Pagination',
  components: {
    vanHeader,
    vanPagination
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    onChangePage () {
      Toast('当前第 ' + this.currentPage + ' 页')
    }
  }
}
</script>
