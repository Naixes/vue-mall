<template>
  <div class="goodscomment-container">
    <!-- 评论子模块 -->
    <comment-comp :id="id"></comment-comp>
  </div>
</template>

<script>
import commentList from '../subcomponents/CommentList.vue'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {

  },
  components: {
    'comment-comp': commentList
  }
}
</script>

<style lang="scss" scoped>

</style>


