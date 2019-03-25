<template>
  <van-address-edit
    :area-list="areaList"
    :address-info="addressInfo"
    :search-result="searchResult"
    :show-postal="showPostal"
    :show-delete="showDelete"
    :show-set-default="showSetDefault"
    :show-search-result="showSearchResult"
    :save-button-text="saveButtonText"
    :delete-button-text="deleteButtonText"
    :is-saving="isSaving"
    :is-deleting="isDeleting"
    :tel-validator="telValidator"
    :validator="validator"
    ref="addredit"
    @save="onSave"
    @focus="onFocus"
    @delete="onDelete"
    @cancel-delete="onCancelDelete"
    @select-search="onSelectSearch"
    @change-area="onChangeArea"
    @change-detail="onChangeDetail"
    @change-default="onChangeDefault"
  >
    <slot></slot>
  </van-address-edit>
</template>

<script>
import { AddressEdit } from 'vant'

export default {
  name: 'AddressEdit',
  components: {
    [AddressEdit.name]: AddressEdit
  },
  props: {
    areaList: Object,
    addressInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    searchResult: {
      type: Array,
      default () {
        return []
      }
    },
    showPostal: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: false
    },
    showSetDefault: {
      type: Boolean,
      default: false
    },
    showSearchResult: {
      type: Boolean,
      default: false
    },
    saveButtonText: {
      type: String,
      default: '保存'
    },
    deleteButtonText: {
      type: String,
      default: '删除'
    },
    isSaving: {
      type: Boolean,
      default: false
    },
    isDeleting: {
      type: Boolean,
      default: false
    },
    telValidator: String,
    validator: [Function, String]
  },
  methods: {
    setAddressDetail (value) {
      this.$refs.addredit.setAddressDetail(value)
    },
    onSave (content) {
      this.$emit('save', content)
    },
    onFocus (key) {
      this.$emit('focus', key)
    },
    onDelete (content) {
      this.$emit('delete', content)
    },
    onCancelDelete (content) {
      this.$emit('cancel-delete', content)
    },
    onSelectSearch (value) {
      this.$emit('select-search', value)
    },
    onChangeDetail (value) {
      this.$emit('change-detail', value)
    },
    onChangeDefault (value) {
      this.$emit('change-default', value)
    },
    onChangeArea (values) {
      this.$emit('change-area', values)
    }
  }
}
</script>
