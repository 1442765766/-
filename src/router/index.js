import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../pages/Home/Home.vue" //引入相对路径
import Search from "../pages/Search/Search.vue"
import Order from "../pages/Order/Order.vue"
// import Profile from "../pages/Profile/Profile.vue"

const Profile = () => import('../pages/Profile/Profile.vue') //路由组件懒加载

import Login from "../pages/Login/Login.vue"

//商家子页面
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'


Vue.use(VueRouter)
//每新添加一个页面，如果需要路由都需要在index内注册
//引入路由，配置路由
//在meta对象中可以设置一些状态，来进行一些操作。用它来做登录校验,这里通过设置showFooter来控制底部栏的显示隐藏，然后再APP.vue中使用v-show方法来显示隐藏
export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            redirect:'./home' //默认显示
        },
        {
            path:"/home",
            component:Home,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/search",
            component:Search,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/order",
            component:Order,
            meta:{
                showFooter:true
            }
        },
        {
            path:"/profile",
            component:Profile, //返回的是一个路由组件的函数，只有执行此函数才会加载路由组件，这个函数在请求对应的路由路径的时候才会执行
            meta:{
                showFooter:true
            }
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/shop",
            component:Shop,
            children:[    //shop下面的子路由
                {
                    path: '/shop/goods',
                    component: ShopGoods
                },
                {
                    path: '/shop/ratings',
                    component: ShopRatings
                },
                {
                    path: '/shop/info',
                    component: ShopInfo
                },
                {
                    path: '', //这里需要一个默认的路径
                    redirect: '/shop/goods'
                }
            ]
        },
    ]

})