<template>
  <div class="container">
    <van-header
      title="TreeSelect 分类选择"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @navclick="onNavClick"
        @itemclick="onItemClick"
      ></van-tree-select>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanTreeSelect from '@components/treeselect'

const Console = console

export default {
  name: 'TreeSelect',
  components: {
    vanHeader,
    vanTreeSelect
  },
  data () {
    return {
      items: [
        {
          // 导航名称
          text: '所有城市',
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: '温州',
              // id，作为匹配选中状态的标识
              id: 1
            },
            {
              text: '杭州',
              id: 2
            },
            {
              text: '宁波',
              id: 3,
              // 禁用选项
              disabled: true
            },
            {
              text: '义乌',
              id: 4
            },
            {
              text: '南京',
              id: 5
            },
            {
              text: '无锡',
              id: 6
            },
            {
              text: '徐州',
              id: 7
            }
          ]
        },
        {
          // 导航名称
          text: '江苏',
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: '南京',
              // id，作为匹配选中状态的标识
              id: 1
            },
            {
              text: '无锡',
              id: 2
            },
            {
              text: '苏州',
              id: 3
            },
            {
              text: '徐州',
              id: 4
            }
          ]
        },
        {
          text: '浙江',
          children: [{
            text: '杭州',
            id: 1
          }, {
            text: '温州',
            id: 2
          }, {
            text: '宁波',
            id: 3,
            disabled: true
          }, {
            text: '义乌',
            id: 4
          }]
        },
        {
          text: '福建',
          disabled: true
        }
      ],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1
    }
  },
  methods: {
    // 左侧导航点击时，触发的事件
    onNavClick (index) {
      Console.log(`左侧点击index: ${index}`)
      this.mainActiveIndex = index
    },
    // 右侧选择项被点击时，会触发的事件
    onItemClick (data) {
      Console.log(`右侧点击数据: ${JSON.stringify(data)}`)
      this.activeId = data.id
    }
  }
}
</script>
