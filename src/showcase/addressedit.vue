<template>
  <div class="container">
    <van-header
      title="AddressEdit 地址编辑"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header'
import vanAddressEdit from '@components/addressedit'
import areaList from '@assets/lib/area-list.js'
import { Toast } from 'vant'

export default {
  name: 'AddressEdit',
  components: {
    vanHeader,
    vanAddressEdit
  },
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onSave (content) {
      Toast('save')
      console.log(content)
    },
    onDelete () {
      Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '新点软件',
          address: '沙洲湖科创园'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>
