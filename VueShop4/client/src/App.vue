<template>
    <div>
    <router-view/>
    <Footer v-if="$route.meta.Show"></Footer>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import Footer from "./components/Footer/Footer";
export default {
  mounted(){
    this.getAddress()
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  },
  name: 'App',
  components: {Footer},

}
</script>

<style lang="stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
