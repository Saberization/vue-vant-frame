<template>
  <van-cell
    :icon="icon"
    :title="title"
    :value="value"
    :label="label"
    :size="size"
    :url="url"
    :to="to"
    :border="border"
    :replace="replace"
    :clickable="clickable"
    :is-link="isLink"
    :required="required"
    :center="center"
    :arrow-direction="arrowDirection"
    :title-class="titleClass"
    :value-class="valueClass"
    :label-class="labelClass"
  >
    <slot
      name="title"
      slot="title"
    ></slot>
    <slot></slot>
    <slot
      name="icon"
      slot="icon"
    ></slot>
    <slot
      name="right-icon"
      slot="right-icon"
    ></slot>
  </van-cell>
</template>

<script>
import { Cell, CellGroup } from 'vant'

export default {
  name: 'Cell',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup
  },
  props: {
    icon: String,
    title: {
      default: ''
    },
    value: {
      default: ''
    },
    label: String,
    size: String,
    url: String,
    to: {
      default: null
    },
    border: {
      type: Boolean,
      default: true
    },
    replace: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    arrowDirection: String,
    titleClass: {
      default: ''
    },
    valueClass: {
      default: ''
    },
    labelClass: {
      default: ''
    }
  }
}
</script>