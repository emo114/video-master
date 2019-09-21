<template>
  <div>
    <div class="bg">
      <span class="back"  @click="back">
         <i  class="iconfont"  style="font-size: 2rem " >&#xe629;</i>
      </span>
      <span class="rg">注册</span>
    </div>
    <div class="menu" >
      <div  class="invitation">
        <label class="font" v-model="extensionCode">邀请码</label>
        <input type="text" name="text" id="veiwing"  placeholder="(可选填)填写获得观影权"/>
      </div>
      <div class="prompt">填写邀请码可增加好友与自己的每日观影次数</div>
      <div class="telephoneNumber"><input type="text" name="text" id="" v-model="tel"   placeholder="请输入你的手机号码"/>  </div>
      <div class="verification">
        <input type="text" name="text"  placeholder="请输入验证码" v-model="smsCode" />
       <!-- <button class="get">获取验证码</button>-->
        <button  class="get" @click.prevent="getSmsCode">
          {{computeTime>0 ? `${computeTime}秒` : '获取验证码'}}
        </button>
      </div>
      <div class="password">
        <input type="password" name="password"     placeholder="请输入密码" v-model="pwd" v-show="!isShowPwd"/>
        <input type="text" name="password"    placeholder="请输入密码" v-model="pwd"  v-show="isShowPwd"/>
        <span @click="showPwd">
           <i class="iconfont ,down" v-show="!isShowPwd">&#xe61b;</i>
           <i class="iconfont , up" v-show="isShowPwd">&#xe661;</i>
        </span>
      </div>
      <div class="prompt">由6-20位字母或数字组成</div>
      <div class="regist" @click="register"><button>注册</button></div>
    </div>

    <toast v-model="showToast" type="text" :time="1000" is-show-mask :text="showToastMsg"  position="middle"></toast>
  </div>
</template>

<script>
  import uuid from 'uuid'
  import { Toast} from 'vux'
  import {getSmsCode,telRegedit} from '../../api'

    export default {
      data(){
        return{
          extensionCode:null, //推广码
          tel:null,  //手机号码
          computeTime: 0, // 计时的时间
          smsCode:null,
          pwd:null,
          isShowPwd:false, //是否显示验证码
          deviceCode:null,
          showToast: false,
          showToastMsg: ''
        }
      },components:{
        Toast
      }
      ,mounted() {

      },methods:{
        // 异步获取短信验证码
        async getSmsCode () {
          let regPhone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;

          if(!regPhone.test(this.tel)){
            this.showToastMsg = '请输入正确的手机号码'
            this.showToast = true
            return
          }
          // 如果当前没有计时
          if(!this.computeTime) {
            // 启动倒计时
            this.computeTime = 60
            this.intervalId = setInterval(() => {
              this.computeTime--
              if(this.computeTime<=0) {
                // 停止计时
                clearInterval(this.intervalId)
              }
            }, 1000)

            // 发送ajax请求(向指定手机号发送验证码短信)

            let params = {
              'tel':this.tel,
              'type':2
            }

            const result = await getSmsCode(params)
            if(result.retCode === '1') {
              // 显示提示
              this.showToastMsg = '发送成功'
              this.showToast = true
            }else{
              this.showToastMsg = result.retMsg
              this.showToast = true
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined

            }

          }



        },
        // 异步注册
        async register () {

          const {rightPhone, tel,smsCode,pwd,extensionCode} = this
          if(!this.rightPhone) {
            // 手机号不正确
            this.showToastMsg = '请输入正确的手机号码'
            this.showToast = true
            return
          } else if(!/^\d{4}$/.test(smsCode)) {
            // 验证必须是4位数字
            this.showToastMsg = '请输入4位验证码'
            this.showToast = true
            return
          }else if(!/^[0-9a-zA-Z]{6,20}$/.test(pwd)){
            this.showToastMsg = '请输入6-20位密码'
            this.showToast = true
          }

          /*window.localStorage.removeItem('deviceCode')
          let deviceCode = uuid();
          localStorage.setItem('deviceCode', deviceCode);*/
            let params = {
              'extensionCode':extensionCode,
              'tel':tel,
              'smsCode':smsCode,
              'pwd':pwd,
             'deviceCode': window.localStorage.getItem("deviceCode")

            }

          // 发送ajax请求短信注册
          let  result = await telRegedit(params)

            if(result.retCode === '1') {
              this.showToastMsg = '注册成功'
              this.showToast = true
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.showToast = true

              this.$store.dispatch('saveUserToken',{token: result.token});
              this.$store.dispatch('saveUserloginType',{loginType: result.loginType});

              this.$router.push(`/home`)

            }else{
              this.showToastMsg = result.retMsg
              this.showToast = true
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
        },
        showPwd(){
          this.isShowPwd=!this.isShowPwd
        },back(){
          this.$router.back()
        }
      },
      computed: {
        rightPhone () {
          return /^1\d{10}$/.test(this.tel)
        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
    overflow: hidden
  }
  .bg{
    width: 100%;
    height: 10rem;
   /* background: url(img/pyy.jpg) ;*/
    min-height: 40vh;
    background-size: 100% 100%;
  }
  .bg >.back{
    position: relative;
    top:85%;
    color: black;
    font-size:1rem;

  }
  .bg> .rg{
    position: relative;
    display: block;
    text-align: center;
    top:70%;
    color: black;
    font-size:2rem;
  }
  .menu{
    width: 96%;
    border:.1rem solid #E1E1E1 ;
    border-radius: .5rem;
    margin: .2rem auto  ;
  }

  .menu >.invitation{
    width: 96%;
    border: .1rem solid #E1E1E1 ;
    border-radius: 2rem;
    margin:.6rem auto ;
    line-height: 3rem;

  }
  .menu>.invitation .font{
    position: absolute;
    margin-top: .1rem ;
    margin-left: .5rem;
  }
  #veiwing{
    border: none;
    outline: none;
    width:76%;
    line-height: 2rem;
    position: relative;
    margin-left: 4rem;
    font-size: 1rem;

  }
  .prompt{
    text-align: center;
    color: #B4B4B4;
  }
  .telephoneNumber{
    width: 96%;
    border: .1rem solid #E1E1E1 ;
    border-radius: 2rem;
    margin:.6rem auto ;
    line-height: 3rem;
  }
  .telephoneNumber>input{
    border: none;
    outline: none;
    line-height: 2rem;
    width: 90%;
    height: 100%;
    font-size: 1rem;
    margin-left: 1rem;
  }
  .verification, .password{
    width: 96%;
    border: .1rem solid #E1E1E1 ;
    border-radius: 2rem;
    margin:.6rem auto ;
    line-height: 3rem;
  }
  /*按钮*/
  .verification>.get{
    color:#D6B694;
    font-size: 1rem;
    padding: 0.5rem;
    margin-top:1rem ;
    border-radius: 1.5rem;
    outline:none;
    border:none;
    background-color: #FFFFFF;
  }
  .verification>input{
    border: none;
    outline: none;
    line-height: 2rem;
    width: 60%;
    height: 100%;
    font-size: 1rem;
    margin-left: 1rem;
  }
  .password>input{
    border: none;
    outline: none;
    line-height: 2rem;
    width: 80%;
    height: 100%;
    font-size: 1rem;
    margin-left: 1rem;
  }
  .password>.up{
    display: none;
  }
  .regist>button{
    width: 96%;
    border: none;
    outline: none;
    border-radius: 2rem;
    margin:.6rem  ;
    line-height: 3rem;
    font-size: 1.5rem;
    color: white;
    background-color: #B4854D;
  }
</style>
