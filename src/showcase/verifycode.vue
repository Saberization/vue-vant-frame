<template>
  <div class="container">
    <van-header title="verifycode 验证码" left-arrow></van-header>
    <div class="van-content">
      <div class="cell-title">基础用法</div>
      <van-cell-group>
        <van-field placeholder="请输入验证码" v-model="value"></van-field>
      </van-cell-group>
      <verify-code :width="160" style="margin: 10px;" ref="verifycode"></verify-code>
      <div style="margin-left: 10px;">
        <van-button class="mr10" type="primary" plain @click="checkVerifyCode">校验验证码</van-button>
        <van-button type="danger" plain @click="updateVerify">更新验证码</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import verifyCode from '@components/verifycode';
import vanButton from '@components/button';
import vanField from '@components/field';
import vanCellGroup from '@components/cellgroup';
import { Toast } from 'vant';

export default {
  name: 'VerifyCode',
  components: {
    verifyCode,
    vanHeader,
    vanButton,
    vanField,
    vanCellGroup
  },
  data () {
    return {
      value: ''
    };
  },
  methods: {
    updateVerify () {
      this.$refs.verifycode.update();
    },
    checkVerifyCode () {
      Toast(`验证结果：${this.$refs.verifycode.validate(this.value)}`);
    }
  }
};
</script>

<style scoped>
  .verify-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    margin-top: 10px;
  }

  .mr10 {
    margin-right: 10px;
  }
</style>
