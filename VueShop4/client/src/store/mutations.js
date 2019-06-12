import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATAGROYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOOD,
  RECEIVE_INFO,
  RECEIVE_RATING,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT, CLEAR_CART, SEARCH_SHOP
} from "./mutation-type"

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATAGROYS](state,{catagroys}){
    state.catagroys = catagroys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },

  /*mock接口模拟的商品信息*/
  [RECEIVE_GOOD](state,{good}){
    state.good = good
  },
  /*mock接口模拟的商家信息*/
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  /*mock接口模拟的评价信息*/
  [RECEIVE_RATING](state,{rating}){
    state.rating = rating
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      Vue.set(food,"count",1)
      state.CartFood.push(food) //将食品信息添加到CartFood的空数组中
    }else{
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--
      if(food.count===0){
        state.CartFood.splice(state.CartFood.indexOf(food),1)  //当食品的数量为0时 找到CartFood中的食品索引删除
      }
    }
  },

  //清空购物车
  [CLEAR_CART](state){
    //清楚food中的count 否则清除之后count还会存在 因为count是新加入的变量
    state.CartFood.forEach(food=>food.count=0)
    //将state中的CartFood变成空数组
    state.CartFood = []
  },

  //搜索商家信息
  [SEARCH_SHOP](state,{searchShop}){
    state.searchShop = searchShop
  },
}
