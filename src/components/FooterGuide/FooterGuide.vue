<template>
  <div  class="footer_guide">
    <footer class="footer_guide border-1px">
        <span class="guide_item" :class="{on:'/home' === $route.path}" @click="goTo('/home')">  <!--样式确定了on，通过判断路由是否一致，来切换点击的样式-->
              <span class="item_icon">
                <i class="iconfont icon-waimai"></i>
              </span>
             <span>外卖</span>
        </span>
         <span class="guide_item" :class="{on:'/search' === $route.path}" @click="goTo('/search')">
              <span class="item_icon">
                <i class="iconfont icon-search"></i>
              </span>
              <span>搜索</span>
        </span>
         <span class="guide_item" :class="{on:'/order' === $route.path}" @click="goTo('/order')">
              <span class="item_icon">
                <i class="iconfont icon-dingdan"></i>
              </span>
              <span>订单</span>
        </span>
         <span class="guide_item" :class="{on:'/profile' === $route.path}" @click="goTo('/profile')">
              <span class="item_icon">
                <i class="iconfont icon-geren"></i>
              </span>
              <span>我的</span>
        </span>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'FootGuide',
  methods:{
    goTo(path){
      this.$router.replace(path);//替换链接地址
    }
  }
 
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  //引入外部的css样式
  @import  "../../common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px 
</style>
