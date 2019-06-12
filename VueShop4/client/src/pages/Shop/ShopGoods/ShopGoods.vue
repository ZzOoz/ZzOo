<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(goods,index) in good" :key="index" :class="{current:index === currentIndex}"
              @click="clickMenuItem(index)">
              <span class="text bottom-border-1px" >
              <img class="icon" :src="goods.icon" v-if="goods.icon">
              {{goods.name}}
              </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="FoodUI">
          <li class="food-list-hook"   v-for="(goods,index) in good" :key="index">
            <h1 class="title">{{goods.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in goods.foods" :key="index"
                @click="showFood(food)">  <!-- 监听事件showFood 参数为food 传入每一个food的信息  -->
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}} %</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>

                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food ref="food" :food="food"></Food>
  </div>
  </template>
<script>
    import BScroll from "better-scroll"
    import {mapState} from "vuex"
    import CartControl from "../../../components/CartControl/CartControl";
    import Food from "../../../components/Food/Food";
    import ShopCart from "../../../components/ShopCart/ShopCart";
    export default {
      name: "Shop",
      components: {ShopCart, Food, CartControl},
      data(){
          return{
              ScrollY:0,  //ScrollY为shopGood中的左侧菜单垂直偏移
              tops:[],    //每个食品的type的li的位置
              food: {}  // 需要显示的food
          }
        },
        mounted() {
          this.$store.dispatch("getMockGoods",()=>{
              this.$nextTick(() => {
              this._initScroll()
              this._initTops()
            })
          })

        },
        computed: {    //计算属性变化的情况：1.初始化数值 2.相关数值发生变化就会重新触发相关方法
          ...mapState(['good']),
          currentIndex(){   //计算属性当index===currentIndex时class=current
              const {ScrollY,tops} = this
              const index = tops.findIndex((top,index)=>{     //如果数组中有匹配的数值则返回第一个且不在执行
                  return ScrollY>=top && ScrollY <tops[index+1]
              })
              return index
          }
        },
        methods:{
          //初始化ScrollY
          _initScroll(){
                new BScroll(".menu-wrapper",{
                  click:true
                })
                this.foodScroll = new BScroll(".foods-wrapper", {
                  probeType: 2,
                  click:true
                })

                this.foodScroll.on("scroll",({x,y})=>{
                  this.ScrollY = y
                  this.ScrollY = Math.abs(y)
                })

              this.foodScroll.on("scrollEnd",({x,y})=>{
                this.ScrollY = y
                this.ScrollY = Math.abs(y)
              })
          },
          //初始化top
          _initTops(){
            //1.建立tops数组 将第一个top插入tops数组中 因为第一个就是一个tops
            const tops = [];
            let top = 0;
            tops.push(top)
            //2.找到所有的li
            const lis = this.$refs.FoodUI.getElementsByClassName("food-list-hook");
            Array.prototype.slice.call(lis).forEach(li=>{  /* 使用Array.prototype.slice返回数组使用call指向伪数组*/
              top += li.clientHeight
              tops.push(top)
            })
            //3.将找到的tops数组赋值给data中的tops数组
            this.tops = tops
            console.log(tops)
          },
          //点击左侧菜单移动到food栏
          clickMenuItem(index){
            const ScrollY = this.tops[index]
            this.ScrollY = ScrollY
            this.foodScroll.scrollTo(0,-ScrollY,500)
          },
          //显示Food组件 食品放大
          showFood (food) {
            // 设置food
            this.food = food
            // 显示food组件 (在父组件中调用子组件对象的方法)
            this.$refs.food.toggleShow()
          },


        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
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
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
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
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
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
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
