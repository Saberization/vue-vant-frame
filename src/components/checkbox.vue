<template>
  <van-checkbox
    v-model="active"
    :name="name"
    :shape="shape"
    :disabled="disabled"
    :label-disabled="labelDisabled"
    :label-position="labelPosition"
    :checked-color="checkedColor"
    @change="onChangeValue"
    ref="checkbox"
  >
    <slot></slot>
    <slot
      name="icon"
      slot="icon"
      slot-scope="props"
      :checked="props.checked"
    ></slot>
  </van-checkbox>
</template>

<script>
import { Checkbox } from 'vant';

export default {
  name: 'Checkbox',
  components: {
    [Checkbox.name]: Checkbox
  },
  model: {
    prop: 'activekey',
    event: 'change'
  },
  props: {
    name: {
      default: null
    },
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
    activekey: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false
    };
  },
  methods: {
    onChangeValue () {
      this.$emit('change', this.active);
    },
    toggle () {
      this.$refs.checkbox.toggle();
    }
  },
  created () {
    this.active = this.activekey;
  }
};
</script>
