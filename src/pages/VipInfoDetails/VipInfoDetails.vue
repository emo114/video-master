<template>
  <div style="background-color:#000000 ">
    <div  class="header" ref="header">
      <span class="back iconfont" @click="back">&#xe61a;</span>
      <div class="view">
        <div class="look font">尊享vip无限观影</div>
        <div class="list">
          <div class="member open">
            <i class="iconfont crown ">&#xe82a;</i>
            <div class="font" v-show="isVip">已开通vip</div>
            <div class="font" v-show="!isVip">未开通vip</div>
          </div>
          <div class="member">
            <div class="font">{{integralNumber}}</div>
            <div class="font"><a >会员积分></a>  </div>
          </div>
          <div  class="member ok">
            <i class="iconfont diamond">&#xe65d;</i>
            <div class="font">Id:0</div>
          </div>
        </div>
      </div>
      <div class="menu" >
        <tab>
          <tab-item  style="background-color: #000000;color:#D5B771;" @on-item-click="changeRouterType(2)">获取积分</tab-item>
          <tab-item  style="background-color: #000000;color:#D5B771;" @on-item-click="changeRouterType(3)">积分兑换</tab-item>
          <tab-item  style="background-color: #000000;color:#D5B771;" @on-item-click="changeRouterType(1)">购买vip</tab-item>
        </tab>
      </div>
    </div>
    <div class="empty" :style="{height: (headHeight/13) + 'rem'}"></div>
    <IntegralClassify :getIntegralClassifies="getIntegralClassifies" :integralNumber="integralNumber" :integralClassifies="integralClassifies" v-show="showType === 2" />


    <ExchangeVip :getExchangeVipTypes="getExchangeVipTypes" :exchangeVipTypes="exchangeVipTypes"  :integralNumber="integralNumber" v-show="showType === 3"  />


    <BuyVip :payTypes="payTypes" :cardTypes="cardTypes"  v-show="showType === 1"  />


  </div>

</template>

<script>
  import {Tab, TabItem} from 'vux'
  import IntegralClassify from '../../components/IntegralClassify/IntegralClassify'
  import ExchangeVip from '../../components/ExchangeVip/ExchangeVip'
  import BuyVip from '../../components/BuyVip/BuyVip'

  import {getIntegralClassifies,getExchangeVipTypes,getPayType,getVipList} from '../../api'

  export default {
    components: {
      Tab,
      TabItem,
      IntegralClassify,
      ExchangeVip,
      BuyVip
    },
    data() {
      return {
        showType: 1,  // 1显示获取积分分类， 2: 会员积分兑换
        width: screen.availWidth,
        height: screen.availHeight,
        isVip: 0, // 是否是会员
        integralNumber: 0, //积分数
        headHeight: null,
        integralClassifies: [], // 积分兑换类型
        exchangeVipTypes: [],
        payTypes:[],
        cardTypes:[]
      }
    },
    mounted() {

      this.getHeadHeight();

      this.getIntegralClassifies();

      this.getExchangeVipTypes();

      this.getPayType()

      this.getVipList()

      this.showType= parseInt(this.$route.params.showType);


    },
    methods: {
      getHeadHeight() {
        this.headHeight = this.$refs.header.offsetHeight
      },
      changeRouterType(showType){
        this.showType = showType;
        switch (showType) {
          case 1:{
            this.getPayType()
            this.getVipList()
            const loginType = this.$store.state.loginType
            if(!(loginType===1)){
              this.$router.push('/login')
            }
          }
            break;
          case 2:{
            this.getIntegralClassifies()
          }
            break;
          case 3:{
            this.exchangeVipTypes()
          }
            break;
        }
      },
      async getIntegralClassifies(){

        this.$vux.loading.show({
          text: ''
        });

        const result = await getIntegralClassifies();

        if(result.retCode === '1'){
          this.integralClassifies = result.integralClassifyList;
          this.integralNumber = result.integralNumber;
        }else{

          this.$vux.toast.text('出错了~~~', 'bottom')
        }

        this.$vux.loading.hide();


      },
      async getExchangeVipTypes(){

        this.$vux.loading.show({
          text: ''
        });

        const result = await getExchangeVipTypes();

        if(result.retCode === '1'){
          this.exchangeVipTypes = result.data.integralVipList;
        }else{
          this.$vux.toast.text('出错了~~~', 'bottom')
        }

        this.$vux.loading.hide();

      },
      async getPayType(){
        const result = await getPayType()
        if(result.retCode==='1'){
          this.payTypes = result.data
        }
      },
      async getVipList(){
        const result = await getVipList()
        if(result.retCode==='1'){
          this.cardTypes = result.data
        }
      },
      back(){
        this.$router.back()
      }

    },
    watch:{
      '$store.state.token':  (token) => {
        if(token===null||token===''){

        }
      }
    },

  }
