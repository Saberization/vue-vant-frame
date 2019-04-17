<template>
  <van-radio-group
    v-model="curRadio"
    :disabled="disabled"
    @change="onChange"
  >
    <slot></slot>
  </van-radio-group>
</template>

<script>
import { RadioGroup } from 'vant';

export default {
  name: 'RadioGroup',
  components: {
    [RadioGroup.name]: RadioGroup
  },
  model: {
    prop: 'radio',
    event: 'changeRadio'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    radio: [String, Number, Boolean]
  },
  data () {
    return {
      curRadio: this.radio
    };
  },
  watch: {
    radio (value) {
      this.curRadio = value;
    },
    curRadio (value) {
      this.$emit('changeRadio', value);
    }
  },
  methods: {
    onChange (name) {
      this.$emit('change', name);
    }
  }
};
</script>
