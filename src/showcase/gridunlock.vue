<template>
  <div class="container">
    <van-header title="Gridunlock 网格解锁" left-arrow></van-header>
    <div class="van-content">
      <grid-unlock></grid-unlock>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import gridUnlock from '@components/gridunlock'

export default {
  name: 'GridUnlock',
  components: {
    vanHeader,
    gridUnlock
  }
}
</script>

<style scoped>

</style>
