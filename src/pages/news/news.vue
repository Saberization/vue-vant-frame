<style lang="scss" scoped>
  #container {
    background-color: #333;
  }
</style>

<template>
  <div id="container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'news',
    data() {
      return {
        msg: '新闻'
      }
    }
  }
</script>