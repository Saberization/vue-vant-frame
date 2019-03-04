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
      activeNames: ['1'],
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
              title: 'Checkbox 复选框'
            },
            {
              title: 'DatetimePicker 时间选择'
            },
            {
              title: 'Field 输入框'
            },
            {
              title: 'NumberKeyboard 数字键盘'
            },
            {
              title: 'PasswordInput 密码输入框'
            },
            {
              title: 'Picker 选择器'
            },
            {
              title: 'Radio 单选框'
            },
            {
              title: 'Rate 评分'
            },
            {
              title: 'Search 搜索'
            },
            {
              title: 'Slider 滑块'
            },
            {
              title: 'Stepper 步进器'
            },
            {
              title: 'Switch 开关'
            },
            {
              title: 'SwitchCell 开关单元格'
            },
            {
              title: 'Uploader 图片上传'
            }
          ]
        },
        {
          title: '反馈组件',
          children: [
            {
              title: 'Actionsheet 上拉菜单'
            },
            {
              title: 'Dialog 弹出框'
            },
            {
              title: 'Loading 加载'
            },
            {
              title: 'Notify 消息通知'
            },
            {
              title: 'PullRefresh 下拉刷新'
            },
            {
              title: 'SwipeCell 滑动单元格'
            },
            {
              title: 'Toast 轻提示'
            }
          ]
        },
        {
          title: '展示组件',
          children: [
            {
              title: 'Circle 环形进度条'
            },
            {
              title: 'Collapse 折叠面板'
            },
            {
              title: 'ImagePreview 图片预览'
            },
            {
              title: 'LazyLoad 图片懒加载'
            },
            {
              title: 'List 列表'
            },
            {
              title: 'NoticeBar 通告栏'
            },
            {
              title: 'Panel 面板'
            },
            {
              title: 'Progress 进度条'
            },
            {
              title: 'Steps 步骤条'
            },
            {
              title: 'Swipe 轮播'
            },
            {
              title: 'Tag 标记'
            },
            {
              title: '内置样式'
            }
          ]
        },
        {
          title: '导航组件',
          children: [
            {
              title: 'Badge 徽章'
            },
            {
              title: 'Header 导航栏',
              to: '/header'
            },
            {
              title: 'Pagination 分页'
            },
            {
              title: 'Tab 标签页',
              to: '/tab'
            },
            {
              title: 'Tabbar 标签页'
            },
            {
              title: 'TreeSelect 分类选择'
            }
          ]
        },
        {
          title: '业务组件',
          children: [
            {
              title: 'AddressEdit 地址编辑'
            },
            {
              title: 'AddressList 地址列表'
            },
            {
              title: 'Area 省市区选择'
            },
            {
              title: 'Card 商品卡片'
            },
            {
              title: 'Contact 联系人'
            },
            {
              title: 'Coupon 优惠券'
            },
            {
              title: 'GoodsAction 商品导航'
            },
            {
              title: 'SubmitBar 提交订单栏'
            },
            {
              title: 'Sku 商品规格'
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
