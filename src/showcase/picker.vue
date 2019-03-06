<template>
  <div class="container">
    <van-header
      title="Picker 选择器"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button @click="showPicker1 = !showPicker1">一级选择示例</van-button>
      <van-button @click="showPicker2 = !showPicker2">二级选择示例</van-button>

      <div class="result">选择结果：{{result}}</div>
    </div>
    <van-picker1
      v-model="showPicker1"
      :data="pickerData1"
      @confirm="onConfirm"
    ></van-picker1>

    <van-picker2
      v-model="showPicker2"
      :data="pickerData2"
      @confirm="onConfirm"
    ></van-picker2>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPicker from '@components/picker'
import vanButton from '@components/button'

export default {
  name: 'Picker',
  components: {
    'van-picker1': vanPicker,
    'van-picker2': vanPicker,
    vanHeader,
    vanButton
  },
  data () {
    return {
      showPicker1: false,
      showPicker2: false,
      pickerData1: [{
        text: 'saber',
        id: 'saber'
      }, {
        text: '远坂凛',
        id: '远坂凛'
      }, {
        text: '逢坂大河',
        id: '逢坂大河'
      }],
      pickerData2: [{
        text: '江苏',
        id: '江苏',
        children: [{
          text: '苏州',
          id: '苏州'
        }, {
          text: '南京',
          id: '南京'
        }, {
          text: '连云港',
          id: '连云港'
        }, {
          text: '徐州',
          id: '徐州'
        }]
      }, {
        text: '浙江',
        id: '浙江',
        children: [{
          text: '温州',
          id: '温州'
        }, {
          text: '绍兴',
          id: '绍兴'
        }, {
          text: '宁波',
          id: '宁波'
        }]
      }],
      result: ''
    }
  },
  methods: {
    onConfirm (value) {
      this.result = value
    }
  }
}
</script>

<style scoped>
/deep/ .van-button {
  margin-left: 10px;
  margin-right: 10px;
}
.result {
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
</style>
