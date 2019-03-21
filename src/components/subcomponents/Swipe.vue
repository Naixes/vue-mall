<template>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeList" :key='item.url'>
        <!-- 注意加上数据绑定： -->
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props:["swipeList", "isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  text-align: center;
  height: 200px;
  .mint-swipe-items-wrap {
    // &交集选择
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: cyan;
    // }
    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>

