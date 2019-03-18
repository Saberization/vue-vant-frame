<template>
  <van-panel
    :title="title"
    :desc="desc"
    :status="status"
    :icon="icon"
  >
    <slot></slot>
    <slot
      name="header"
      slot="header"
    ></slot>
    <slot
      name="footer"
      slot="footer"
    ></slot>
  </van-panel>
</template>

<script>
import { Panel } from 'vant'

export default {
  name: 'Panel',
  components: {
    [Panel.name]: Panel
  },
  props: {
    title: String,
    desc: String,
    status: String,
    icon: String
  }
}
</script>
