<template>
  <div class="container">
    <van-header
      title="DatePicker 时间选择器"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-button
        size="large"
        @click="selectDatetime"
      >选择完整时间</van-button>
      <van-button
        size="large"
        @click="selectDate"
      >选择日期 (年月日)</van-button>
      <van-button
        size="large"
        @click="selectDatetimeYearMonth"
      >选择日期 (年月)</van-button>
      <van-button
        size="large"
        @click="selecttime"
      >选择时间</van-button>

      <div class="result">当前选择结果：{{ result }}</div>
    </div>

    <van-datepicker1
      v-model="showDatePicker1"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></van-datepicker1>

    <van-datepicker2
      v-model="showDatePicker2"
      type="date"
      :min-date="new Date()"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></van-datepicker2>

    <van-datepicker3
      v-model="showDatePicker3"
      type="year-month"
      :formatter="formatter"
      @confirm="onConfirm"
    ></van-datepicker3>

    <van-datepicker4
      v-model="showDatePicker4"
      type="time"
      @confirm="onConfirm"
    ></van-datepicker4>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanButton from '@components/button'
import vanDatepicker from '@components/datepicker'

const Console = console

export default {
  name: 'DatePicker',
  components: {
    vanHeader,
    vanButton,
    'van-datepicker1': vanDatepicker,
    'van-datepicker2': vanDatepicker,
    'van-datepicker3': vanDatepicker,
    'van-datepicker4': vanDatepicker
  },
  data () {
    return {
      showDatePicker1: false,
      showDatePicker2: false,
      showDatePicker3: false,
      showDatePicker4: false,
      result: null
    }
  },
  methods: {
    selectDatetime () {
      this.showDatePicker1 = true
    },
    selectDate () {
      this.showDatePicker2 = true
    },
    selectDatetimeYearMonth () {
      this.showDatePicker3 = true
    },
    selecttime () {
      this.showDatePicker4 = true
    },
    onConfirm (value) {
      this.result = value
    },
    onCancel () {
      Console.log('点击取消按钮')
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    }
  }
}
</script>

<style scoped>
.van-content {
  padding: 10px;
}
.van-button {
  margin-bottom: 15px;
}

.result {
  text-align: center;
}
</style>
