<style lang="scss" scoped>
#container {
  background-color: gray;
}
</style>

<template>
  <div id="container">
    <h1>{{ toastMsg }}</h1>
    <button @click="openToast">显示 toast</button>
    <button @click="openPage">跳转到 news.html</button>
  </div>
</template>

<script>
import Util from '@util/'

export default {
  name: 'home',
  data() {
    return {
      toastMsg: ''
    };
  },
  methods: {
    openPage() {
      Util.openPage('news.html');
    },

    openToast() {
      
    }
  },
  mounted() {
  },
};
</script>