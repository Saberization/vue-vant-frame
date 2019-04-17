<template>
  <div class="container">
    <van-header
      title="Field 输入框"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-field
        placeholder="请输入用户名"
        v-model="value"
        @input="onInput"
      ></van-field>

      <h4 class="cell-title">自定义类型</h4>
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="onClickRightIcon('question')"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>

      <h4 class="cell-title">禁用输入框</h4>
      <van-cell-group>
        <van-field
          v-model="disabledValue"
          label="用户名"
          left-icon="contact"
          disabled
        />
      </van-cell-group>

      <h4 class="cell-title">错误提示</h4>
      <van-cell-group>
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          error
        />
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号格式错误"
        />
      </van-cell-group>

      <h4 class="cell-title">高度自适应</h4>
      <van-cell-group>
        <van-field
          v-model="message"
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
        />
      </van-cell-group>

      <h4 class="cell-title">插入按钮</h4>
      <van-cell-group>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
          >发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import vanField from '@components/field';
import vanCellGroup from '@components/cellgroup';
import vanButton from '@components/button';
import { Toast } from 'vant';

export default {
  name: 'Field',
  components: {
    vanHeader,
    vanField,
    vanCellGroup,
    vanButton
  },
  data () {
    return {
      value: '',
      username: '',
      password: '',
      disabledValue: '输入框已禁用',
      phone: '1234567',
      message: '',
      sms: ''
    };
  },
  methods: {
    onInput () {
      console.log(this.value);
    },
    onClickRightIcon (text) {
      Toast(text);
    }
  }
};
</script>

<style scoped>
/deep/ .van-icon {
  color: #1989fa;
}
</style>
