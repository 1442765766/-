<template>
    <section class="order">
      <commonheader title="订单列表"></commonheader>
      <section class="order_no_login">
        <img src="./images/person.png">
        <h3>登录后查看外卖订单</h3>
        <router-link to="./login">
          <button class="now_login">立即登陆</button>
        </router-link>
      </section>
      <router-view/>
    </section>
</template>

<script>
import commonheader from "../../components/CommonHeader/commonheader.vue"
export default {
  name: "Order",
  components:{
    commonheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img 
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      .now_login
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px


       


</style>
