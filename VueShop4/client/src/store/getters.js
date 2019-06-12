/*
  取得state.js中的信息
*/

export default {
  totalCount(state){
      return state.CartFood.reduce((preTotal,food)=>preTotal + food.count,0)
  },   /*当执行mutations.js触发action.js中的方法时已经将food添加到CartFood的空数组中,然后只要将food中的count累加得到总数量*/
  totalPrice(state){
      return state.CartFood.reduce((preTotalPrice,food)=>preTotalPrice + food.count * food.price,0)
  },   /*同理*/
  PositiveType(state){
      return state.rating.reduce((preTotal,ratings)=>preTotal+(ratings.rateType===0? 1:0),0)
  }
}
