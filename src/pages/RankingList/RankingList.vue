<template>
  <div class="RankingContainer">
    <tab class="headContainer">
      <tab-item style="background-color:#323232;" :selected="index === 0"  class="vux-center" @on-item-click="getRankingList(index)" v-for="(item, index) in rankingListClassifys" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>

    <scroller lock-x scrollbar-y ref="scroller">
      <div class="subjectContainer">

        <div class="filmContainer" @click="toMoviePage(item.id)" v-for="(item,index) in rankingList" :key="index">
          <div class="film">
            <a href="javaScript:">
              <img :src="item.video_cover" alt="">
              <span>{{item.video_name}}</span>
            </a>
          </div>
          <div class="Ranking">
            <span>{{item.payNum}}播放</span>
            <span>{{item.cent}}点赞</span>
          </div>

        </div>
      </div>
    </scroller>

  </div>
</template>

<script>
  import { Tab, TabItem,Scroller } from 'vux'
  import {findEverydayPays,findMonthlyPays,findWeeklyPays} from '../../api'

  export default {
    name: "Ranking",
    components: {
      Tab,
      TabItem,
      Scroller
    },
    data () {
      return {
        rankingListClassifys:  ['日榜', '周榜', '月榜'],
        rankingIndex: 0, //默认选中
        rankingList: []
      }
    },
    mounted(){
      this.findEverydayPays();
    },
    methods: {
      toMoviePage(id){
        console.log(1)
        this.$router.push(`/video/${id}`);
      },
      // 获取日排行
      async findEverydayPays(){

        this.$vux.loading.show({
          text: ''
        });

        const result = await findEverydayPays();
        this.saveRankingListData(result);
      },
      // 获取周排行
      async findWeeklyPays(){
        this.$vux.loading.show({
          text: ''
        });
        const result = await findWeeklyPays();
        this.saveRankingListData(result);
      },
      // 获取月排行
      async findMonthlyPays(){
        this.$vux.loading.show({
          text: ''
        });
        const result = await findMonthlyPays();
        this.saveRankingListData(result);
      },
      /**
       * 保存排行数据
       * @param rankingList
       */
      saveRankingListData(result){
        if(result.retCode === '1'){
          this.rankingList = result.data;

          this.$vux.loading.hide();

          this.$nextTick(() => {
            this.$refs.scroller.reset({top: 0})
          })
        }
      },
      getRankingList(index){

        switch (index) {
          case 0: {
            this.findEverydayPays();
            break;
          }
          case 1: {
            this.findWeeklyPays();
            break;
          }
          case 2: {
            this.findMonthlyPays();
            break;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .RankingContainer .headContainer{
    width: 100%;
    height: 3rem;
    position: fixed;
    top: 0;
    z-index: 9999;
  }

  .RankingContainer .subjectContainer{
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    margin-top: 15%;
    /*margin-bottom: 4.5rem;*/
  }

  .RankingContainer .subjectContainer .filmContainer{
    /*margin-top: 3rem;*/
    background-color: #FFFFFF;
    width: 95%;
    height: 10rem;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    text-align: center;
    /*border:0.1rem inset  #00F;*/
    border-radius:1rem;
    box-shadow:0px 0px 0.3rem #000
  }
  .RankingContainer .subjectContainer .filmContainer  .film{
    width: 70%;
    display: inline-block;
  }

  .RankingContainer .subjectContainer .filmContainer .film img{
    width: 100%;
    height: 8rem;
    margin: 0  ;
    border-radius:1rem 0 0 0;
  }
  .RankingContainer .subjectContainer .filmContainer .film span{
    color: black;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: inline-block;
    margin: 0 0.5rem;
  }
  .RankingContainer .subjectContainer .filmContainer .Ranking{
    width: 30%;
    display: inline-block;
    float: right;
    position: relative;
    top: 3.5rem;

  }
  .RankingContainer .subjectContainer .filmContainer .Ranking span{
    width: 100%;
    height: 20%;
    font-size: 0.8rem;
    display: block;
    color: black;
    /*别删这里出问题还能用*/
    /*text-align: center;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*-o-text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
  }


</style>
