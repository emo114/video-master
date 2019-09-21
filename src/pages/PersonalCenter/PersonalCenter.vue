<template>
  <div class="MyPageContainer" >
    <div class="MyPage"  >
      <div class="Fixed">
      <div class="headContainer" :style="{width: `${width/16}rem`}">
        <flexbox :gutter="0">
          <flexbox-item :span="1/4">
            <div class="headLeft">
              <img src="./img/zuanshi1.png" alt="">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="headMiddle" :style="{'font-size': ((width/16)/30) + 'rem'}" >
              <span >{{personal.memberInfo?personal.memberInfo.nickName:'游客'}}</span >
              <br>
              <span >ID:{{personal.memberInfo?personal.memberInfo.id:0}}</span>
              <br>
              <span >我的邀请码：{{personal.memberInfo?personal.memberInfo.extensionCode:0}} <i class="iconfont" @click="copyInviteCode(personal.memberInfo.extensionCode)">&#xe863;</i></span>
              <br>
              <span >等级分布：{{personal.memberInfo?personal.memberInfo.nexName:0}}   </span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/5">
            <div class="headBottom">
              <span @click="skipToRouter(0)" class="iconfont icon" :style="{'font-size': ((width/16)/15) + 'rem'}" >&#xe612;</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>



    <div class="watchContainer" :style="{width: ((width/16)/3) + 'rem',height: ((width/16)/3) + 'rem','font-size': ((width/16)/30) + 'rem'}">
      <div class="watchLeft">
        <span>观看次数</span>
        <span class="watchSpan">{{personal.memberInfo?(personal.memberInfo.viewNum - personal.memberInfo.usedViewNum):0}}/{{personal.memberInfo?personal.memberInfo.viewNum:0}}</span>
      </div>
      <div class="watchRight">
        <span>积分详情</span>
        <span class="watchSpan">{{personal.memberInfo?personal.memberInfo.integralNumber:0}}</span>
      </div>
    </div>


    <div class="integralContainer"  >
      <div  class="integral"   :style="{width: (width/76) + 'rem',height: (width/76) + 'rem','line-height': (width/76)+ 'rem',  'font-size': ((width/16)/30) + 'rem'}">
        <span @click="skipToRouter(1)">购买VIP</span>
      </div>
      <div  class="integral" :style="{width: (width/76) + 'rem',height: (width/76) + 'rem','line-height': (width/76)+ 'rem',  'font-size': ((width/16)/30) + 'rem'}">
        <span @click="skipToRouter(2)">获取积分 </span>
      </div>
      <div  class="integral" :style="{width: (width/76) + 'rem',height: (width/76) + 'rem','line-height': (width/76)+ 'rem',  'font-size': ((width/16)/30) + 'rem'}">
        <span @click="skipToRouter(3)">兑换VIP</span>
      </div>
    </div>


    <div class="iconContainer1" :style="{'font-size': (width/480) + 'rem'}" >
      <div @click="skipToRouter(4)"  class="icon icon3">
        <div class="iconTop" :style="{width: (width/150) + 'rem',height: (width/150) + 'rem'}">
          <span class="iconfont icon1" :style="{'font-size': (width/160) + 'rem'}" >&#xe65b;</span>
        </div>
        <span>账号(未绑定)</span>
        <span class="span1">切换/绑定账号</span>
      </div>
      <div @click="skipToRouter(5)"  class="icon   icon4">
        <div class="iconTop" :style="{width: (width/150) + 'rem',height: (width/150) + 'rem'}">
          <span class="iconfont" :style="{'font-size': (width/160) + 'rem'}">&#xe604;</span>
        </div>

        <span >邀请好友</span>
        <span class="span1  span2">免费获取积分</span>

      </div>
      <div @click="skipToRouter(6)" class="icon  icon5">
        <div class="iconTop" :style="{width: (width/150) + 'rem',height: (width/150) + 'rem'}">
          <span class="iconfont icon2" :style="{'font-size': (width/160) + 'rem'}">&#xe601;</span>
        </div>
        <span >我的收藏 </span>
        <span class="span1 span2"  >&nbsp</span>
      </div>

    </div>


    <div  class="iconContainer1 iconContainer1Below"  :style="{'font-size': (width/480) + 'rem'}">
      <div @click="skipToRouter(7)" class="icon   icon6" >
        <div class="iconTop" :style="{width: (width/150) + 'rem',height: (width/150) + 'rem'}">
          <span class="iconfont icon1" :style="{'font-size': (width/160) + 'rem'}">&#xe625;</span>
        </div>
        <span  >&nbsp联系客服&nbsp</span>
      </div>
      <div @click="skipToRouter(8)" class="icon  icon7" >
        <div class="iconTop" :style="{width: (width/150) + 'rem',height: (width/150) + 'rem'}">
          <span class="iconfont icon2" :style="{'font-size': (width/160) + 'rem'}">&#xe64c;</span>
        </div>
        <span >火爆聊天群</span>
      </div>
      <div @click="skipToRouter(9)" class="icon  icon8 " >
        <div class="iconTop" :style="{width: (width/150) + 'rem',height: (width/150) + 'rem'}">
          <span class="iconfont icon2" :style="{'font-size': (width/160) + 'rem'}">&#xe71d;</span>
        </div>
        <span >观看历史</span>
      </div>

    </div>
    </div>
      <div class="blankPersonal">

      </div>


    <toast v-model="showToast" type="text" :time="1000" is-show-mask :text="showToastMsg"  position="buttom"></toast>
      <toast v-model="showToast" type="text" :time="1000" is-show-mask :text="showToastMsg"  position="buttom"></toast>
      <div v-transfer-dom>
        <confirm v-model="isShowConfirmOut"
                 title="提示"
                 theme="android"
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm"
                 @on-show="onShow"
                 @on-hide="onHide">
          <span style="font-size: 2.5rem" class="icon iconfont">&#xe864;</span>
          <span style="text-align:center;color: #B38855">您的登录已经过期，是否重新登录</span>
        </confirm>
      </div>

    </div>
  </div>


