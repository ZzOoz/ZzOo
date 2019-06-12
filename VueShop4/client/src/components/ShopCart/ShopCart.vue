<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="showShopCart">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:this.totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight:this.totalCount}"></i>
            </div>
            <div class="num" >{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:this.totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay not-enough">
            还差￥{{info.minPrice}}起送
          </div>
        </div>
      </div>
      <transition name="move">
      <div class="shopcart-list" v-if="isShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food,index) in CartFood" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <div class="cartcontrol">
                  <CartControl :food="food"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <div class="list-mask" style="display: none;" v-if="isShow" @click="showShopCart"></div>
  </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import BScroll from "better-scroll"
    import {mapState,mapGetters} from "vuex"
    import CartControl from "../CartControl/CartControl";
    export default {
      name: "ShopCart",
      components: {CartControl},
      data(){
          return {
            ShowShopList:false
          }
        },
        computed:{
          ...mapState(['CartFood','info']),
          ...mapGetters(["totalCount","totalPrice"]),
          isShow(){
            if(this.totalCount===0){
              return false
            }

            if(this.ShowShopList){
              this.$nextTick(()=>{
                if(!this.scroll) {  //创建单例 如果this.scroll为false则创建一个scroll 这样不会是的BScroll重复创建
                  this.scroll = new BScroll(".list-content", {
                    click: true
                  })
                }else{
                  this.scroll.refresh()   //当第一次点击list-content时会重新计算滚动 防止再点一次 此项已得到优化在BScroll中
                }
              })
            }

            return this.ShowShopList


          }
        },
        methods:{
          //显示购物车列表
          showShopCart(){
            this.ShowShopList = !this.ShowShopList
          },
          clearCart(){
            MessageBox.confirm('确定删除吗？').then(action => {
              this.$store.dispatch("Clear")
            });

          }
        }
    }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)   //当点击时会触发shoplist向上移动100%上去
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)     //触发时会向下移回原来的位置
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
