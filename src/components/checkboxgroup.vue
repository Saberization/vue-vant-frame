<template>
  <van-checkbox-group
    v-model="value"
    :disabled="disabled"
    :max="max"
    @change="onChangeValue"
  >
    <slot></slot>
  </van-checkbox-group>
</template>

<script>
import { CheckboxGroup } from 'vant';

export default {
  name: 'CheckBoxGroup',
  components: {
    [CheckboxGroup.name]: CheckboxGroup
  },
  model: {
    prop: 'result',
    event: 'change'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 0
    },
    result: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      value: []
    };
  },
  methods: {
    onChangeValue () {
      this.$emit('change');
    }
  },
  created () {
    this.value = this.result;
  }
};
</script>
