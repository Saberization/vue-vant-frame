<template>
  <van-radio-group
    v-model="radio"
    :disabled="disabled"
    @change="onChange"
  >
    <slot></slot>
  </van-radio-group>
</template>

<script>
import { RadioGroup } from 'vant';

export default {
  name: 'RadioGroup',
  components: {
    [RadioGroup.name]: RadioGroup
  },
  model: {
    prop: 'radio',
    event: 'changeRadio'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    radio: [String, Number, Boolean]
  },
  methods: {
    onChange(name) {
      this.$emit('change', name);
    }
  }
};
</script>
