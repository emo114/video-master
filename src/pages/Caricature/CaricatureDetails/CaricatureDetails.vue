<template>
  <div>
    <x-header :title="caricatureInfo.name"/>
    <div class="content">
      <div class='img'>
        <img :src="caricatureInfo.descCover" alt=""/>
      </div>
      <input type="text" name="introduce" id="introduce" :value="caricatureInfo.caricatureDesc" />
      <div class="view">
        <ul>
          <li><a>{{caricatureInfo.chapterNum}}</a></li>
          <li><a>{{caricatureInfo.watchNum}}次观看</a></li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li><a @click="handleCaricatureCollect">{{isCollect === '1'?'取消收藏': '加入收藏'}}</a></li>
        <li><a @click="toChapterNumPage()">全部章节</a></li>
        <li><a  @click="toReadPage()">立即阅读</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

  import {XHeader} from 'vux'
  import {getCaricatureInfo,addCaricatureCollect,delCaricatureCollect} from '../../../api'

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        caricatureId: null,
        caricatureInfo: {},
        isCollect: '0', // 是否收藏
      }
    },
    mounted() {
      const {caricatureId} = this.$route.params;
      this.caricatureId = caricatureId;
      this.getCaricatureInfo();
    },
    methods: {
      toChapterNumPage(){
        this.$router.push(`/caricatureChapterNum/${this.caricatureId}`)
      },
      toReadPage(){
        this.$router.push(`/caricaturePictureList/${this.caricatureInfo.chapterId}`)
      },
      async handleCaricatureCollect(){

        this.$vux.loading.show({
          text: ''
        });

        const isCollect = this.isCollect;

        let result = null;

        if(isCollect === '1'){ //取消收藏

          result = await delCaricatureCollect(this.caricatureId);

        }else { //收藏
          result = await addCaricatureCollect(this.caricatureId);
        }

        if(result.retCode === '1'){
          // 修改收藏状态
          this.isCollect = isCollect === '1'?'0':'1';
        }else{
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

        this.$vux.loading.hide();


      },
      async getCaricatureInfo(){

        this.$vux.loading.show({
          text: ''
        });

        const result = await getCaricatureInfo(this.caricatureId);
        if(result.retCode === '1'){
          this.caricatureInfo = result.data.caricatureMap;
          this.isCollect = result.data.isCollect;
        }else{
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

        this.$vux.loading.hide();
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0rem;
    padding: 0rem;
  }

  .top{

    width: 98%;
    height: 5%;
    position: fixed;
    top:.1rem;
  }
  .top .back{
    float: left;
  }
  .top> .tap{
    text-align: center;
  }

  .content{
    width: 96%;
    margin: 2rem auto;
    overflow: hidden;
  }
  .img{
    width: 98%;
    margin:.2rem auto;

  }
  .img > img{
    width: 100%;
    background-repeat:not-repeat ;
    background-attachment: fixed;
  }
  #introduce{
    position: relative;
    border: .1rem solid #DFDFDD;
    border-radius: .4rem;
    width: 98%;
    line-height:2rem ;
    margin:.2rem auto;
    text-align: center;
  }
  .content>.view{

    width: 98%;
    line-height:2rem ;
    margin:.2rem auto;
    text-align: center;
  }

  .view,.footer a{
    text-decoration: none;
  }

  .view>ul{
    width: 100%;
    height: 2rem;
    border: .1rem solid #DFDFDD;
    margin:2.5rem auto ;
    border-radius: .8rem;
  }
  .view >ul li{
    width: 48%;
    list-style: none;
    float: left;

  }
  .view ul>li:not(:last-child){
    border-right: .1rem solid #DFDFDD;
  }
  .footer{
    position: fixed;
    width: 99%;
    height: 5%;
    bottom: .2rem;
    margin: 0 auto;
    text-align: center;
  }
  .footer ul{
    width: 100%;
    height: 100%;
    list-style: none;

    border: .1rem solid #DFDFDD;
    border-radius: .6rem;
    background:#eff7ff
  }
  .footer ul>li{
    float: left;
    width: 33%;
    height: 100%;
    line-height: 2.5rem;
    text-align: center;

  }
  .footer ul>li:not(:last-child){
    border-right: .1rem solid #DFDFDD;
    background-color: white;
  }
  .footer ul{
    background:   #CC9966;
  }
</style>
