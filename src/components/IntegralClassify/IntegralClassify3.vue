<template>
  <div>
    <div class="project" v-for="(item,index) in integralClassifies" :key="index">

      <div class="first">
        <div class="img">
          <img :src="item.icon"></img>
        </div>
        <div class="everyday">
          <div >
            <span>{{item.name}}</span>
            <span>+{{item.number}}</span>
          </div>
          <div class="explain">{{item.integral_desc}}</div>
        </div>
        <div class="finish">
          <button :disabled="item.isAccomplish === 1">{{item.isAccomplish === 1?'已完成': '去完成'}}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "IntegralClassify",
    data(){
      return {
        width: screen.availWidth,
        height: screen.availHeight,
      }
    },
    props: {
      integralClassifies: Array,
      integralNumber: Number
    }
  }
</script>

<style scoped>
  .project .first  .img{
    /*float: left;*/
    /*margin: .8rem .5rem;*/
  }
  .project>.first  >.img img {
    width:2rem;
    height:5rem ;
    /*border: .1rem solid;*/

  }

  .project{
    width: 100%;
    height: 6rem;
    background-color: #000000;
  }
  .project> .first .everyday{
    /*float:left;*/
    margin-left:.1rem ;
    margin-top: 1rem;
    color: white;
  }
  .project .first .everyday span{

  }
  .project> .first>.everyday .explain{
    margin-top: .2rem;
    line-height: 1rem;
    width: 12rem;
    height: 2.4rem;
    font-size: 0.1rem;
  }
  .project> .first  >.finish {
    float: right;
    margin-top:1.7rem ;
    margin-right:2rem;
    width: 5rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 2rem;
    border:.1rem solid #D5B771;
    color: #D5B771;
  }

  .project> .first  >.finish button{
    border: none;
    outline: none;
    background-color: #000000;
    color: #D5B771;
    font-size: 1rem;
  }
</style>
