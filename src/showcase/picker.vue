<template>
  <div class="container">
    <van-header
      title="Picker 选择器"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button @click="showPicker1 = !showPicker1; showTitle = false">一级选择示例</van-button>
      <van-button @click="showPicker2 = !showPicker2">二级选择示例</van-button>
      <van-button @click="showPicker3 = !showPicker3">三级选择示例</van-button>

      <h4 class="cell-title">禁用选项</h4>
      <van-button @click="disablePicker = !disablePicker">禁用选项示例</van-button>

      <h4 class="cell-title">自定义标题内容</h4>
      <van-button @click="showPicker1 = !showPicker1; showTitle = true">一级选择示例</van-button>

      <h4 class="cell-title">加载状态</h4>
      <van-button @click="showLoadingPicker = !showLoadingPicker">异步加载</van-button>

      <div class="result">选择结果：{{result}}</div>
    </div>
    <van-picker
      v-model="showPicker1"
      :data="pickerData1"
      @confirm="onConfirm"
    >
      <p slot="title" v-if="showTitle">标题</p>
    </van-picker>

    <van-picker
      v-model="showPicker2"
      :data="pickerData2"
      @confirm="onConfirm"
    ></van-picker>

    <van-picker
      v-model="showPicker3"
      :data="cityData3"
      @confirm="onConfirm"
    ></van-picker>

    <van-picker
      v-model="disablePicker"
      :data="pickerData4"
      @confirm="onConfirm"
    ></van-picker>

    <van-picker
      v-model="showLoadingPicker"
      :data="cityData3"
      loading
      @confirm="onConfirm"
    ></van-picker>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPicker from '@components/picker'
import vanButton from '@components/button'
import cityData3 from '@assets/lib/city.data-3.js'

export default {
  name: 'Picker',
  components: {
    vanPicker,
    vanHeader,
    vanButton
  },
  data () {
    return {
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      disablePicker: false,
      showTitle: false,
      showLoadingPicker: false,
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
      cityData3,
      pickerData4: [{
        text: 'saber',
        id: 'saber'
      }, {
        text: '西宫哨子',
        id: '西宫哨子',
        disabled: true
      }, {
        text: '远坂凛',
        id: '远坂凛'
      }, {
        text: '逢坂大河',
        id: '逢坂大河'
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
  margin-bottom: 10px;
}
.result {
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
</style>
