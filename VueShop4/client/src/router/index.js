import Vue from 'vue'
import Router from 'vue-router'
// import MSite from '../pages/MSite/MSite'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import Profile from '../pages/Profile/Profile'

const MSite = ()=>import("../pages/MSite/MSite")
const Order = ()=>import("../pages/Order/Order")
const Search = ()=>import("../pages/Search/Search")
const Profile = ()=>import("../pages/Profile/Profile")  //路由组件的懒加载

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/msite',component: MSite, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
     meta:{
       Show:true
     }
    },
    {path: '/profile', component: Profile,
      meta:{
        Show:true
      }
    },
    {path: '/search', component: Search,
      meta:{
        Show:true
      }
    },
    {path: '/order', component: Order,
      meta:{
        Show:true
      }
    },
    {path: '/login', component: Login},
    {path:'/shop',component:Shop,
     children:[
       {path:'/shop/good',component:ShopGoods},
       {path:'/shop/info',component:ShopInfo},
       {path:'/shop/rating',component:ShopRating},
       {path:'',redirect:'/shop/good'}

     ]
    },
    {path:'/',component:MSite}
  ]
})
