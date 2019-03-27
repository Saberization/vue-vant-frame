<template>
  <van-sku
    v-model="isShow"
    :sku="sku"
    :goods="goods"
    :goods-id="goodsId"
    :hide-stock="hideStock"
    :hide-quota-text="hideQuotaText"
    :show-add-cart-btn="showAddCartBtn"
    :quota="quota"
    :quota-used="quotaUsed"
    :reset-stepper-on-hide="resetStepperOnHide"
    :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
    :disable-stepper-input="disableStepperInput"
    :close-on-click-overlay="closeOnClickOverlay"
    :stepper-title="stepperTitle"
    :custom-stepper-config="customStepperConfig"
    :message-config="messageConfig"
    :get-container="getContainer"
    :initial-sku="initialSku"
    :show-soldout-sku="showSoldOutSku"
    @add-cart="onAddCart"
    @buy-clicked="onBuyClicked"
    @stepper-change="onStepperChange"
    @sku-selected="onSkuSelected"
    ref="sku"
  >
    <slot
      name="sku-header"
      slot="sku-header"
    ></slot>
    <slot
      name="sku-header-price"
      slot="sku-header-price"
    ></slot>
    <slot
      name="sku-body-top"
      slot="sku-body-top"
    ></slot>
    <slot
      name="sku-group"
      slot="sku-group"
    ></slot>
    <slot
      name="extra-sku-group"
      slot="extra-sku-group"
    ></slot>
    <slot
      name="sku-stepper"
      slot="sku-stepper"
    ></slot>
    <slot
      name="sku-messages"
      slot="sku-messages"
    ></slot>
    <slot
      name="sku-actions"
      slot="sku-actions"
    ></slot>
  </van-sku>
</template>

<script>
import { Sku } from 'vant'

export default {
  name: 'Sku',
  components: {
    [Sku.name]: Sku
  },
  model: {
    prop: 'showbase',
    event: 'changeStatus'
  },
  props: {
    sku: Object,
    goods: Object,
    goodsId: [String, Number],
    hideStock: {
      type: Boolean,
      default: false
    },
    hideQuotaText: {
      type: Boolean,
      default: false
    },
    showAddCartBtn: {
      type: Boolean,
      default: true
    },
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    resetStepperOnHide: {
      type: Boolean,
      default: false
    },
    resetSelectedSkuOnHide: {
      type: Boolean,
      default: false
    },
    disableStepperInput: {
      type: Boolean,
      default: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    stepperTitle: {
      type: String,
      default: '购买数量'
    },
    customStepperConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    messageConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    getContainer: String,
    initialSku: {
      type: Object,
      default () {
        return {}
      }
    },
    showSoldOutSku: {
      type: Boolean,
      default: true
    },
    showbase: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: this.showbase
    }
  },
  watch: {
    showbase (value) {
      this.isShow = value
    },
    isShow (value) {
      console.log(value);
      this.$emit('changeStatus', value)
    }
  },
  methods: {
    getSkuData () {
      return this.$refs.sku.getSkuData();
    },
    onAddCart (skuData) {
      this.$emit('add-cart', skuData)
    },
    onBuyClicked (skuData) {
      this.$emit('buy-clicked', skuData)
    },
    onStepperChange (value) {
      this.$emit('stepper-change', value)
    },
    onSkuSelected ({ skuValue, selectedSku, selectedSkuComb }) {
      this.$emit('sku-selected', { skuValue, selectedSku, selectedSkuComb })
    }
  }
}
</script>
