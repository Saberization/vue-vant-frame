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
    :replace="replace"
    @click="onClickBtn"
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
    }
  },
  methods: {
    onClickBtn () {
      this.$emit('click');
    }
  }
};
</script>
