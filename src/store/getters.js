//getters相当于state的计算属性
export default {
    totalCount(state){
        return state.cartFoods.reduce((preTotal,food)=>preTotal + food.count , 0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)
    },
    positiveSize(state){
       return state.ratings.reduce((preTotal,ratingsssss)=>preTotal+(ratingsssss.rateType===0?1:0),0) //preTotal,ratingsssss两个参数是任意命名的
    }
}