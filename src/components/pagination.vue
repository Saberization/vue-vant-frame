<template>
  <van-pagination
    v-model="page"
    :mode="mode"
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :page-count="pageCount"
    :prev-text="prevText"
    :next-text="nextText"
    :show-page-size="showPageSize"
    :force-ellipses="forceEllipses"
    @change="onChangePage"
  ></van-pagination>
</template>

<script>
import { Pagination } from 'vant';

export default {
  name: 'Pagination',
  components: {
    'van-pagination': Pagination
  },
  model: {
    prop: 'currentPage',
    event: 'change'
  },
  props: {
    mode: {
      type: String,
      default: 'multi'
    },
    totalItems: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    pageCount: Number,
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    },
    showPageSize: {
      type: Number,
      default: 5
    },
    forceEllipses: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      page: 1
    };
  },
  methods: {
    onChangePage() {
      this.$emit('change', this.page);
    }
  },
  created() {
    this.page = this.currentPage;
  }
};
</script>
