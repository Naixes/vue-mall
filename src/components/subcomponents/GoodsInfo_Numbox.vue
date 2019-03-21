<template>
  <div class="mui-numbox">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" data-numbox-min='1' ref="number" @change="countChanged" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  // 初始化
  mounted() {
    mui('.mui-numbox').numbox()
  },
  data() {
    return {}
  },
  props: ['max'],
  methods: {
    countChanged() {
      this.$emit('getCount', parseInt(this.$refs.number.value))
    }
  },
  watch: {
    max: function(newVal, oldVal) {
      // 监听max将父组件传来的库存值设为最大值
      mui('.mui-numbox').numbox().setOption('max', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


