<template>
  <div class="container"></div>
</template>

<script>
import sha1 from '@utils/sha1'

export default {
  name: 'Util',
  created () {
    console.log(sha1.hex('123123'))
  }
}
</script>
