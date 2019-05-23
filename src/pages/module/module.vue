<template>
  <div class="container">
    <h1>Module Page</h1>
    <div class="van-content">
      <van-button @click="openPage">跳转至 Module2</van-button>
    </div>
  </div>
</template>

<script>
import vanButton from '@components/button';

export default {
  name: 'ModuleName',
  components: {
    vanButton
  },
  methods: {
    openPage () {
      ejs.page.open('./module2');
    }
  }
};
</script>

<style lang="scss">
  
</style>
