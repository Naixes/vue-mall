<template>
  <!-- 使用mui的media list代码段 -->
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
      <router-link :to="'/home/newsinfo/'+item.id">
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          <h1>{{ item.title }}</h1>
          <p class='mui-ellipsis'>
            <span>发表时间：{{ item.add_time | dateFormat }}</span>
            <span>点击：{{ item.click }}次</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>

</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      // 设置了默认api地址后，不需要/
      this.$http.get('http://route.showapi.com/1287-1').then(result => {
        if ( result.body.status === 0 ) {
          this.newsList = result.body.message
        }else {
          this.newsList = [
            { id: '01', title: '总书记始终关心“闽宁协作”', add_time: '2018-10-06T09:00:00.000Z', click: '两百万', img_url: 'http://hiphotos.baidu.com/news/crop%3D93%2C0%2C743%2C499%3Bq%3D80%3B/sign=ded0a8ac59e736d14c5cd648a6697cee/0b46f21fbe096b6390fab82001338744eaf8acdb.jpg' }
          ]
          // Toast('获取新闻列表失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      // css3左右对齐
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

