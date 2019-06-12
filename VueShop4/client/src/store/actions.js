import {
  RECEIVE_ADDRESS,
  RECEIVE_CATAGROYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_RATING,
  RECEIVE_INFO,
  RECEIVE_GOOD, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART, SEARCH_SHOP
} from "./mutation-type"

import {
  reqAddress,
  reqCatagorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqGood,
  reqInfo,
  reqRating, reqSearchShop
} from "../api"

export default {
  async getAddress({commit,state}){
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if(result.code===0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})  //触发一个mutations 第一个参数是mutation方法名，第二个为载荷
    }
  },
  async getCatagorys({commit},callback){
    const result = await reqCatagorys();
    if(result.code===0){
      const catagroys = result.data;
      commit(RECEIVE_CATAGROYS,{catagroys})
    }
    callback  && callback()
  },
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    if(result.code===0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },

  //同步获取用户信息 因为已经是同时间获取到用户信息

  recordUserInfo({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },

  //退出登录
  async logout({commit}){
    const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USER_INFO)
    }
  },

  /*异步获取mock接口的商品、商家、评价信息*/
  async getMockGoods({commit},callback){
    const result = await reqGood()
    if(result.code===0){
      const good = result.data
      commit(RECEIVE_GOOD,{good})
      callback && callback()
    }
  },
  async getMockInfo({commit}){
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },
  async getMockRatings({commit},callback){
    const result = await reqRating()
    if(result.code===0){
      const rating = result.data
      commit(RECEIVE_RATING,{rating})
    }
    callback && callback()
  },

  //同步获取food中的count
  getFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //清空购物车
  Clear({commit}){
    commit(CLEAR_CART)
  },

  //异步获取搜索商家信息
  async SearchShop({commit,state},keyword){
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash,keyword)
    if(result.code===0){
      const searchShop = result.data
      commit(SEARCH_SHOP,{searchShop})
     }
    },
}
