<template>
  <van-stepper
    v-model="stepperValue"
    :min="min"
    :max="max"
    :step="step"
    :integer="integer"
    :disabled="disabled"
    :disable-input="disableInput"
    :async-change="asyncChange"
    @change="onChange"
    @overlimit="onOverlimit"
    @plus="onPlus"
    @minus="onMinus"
    @focus="onFoucs"
    @blur="onBlur"
  ></van-stepper>
</template>

<script>
import { Stepper } from 'vant'

export default {
  name: 'Stepper',
  components: {
    [Stepper.name]: Stepper
  },
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    min: {
      type: [String, Number],
      default: 1
    },
    max: [String, Number],
    step: {
      type: [String, Number],
      default: 1
    },
    integer: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disableInput: {
      type: Boolean,
      default: false
    },
    asyncChange: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: 1
    }
  },
  data () {
    return {
      stepperValue: 1
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
      this.$emit('changeValue', value)
    },
    onOverlimit () {
      this.$emit('overlimit')
    },
    onPlus () {
      this.$emit('plus')
    },
    onMinus () {
      this.$emit('minus')
    },
    onFoucs () {
      this.$emit('focus')
    },
    onBlur () {
      this.$emit('blur')
    }
  },
  created() {
    this.stepperValue = this.value 
  }
}
</script>
