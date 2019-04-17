<template>
  <div class="container">
    <van-header
      title="PasswordInput 密码输入框"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
      />

      <h4 class="cell-title">明文展示</h4>
      <van-password-input
        :value="value"
        :mask="false"
        @focus="showKeyboard = true"
      />
    </div>

    <van-number-keyboard
      :show="showKeyboard"
      @blur="showKeyboard = false"
      @input="onInput"
      @delete="onDelete"
    ></van-number-keyboard>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanPasswordInput from '@components/passwordinput';
import vanNumberKeyboard from '@components/numberkeyboard';

export default {
  name: 'PasswordInput',
  components: {
    vanHeader,
    vanPasswordInput,
    vanNumberKeyboard
  },
  data () {
    return {
      value: '',
      showKeyboard: false
    };
  },
  methods: {
    onInput (keyValue) {
      this.value = (this.value + keyValue).slice(0, 6);
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>
