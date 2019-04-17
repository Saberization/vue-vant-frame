<template>
  <van-header
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="leftArrow"
    :fixed="fixed"
    :border="border"
    :z-index="zIndex"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <slot
      name="title"
      slot="title"
    ></slot>
    <slot
      name="left"
      slot="left"
    ></slot>
    <slot
      name="right"
      slot="right"
    ></slot>
  </van-header>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'Header',
  components: {
    'van-header': NavBar
  },
  props: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back();
      this.$emit('click-left');
    },
    onClickRight () {
      this.$emit('click-right');
    }
  }
};
</script>
