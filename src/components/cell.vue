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
    :title-style="titleStyle"
    @click="onClick"
  >
    <slot name="title" slot="title"></slot>
    <slot name="label" slot="label"></slot>
    <slot name="icon" slot="icon"></slot>
    <slot name="right-icon" slot="right-icon"></slot>
    <slot></slot>
  </van-cell>
</template>

<script>
import { Cell } from 'vant';

export default {
  name: 'Cell',
  components: {
    'van-cell': Cell
  },
  props: {
    icon: String,
    title: {
      default: null
    },
    value: {
      default: null
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
      default: true
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
      default: null
    },
    valueClass: {
      default: null
    },
    labelClass: {
      default: null
    },
    titleStyle: {
      default: null
    }
  },
  methods: {
    onClick () {
      this.$emit('click');
    }
  }
};
</script>
