<template>
  <div class="MyPageContainer">
    <div >
      <div class="headContainer" :style="{width: `${width/16}rem`}">
        <flexbox :gutter="0">
          <flexbox-item :span="1/4">
            <div class="headLeft">
              <img src="./img/zuanshi1.png" alt="">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="headMiddle" :style="{'font-size': ((width/16)/30) + 'rem'}" >
              <span >{{personal.memberInfo.nickName}}</span >
              <br>
              <span >ID:{{personal.memberInfo.memberId}}</span>
              <br>
              <span >我的邀请码：{{personal.memberInfo.extensionCode}} <i class="iconfont" @click="copyInviteCode(personal.memberInfo.extensionCode)">&#xe863;</i></span>
              <br>
              <span >等级分布：{{personal.memberInfo.nexName}}   </span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/5">
            <div @click="skipToRouter(0)" class="headBottom">
              <span  class="iconfont icon" :style="{'font-size': ((width/16)/15) + 'rem'}" >&#xe612;</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>


    <div class="watchContainer" :style="{width: ((width/16)/3) + 'rem',height: ((width/16)/3) + 'rem','font-size': ((width/16)/30) + 'rem'}">
      <div class="watchLeft">
        <span>观看次数</span>
        <span class="watchSpan">{{personal.memberInfo.usedViewNum}}/{{personal.memberInfo.viewNum}}</span>
      </div>
      <div class="watchRight">
        <span>积分详情</span>
        <span class="watchSpan">{{personal.memberInfo.integralNumber}}</span>
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


    <div class="iconContainer" :style="{'font-size': (width/480) + 'rem'}" >
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


    <div  class="iconContainer iconContainerBelow"  :style="{'font-size': (width/480) + 'rem'}">
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
<!--    <div  class="blank">-->

<!--    </div>-->

    <toast v-model="showToast" type="text" :time="1000" is-show-mask :text="showToastMsg"  position="buttom"></toast>

  </div>


</template>

<script>
  import {Flexbox, FlexboxItem,Toast} from 'vux'
  import {getMemberInfo} from '../../api'
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
    components: {
      Flexbox,
      FlexboxItem,
      Toast
    },
    mounted(){
      this.getMemberInfo({})
    },methods:{
      async getMemberInfo(params){
          const result = await getMemberInfo(params)
          if(result.retCode==='1'){
            console.log(result)
            this.personal = result.data
          }
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
        },


    }
  }
</script>

<style scoped>


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








  .iconContainer {
  }

  .iconContainer .icon {
    display: inline-block;
    /*margin-left: 8%;*/
    text-align: center;
  }

  .iconContainer .iconTop {
    border-radius: 50%;
    border: 0.2rem solid #DBB97C;
    text-align: center;
    margin: 0 auto;
  }
  .iconContainer .iconTop .icon1 {
    color: #DBB97C;
  }
  .iconContainer .iconTop .icon2 {
    color: #DBB97C;
  }
  .iconContainer span {
    color: #DBB97C;
    display: block;
  }

  .iconContainer .span1 {
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



  .blank {
    width: 100%;
    height: 20rem;
  }
</style>