</template>

<script>
  import {Flexbox, FlexboxItem,Toast,Confirm,TransferDomDirective as TransferDom} from 'vux'


  import {getMemberInfo,authLogin} from '../../api'

  import uuid from 'uuid'
  import {genLoginParams} from '../../utils/loginUtils'
  export default {
    data(){
      return{

        personal:{},
        width: screen.availWidth,
        height: screen.availHeight,
        showToastMsg:'',
        showToast: false,
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      Toast,
      Confirm
    },
    mounted(){
      this.checkIsLayout()
      this.getMemberInfo({})
    },methods:{
      async getMemberInfo(params){

        this.$vux.loading.show({
          text: ''
        });

        const result = await getMemberInfo(params)
        if(result.retCode==='1'&&result.httpCode===200){
          console.log(result)
          this.personal = result.data
        }else if(result.httpCode===801){
          this.$nextTick(()=>{
            this.checkIsLayout()
          })

        }
        this.$vux.loading.hide();

      },copyInviteCode(copyContent){
        console.log('--------'+copyContent);
        this.$copyText(copyContent).then((e)=>{
          this.showToastMsg = '复制成功'
          this.showToast = true
        }, (e)=> {

          console.log(e)
        })
      },
      skipToRouter(type){
        console.log('路由跳转'+type)
        //this.$router.push(`/xx`)
        switch (type) {
          /*SetUp.vue*/
          case 0: this.$router.push(`/setUp`)
            break;
          /*购买vip 如果未登录跳转登录 */
          case 1:  this.$router.push(`/vipInfoDetails/1`)
            break;
            /*获取积分*/
          case 2:this.$router.push(`/vipInfoDetails/2`)
            break;
            /*兑换vip*/
          case 3:this.$router.push(`/vipInfoDetails/3`)
            break;
            /*登录*/
          case 4:
            this.$router.push(`/login`)
            break;
            /*邀请好友*/
          case 5:
            this.$router.push('/invitation');
            break;
          /*我的收藏*/
          case 6: this.$router.push(`/myCollections`)
            break;
            /*联系客服*/
          case 7:
            break;
            /*聊天群*/
          case 8: window.location.href = 'https://tb.53kf.com/code/client/10171574/1'

            break;
            /*观看历史 */
          case 9: this.$router.push(`/ViewHistory`)
            break;
        }
      },
    checkIsLayout(){
      this.isShowConfirmOut = true
    },onCancel(){
      console.log('onCancel')
      this.autoLogin()
    },onShow(){
      console.log('')
    },onHide(){
      console.log('')
    },onConfirm(){
      console.log('跳转到登录页面')
      this.$router.push('/login')
    },
    /**
     * 自动登录
     */
    async autoLogin() {

      // 从localStore中查询是否存在uuid
      let deviceCode = localStorage.getItem('deviceCode');

      if (!deviceCode) {
        // 存入uuid
        deviceCode = uuid();
        localStorage.setItem('deviceCode', deviceCode);
      }

      const loginParams = genLoginParams(deviceCode);

      const result = await authLogin(loginParams);

      if (result.retCode === '1' && result.token) { // 保存token到store中

        this.$store.dispatch('saveUserToken',{token: result.token,loginType: result.loginType});

      } else { //提示错误信息
        this.$vux.toast.text(result.retMsg, 'bottom')
      }

    },


    }
  }
</script>

<style scoped>
  .MyPage{
    width: 100%;
    position: fixed;
    top: 0;
    background-image: url('./img/mine_back.jpg') ;
    background-size: contain;
  }
  .Fixed{


  }



  .headContainer .headLeft {
    margin: 10%;
  }

  .headContainer .headLeft img {
    width: 100%;
  }

  .headContainer .headMiddle {
    margin-top: 5%;
    display: inline-block;
  }

  .headContainer .headMiddle span {
    color: white;
    display: inline-block;
    margin: 1% 0;
  }

  .headContainer .headBottom {
    width: 10%;
    display: inline-block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .headContainer .icon {
    color: #DBB97C;
  }





  .watchContainer {
    background: url("./img/btn_bg01.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    margin: 3% auto;
  }

  .watchContainer span {
    color: #000000;
    margin: 0 25%;
    display: block;
    /*font-size: 0.8rem;*/
  }

  .watchContainer .watchLeft {
    margin: 5% 0 10% 0;
    text-align: left;
    padding:18%  10% 0 0;
  }

  .watchContainer .watchRight {
    margin: 13% 0 0 0;
    text-align: right;
  }

  .watchContainer .watchSpan {
    color: red;
    margin-top: 2%;
  }
  .integralContainer{
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .integral {
    display: inline-block;
    background: url("./img/btn_bg02.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    margin: 0 3%  0  7%;
  }

  .integral span {
    color: white;
  }






  .iconContainer1 .icon {
    display: inline-block;
    /*margin-left: 8%;*/
    text-align: center;
  }

  .iconContainer1 .iconTop {
    border-radius: 50%;
    border: 0.2rem solid #DBB97C;
    text-align: center;
    margin: 0 auto;
  }
  .iconContainer1 .iconTop .icon1 {
    color: #DBB97C;
  }
  .iconContainer1 .iconTop .icon2 {
    color: #DBB97C;
  }
  .iconContainer1 span {
    color: #DBB97C;
    display: block;
  }

  .iconContainer1 .span1 {
    color: #FA4544;
    display: block;
  }


  .icon3,.icon4{
    margin-left: 10%;
  }

  .icon5{
    margin-left: 14%;
  }
  .icon8{
    margin-left: 16%;
  }
  .icon6{
    margin-left: 13%;
  }
  .icon7{
    margin-left: 15%;
  }



  .blankPersonal {
    width: 100%;
    height: 20rem;
  }
</style>
