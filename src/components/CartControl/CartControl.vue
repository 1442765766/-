<template>
    <div class="cartcontrol">
        <transition name="moves">
            <div  class="iconfont icon-remove_circle_outline"  v-if="food.count"   @click.stop="updateFoodCount(false)"></div>    
        </transition>
        <div  class="cart-count" v-if="food.count">{{food.count}}</div>
        <div  class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
    </div>    
</template>
<script>
export default {
    props:{
        food:Object
    },
    methods:{
       //更新food的count
       updateFoodCount(isADD){
           //通知actions更新
           this.$store.dispatch('updateFoodCount',{food:this.food,isADD})
       } 
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.cartcontrol
    font-size 0
    .iconfonts
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)    
    .icon-remove_circle_outline
        display: inline-block
        padding 6px
        line-height 24px
        font-size 20px
        color $green
        &.moves-enter-active, &.moves-leave-active
            transition all .1s
        &.moves-enter, &.moves-leave-to
            opacity  0
            transform translateX(15px) rotate(180deg)
    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159) 
    .icon-add_circle
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 20px
        color $green       
</style>


