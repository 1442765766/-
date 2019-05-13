//需要请求到接口
import { reqAddress, reqFoodCategorys, reqShops,reqUserInfo, reqLogout,reqShopInfo,reqShopRatings,reqShopGoods,reqSearchGoods} from '../api'
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
export default {
    // 异步获取地址
    async getAddress({ commit, state }) {
        const geohash = state.latitude + "," + state.longitude//请求地址需要经纬度参数，这里需要用“,”分割，经纬度在state内取
        const result = await reqAddress(geohash)//请求接口
        commit(RECEIVE_ADDRESS, { address: result.data })
    },
    // 异步获取分类列表
    async getCategorys({ commit }) {
        const result = await reqFoodCategorys()
        commit(RECEIVE_CATEGORYS, { categorys: result.data })
    },
    // 异步获取商家列表
    async getShops({commit, state}) {
      // 发送异步ajax请求
      const {latitude,longitude} = state
      const result = await reqShops({latitude,longitude})
      // 提交一个mutation
      if (result.code === 0) {
        const shops = result.data
        commit(RECEIVE_SHOPS, {shops})
      }
    },
    //已经有了用户信息，不需要异步,同步记录用户数据
    recordUser({commit},userinfo){
      commit(RECEIVE_USER_INFO,{userinfo})
    },
    //异步获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code==0){
          const userinfo = result.data
            commit(RECEIVE_USER_INFO,{userinfo})
        }
    },
    //异步登出
    async logout({commit}){
      const result = await  reqLogout()
      if(result.code==0){
        commit(RESET_USER_INFO)
      }
    },
    //异步获取商家信息
    async getShopInfo({commit},cb){
      const result = await reqShopInfo()
      if(result.code==0){
        const info = result.data
        info.score = 3.5
        commit(RECEIVE_INFO, {info})
        cb && cb()
      }
    },
    // 异步获取商家评价列表
    async getShopRatings({commit}, callback) {
      const result = await reqShopRatings()
      if(result.code===0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
        callback && callback()
      }
      },
    // 异步获取商家商品列表
    async getShopGoods({commit}, callback) {
      const result = await reqShopGoods()
      if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        // 如果组件中传递了接收消息的回调函数 , 数据更新后 , 调用回调通知调用的组件
        callback && callback()
      }
    },
    //更新指定food的count，不需要异步，没有跟后台进行交互
    updateFoodCount({commit},{food,isADD}){
      if(isADD){//增加
        commit(INCREMENT_FOOD_COUNT,{food})
      }else{
        commit(DECREMENT_FOOD_COUNT, {food})
      }
    },
      //没有与后台交互，同步清空购物车
    // 同步清空购物车
    clearCart({commit}) {
      commit(CLEAR_CART)
    },
    //异步搜索商家列表
    async searchShop({commit,state},keyword,callback){
      const geohash = state.latitude +","+ state.longitude
      const result = await reqSearchGoods(geohash,keyword)
      if(result.code==0){
        const searchShops = result.data
        commit(RECEIVE_SEARCH_SHOPS,{searchShops})
        callback && callback()
      }
      
    }

} 