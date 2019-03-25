<template>
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    :add-button-text="addButtonText"
    :disabled-list="disabledList"
    :disabled-text="disabledText"
    :switchable="switchable"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
    @edit-disabled="onEditDisabled"
    @select-disabled="onSelectDisabled"
  >
    <slot></slot>
    <slot
      name="top"
      slot="top"
    ></slot>
  </van-address-list>
</template>

<script>
import { AddressList } from 'vant'

export default {
  name: 'AddressList',
  components: {
    [AddressList.name]: AddressList
  },
  model: {
    prop: 'addrid',
    event: 'changeValue'
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    addButtonText: {
      type: String,
      default: '新增地址'
    },
    disabledList: {
      type: Array,
      default () {
        return []
      }
    },
    disabledText: String,
    switchable: {
      type: Boolean,
      default: true
    },
    addrid: String
  },
  data () {
    return {
      chosenAddressId: this.addrid
    }
  },
  watch: {
    addrid (value) {
      this.chosenAddressId = value
    },
    chosenAddressId (value) {
      this.$emit('changeValue', value)
    }
  },
  methods: {
    onAdd () {
      this.$emit('add')
    },
    onEdit (item, index) {
      this.$emit('edit', item, index)
    },
    onSelect (item, index) {
      this.$emit('select', item, index)
    },
    onEditDisabled (item, index) {
      this.$emit('edit-disabled', item, index)
    },
    onSelectDisabled (item, index) {
      this.$emit('select-disabled', item, index)
    }
  },
  created () {
    console.log(this.addrid) 
  }
}
</script>
