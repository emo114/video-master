<template>
  <div>
    <div class="black">


      <div class="empty"></div>
      <div >
        <div :class="selectClass" @click="selectCard(cardType.index)"  v-for="(cardType,index) in cardTypes" :key="index">
          <div class="details">
            <div class="category">{{cardType.cardTypeName}}</div>
            <div class="note">{{cardType.dayNum}}天内每日观影次数无线，高清专属资源，缓存次数{{cardType.cacheNum}}</div>
          </div>
          <div class="price"> ￥{{cardType.price}} </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="details">
          <div class="category">天卡</div>
          <div class="note">沙发沙发是的发生大法师法沙发沙发是的发生大法师·</div>
        </div>
        <div class="price"> ￥16.80 </div>
      </div>

      <div class="card1">
        <div class="details">
          <div class="category">天卡</div>
          <div class="note">沙发沙发是的发生大法师法沙发沙发是的发生大法师·</div>
        </div>
        <div class="price"> ￥16.80 </div>
      </div>

      <div class="card">
        <div class="details">
          <div class="category">天卡</div>
          <div class="note">沙发沙发是的发生大法师法沙发沙发是的发生大法师·</div>
        </div>
        <div class="price"> ￥16.80 </div>
      </div>

      <div class="card">
        <div class="details">
          <div class="category">天卡</div>
          <div class="note">沙发沙发是的发生大法师法沙发沙发是的发生大法师·</div>
        </div>
        <div class="price"> ￥16.80 </div>
      </div>

      <div class="card">
        <div class="details">
          <div class="category">天卡</div>
          <div class="note">沙发沙发是的发生大法师法沙发沙发是的发生大法师·</div>
        </div>
        <div class="price"> ￥16.80 </div>
      </div>


      <div  class="pay">
        <div class="method">请选择支付方式 </div>
        <table>
          <tr>
            <td><img src="img/img/ic_zhifubao.png" /><span>支付宝</span></td>
            <td><img src="img/img/ic_weixin.png" />  <span>微信</span> </td>
            <td><img src="img/img/ic_car.png"  /> <span>卡密激活</span></td>
          </tr>
        </table>
      </div>
      <div class="cardcode">
        <input type="text"  id="code" placeholder="请输入卡密"  />
        <input type="button"  id="use"   value="使用"/>
      </div>
    </div>
  </div>

  <div class="bottom">
    <div class="money">
      <span class="rechange">充值金额</span>
      <span class="price">￥3400.00</span>
    </div>
    <div class="now">立即充值</div>
  </div>
  <div class="VipBlank" style="height: 10rem;">
  </div>
</template>

<script>


    export default {
      props:{
        payTypes:Array,
        cardTypes:Array,
      },data(){
        return{
          selectClass:'card',
        }
      },methods:{
        selectCard(){

        }
      }
    }
</script>

<style scoped>
  .black{
     background-color: whitesmoke;
  }
  .empty{
    width: 100%;
    height:37% ;
    background-color: #000000;
  }
  .card{
    margin: 1rem auto;
    width: 96%;
    height: 6rem;

    border: .1rem solid  #D5B771 ;
    border-radius: 1rem ;
  }
  .card> .details{

    width: 65%;
    height: 100%;
    margin-left: 1rem;
    float: left;
  }

  .selectCard {
    margin: 1rem auto;
    width: 96%;
    height: 6rem;
    border: .1rem solid #D5B771;
    border-radius: 1rem;
    background-color: #F6F2C5;
  }

  .card> .details .category{
    margin:0.5rem auto ;
    font-size: 1rem;
    font-weight: bold;
  }
  .card>.details .note{
    width: 100%;
    margin: 0.4rem auto;

  }
  .price{
    color:red;
    font-size:1.2rem ;
    font-weight:bold;
    line-height: 6rem;
  }

  .card1{
    margin: 1rem auto;
    width: 96%;
    height: 6rem;
    border: .1rem solid  #D5B771 ;
    border-radius: 1rem ;
    background-color:  #F6F2C5;
  }
  .card> .details , .card1> .details{
    width: 65%;
    height: 100%;
    margin-left: 1rem;
    float: left;
  }
  .card .details .category , .card1> .details .category{
    margin:0.5rem auto ;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .card>.details .note , .card1>.details .note{
    width: 100%;
    margin: 0.4rem auto;
    color: #B4AE94;
  }
  .card >.price, .card1 >.price{
    color:red;
    font-size:1.5rem ;
    font-weight:bold;
    line-height: 5rem;
  }
  .method{
    width: 100%;
    height: 2rem;
    margin-left: 0.7rem;
  }
  .pay  table{
    width: 100%;


  }

  .pay  table td {
    width: 33%;
    text-align: center;

  }
  .pay  table td img{
    margin: .1rem auto;
  }
  .pay  table td span{
    position: relative;
    top:-0.8rem;
  }
  .bottom{
    position:fixed;
    width: 100%;
    height: 10%;
    bottom:0rem;
    background-color: white;
  }
  .bottom>.money{
    width:60% ;
    float: left;
    line-height: 4rem;
    margin-left: 2rem;
    background-color: white;
  }
  .bottom .now{
    margin-left: 30%;
    text-align: center;
    line-height: 4rem;
    background-color:#EF7601 ;
    color: white;
  }
  .bottom .money .rechange{
    color:#B4AE94 ;
  }
  .bottom .money .price{
    color: red;
  }

  .cardcode{
    margin-top: 1rem;
    margin-left: 3%;
  }
  .cardcode #code{
    outline: none;
    width: 63%;
    height: 2rem;
    border-radius:.3rem ;
  }
  .cardcode #use{
    border: none;
    width: 5rem;
    height: 2rem;
    border-radius:1rem ;
    outline: none;
    background-color: #EF7601;
    margin-left: 10%;
    color: white;
  }
</style>
