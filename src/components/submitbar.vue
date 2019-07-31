<template>
  <van-submit-bar
    :price="price"
    :label="label"
    :button-text="buttonText"
    :button-type="buttonType"
    :tip="tip"
    :disabled="disabled"
    :loading="loading"
    :currency="currency"
    :decimal-length="decimalLength"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @submit="onSubmit"
  >
    <slot></slot>
    <slot
      name="top"
      slot="top"
    ></slot>
    <slot
      name="tip"
      slot="tip"
    ></slot>
  </van-submit-bar>
</template>

<script>
import { SubmitBar } from 'vant';

export default {
  name: 'SubmitBar',
  components: {
    [SubmitBar.name]: SubmitBar
  },
  props: {
    price: Number,
    label: {
      type: String,
      default: '合计：'
    },
    buttonText: String,
    buttonType: {
      type: String,
      default: 'danger'
    },
    tip: String,
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: '¥'
    },
    decimalLength: {
      type: Number,
      default: 2
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit');
    }
  }
};
</script>
