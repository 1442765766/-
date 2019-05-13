<template>
    <div>
        <div class="goods">
            <!--左侧菜单-->
            <div  class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current: currentIndex===index}" @click="clickMenuItem(index)">
                        <span  class="text bottom-border-1px">
                            <img v-if="good.icon"  v-lazy="good.icon" alt=""  class="icon">
                            {{good.name}}
                        </span>
                    </li>
                
                </ul>
            </div>
            <!--右侧商品列表页-->
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul ref="foodsUl">
                    <li class="food-list food-list-hook" v-for="(good,index) in goods" :key="index" >
                        <h1  class="title">{{good.name}}</h1>
                        <ul>
                            <li  class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                                <div  class="icon">
                                    <img v-lazy="food.icon" alt="" width="57" height="57">
                                </div>
                                <div  class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div  class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <!--选择商品控件-->
                                    <div  class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"/>  
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                
                </ul>
            </div>
            <shoCart/>
        </div>
        <food :food="food" ref="food" />
    </div>
   
</template>
<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import cartcontrol from '../../../components/CartControl/CartControl.vue'
import shoCart from '../../../components/ShopCart/ShopCart.vue'
import food from '../../../components/Food/Food.vue'
export default {
    data(){
        return {
            scrollY:0,//右侧滑动的Y轴坐标（滑动过程中实时变化）
            tops:[],//所有右侧分类li的top组成的数组（列表第一次显示之后就不再变化）
            food:{}//需要显示的food
        }
    },
    components:{
        cartcontrol,
        shoCart,
        food
    },
    mounted(){
        this.$store.dispatch('getShopGoods',() => {//数据更新后执行
            this.$nextTick(() => { //列表数据更新后执行
               this._initScroll()//初始化滚动
               this._initTops() 
            })
        });
    },
    computed:{
        ...mapState(['goods']),
        //计算得到当前分类的下标
        currentIndex(){ //变化的条件：1.初始化
            //得到条件数据
            const {scrollY,tops} = this //es6解构赋值
            const index  = tops.findIndex((top,index) => {
                    return scrollY>= top &&scrollY< tops[index+1]
            })
            return index

        }
    },
    methods:{
        //初始化左侧滚动
         _initScroll() {
            new BScroll('.menu-wrapper', {
                click: true
            })
            //初始化右侧滚动
            this.foodsScroll = new BScroll('.foods-wrapper', {
                probeType: 2,  // 设置为2->惯性滑动不会触发
                click: true
            })
            //给右侧列表绑定scroll监听
            this.foodsScroll.on('scroll',({x,y})=>{
                this.scrollY = Math.abs(y)
            })
            //给右侧列表绑定scroll结束的监听，监听是根据better-scroll提供的方法进行进行的,使用scrollEnd来解决惯性滑动不更新左侧列表分类BUG
            this.foodsScroll.on('scrollEnd',({x,y}) => {
                //console.log('scrollEnd',x,y)
                this.scrollY = Math.abs(y)//取y的绝对值
                //console.log( this.scrollY)
            })
         },
          // 初始化tops
        _initTops() {
            //1.初始化tops
            const tops =[]
            let top = 0
            tops.push(top)
            //2.收集
            //找到所有分类的li
            const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook') //缩小搜索范围，这里得到的是一个伪数组，需要转化为真数组才能遍历。找到foodsUl下的所有类名为food-list-hook的标签
            Array.prototype.
            slice.call(lis).forEach(li => { //slice从已有数组中返回选定的元素 [].slice.call(lis)-> 将伪数组转换为真数组
                top += li.clientHeight //网页可见区域高
                tops.push(top)
            })
            //3.更新数据
            this.tops = tops
            console.log(tops)
        },
        //点击左侧切换列表
        clickMenuItem(index){
            //得到滚动目标坐标
            const top = this.tops[index]
            //更新目标scrollY值
            this.scrollY = top
            //平滑滚动到指定位置
            this.foodsScroll.scrollTo(0,-top,100);
        },
        //点击显示大图
        showFood(food){
            //设置food
            this.food = food
            //显示food组件（在父组件中调用子组件的方法）
            //1.子组件上需要一个ref
            //2.使用this.$refs.ref的内容.子组件的方法
            this.$refs.food.toggleShow()
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
    .goods
        display flex
        position absolute 
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff;
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px  //flex布局某一部分固定
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: bottom
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat  
                .text
                    display: table-cell //让元素具有表格的属性td
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px   
        .foods-wrapper
            flex 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom 0
                .icon
                    flex: 0 0 57px 
                    margin-right: 10px    
                .content
                    flex 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through //贯穿线
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 5px 
</style>
