<template>
    <section class="search">
      <!-- <header class="header">
        <div class="header_title">
          <span class="header_title_text">搜索</span>
        </div>
      </header> -->
      <commonheader title="搜索"></commonheader>
      <form class="search_form" action="#" @submit.prevent="search">
        <input type="search" name="search" placeholder=" 请输入商家或美食名称" class="search_input" v-model="keyword">
        <input type="submit" class="search_submit" >
      </form>
      <section class="list" v-if="!noSearchShops">
        <ul class="list_container">
          <li class="list_li" v-for="item in searchShops" :key="item.id">
            <section  class="item_left">
              <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
            </section>
            <section>
              <div class="item_right_text">
                <p>
                  <span>{{item.name}}</span>
                </p>
                <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
              </div>  
            </section>
          </li>
        </ul>
      </section>
      <div class="search_none" v-else>很抱歉！无搜索结果</div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import commonheader from "../../components/CommonHeader/commonheader.vue"
export default {
  name: "Search",
  data () {
      return {
        keyword:'',
        imgBaseUrl: 'http://cangdu.org:8001/img/',
        noSearchShops: false
      }
  },
  components:{
    commonheader
  },
  computed:{
    ...mapState(['searchShops'])
  },
  mounted(){
    
  },
  methods:{
    
    search(){
      //得到搜索关键字
      const keyword = this.keyword.trim();//trim()去除字符串两端的空白字符
      this.$store.dispatch('searchShop',keyword)
       this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll = new BScroll('.list',{
                  click:true
                })
              }else{
                this.scroll.refresh()//让滚动条刷新一下：重新统计内容的高度
              }

          })
    }
  }
};
</script> 

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      margin-bottom 50px
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
       
</style>
