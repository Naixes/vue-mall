<template>
  <div class="mui-numbox" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" data-numbox-min='1' ref="number" @change="countChanged" />
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
  props: ['initcount', 'id'],
  methods: {
    countChanged() {
      this.$store.commit('updateCart', { id: this.id, count: this.$refs.number.value })
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>

</style>


