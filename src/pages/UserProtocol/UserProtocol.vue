<template>
  <div>
    <x-header  style="background-color: #FFFFFF">
      <span style="color: #252628">用户协议</span>
    </x-header>
    <div class="content">
      <h3>汽球视频用户协议</h3>
      <div class="detail">
        <span> 特别提示:</span>
        <span> 您在使用汽球视频提供的各项服务之前，请您务必审慎阅读、充分理解本协议各条款内容，包括但不限于免除或者限制责任的条款。如您不同意本服务协议及/或随时对其的修改，您可以主动停止使用汽球视频提供的服务;您一旦使用汽球视频提供的服务，即视为您已了解并完全同意本服务协议各项内容，包括汽球视频对服务协议随时所做的任何修改，并成为我们的用户</span>
        <span>一.总则</span>
        <span>1.1用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序。用户注册后即表示用户与汽球视频达成协议，完全接受本协议项下的全部条款。</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "UserProtocol",
    components: {
      XHeader
    }
  }
</script>

<style scoped>
  * {
    margin: 0rem;
    padding: 0rem;
  }
  .content h3{
    text-align: center;
  }
  .content {
    margin:  1rem;
  }
  .detail{
    text-align: left;
    margin-top: 2rem;
  }
  .detail span{
    display: block;
  }




</style>
