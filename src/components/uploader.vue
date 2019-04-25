<template>
  <van-uploader
    :name="name"
    :result-type="resultType"
    :accept="accept"
    :disabled="disabled"
    :before-read="beforeRead"
    :after-read="afterRead"
    :max-size="maxSize"
    :multiple="multiple"
    @oversize="onOversize"
  >
    <slot></slot>
  </van-uploader>
</template>

<script>
import { Uploader } from 'vant';

export default {
  name: 'Uploader',
  components: {
    [Uploader.name]: Uploader
  },
  props: {
    name: String,
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    beforeRead: Function,
    afterRead: Function,
    maxSize: Number,
    multiple: Boolean
  },
  methods: {
    onOversize (file) {
      this.$emit('oversize', file);
    }
  }
};
</script>
