<template>
  <van-progress
    :inactive="inactive"
    :percentage="percentage"
    :showPivot="showPivot"
    :color="color"
    :textColor="textColor"
    :pivotText="pivotText"
    :pivotColor="pivotColor"
  />
</template>

<script>
import { Progress } from 'vant';

export default {
  name: 'Progress',
  components: {
    [Progress.name]: Progress
  },
  props: {
    inactive: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      default: 0
    },
    showPivot: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#1989fa'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    pivotText: String,
    pivotColor: String
  }
};
</script>
