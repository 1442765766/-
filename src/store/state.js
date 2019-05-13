//使用vuex每增加一个数据都需要写一套
export default {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], // 商家数组
    userInfo:{},//保存用户信息(保存用户登录成功之后的信息)

    goods: [], // 商品列表。mock数据
    ratings: [], // 商家评价列表
    info: {}, // 商家信息

    shopCart: [], // 购物车

    cartFoods:[],//购物车中食物的列表

    searchShops:[]//搜索的商家列表
    
}