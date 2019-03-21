<template>
  <div class="comment-container">
    <!-- 标题区域 -->
    <h3>发表评论</h3>

    <hr>

    <!-- 评论发表区域 -->
    <textarea placeholder="请输入内容（最多120字）" v-model="msg"></textarea>

    <mt-button type='primary' size='large' @click="postComment">发表</mt-button>

    <!-- 评论列表 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-content">
          {{ item.content ==='undefined' ? '' : item.content }}
        </div>
      </div>
    </div>

    <!-- 底部区域 -->
    <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      // 设置默认页码
      pageindex: 1,
      comments: [],
      msg: ''
    }
  },
  props:["id"],
  created() {
    this.getCommentList()
  },
  methods: {
    getCommentList() {
      this.$http.get('http://route.showapi.com/1287-1/'+this.id+'?pageindex='+this.pageindex+'').then(result => {
        if (result.body.status === 0) {
          // this.comments = result.body.message
          // 拼接下一页的数据
          this.comments = this.comments.concat(result.body.message)
        }else {
          const i = this.pageindex
          const list = [
            { user_name: "哈哈哈1", add_time: '2018-10-06T09:00:00.01'+i+'Z', content: '哈哈哈1' + i },
            { user_name: "哈哈哈1", add_time: '2018-10-06T09:00:00.02'+i+'Z', content: '哈哈哈2' + i },
            { user_name: "哈哈哈1", add_time: '2018-10-06T09:00:00.03'+i+'Z', content: '哈哈哈3' + i },
            { user_name: "哈哈哈1", add_time: '2018-10-06T09:00:00.04'+i+'Z', content: '哈哈哈4' + i }
          ]
          this.comments = this.comments.concat(list)
          // Toast('获取评论失败')
        }
      })
    },
    getMore() {
      this.pageindex++
      this.getCommentList()
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast('请输入评论内容')
      }
      this.$http.post('http://route.showapi.com/1287-1/'+this.$route.id, {
        content: this.msg.trim()
      }).then(result => {
        if (result.body.status ===0) {
          const comment = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.comments.unshift(comment)
          this.msg = ''
        }else {
          // Toast('发表评论失败')
          const comment = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.comments.unshift(comment)
          this.msg = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    font-size: 13px;
    .cmt-title {
      background-color: #ccc;
      line-height: 30px;
    }
    .cmt-content {
      line-height: 30px;
      // 缩进
      text-indent: 2em;
    }
  }
}
</style>


