<template>
  <van-password-input
    :value="value"
    :mask="mask"
    :length="length"
    :info="info"
    :error-info="errorInfo"
    @focus="onFocus"
  ></van-password-input>
</template>

<script>
import { PasswordInput } from 'vant'

export default {
  name: 'PasswordeInput',
  components: {
    [PasswordInput.name]: PasswordInput
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 6
    },
    mask: {
      type: Boolean,
      default: true
    },
    info: String,
    errorInfo: String
  },
  methods: {
    onFocus () {
      this.$emit('focus')
    }
  }
}
</script>
