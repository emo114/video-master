<template>
    <div>
      <div class="page">
        <x-header  class="headerTop" >
          漫画
          <a slot="right" @click="$router.push('extendUser')">
            推广记录
          </a>
        </x-header>
        <div class="img">
          <img src="http://www.baidu.com" />
        </div>
        <div class="bottom">
          <div> 保存二维码</div>
          <div> 复制链接</div>
        </div>
        <div class="VipBlank" style="height: 10rem;">
        </div>
      </div>
    </div>
</template>

<script>

  import {XHeader} from 'vux'

    export default {
        name: "Invitation",
      components: {
          XHeader
      }

    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }

  .header{
    width: 100%;
    height: 4rem;
    background-color: #000000;
  }
  .header> .content{
    text-align: center;
  }
  .header>.back{
    position: relative;
    top: 1.3rem;
    left: 1rem;
    color: #D5B771
  }
  .header >.content .my{
    line-height: 1.4rem;
    color: #D5B771 ;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .rem{
    position:absolute ;
    color: #D5B771;
    left: 83%;
    top:1.5rem;
    font-size: .8rem;
  }
  .bottom{
    position:fixed;
    width: 100%;
    height: 10%;
    bottom:0rem;
    background-color:#4B4B4B;

  }
  .page >.img{
    width: 100%;

    position: fixed;
  }
  .page>.img img{
    width: 100%;
    background-repeat: no-repeat;

  }
  .bottom  div{
    height: 100%;
    text-align: center;
    display: inline-block;
    width: 49%;
    line-height: 5rem;
    color: #D5B771;

  }
  .bottom div:not(:last-child){
    border-right:.1rem solid  white
  }
</style>
