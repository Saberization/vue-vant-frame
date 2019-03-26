<template>
  <div class="container">
    <van-header
      title="Card 商品卡片"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
      />

      <h4 class="cell-title">高级用法</h4>
      <van-card
        num="2"
        tag="标签"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
        origin-price="10.00"
      >
        <div slot="footer">
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanCard from '@components/card'
import vanButton from '@components/button'

export default {
  name: 'Card',
  components: {
    vanHeader,
    vanCard,
    vanButton
  }
}
</script>

<style scoped>
.van-content {
  background-color: #fff;
}
</style>
