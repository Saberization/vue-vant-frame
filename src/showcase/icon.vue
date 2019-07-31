<template>
  <div class="container">
    <van-header
      title="Icon 图标"
      left-arrow
    ></van-header>
    <div class="van-content">
      <van-tabs color="rgb(25, 137, 250)">
        <van-tab title="基础图标">
          <div class="van-tabs__content">
            <div class="van-tab__pane">
              <div
                class="van-col van-col--6"
                v-for="(v, i) in baseIcon"
                :key="i"
              >
                <van-icon
                  :name="v"
                  size="2em"
                ></van-icon>
                <span>{{ v }}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="线框风格">
          <div
            class="van-col van-col--6"
            v-for="(v, i) in borderIcon"
            :key="i"
          >
            <van-icon
              :name="v"
              size="2em"
            ></van-icon>
            <span>{{ v }}</span>
          </div>
        </van-tab>
        <van-tab title="突底风格">
          <div
            class="van-col van-col--6"
            v-for="(v, i) in factIcon"
            :key="i"
          >
            <van-icon
              :name="v"
              size="2em"
            ></van-icon>
            <span>{{ v }}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanIcon from '@components/icon';
import { Tab, Tabs } from 'vant';

export default {
  name: 'Icon',
  components: {
    vanIcon,
    vanHeader,
    'van-tabs': Tabs,
    'van-tab': Tab
  },
  data () {
    return {
      baseIcon: ['success', 'plus', 'cross', 'fail', 'arrow', 'arrow-left', 'arrow-up', 'arrow-down'],
      borderIcon: ['location-o', 'like-o', 'star-o', 'phone-o', 'setting-o', 'fire-o', 'coupon-o', 'cart-o', 'shopping-cart-o', 'cart-circle-o', 'friends-o', 'comment-o', 'gem-o', 'gift-o', 'point-gift-o', 'send-gift-o', 'service-o', 'bag-o', 'todo-list-o', 'balance-list-o', 'medel-o', 'close', 'clock-o', 'question-o', 'passed', 'add-o', 'gold-coin-o', 'info-o', 'manager-o', 'label-o', 'hot-o', 'hot-sale-o', 'new-o', 'new-arrival-o', 'goods-collect-o', 'eye-o', 'browsing-history-o', 'bookmark-o', 'bill-o', 'video-o', 'shop-o', 'shop-collect-o', 'chat-o', 'smile-comment-o', 'vip-card-o', 'award-o', 'diamond-o', 'volume-o', 'cluster-o', 'underway-o', 'photo-o', 'gift-card-o', 'more-o', 'expand-o', 'play-circle-o', 'pause-circle-o', 'stop-circle-o', 'warning-o', 'phone-circle-o', 'smile-o', 'music-o', 'balance-o', 'refund-o', 'birthday-cake-o', 'user-o', 'thumb-circle-o', 'orders-o', 'tv-o', 'envelop-o', 'flag-o', 'flower-o', 'filter-o', 'bar-chart-o', 'chart-trending-o', 'comment-circle-o', 'brush-o', 'bullhorn-o', 'hotel-o', 'cashier-o', 'newspaper-o', 'warn-o', 'notes-o', 'calender-o', 'bulb-o', 'user-circle-o', 'desktop-o', 'apps-o', 'home-o', 'share', 'search', 'points', 'edit', 'delete', 'qr', 'qr-invalid', 'closed-eye', 'wap-home', 'scan', 'free-postage', 'certificate', 'logistics', 'contact', 'cash-back-record', 'after-sale', 'exchange', 'upgrade', 'ellipsis', 'circle', 'description', 'records', 'sign', 'completed', 'failure', 'ecard-pay', 'peer-pay', 'balance-pay', 'credit-pay', 'debit-pay', 'cash-on-deliver', 'other-pay', 'tosend', 'pending-payment', 'paid', 'aim', 'discount', 'idcard', 'replay', 'shrink', 'new-o', 'hot-o'],
      factIcon: ['location', 'like', 'star', 'phone', 'setting', 'fire', 'coupon', 'cart', 'shopping-cart', 'cart-circle', 'friends', 'comment', 'gem', 'gift', 'point-gift', 'send-gift', 'service', 'bag', 'todo-list', 'balance-list', 'medel', 'clear', 'clock', 'question', 'checked', 'add', 'gold-coin', 'info', 'manager', 'label', 'hot', 'hot-sale', 'new', 'new-arrival', 'goods-collect', 'eye', 'browsing-history', 'bookmark', 'bill', 'video', 'shop', 'shop-collect', 'chat', 'smile-comment', 'vip-card', 'award', 'diamond', 'volume', 'cluster', 'underway', 'photo', 'gift-card', 'more', 'expand', 'play-circle', 'pause-circle', 'stop-circle', 'alipay', 'wechat', 'photograph', 'youzan-shield', 'umbrella-circle', 'bell', 'printer', 'map-marked', 'card', 'add-square', 'live', 'lock', 'audio', 'graphic', 'column', 'invition', 'play', 'pause', 'stop', 'weapp-nav', 'ascending', 'descending', 'bars', 'wap-nav', 'new', 'hot']
    };
  }
};
</script>

<style scoped>
.van-tabs .van-tab__pane {
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  padding-top: 10px;
}

.van-col {
  box-sizing: border-box;
  text-align: center;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
}

.van-col span {
  display: block;
  padding: 0 5px;
  font-size: 12px;
  line-height: 14px;
}

.van-col--6 {
  width: 25%;
}
</style>
