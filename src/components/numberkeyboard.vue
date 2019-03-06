<template>
  <van-number-keyboard
    :show="show"
    :theme="theme"
    :title="title"
    :transition="transition"
    :z-index="zIndex"
    :extra-key="extraKey"
    :close-button-text="closeButtonText"
    :delete-button-text="deleteButtonText"
    :show-delete-key="showDeleteKey"
    :hide-on-click-outside="hideOnClickOutside"
    @input="onInput"
    @delete="onDelete"
    @close="onClose"
    @blur="onBlur"
    @show="onShow"
    @hide="onHide"
  ></van-number-keyboard>
</template>

<script>
import { NumberKeyboard } from 'vant'

export default {
  name: 'NumberKeyboard',
  components: {
    [NumberKeyboard.name]: NumberKeyboard
  },
  props: {
    show: Boolean,
    theme: {
      type: String,
      default: 'default'
    },
    title: String,
    transition: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 100
    },
    extraKey: {
      type: String,
      default: ''
    },
    closeButtonText: {
      type: String,
      default: '完成'
    },
    deleteButtonText: {
      type: String,
      default: '删除'
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    },
    onDelete () {
      this.$emit('delete')
    },
    onClose () {
      this.$emit('close')
    },
    onBlur () {
      this.$emit('blur')
    },
    onShow () {
      this.$emit('show')
    },
    onHide () {
      this.$emit('hide')
    }
  }
}
</script>
