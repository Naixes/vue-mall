<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ info.title }}</h3>
    <!-- 子标题 -->
    <p class="description">
      <span>发表时间：{{ info.add_time | dateFormat }}</span>
      <span>点击：{{ info.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="info.content"></div>

    <!-- 评论子模块 -->
    <comment-comp :id="id"></comment-comp>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

import commentList from '../subcomponents/CommentList.vue'

export default {
  data() {
    return {
      // $route.params获取参数id
      id: this.$route.params.id,
      info: {}
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo() {
      this.$http.get('http://route.showapi.com/1287-1/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0]
        }else {
          this.info = {
             id: '01', title: '总书记始终关心“闽宁协作”', add_time: '2018-10-06T09:00:00.000Z', click: 20, 
             content: '<div class="show_text"><p style="text-indent: 2em;">贺兰山东麓的宁夏回族自治区永宁县闽宁镇，红瓦白墙，绿树成荫，农家小楼鳞次栉比，田间地头笑语欢声。</p><p><span id="paper_num" style="text-indent: 2em; display: block;">《 人民日报 》（ 2018年10月06日 01 版）</span></p></div>' 
          }
          // Toast('获取新闻详情失败')
        }
      })
    }
  },
  components: {
    'comment-comp': commentList
  }
}
</script>

<style lang="scss" >
// 取消scoped可以解决图片过大时，width不起作用
.newsinfo-container {
  padding: 0 6px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }
  .description {
    font-size: 14px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%
    }
  }
}
</style>


