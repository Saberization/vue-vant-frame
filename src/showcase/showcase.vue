<template>
  <router-view></router-view>
</template>

<script>
import Util from '@utils';
import stringTools from '@utils/string';

export default {
  name: 'ShowCase',
  created() {
    console.log(Util);
    console.log(stringTools);
  }
};
</script>
