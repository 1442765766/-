import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
 import Vue from 'vue'
export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO] (state) {
        state.userInfo = {}
    },
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    //增加
    [INCREMENT_FOOD_COUNT](state, {food}) {
        if(!food.count){
            //food.count=1;点击+,第一次增加没有count，+1
            //问题：新添加的属性没有数据劫持=》数据绑定=》更新了数据但是页面没有变化
            Vue.set(food,'count',1)//使用vue.set就能够让新添加的属性动态绑定，实时更新页面
            state.cartFoods.push(food);//将food添加到cartFood中
        }else{
            food.count++
        }

    },
    //减少
    [DECREMENT_FOOD_COUNT](state, {food}) {
        if(food.count){
            food.count--
            if(food.count===0) {
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
              }
        }
    },
    //清空购物车
    [CLEAR_CART](state){
        //清除food中的count值
        state.cartFoods.forEach(food => food.count = 0)
        //移除购物车中的所有购物项
        state.cartFoods=[]
    },

    //搜索商家列表
    [RECEIVE_SEARCH_SHOPS](state, {searchShops}){
        state.searchShops = searchShops
    }
    
}