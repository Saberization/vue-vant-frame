<template>
  <div class="container">
    <van-header
      title="Area 省市区选择"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button
        plain
        type="primary"
        @click="showPicker('twolevel')"
      >二级城市选择</van-button>
      <van-button
        plain
        type="info"
        @click="showPicker('threelevel')"
      >三级城市选择</van-button>
    </div>

    <van-picker
      v-model="show"
      :data="pickerData"
      @confirm="onConfirm"
    ></van-picker>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanButton from '@components/button'
import vanPicker from '@components/picker'
import cityData2 from '@public/lib/city-data.js'
import cityData3 from '@public/lib/city.data-3.js'
import { Toast } from 'vant'

export default {
  name: 'Area',
  components: {
    vanHeader,
    vanButton,
    vanPicker
  },
  data () {
    return {
      pickerData: [],
      show: false
    }
  },
  methods: {
    showPicker (level) {
      this.show = true

      switch (level) {
        case 'twolevel':
          this.pickerData = cityData2
          break

        case 'threelevel':
          this.pickerData = cityData3
          break
      }
    },

    onConfirm (value) {
      Toast(value)
    }
  }
}
</script>

<style scoped>
.van-button {
  margin-left: 10px;
}
</style>
