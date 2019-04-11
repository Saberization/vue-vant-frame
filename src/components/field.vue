<template>
  <van-field
    v-model="currentValue"
    :label="label"
    :type="type"
    :value="value"
    :border="border"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :required="required"
    :is-link="isLink"
    :error="error"
    :error-message="errorMessage"
    :lbael-align="labelAlign"
    :input-align="inputAlign"
    :autosize="autosize"
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :autofocus="autofocus"
    :rows="rows"
    :cols="cols"
    @input="onInput"
    @clear="onClear"
    @click-left-icon="onClickLeftIcon"
    @click-right-icon="onClickRightIcon"
    ref="field"
  >
    <slot
      name="label"
      slot="label"
    ></slot>
    <slot
      name="left-icon"
      slot="left-icon"
    ></slot>
    <slot
      name="right-icon"
      slot="right-icon"
    ></slot>
    <slot
      name="button"
      slot="button"
    ></slot>
  </van-field>
</template>

<script>
import { Field } from 'vant';

export default {
  name: 'Field',
  components: {
    [Field.name]: Field
  },
  model: {
    prop: 'fieldValue',
    event: 'changeFieldValue'
  },
  props: {
    label: String,
    value: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    border: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    autosize: {
      type: [Boolean, Object],
      default() {
        return false;
      }
    },
    placeholder: String,
    leftIcon: String,
    rightIcon: String,
    maxlength: Number,
    autofocus: Boolean,
    fieldValue: {
      type: String,
      default: ''
    },
    rows: [Number, String],
    cols: [Number, String]
  },
  data() {
    return {
      currentValue: null
    };
  },
  methods: {
    onInput() {
      this.$emit('changeFieldValue', this.currentValue);
      this.$emit('input');
    },
    onClear() {
      this.$emit('changeFieldValue', '');
      this.$emit('clear');
    },
    onClickLeftIcon() {
      this.$emit('click-left-icon');
    },
    onClickRightIcon() {
      this.$emit('click-right-icon');
    },
    focus() {
      this.$refs.field.focus();
    },
    blur() {
      this.$refs.field.blur();
    }
  },
  created() {
    this.currentValue = this.fieldValue;
  }
};
</script>
