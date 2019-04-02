<template>
  <div class="container">
    <p class="component-title">轻量、可靠的移动端 Vue 组件库</p>

    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="(v, i) in menu"
        :title="v.title"
        :name="i + 1"
        :key="i"
      >
        <van-cell
          v-for="(_v, _i) in v.children"
          :key="_i"
          :title="_v.title"
          :to="_v.to"
        ></van-cell>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant'
import vanCell from '@components/cell'

export default {
  name: 'Navigation',
  components: {
    'van-collapse': Collapse,
    'van-collapse-item': CollapseItem,
    vanCell
  },
  data () {
    return {
      activeNames: [1, 2, 3, 4, 5, 6],
      menu: [
        {
          title: '基础组件',
          children: [
            {
              title: 'Button 按钮',
              to: '/button'
            },
            {
              title: 'Cell 单元格',
              to: '/cell'
            },
            {
              title: 'Icon 图标',
              to: '/icon'
            },
            {
              title: 'Layout 布局',
              to: '/layout'
            },
            {
              title: 'Popup 弹出层',
              to: '/popup'
            }
          ]
        },
        {
          title: '表单组件',
          children: [
            {
              title: 'Checkbox 复选框',
              to: '/checkbox'
            },
            {
              title: 'DatetimePicker 时间选择',
              to: '/datepicker'
            },
            {
              title: 'Field 输入框',
              to: '/field'
            },
            {
              title: 'NumberKeyboard 数字键盘',
              to: '/numberkeyboard'
            },
            {
              title: 'PasswordInput 密码输入框',
              to: '/passwordinput'
            },
            {
              title: 'Picker 选择器',
              to: '/picker'
            },
            {
              title: 'Radio 单选框',
              to: '/radio'
            },
            {
              title: 'Rate 评分',
              to: '/rate'
            },
            {
              title: 'Search 搜索',
              to: '/search'
            },
            {
              title: 'Slider 滑块',
              to: '/slider'
            },
            {
              title: 'Stepper 步进器',
              to: '/stepper'
            },
            {
              title: 'Switch 开关',
              to: '/switch'
            },
            {
              title: 'SwitchCell 开关单元格',
              to: '/switchcell'
            },
            {
              title: 'Uploader 图片上传',
              to: '/uploader'
            }
          ]
        },
        {
          title: '反馈组件',
          children: [
            {
              title: 'Actionsheet 上拉菜单',
              to: '/actionsheet'
            },
            {
              title: 'Dialog 弹出框',
              to: '/dialog'
            },
            {
              title: 'Loading 加载',
              to: '/loading'
            },
            {
              title: 'Notify 消息通知',
              to: '/notify'
            },
            {
              title: 'PullDown 下拉刷新',
              to: '/pulldown'
            },
            {
              title: 'Pulltorefresh 下拉刷新上拉加载',
              to: '/pulltorefresh'
            },
            {
              title: 'SwipeCell 滑动单元格',
              to: '/swipecell'
            },
            {
              title: 'Toast 轻提示',
              to: '/toast'
            }
          ]
        },
        {
          title: '展示组件',
          children: [
            {
              title: 'Circle 环形进度条',
              to: '/circle'
            },
            {
              title: 'Collapse 折叠面板',
              to: '/collapse'
            },
            {
              title: 'ImagePreview 图片预览',
              to: '/imagepreview'
            },
            {
              title: 'LazyLoad 图片懒加载',
              to: '/lazyload'
            },
            {
              title: 'PullUp 上拉加载',
              to: '/pullup'
            },
            {
              title: 'NoticeBar 通告栏',
              to: '/noticebar'
            },
            {
              title: 'Panel 面板',
              to: '/panel'
            },
            {
              title: 'Progress 进度条',
              to: '/progress'
            },
            {
              title: 'Steps 步骤条',
              to: '/step'
            },
            {
              title: 'Gallery 轮播',
              to: '/gallery'
            },
            {
              title: 'Tag 标记',
              to: '/tag'
            },
            {
              title: '内置样式',
              to: '/inlinestyle'
            }
          ]
        },
        {
          title: '导航组件',
          children: [
            {
              title: 'Badge 徽章',
              to: '/badge'
            },
            {
              title: 'Header 导航栏',
              to: '/header'
            },
            {
              title: 'Pagination 分页',
              to: '/pagination'
            },
            {
              title: 'Tab 标签页',
              to: '/tab'
            },
            {
              title: 'Tabbar 标签页',
              to: '/tabbar'
            },
            {
              title: 'TreeSelect 分类选择',
              to: '/treeselect'
            }
          ]
        },
        {
          title: '业务组件',
          children: [
            {
              title: 'AddressEdit 地址编辑',
              to: '/addressedit'
            },
            {
              title: 'AddressList 地址列表',
              to: '/addresslist'
            },
            {
              title: 'Area 省市区选择',
              to: '/area'
            },
            {
              title: 'Card 商品卡片',
              to: '/card'
            },
            {
              title: 'GoodsAction 商品导航',
              to: '/goodsaction'
            },
            {
              title: 'SubmitBar 提交订单栏',
              to: '/submitbar'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;

  .component-title {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    color: #455a64;
  }

  .van-collapse-item {
    margin-bottom: 20px;
  }
  .van-collapse-item__content {
    padding: 0;
  }
  .van-collapse-item__title {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  /deep/ .van-cell__title {
    white-space: nowrap;
    font-size: 14px;
  }
  .van-collapse-item__title > .van-cell__title > span {
    font-size: 16px;
  }
}
</style>
