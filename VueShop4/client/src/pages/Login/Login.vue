<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">玩具控</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}" >
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">   <!-- 将phone变量设为动态绑定  -->
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode()">
                {{computeTime>0 ? `已发送${computeTime}`:'获取验证码'}}</button> <!--  rightPhone为计算属性 使用正则表达 当满10个时样式为黑色   -->
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册玩具控帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPassword" v-model="pwd">    <!-- 绑定数据showPassword和pwd  -->
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">   <!-- 绑定数据showPassword和pwd  -->
                <div class="switch_button" @click="showPassword=!showPassword" :class="showPassword ? 'on':'off'">  <!-- 监听事件showPassword 绑定  判断showPassword是否为true 是则加on样式为白色 否则加绿色样式-->
                  <div class="switch_circle" :class="{right:showPassword }"></div>
                  <span class="switch_text" >{{showPassword ? '显示':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" >
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <router-link href="javascript:" class="go_back" to="/msite">
        <i class="iconfont icon-jiantou2"></i>
      </router-link>
    </div>
    <AlertTip @closeTip="closeTip" :alertText="alertText" v-show="alertShow"></AlertTip>
  </section>

</template>

<script>
    import AlertTip from "../../components/AlertTip/AlertTip";
    import {reqSendCode,reqLoginSms,reqLogin} from "../../api";

    export default {
        name: "Login",
        components: {AlertTip},
        data(){
          return {
            loginWay:true, //true为短信验证 false为密码验证
            phone:"", //手机号
            computeTime:0,  //发送验证码的倒计时
            pwd:'', //密码
            showPassword:false, //监听是否显示密码
            name:'', //用户名
            captcha:'', //图片验证
            code:'', //短信验证
            alertShow:false, //显示提示框
            alertText: '', // 提示文本
          }
        },
        computed:{
          rightPhone(){
            return /^1\d{10}$/.test(this.phone)
          },
        },
        methods:{
          //获取验证码
          async getCode(){
            if(this.computeTime==0){
              this.computeTime = 30;
              this.time = setInterval(()=>{
                this.computeTime--
               if(this.computeTime<=0){
                 clearInterval(this.time)
               }
             },1000)

            /*异步ajax获取短信验证*/

              // 发送ajax请求(向指定手机号发送验证码短信)
              const result = await reqSendCode(this.phone)
              if(result.code===1) {
                // 显示提示
                this.showAlert(result.msg)
                // 停止计时
                if(this.computeTime) {
                  this.computeTime = 0
                  clearInterval(this.intervalId)
                  this.intervalId = undefined
                }
              }
            }
          },
          showAlert(alertText){
            this.alertShow = true
            this.alertText = alertText
          },
          //异步登录
          async login(){
            let result;
            if(this.loginWay){  //短信验证
                const {rightPhone,phone,code} = this
                if(!this.rightPhone){
                    this.showAlert("手机号必须是16位")
                    return
                }else if(!/^\d{6}$/.test(code)){
                    this.showAlert('验证号必须是6位')
                    return
                }
                result = await reqLoginSms(phone,code)
            }else{
                const {name,pwd,captcha} = this
                if(!this.name){
                  this.showAlert("用户必须指定")
                  return
                }else if(!this.pwd){
                  this.showAlert("密码必须指定")
                  return
                }else if(!this.captcha){
                  this.showAlert("验证码必须指定")
                  return
                }
                result = await reqLogin({name,pwd,captcha})
            }

            if(this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }

            if(result.code===0){
              const user = result.data
              this.$store.dispatch("recordUserInfo",user)
              this.$router.replace('/profile')
            }else{
              this.getCaptcha()
              const msg = result.msg
              this.showAlert(msg)
            }
          },
          //关闭警告框
          closeTip(){
            this.alertShow = false
            this.alertText = ''
          } ,
          //获取图片验证码
          getCaptcha(){
            //每次的请求不同
            this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
          }
        }
    }
</script>

<style lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)     /*观察showPassword的状态 改版right是否加入*/
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
