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
      :data="pickerData3"
      @confirm="onConfirm"
    ></van-picker>

    <van-picker
      v-model="disablePicker"
      :data="pickerData4"
      @confirm="onConfirm"
    ></van-picker>

    <van-picker
      v-model="showLoadingPicker"
      :data="pickerData3"
      loading
      @confirm="onConfirm"
    ></van-picker>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanPicker from '@components/picker'
import vanButton from '@components/button'

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
      pickerData3: [{
        text: '北京市',
        id: '北京市',
        children: [{
          text: '北京市',
          id: '北京市',
          children: [{
            text: '东城区',
            id: '东城区'
          }, {
            text: '西城区',
            id: '西城区'
          }, {
            text: '崇文区',
            id: '崇文区'
          }, {
            text: '宣武区',
            id: '宣武区'
          }]
        }]
      }, {
        text: '河北省',
        id: '河北省',
        children: [{
          text: '石家庄市',
          id: '石家庄市',
          children: [{
            text: '长安区',
            id: '长安区'
          }, {
            text: '桥东区',
            id: '桥东区'
          }, {
            text: '桥西区',
            id: '桥西区'
          }, {
            text: '新华区',
            id: '新华区'
          }]
        }, {
          text: '唐山市',
          id: '唐山市',
          children: [{
            text: '路南区',
            id: '路南区'
          }, {
            text: '路北区',
            id: '路北区'
          }, {
            text: '古冶区',
            id: '古冶区'
          }, {
            text: '开平区',
            id: '开平区'
          }]
        }, {
          text: '秦皇岛市',
          id: '秦皇岛市',
          children: [{
            text: '海港区',
            id: '海港区'
          }, {
            text: '山海关区',
            id: '山海关区'
          }, {
            text: '北戴河区',
            id: '北戴河区'
          }]
        }]
      }],
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
