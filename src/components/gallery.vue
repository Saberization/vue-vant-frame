<template>
  <van-swipe
    :autoplay="autoplay"
    :duration="duration"
    :initial-swipe="initialSwipe"
    :loop="loop"
    :lazyload="lazyload"
    :show-indicators="showIndicators"
    :indicator-color="indicatorColor"
    :vertical="vertical"
    :touchable="touchable"
    :width="width"
    :height="height"
    @change="onChange"
    ref="swipe"
  >
    <van-swipe-item v-for="(value, index) in data" :key="index" :guid="value.guid" @click="onClick">
      <img v-if="value.pic && value.pic.length >= 1 && !lazyload" :src="value.pic" alt="" class="van-swipe-item__img">
      <img v-else-if="value.pic && value.pic.length && lazyload" v-lazy="`${value.pic}`" alt="" class="van-swipe-item__img">
      <span v-else>{{ value }}</span>

      <div class="slider-title" v-if="value.title">{{ value.title }}</div>
    </van-swipe-item>
    <slot name="indicator" slot="indicator"></slot>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  name: 'Gallery',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    autoplay: Number,
    lazyload: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 500
    },
    initialSwipe: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: String,
      default: '#1989fa'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    touchable: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  methods: {
    onChange (index) {
      this.$emit('change', index);
    },
    onClick () {
      this.$emit('click', event.target.parentElement.getAttribute('guid'));
    },
    swipeTo (index) {
      this.$refs.swipe.swipeTo(index);
    }
  }
};
</script>

<style scoped>
  .van-swipe-item__img {
    width: 100%;
    height: 100%;
  }

  .slider-title {
    line-height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    margin: 0;
    text-align: left;
    text-indent: 12px;
    opacity: .8;
    background-color: #000;
    color: #fff;
  }
</style>
