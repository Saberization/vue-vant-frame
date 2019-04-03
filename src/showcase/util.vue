<template>
  <div class="container"></div>
</template>

<script>
import sha1 from '@utils/sha1'
import sha256 from '@utils/sha256'

export default {
  name: 'Util',
  created () {
    console.log(sha1.hex('123123'))
    console.log(sha256.hex('123123'))
  }
}
</script>
