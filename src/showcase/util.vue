<template>
  <div class="container"></div>
</template>

<script>
import Math from '@utils/math'

export default {
  name: 'Util',
  created () {
    console.log(Math.add(0.1, 0.2))
  }
}
</script>
