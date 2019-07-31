<template>
  <van-card
    :thumb="thumb"
    :title="title"
    :desc="desc"
    :tag="tag"
    :num="num"
    :price="price"
    :origin-price="originPrice"
    :centered="centered"
    :currency="currency"
    :thumb-link="thumbLink"
    :lazy-load="lazyLoad"
    @click="onClick"
  >
    <slot name="title" slot="title"></slot>
    <slot name="desc" slot="desc"></slot>
    <slot name="num" slot="num"></slot>
    <slot name="price" slot="price"></slot>
    <slot name="origin-price" slot="origin-price"></slot>
    <slot name="thumb" slot="thumb"></slot>
    <slot name="tag" slot="tag"></slot>
    <slot name="tags" slot="tags"></slot>
    <slot name="footer" slot="footer"></slot>
    <slot name="bottom" slot="bottom"></slot>
  </van-card>
</template>

<script>
import { Card } from 'vant';

export default {
  name: 'Card',
  components: {
    [Card.name]: Card
  },
  props: {
    thumb: String,
    title: String,
    desc: String,
    tag: String,
    num: [String, Number],
    price: [String, Number],
    originPrice: [String, Number],
    centered: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: '¥'
    },
    thumbLink: String,
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      this.$emit('click');
    }
  }
};
</script>
