<template>
    <div>
        <ShopHeader/>
       <div class="tab">
            <div class="tab-item">
                <router-link to="/shop/goods" replace="">点餐</router-link>  <!--使用replace，点返回就直接返回上一页，而不是返回上一个路由-->
            </div>
             <div class="tab-item">
                <router-link to="/shop/ratings" replace="">评价</router-link>
            </div>
             <div class="tab-item">
                <router-link to="/shop/info" replace="">商家</router-link>
            </div>
       </div>
       <keep-alive>  <!--防止重复渲染-->
            <router-view/>
       </keep-alive>
    </div>
      
</template>
<script>
import  ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
export default {
    components:{
        ShopHeader
    },
    mounted(){
        this.$store.dispatch('getShopInfo')//测试mock模拟数据
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position relative
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
