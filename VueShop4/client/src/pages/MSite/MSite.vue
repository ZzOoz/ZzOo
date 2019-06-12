<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
        <router-link slot="left" class="header_search" :to="userInfo._id ? '/search':'/login'">
          <i class="icontfont icon-sousuo"></i>
        </router-link>
        <router-link to="/login" slot="right">
          <span class="header_login" v-if="!userInfo._id">
            <span class="header_login_text">登录|注册</span>
          </span>
          <span class="header_login" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="catagroys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(catagroys,index) in catagroysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(catagroy,index) in catagroys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+catagroy.image_url">
              </div>
              <span>{{catagroy.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./msite_back.svg">
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
    <Footer></Footer>
  </section>

</template>

<script>
    import BScroll from "better-scroll"
    import ShopList from "../../components/ShopList/ShopList";
    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    import {mapState} from "vuex"
    import Footer from "../../components/Footer/Footer";

    export default {
      mounted(){
        this.$store.dispatch("getCatagorys",()=>{
          this.$nextTick(()=>{
            new BScroll(".msite_nav",{
              scrollX:true
            })
          })
        })
        this.$store.dispatch("getShops")


      },
      data() {
        return {
          baseImageUrl: 'https://fuss10.elemecdn.com'
        }
      },

      computed: {
        ...mapState(['address', 'catagroys','userInfo']),

        catagroysArr() {
          const {catagroys} = this
          const arr = []
          let minArr = [];
          catagroys.forEach(c => {
            if (minArr.length === 8) {
              minArr = []
            }
            if (minArr.length === 0) {
              arr.push(minArr)
            }
            minArr.push(c)
          })
          return arr
        }
      },
      // watch: {
      //   catagroys(value) {
      //     this.$nextTick(() => {
      //       setTimeout(() => {
      //         new swiper('.swiper-container', {
      //           loop: true, // 可以循环轮播
      //           // 如果需要分页器
      //           pagination: {
      //             el: '.swiper-pagination',
      //           },
      //         })
      //       })
      //     })
      //   }
      //
      // },
      components: {
        Footer,
        HeaderTop,
        ShopList
      }
    }
</script>

<style lang="stylus">
  @import '../../common/stylus/mixins.styl'
  .header_search
    position absolute
    left 15px
    top 50%
    transform translateY(-50%)
    width 10%
    height 50%
    .icon-sousuo
      font-size 25px
      color #fff
  .header_title
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 50%
    color #fff
    text-align center
    .header_title_text
      font-size 20px
      color #fff
      display block
  .header_login
    font-size 14px
    color #fff
    position absolute
    right 15px
    top 50%
    transform translateY(-50%)
    .header_login_text
      color #fff
  .msite  //首页
    width 100%
    .msite_header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>

