<template>
  <van-popup
    v-model="showPopup"
    position="bottom"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :transition="transition"
    :close-on-click-overlay="closeOnClickOverlay"
    :lock-scroll="lockScroll"
    :lazy-render="lazyRender"
    @change="onChangeVisible"
  >
    <van-picker
      :columns="pickerData"
      :show-toolbar="showToolbar"
      :title="title"
      :loading="loading"
      :value-key="valueKey"
      :item-height="itemHeight"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      :visible-item-count="visibleItemCount"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      ref="picker"
    >
      <slot
        name="title"
        slot="title"
      ></slot>
    </van-picker>
  </van-popup>
</template>

<script>
import { Picker } from 'vant'
import vanPopup from './popup'

export default {
  name: 'Picker',
  components: {
    [Picker.name]: Picker,
    vanPopup
  },
  model: {
    prop: 'show',
    event: 'changeVisible'
  },
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    overlayClass: String,
    overlayStyle: Object,
    transition: String,
    closeOnClickOverlay: {
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
    showToolbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'text'
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      showPopup: null,
      pickerData: []
    }
  },
  watch: {
    show (value) {
      this.showPopup = value
    },
    data (value) {
      this.pickerData = value
    }
  },
  methods: {
    onChangeVisible () {
      this.$emit('changeVisible', this.showPopup)
    },
    onConfirm (value, index) {
      console.log(value, index);
      this.showPopup = false
      this.$emit('confirm', value)
      this.onChangeVisible()
    },
    onCancel () {
      this.showPopup = false
      this.onChangeVisible()
    },
    onChange (picker, values) {

    }
  },
  created () {
    this.showPopup = this.show
    const data = this.data
    let columns1Values = []
    let columns2Values = []
    let columns3Values = []

    if (Array.isArray(data)) {
      Array.from(data).forEach((e, i) => {
        const children = e.children
        if (children && children.length >= 1) {
          columns1Values.push(e)
          columns2Values = children
        }
        else {
          this.pickerData.push(e)
        }
      })

      // 两列
      if (columns2Values.length >= 1) {
        this.pickerData = [{
          values: columns1Values,
          className: 'column1'
        }, {
          values: columns2Values,
          className: 'column2'
        }]
      }
      // 三列
      else if (columns3Values.length >= 1) {
        
      }
    }
  }
}
</script>
