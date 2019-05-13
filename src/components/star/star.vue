<template>
   <div class="star" :class="`star-${size}`">
        <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
     </div> 
</template>

<script>
//定义样式常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  name: "Search",
  data(){
    return{
       
    }
  },
  props:{
      score:Number,
      size:Number
  },
  computed:{
      starClasses(){
          const scs = []
         
          const {score} = this //解构赋值
          const scoreInteger = Math.floor(this.score);
           console.log(scoreInteger)
          for(let i = 0 ; i<scoreInteger; i++){
                scs.push(CLASS_ON)
          }
          if(score*10-scoreInteger*10>=5){
                scs.push(CLASS_HALF)
          }
         while(scs.length<5){
             scs.push(CLASS_OFF)
         }
          return scs
      }
  }
  
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl";
.star //2x 图 3x 图
    float left
    font-size 0
    .star-item
        float left
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
                margin-right: 0
            &.on
                bg-image('./images/stars/star48_on')
            &.half
                bg-image('./images/stars/star48_half')
            &.off
                bg-image('./images/stars/star48_off')
    &.star-36 
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right: 0
            &.on
                bg-image('./images/stars/star36_on')
            &.half
                bg-image('./images/stars/star36_half')
            &.off
                bg-image('./images/stars/star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right: 0
            &.on
                bg-image('./images/stars/star24_on')
            &.half
                bg-image('./images/stars/star24_half')
            &.off
                bg-image('./images/stars/star24_off')
                  
</style>
