<template>
  <div class="container">
    <van-header title="Easycalendar 日历" left-arrow right-text="显隐" @click-right="show = !show"></van-header>
    <div class="van-content">
      <easy-calendar v-model="show" ref="calendar" @change="onChange"></easy-calendar>
      <p class="pd10">选择结果：{{result}}</p>
    </div>
  </div>
</template>
<script>
import vanHeader from '@components/header'
import easyCalendar from '@components/easycalendar'

export default {
  name: 'Easycalendar',
  components: {
    vanHeader,
    easyCalendar
  },
  data () {
    return {
      show: true,
      result: {}
    }
  },
  methods: {
    onChange (result) {
      this.result = result
    }
  }
}
</script>

<style scoped>
  .pd10 {
    padding: 10px;
  }
</style>
