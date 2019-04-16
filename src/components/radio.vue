<template>
  <van-radio
    v-model="isChecked"
    :name="name"
    :shape="shape"
    :disabled="disabled"
    :label-disabled="labelDisabled"
    :label-position="labelPosition"
    :checked-color="checkedColor"
  >
    <slot></slot>
    <slot
      name="icon"
      slot="icon"
      slot-scope="props"
      :checked="props.checked"
    ></slot>
  </van-radio>
</template>

<script>
import { Radio } from 'vant';

export default {
  name: 'Radio',
  components: {
    [Radio.name]: Radio
  },
  model: {
    prop: 'checked',
    event: 'changeChecked'
  },
  props: {
    name: [Number, String, Boolean],
    shape: {
      type: String,
      default: 'round'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelDisabled: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    checkedColor: {
      type: String,
      default: '#1989fa'
    },
    checked: Boolean
  },
  data () {
    return {
      isChecked: this.checked
    }
  },
  watch: {
    checked (value) {
      this.isChecked = value;
    },
    isChecked (value) {
      this.$emit('changeChecked', value);
    }
  }
};
</script>
