<template>
  <van-popup
    v-model="visible"
    :position="position"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :transition="transition"
    :get-container="getContainer"
    :close-on-click-overlay="closOnClickOverlay"
    :lock-scrol="lockScroll"
    :lazy-render="lazyRender"
    @input="changeValue"
    @open="onClickOpen"
    @opened="onClickOpened"
    @close="onClickClose"
    @closed="onClickClosed"
    @click-overlay="onClickOverlay"
  >
    <slot></slot>
  </van-popup>
</template>

<script>
import { Popup } from 'vant';

export default {
  name: 'Popup',
  components: {
    'van-popup': Popup
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    position: String,
    overlayClass: String,
    overlayStyle: String,
    transition: String,
    getContainer: {
      default: null
    },
    closOnClickOverlay: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    lazyRender: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    show(value) {
      this.visible = value;
    }
  },
  methods: {
    changeValue() {
      this.$emit('change', this.visible);
    },
    onClickOpen() {
      this.$emit('open');
    },
    onClickOpened() {
      this.$emit('opened');
    },
    onClickClose() {
      this.$emit('close');
    },
    onClickClosed() {
      this.$emit('closed');
    },
    onClickOverlay() {
      this.$emit('click-overlay');
    }
  },
  created() {
    this.visible = this.show;
  }
};
</script>