</script>

<style scoped>

  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
    overflow-x:hidden ;
  }
  .back{
    float: left;
    /*position: relative;*/
    font-size: 1.8rem;
    display: inline-block;
    margin: 0.1rem  0  0 0.1rem;
  }
  .header{
    background-color: black;
    position: fixed;
    top: 0;
    width: 100%;
    height: 12rem;
    background: url(img/integral_back.png) ;
    /*min-height: 24vh;*/
    background-size: 100% 100%;
    /*background-attachment: fixed;*/
  }
  .view{
    position: relative;
    width: 90%;
    height: 10rem;
    margin: 0 auto;
    top:19% ;
    right: 1rem;
    background:url(img/integral_xiao.png) ;
    background-attachment: fixed;
    min-height: 20vh;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .header> .view .look{
    position: relative;
    display: block;
    top:4%;
    left: 2%;
  }
  .header>.view> .list{
    position: relative;
    text-align: center;
    top:35%;
  }
  .header>.view >.list .member{
    float: left;
    width: 33%;
  }
  .header>.view .open{
    margin: -2rem auto;
  }
  .header>.view .ok{
    margin: -1rem auto;
  }
  .header >.view>.list>.member .crown {
    font-size: 4rem;
    color: white;
  }
  .header >.view>.list>.member .diamond{
    font-size: 3rem;
    color: #4DE7FD;
  }
  .header >.view .font{
    color: #D5B771;
  }
  .menu{
    width: 100%;
    border: .1rem solid;
    background-color: black;
    position: relative;
    margin: 2rem auto 0 auto;
    background-attachment: fixed;
  }


  .empty{
    width: 100%;
    background-color: #000000;
  }

  .earn:before,
  .earn:after{
    content: "";
    display: table;
    clear: both;
  }
  .earn{

    margin-bottom:1rem ;
    width: 100%;
    height:6rem;
    /*border: .1rem solid;*/
    background:#000000 ;
  }
  .earn .bg{
    float: left;
    width: 20%;
    margin-top: 0.5rem;
    margin-left:0.6rem ;
  }
  .earn> .bg img{
    width: 5rem;
  }
  .earn> .detail {
    width:40% ;
    margin-left:7rem;
    margin-top:1rem ;

  }
  .earn> .detail .note{
    width: 100%;
    font-size: .02rem;
  }
  .earn .everyday{
    margin-bottom:0.2rem ;
  }
  .earn .everyday .here{
    color: white;

  }
  .earn .everyday .num{
    color: #D5B771;
  }
  .earn .detail .note{
    color: #D5B771;

  }
  .earn .finish{
    float: right;
    margin-top:-2rem ;
    margin-right:1.2rem;
    width: 5rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 2rem;
    border:.1rem solid #D5B771;
    color: #D5B771;
    background-color:#D5B771
  }
  .earn> .finish button {
    border: none;
    outline: none;
    background-color:#D5B771 ;
    font-size: 1rem;
  }
  .black{
    background-color: #000000;
  }
</style>
