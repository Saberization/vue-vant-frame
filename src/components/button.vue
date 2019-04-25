<template>
  <van-button
    :type="type"
    :size="size"
    :text="text"
    :tag="tag"
    :native-type="nativeType"
    :block="block"
    :plain="plain"
    :square="square"
    :round="round"
    :disabled="disabled"
    :loading="loading"
    :loading-text="loadingText"
    :loading-size="loadingSize"
    :url="url"
    :to="to"
    :hairline="hairline"
    :replace="replace"
    @click="onClickBtn"
    @touchstart="onTouchStart"
  >
    <slot></slot>
  </van-button>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'Button',
  components: {
    'van-button': Button
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    text: String,
    tag: {
      type: String,
      default: 'button'
    },
    nativeType: String,
    block: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    loadingSize: {
      type: String,
      default: '20px'
    },
    url: String,
    to: {
      default: null
    },
    replace: {
      type: Boolean,
      default: false
    },
    hairline: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickBtn (event) {
      this.$emit('click', event);
    },
    onTouchStart (event) {
      this.$emit('touchstart', event);
    }
  }
};
</script>
