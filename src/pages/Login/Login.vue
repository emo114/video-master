<template>
    <div class="loginContainer loginBj"  :style="{backgroundImage:'url(' + bgPicture + ')',width: '${width/16}rem'}"  >

        <div class="iconContainer">
        <span  class="loginIcon iconfont " @click="$router.back(-1)" >&#xe61c;</span>
      </div>
      <div class="login1">
        <div class="picture">
          <img src="./img/diamond.png" alt="">
        </div>
        <div >
          <input v-model="tel" type="text" placeholder=" 请输入手机号码">
          <input v-model="pwd" type="password" placeholder=" 请输入密码">
        </div>

        <div class="passwordContainer">
          <div class="password1">
            <span>记住密码</span>
            <input v-model="isRememberPwd" class="select-tag-input" type="checkbox" id="tag-id"style="display: none;">
            <label class="tag-label" for="tag-id"></label>
          </div>
          <div class="password2">
            <span @click="skipTo('/updatePwd')">忘记密码？</span>
          </div>
        </div>
        <div class="loginButton">
          <button @click="login">登录</button>
        </div>
        <span @click="skipTo('/register')">新用户注册</span>
      </div>

    </div>


</template>

<script>

  import {Base64} from 'js-base64'

  import {login} from '../../api'


  export default {
    name: "Login",
    data() {
      return {
        tel: '',
        pwd: '',
        isRememberPwd: true, //是否记住密码
        bgPicture: "http://image.biaobaiju.com/uploads/20181004/14/1538635780-PyUDJbZcSL.jpg", //背景圖片
        width: screen.availWidth,
        height: screen.availHeight,
      }
    },
    methods: {
      async login() {
        // 校验手机号
        let telReg=/^[1][3,4,5,7,8][0-9]{9}$/;

        if(!telReg.test(this.tel)){
          this.$vux.toast.text('请输入正确的手机号~~', 'bottom')
          return ;
        }


        let loginParams = {tel: this.tel,pwd: this.pwd};

        // 发送请求登录
        const result = await login(loginParams);

        if(result.retCode === '1'){

          this.$store.dispatch('saveUserToken',{token: result.token,loginType: result.loginType});

          // 查看是否保存用户名密码
          if(this.isRememberPwd){
            // 保存账号密码
            let encode = Base64.encode(JSON.stringify(loginParams));
            // 写入localStorage
            localStorage.setItem("userData",encode);
            // 跳转路由
            this.$router.back(-1);
          }
        }else{
          this.$vux.toast.text(result.retMsg, 'bottom')
        }


      },
      init(){
        let userData = localStorage.getItem('userData');
        let decode = Base64.decode(userData);
        if(userData){
          let {tel,pwd} = JSON.parse(decode);
          this.tel = tel;
          this.pwd = pwd;
        }
      },skipTo(path){
        this.$router.push(path)
      }
    },
    mounted() {

      // 初始化
      this.init();

    }
  }



</script>

<style >
    /*高度塌陷*/
  .loginBj:before,.passwordContainer :before,
  .loginBj:after ,.passwordContainer :before{
    content: "";
    display: table;
    clear: both;
  }

/*  !*背景*!*/
  .loginContainer{
    width: 100%;
    min-height: 100vh;
    background-size: 100% 100%;
  }
/*!*返回按钮*!*/
  .iconContainer {
    float: left;
  }
  .loginIcon{
    font-size: 5rem;
    color:#C49C69;
  }


.login1 .picture{
  width: 100%;
  margin-top: 2.5rem;
}
.login1{
  width: 80%;
  text-align: center;
  opacity:0.7;
  background: #808080;
  position: fixed;
  bottom: 7%;
  margin:  0 auto;
  left: 10%;
}
  .login1 .picture img{
    width: 5rem;
    height: 5rem;
  }




  .select-tag-input + label{
    background-color: #eaeaea;
    /*border: 1px solid #C1CACA;*/
    border: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 9px;
    border-radius: 5px;
    display: inline-block;
    position: relative;
  }


  .select-tag-input + label:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }


  .select-tag-input:checked + label {
    background-color: #eaeaea;
    /*border: 1px solid #92A1AC;*/
    border: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #243441;
  }


  .select-tag-input:checked + label:after {
    content: '\2714';
    position: absolute;
    top: -11px;
    left: 0px;
    color: #FC9723;
    width: 100%;
    text-align: center;
    font-size: 1.4em;
    padding: 1px 0 0 0;
    vertical-align: text-top;
  }
  .loginButton{
    margin: 1rem;
  }
  .loginButton button{
    width: 70%;
    height: 20%;
    background-color: #B4854D;
    border-radius: 1.5rem;
    outline:none;
    border:none;
    font-size: 1rem;
    padding: 0.5rem;
    margin-top:1rem ;
  }

  .passwordContainer{
    width: 70%;
    margin: 1rem auto;
  }
  .password1 ,.password2{
    display: inline-block;
  }
  .password1{
    float:left
  }
  .password2{
    float: right;
  }






    /*账号密码*/
  input[type=text],input[type=password] {
    width: 70%;
    margin: 0.8rem  0;
    height: 2rem;
    border: 1px solid #f2f2f2;
    background: #f6f6f6;
    color: #202124;
    font-size: 1rem;
    line-height: 3rem;
    border-radius: 1.5rem;
    text-indent:1rem;
    /*background:url("../../img/Icon/all_classify.png");*/
  }
  input[type=text]:focus,input[type=password]:focus {
    outline: none;
    background-color: #fff;
  }
  input[type=text]::selection ,input[type=password]::selection{
    background:transparent;
    background-color: #fff;
  }
  input[type=text]::-moz-selection, input[type=password]::-moz-selection{
    background:transparent;
    background-color: #fff;
  }
  input[type=text]::-webkit-input-placeholder,input[type=password]::-webkit-input-placeholder { /* WebKit browsers */
    color: #bababa;
  }
  input[type=text]:-moz-placeholder,input[type=password]:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #bababa;
  }
  input[type=text]::-moz-placeholder ,input[type=password]::-moz-placeholder{ /* Mozilla Firefox 19+ */
    color: #bababa;
  }
  input[type=text]:-ms-input-placeholder,input[type=password]:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #bababa;
  }



</style>
