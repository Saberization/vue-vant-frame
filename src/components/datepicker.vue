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
    :lazy-rende="lazyRender"
    @change="changePopupValue"
  >
    <van-datetime-picker
      v-model="date"
      :type="type"
      :min-date="minDate"
      :max-date="maxDate"
      :min-hour="minHour"
      :max-hour="maxHour"
      :min-minute="minMinute"
      :max-minute="maxMinute"
      :formatter="formatter"
      :title="title"
      :show-toolbar="showToolbar"
      :loading="loading"
      :item-height="itemHeight"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      :visible-item-count="visibleItemCount"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    ></van-datetime-picker>
  </van-popup>
</template>

<script>
import { DatetimePicker } from 'vant';
import vanPopup from './popup';

export default {
  name: 'DatetimePicker',
  components: {
    [DatetimePicker.name]: DatetimePicker,
    vanPopup
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
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default() {
        const today = new Date();
        const year = today.getFullYear();

        return new Date(`${year - 10}-01-01`);
      }
    },
    maxDate: {
      type: Date,
      default() {
        const today = new Date();
        const year = today.getFullYear();

        return new Date(`${year + 10}-01-01`);
      }
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    },
    minMinute: {
      type: Number,
      default: 0
    },
    maxMinute: {
      type: Number,
      default: 59
    },
    formatter: null,
    title: String,
    showToolbar: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    currentDate: {
      default() {
        return this.type === 'time' ? '00:00' : new Date();
      }
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
    }
  },
  watch: {
    show(value) {
      this.showPopup = value;
    }
  },
  data() {
    return {
      showPopup: false,
      date: null
    };
  },
  methods: {
    changePopupValue() {
      this.$emit('change', this.showPopup);
    },
    onConfirm(value) {
      const { appendZero } = this;
      const { type } = this;

      this.showPopup = false;
      if (type === 'datetime') {
        this.$emit('confirm', `${appendZero(value.getFullYear())}-${appendZero(value.getMonth() + 1)}-${appendZero(value.getDate())} ${appendZero(value.getHours())}:${appendZero(value.getMinutes())}`);
      } else if (type === 'date') {
        this.$emit('confirm', `${appendZero(value.getFullYear())}-${appendZero(value.getMonth() + 1)}-${appendZero(value.getDate())}`);
      } else if (type === 'year-month') {
        this.$emit('confirm', `${appendZero(value.getFullYear())}-${appendZero(value.getMonth() + 1)}`);
      } else if (type === 'time') {
        this.$emit('confirm', value);
      }
    },
    onCancel() {
      this.showPopup = false;
      this.$emit('cancel');
    },
    onChange(picker) {
      this.$emit('changepicker', picker);
    },
    appendZero(value) {
      return value < 10 ? `0${value}` : value;
    }
  },
  created() {
    this.showPopup = this.show;
    this.date = this.currentDate;
  }
};
</script>
