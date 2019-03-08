<template>
  <van-switch
    :value="value"
    :loading="loading"
    :disabled="disabled"
    :size="size"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    @change="onChange"
    @input="onInput"
  ></van-switch>
</template>

<script>
import { Switch } from 'vant'

export default {
  name: 'component_switch',
  components: {
    [Switch.name]: Switch
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '30px'
    },
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    inactiveColor: {
      type: String,
      default: '#fff'
    },
    activeValue: {
      default: true
    },
    inactiveValue: {
      default: false
    }
  },
  methods: {
    onChange (checked) {
      this.$emit('change', checked)
    },
    onInput (checked) {
      this.$emit('input', checked)
    }
  }
}
</script>
