<template>
  <div class="app-container">
    <!-- 顶部区域 -->
		<!-- 使用Mint ui 的Header组件 -->
    <mt-header fixed title="Vue项目">
			<span slot="left">
				<mt-button icon="back" @click="back" v-show="flag">返回</mt-button>
			</span>
		</mt-header>

    <!-- 中间区域 -->
		<transition>
			<router-view></router-view>
		</transition>

    <!-- 底部区域 -->
		<!-- 使用mui的tabbar代码段 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-s" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-s" to="/member">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-s" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="cart-badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-s" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">检索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	data() {
		return {
			flag: false
		}
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	},
	created() {
		this.flag = this.$route.path === '/home' ? false : true
	},
	watch: {
		'$route.path': function(newVal) {
			console.log(newVal)
			this.flag = newVal === '/home' ? false : true
		}
	}
}
</script>

<style scoped>
.app-container{
  padding-top: 40px;
  padding-bottom: 50px;
	overflow-x: hidden;
}
.mint-header {
	z-index: 99;
}

/* 主体部分动画效果 */
.v-enter {
	opacity: 0;
	/* 从右进入 */
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	/* 从左离开 */
	transform: translateX(-100%);
	/* 防止位置上下跳动 */
	position: absolute;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}

/* 修改mui mui-tab-item样式解决切换问题 */
.mui-bar-tab .mui-tab-item-s.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-s {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-s .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-s .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
