<template>
  <div class="container">
    <van-header
      title="Sku 商品规格"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-button
        size="large"
        type="primary"
        @click=""
      >基础用法</van-button>

      <h4 class="cell-title">自定义步进器</h4>
      <van-button
        size="large"
        type="primary"
      >自定义步进器</van-button>

      <h4 class="cell-title">隐藏售罄规格</h4>
      <van-button
        size="large"
        type="primary"
      >隐藏售罄规格</van-button>

      <h4 class="cell-title">高级用法</h4>
      <van-button
        size="large"
        type="primary"
      >高级用法</van-button>
    </div>

    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      goods-id="shopid"
      :hide-stock="sku.hide_stock"
      :quota="0"
      :quota-used="0"
      :message-config="messageConfig"
    />
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanButton from '@components/button'
import vanSku from '@components/sku'

export default {
  name: 'Sku',
  components: {
    vanHeader,
    vanButton,
    vanSku
  },
  data () {
    return {
      showBase: false,
      goods: {
        // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl: 'https://img.yzcdn.cn/2.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '1' // 是否必填 '1' 表示必填
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: '30349',
        s2: '1193',
        // 初始选中数量
        selectedNum: 3
      },
      customStepperConfig: {
        // 自定义限购文案
        quotaText: '每次限购xxx件',
        // 自定义步进器超过限制时的回调
        handleOverLimit: (data) => {
          const { action, limitType, quota, quotaUsed } = data;

          if (action === 'minus') {
            Toast('至少选择一件商品');
          } else if (action === 'plus') {
            // const { LIMIT_TYPE } = Sku.skuConstants;
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              let msg = `单次限购${quota}件`;
              if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
              Toast(msg);
            } else {
              Toast('库存不够了');
            }
          }
        }
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise((resolve) => {
            setTimeout(() => resolve('https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'), 1000);
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placehold配置
        placeholderMap: {
          text: 'xxx',
          tel: 'xxx'
        }
      }
    }
  }
}
</script>

<style scoped>
.van-button {
  display: block;
  width: 94%;
  margin: 0 auto;
}
</style>
