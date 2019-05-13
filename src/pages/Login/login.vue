<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:loginway}" @click="loginway=true">短信登录</a> <!--类名确定，只是不确定是否使用{}-->
                    <a href="javascript:;" :class="{on:!loginway}" @click="loginway=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on:loginway}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder=" 手机号" v-model="phone">
                            <button class="get_verification" :class="{show_color:phone_length}" @click.prevent="getCode">
                                {{computertimes>0 ? `已发送(${computertimes}s)` : '获取验证码'}}
                            </button> <!--这里不能直接使用布尔值，需要用到计算属性-->
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder=" 验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:!loginway}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder=" 手机/ 邮箱/ 用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                                    <div class="switch_circle" :class="{right:showPwd}"></div>
                                    <span class="switch_text">{{showPwd?"abc":"..."}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder=" 验证码" v-model="captcha">
                                <img
                                    class="get_verification"
                                    src="http://localhost:4000/captcha"
                                    alt="captcha"
                                    @click="changeCaptcha"
                                >
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <span href="javascript:" class="go_back" @click="$router.back()">   <!--@click="$router.back()"可以返回上一页 ，$router就是当前路由-->
                <i class="iconfont icon-jiantou2"></i>
            </span>
        </div>
        <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </div>
    
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import  {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api' //这里直接在login页面上请求接口，不需要actions
export default {
    name: "Login",
    data(){
        return {
            loginway:true,//登录方式
            computertimes:0,//倒计时
            phone:"",//手机号
            code:"",//短信验证码
            showPwd:false,//是否显示密码
            pwd:'',//密码
            alertText:'',//提示文本
            alertShow:false,//是否显示警告框
            captcha:'',//图片验证码
            name:''
        }
    },
    components:{
        AlertTip
    },
    props: {
        title: String
    },
    computed:{
        phone_length(){
            return /^1\d{10}$/.test(this.phone); //验证手机号长度
        }
    },
    methods:{
        //异步获取短信验证码
        async getCode () {
            if(!this.computertimes){
                this.computertimes = 30
                this.intervalId = setInterval(() => {
                this.computertimes--
                if(this.computertimes<=0) {
                    // 停止计时
                    clearInterval(this.intervalId)
                }
                }, 1000)
                //发送短信验证码
                const result = await reqSendCode(this.phone)
                if(result.code==1){
                    this.ShowAlert(result.msg)
                    //停止倒计时
                    if(this.computertimes){
                        this.computertimes = 0
                        clearInterval(this.intervalId)
                        this.intervalId = undefined
                    }
                }
               
            }
        },
        //弹窗公共方法
        ShowAlert(alertText){
             this.alertShow = true;
             this.alertText = alertText
        },
        //点击修改图片验证码
        changeCaptcha (event){
            event.target.src = "http://localhost:4000/captcha?time="+Date.now();//每次指定的src不一样，但是地址是一样的可以加上一个时间参数
        },
        //异步登录账号
        async login(){
            let result
            //前台表单验证
            if(this.loginway){//默认为短信登录
                const {rightphone,phone,code} = this
                if(!this.phone_length){
                    this.ShowAlert('手机号不正确')
                    return
                }
                else if(!/^\d{6}$/.test(code)) {
                // 验证必须是6位数字
                this.ShowAlert('验证必须是6位数字')
                return
            }
                // 发送ajax请求短信登陆
                result = await reqSmsLogin(this.phone, this.code)

            } else {// 密码登陆
                const {name, pwd, captcha} = this
                if(!this.name) {
                    // 用户名必须指定
                    this.ShowAlert('用户名必须指定')
                    return
                } else if(!this.pwd) {
                    // 密码必须指定
                    this.ShowAlert('密码必须指定')
                    return
                } else if(!this.captcha) {
                    // 验证码必须指定
                    this.ShowAlert('验证码必须指定')
                    return
                }
                result = await reqPwdLogin(this.name, this.pwd, this.captcha)
                console.log(result)
                
            }
            //根据解构处理数据
            if(result.code==0){
                console.log(result)
                this.$store.dispatch('recordUser',result.user);
               // this.$router.replace('/profile')
               this.$router.back()//返回上一页
               
            }else{
                this.ShowAlert(result.msg)
                this.getCaptcha()
            }
        },
        //点击切换图片验证码公共方法
        getCaptcha (){
            this.$refs.src = "http://localhost:4000/captcha?time="+Date.now();
        },
        //关闭提示框
        closeTip(){
              this.alertShow = false;
              this.alertText = ""
        }
    }

  
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl'
    * { touch-action: none; }
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
                                border 1px solid  #02a774
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
                                &.show_color
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
                                        color #add
                                &.on
                                    background #02a774
                                >.switch_circle
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
                                        transform translateX(30px)
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
