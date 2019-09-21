<template>
  <div>
    <div class="project" v-for="(item,index) in exchangeVipTypes" :key="index">
      <div class="first">
        <div class="img">
          <img :src="item.icon"/>
        </div>
        <div class="everyday">
          <span>{{item.dayNumber}}天vip特权</span>
          <div class="explain">{{item.integralNumber}}积分</div>
        </div>
        <div class="finish">
          <button :disabled="item.integralNumber < integralNumber">{{item.integralNumber < integralNumber? '积分不足': '立即兑换'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Exchangevip",
    props: {
      exchangeVipTypes: Array,
      integralNumber: Number
    }
  }
</script>

<style scoped>
  .project > .first > .img {
    float: left;
    margin: .8rem .5rem;
  }

  .project > .first > .img img {
    width: 4rem;
    height: 4rem;
    border: .1rem solid;

  }

  .project {
    width: 100%;
    height: 6rem;
    background-color: #000000;
  }

  .project > .first .everyday {
    float: left;
    margin-left: 1rem;
    margin-top: 1rem;
    color: white;
  }

  .project > .first .explain {
    width: 9.4rem;
    height: 2.4rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .project > .first > .finish {
    float: right;
    margin-top: 1.7rem;
    margin-right: 2rem;
    width: 5rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 2rem;
    border: .1rem solid #D5B771;
    color: #D5B771;
  }

  .project > .first > .finish button {
    border: none;
    outline: none;
    background-color: #000000;
    color: #D5B771;
    font-size: 1rem;
  }


</style>
