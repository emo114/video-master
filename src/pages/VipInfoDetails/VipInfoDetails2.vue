<template>

  <div>

    <div class="header" ref="header">
      <span class="back">
       <i class="iconfont " style="color: white ; font-size: 2rem ;float:left">&#xe61a;</i>
      </span>
      <div class="view">

        <div class="look font">尊享vip无限观影</div>
        <div class="list">
          <div class="member open">
            <i class="iconfont crown ">&#xe82a;</i>
            <div class="font">已开通vip</div>
          </div>
          <div class="member">
            <div class="font">120</div>
            <div class="font"><a>会员积分></a></div>
          </div>
          <div class="member ok">
            <i class="iconfont diamond">&#xe65d;</i>
            <div class="font">已开通vip</div>
          </div>
        </div>
      </div>
      <div class="headerBottom">
        <tab>
          <tab-item  style="background-color: #000000;color:#D5B771;" @on-item-click="changeRouterType(1)">获取积分</tab-item>
          <tab-item  style="background-color: #000000;color:#D5B771;" @on-item-click="changeRouterType(2)">积分兑换</tab-item>
          <tab-item  style="background-color: #000000;color:#D5B771;" @on-item-click="changeRouterType(3)">购买vip</tab-item>
        </tab>
      </div>
    </div>
    <div class="empty" :style="{height: (headHeight/16) + 'rem'}"></div>

    <IntegralClassify :integralNumber="integralNumber" :integralClassifies="integralClassifies" v-show="showType === 1" />

    <ExchangeVip :exchangeVipTypes="exchangeVipTypes"  :integralNumber="integralNumber" v-show="showType === 2"  />


  </div>

</template>

<script>

  import {Tab, TabItem} from 'vux'

  import IntegralClassify from '../../components/IntegralClassify/IntegralClassify'
  import ExchangeVip from '../../components/ExchangeVip/ExchangeVip'

  import {getIntegralClassifies,getExchangeVipTypes} from '../../api'

  export default {
    name: "VipInfoDetails",
    components: {
      Tab,
      TabItem,
      IntegralClassify,
      ExchangeVip
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
      }
    },
    mounted() {
      this.getHeadHeight();

      this.getIntegralClassifies();

      this.getExchangeVipTypes();

    },
    methods: {
      getHeadHeight() {
        this.headHeight = this.$refs.header.offsetHeight
      },
      changeRouterType(showType){
        this.showType = showType;
      },
      async getIntegralClassifies(){

        this.$vux.loading.show({
          text: ''
        });

        const result = await getIntegralClassifies();

        if(result.retCode === '1'){
          this.integralClassifies = result.integralClassifyList;
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


    }
  }
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    /*overflow-x: hidden;*/
  }
  .back{
    font-size:0.2rem;
     float: left;
  }

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 10rem;
    background: url(img/integral_back.png);
    min-height: 30vh;
    background-size: 100% 100%;
  }

  .view {
    position: relative;
    width: 90%;
    height: 10rem;
    margin: 0 auto;
    top: 15%;
    background: url(img/integral_xiao.png);
    min-height: 25vh;
    background-size: 100% 100%;

  }

  .header > .view .look {
    position: relative;
    display: block;
    top: 4%;
    left: 2%;
  }

  .header > .view > .list {
    position: relative;
    text-align: center;
    top: 35%;
  }

  .header > .view > .list .member {
    float: left;
    width: 29%;
  }

  .header > .view .open {
    margin: -2rem auto;
  }

  .header > .view .ok {
    margin: -1rem auto;
  }

  .header > .view > .list > .member .crown {
    font-size: 4rem;
    color: white;
  }

  .header > .view > .list > .member .diamond {
    font-size: 3rem;
    color: #4DE7FD;
  }

  .header > .view .font {
    color: #D5B771;
  }

  .headerBottom {
    background-color: #000000;
    color: #D5B771;
  }


  .empty {
    width: 100%;
    height:15rem ;
    background-color: black;
  }


</style>
