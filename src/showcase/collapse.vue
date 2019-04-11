<template>
  <div class="container">
    <van-header
      title="Collapse 折叠面板"
      left-arrow
    ></van-header>
    <div class="van-content">
      <h4 class="cell-title">基础用法</h4>
      <van-collapse v-model="activeNames">
        <van-collapse-item
          title="Collapse 1"
          name="1"
        >
          Collapse 1 content
        </van-collapse-item>
        <van-collapse-item
          title="Collapse 2"
          name="2"
        >
          Collapse 2 content
        </van-collapse-item>
        <van-collapse-item
          title="Collapse 3 disabled"
          name="3"
          disabled
        >
          Collapse 3 content，disibled
        </van-collapse-item>
      </van-collapse>

      <h4 class="cell-title">手风琴</h4>
      <van-collapse
        v-model="activeName"
        accordion
      >
        <van-collapse-item
          title="手风琴一"
          name="1"
        >
          手风琴一的内容，只能同时打开一个
        </van-collapse-item>
        <van-collapse-item
          title="手风琴二"
          name="2"
        >
          手风琴二的内容，只能同时打开一个
        </van-collapse-item>
        <van-collapse-item
          title="手风琴三"
          name="3"
        >
          手风琴三的内容，只能同时打开一个
        </van-collapse-item>
      </van-collapse>

      <h4 class="cell-title">自定义标题内容</h4>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title">自定义标题内容一
            <van-icon name="question-o" />
          </div>
          自定义标题内容一的内容
        </van-collapse-item>
        <van-collapse-item
          title="自定义标题内容二"
          name="2"
          icon="shop-o"
        >
          自定义标题内容二的内容
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import vanHeader from '@components/header';
import { Collapse, CollapseItem } from 'vant';
import vanIcon from '@components/icon';

export default {
  name: 'Collapse',
  components: {
    vanHeader,
    vanIcon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data() {
    return {
      activeNames: ['1'],
      activeName: '1'
    };
  }
};
</script>
