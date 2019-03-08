<template>
  <van-switch-cell
    v-model="value"
    :title="title"
    :loading="loading"
    :disabled="disabled"
    :size="size"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    @change="onChange"
  ></van-switch-cell>
</template>

<script>
import { SwitchCell } from 'vant'

export default {
  name: 'SwitchCell',
  components: {
    [SwitchCell.name]: SwitchCell
  },
  model: {
    prop: 'switchValue',
    event: 'changeValue'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '24px'
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
    },
    switchValue: {
      default: false
    }
  },
  data () {
    return {
      value: false
    }
  },
  methods: {
    onChange (checked) {
      this.$emit('changeValue', checked)
      this.$emit('change', checked)
    }
  },
  created () {
    this.value = this.switchValue
  }
}
</script>
