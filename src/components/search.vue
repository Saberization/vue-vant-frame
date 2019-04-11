<template>
  <van-search
    v-model="searchValue"
    :label="label"
    :shape="shape"
    :background="background"
    :show-action="showAction"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :input-align="inputAlign"
    :placeholder="placeholder"
    @input="onInput"
    @search="onSearch"
    @cancel="onCancel"
    @clear="onClear"
  >
    <slot
      slot="action"
      name="action"
    ></slot>
    <slot
      slot="left-icon"
      name="left-icon"
    ></slot>
    <slot
      slot="label"
      name="label"
    ></slot>
  </van-search>
</template>

<script>
import { Search } from 'vant';

export default {
  name: 'Search',
  components: {
    [Search.name]: Search
  },
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    label: String,
    shape: {
      type: String,
      default: 'square'
    },
    background: {
      type: String,
      default: '#f2f2f2'
    },
    showAction: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: String
  },
  data() {
    return {
      searchValue: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('changeValue', this.searchValue);
      this.$emit('search');
    },
    onClear() {
      this.$emit('changeValue', '');
      this.$emit('clear');
    },
    onCancel() {
      this.$emit('cancel');
    },
    onInput() {
      this.$emit('changeValue', this.searchValue);
    }
  },
  created() {
    this.searchValue = this.value;
  }
};
</script>
