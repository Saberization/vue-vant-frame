<template>
  <div class="container">
    <van-header
      title="List 列表"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="30"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanCell from '@components/cell'
import { List } from 'vant'

export default {
  name: 'List',
  components: {
    vanHeader,
    vanCell,
    [List.name]: List
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        console.log(123);
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        this.loading = false
      }, 500);
    }
  }
}
</script>
