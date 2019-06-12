<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in StarScoreArr" :key="index" :class="sc"></span>
  </div>
</template>

<script>

    const STAR_ON = "on"
    const STAR_HALF = "half"
    const STAR_OFF = "off"

    export default {
        name: "Star",
        props:{
          size:Number,
          score:Number
        },
        computed:{
          StarScoreArr(){
              const {score} = this
              const scs = []
              let ScoreInteger = Math.floor(score)
              for(let i=0;i<ScoreInteger;i++){
                  scs.push(STAR_ON)
              }
              if(score*10-ScoreInteger*10>=5){
                  scs.push(STAR_HALF)
              }
              while(scs.length<5){
                  scs.push(STAR_OFF)
              }
              return scs
          }
        }
    }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./stars/star48_on')
        &.half
          bg-image('./stars/star48_half')
        &.off
          bg-image('./stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./stars/star36_on')
        &.half
          bg-image('./stars/star36_half')
        &.off
          bg-image('./stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./stars/star24_on')
        &.half
          bg-image('./stars/star24_half')
        &.off
          bg-image('./stars/star24_off')

</style>
