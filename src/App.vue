<template>
  <div id="app">
    <router-view />
    <FooterGuide  v-show="$route.meta.showFooter"/> <!--v-show用于显示或者隐藏底部栏，$route指的是当前路由-->
     
  </div>
</template>

<script>

import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqLogout} from './api'
import {mapActions} from 'vuex' //使用action的辅助函数
export default {
  name: 'App',
  components:{
    FooterGuide
  },
  async mounted () {
    const result = await  reqLogout()  //测试用，异步显示数据
    console.log(result)
  },
  methods:{
      ...mapActions(['getAddress','getUserInfo']) ///辅助函数需要在methods中使用
  },
  created(){
    this.getAddress();//使用辅助函数后直接可以使用方法
    //this.$store.dispatch('getAddress')
    this.getUserInfo();
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width  100%
    height 100%
    background #f1f1f1
</style>
