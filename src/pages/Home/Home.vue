<template>


  <div style="background-color: #252628">
    <div class="box2">
      <div style="background-color:  RGB(37,38,40) ;">
        搜索
        <div class="login">
          <a href="javascript:void(0)">
            <div class="loginLeft">
          <span @click="toSearchPage()">
             <span class="icon iconfont commentStatisticsLeft">&#xe616;</span>
              <span style="font-size: 120% ;color: #9A9B9B">输入关键词找查片源</span>
          </span>
            </div>
          </a>
          <div class="loginRight">
            <span class="icon iconfont commentStatisticsRight">&#xe609;</span>
            <span class="icon iconfont commentStatisticsRight">&#xe85d;</span>
          </div>

        </div>
        <!--轮播图-->
        <!--          <HomeRotationChart :bannerList="bannerList"/>-->
        <div class="ScrollPicture">
          <swiper :loop="true" :aspect-ratio="300/800" @on-index-change="handleRotationChart" v-if="bannerList">
            <swiper-item v-for="(banner,index) in bannerList" :key="index">
              <img @click="handleRotationChart(index)" :src="banner.picUrl" class="bannerImg">
            </swiper-item>
          </swiper>
        </div>

        <!--分类-->
        <HomeClassIfy :classifyList="classifyList"/>

        <!--最新片源-->
        <MovieContent :orderType="1" :title="'最新片源'" :videoList="newVideoList"/>
        <!--重磅热播-->
        <MovieContent :orderType="2" :title="'重磅热播'" :videoList="mostVideoList"/>

        <!--其他分类-->
        <div v-for="(classifyList,index) in classifyListCollect" :key="index">
          <MovieContent :isClassIfyGoto="true" :classifyId="classifyList.id" :title="classifyList.name" :index="index"
                        :videoList="classifyList.videoList"/>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
  import HomeClassIfy from '../../components/Home/HomeClassIfy/HomeClassIfy'
  import MovieContent from '../../components/Home/MovieContent/MovieContent'
  import HomeRotationChart from '../../components/Home/HomeRotationChart/HomeRotationChart'
  import {Search, LoadMore, SwiperItem, Icon, Scroller, Swiper, Flexbox, FlexboxItem, XInput} from 'vux'
  import {getIndexInfo,checkInAddIntegral} from '../../api'


  export default {
    components: {
      Search,
      Swiper,
      SwiperItem,
      Icon,
      Scroller,
      LoadMore,
      Flexbox,
      FlexboxItem,
      XInput,
      HomeClassIfy,
      MovieContent,
      HomeRotationChart
    },
    mounted() {
      this.getIndexInfo();
    },
    methods: {
      toSearchPage() {
        this.$router.push('/movieSearch');
      },
      // 处理轮播图
      handleRotationChart(index) {

        // 获取当前广告类型
        const banner = this.bannerList[index];

        /**
         *  判断是否已经完成当前任务
         */

        this.addIntegral(3)

        /*if(!this.checkIsFinishInter(3)){
          console.log('--完成任务 -')
          this.addIntegral(3)

          //设置storage
          const nowDate = this.getNowTime()

          const IntegralFlag = {
            'nowDate':nowDate,
            'id':id
          }
          localStorage.setItem('IntegralFlag3', IntegralFlag);
        }*/

        const linkType = banner.linkType; //广告类型
        switch (linkType) {
          case 1: { // 外部链接
            window.location.href = banner.linkUrl;
            break;
          }
          case 3: { //购买vip
            this.$router.push('/vipInfoDetails/1');
            break;
          }
          case 4: { // 邀请好友
            this.$router.push('/invitation');
            break;
          }
          default: { // 默认跳转首页
            this.$router.push('/home');
          }

        }

      },
      /**
       * 获取首页数据
       */
      async getIndexInfo() {


        this.$vux.loading.show({
          text: ''
        });

        const result = await getIndexInfo();

        if (result.retCode === '1') {
          this.indexInfoData = result.data;
          this.bannerList = result.data.bannerList;
          this.classifyList = result.data.classifyList;
          this.newVideoList = result.data.newVideoList;
          this.mostVideoList = result.data.mostVideoList;
          this.classifyListCollect = result.data.classifyListCollect;
        } else {
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

        this.$vux.loading.hide();
      },
      async addIntegral(){
          const  id = 3
        const result = await checkInAddIntegral(id)
        if(result.retCode==='1'){
          this.showToastMsg = '任务完成'
          this.showToast = true
          this.getIntegralClassifies()
        }else{
          this.showToastMsg = '任务失败'+result.retMsg
          this.showToast = true
        }
    },checkIsFinishInter(id) {  //返回false已经完成任务

        /*const nowDate = this.getNowTime()

        const inter = localStorage.getItem('IntegralFlag3');
        if(!inter&&inner.get('nowDate')===nowDate&&inner.get('id')===id){
            return false;
        }*/


        /*// this.addIntegral(3)
        const IntegralFlag = {
          'nowDate':nowDate,
          'id':id
        }*/



      },getNowTime(){
        let now = new Date()
        const year = now.getFullYear(); //得到年份
        const month = now.getMonth();//得到月份
        const date = now.getDate();//得到日期
        const addIntegralFlag = year+''+month+''+date
        return addIntegralFlag
      }

    },
    data() {
      return {
        indexInfoData: null, // 首页数据
        bannerList: [], //轮播图
        classifyList: [], //分类数据
        newVideoList: [], //最新电影
        mostVideoList: [], // 重磅热播
        classifyListCollect: []
      }
    }
  }
</script>

<style>
  /*body{*/
  /*  background-color: #252628;*/
  /*}*/

  .login {
    width: 100%;
    text-align: left;
    margin: 0 auto;
    background-color: #323232;
    position: fixed;
    top: 0%;
    z-index: 9999;

  }

  .loginLeft, .loginRight {
    display: inline-block;
  }

  .loginLeft {
    width: 70%;
    background-color: #252628;
    padding: 3% 0.5%;
    margin: 3% 1%;
    border-radius: 5rem;
    text-align: left;
  }

  .commentStatisticsLeft {
    font-size: 150%;
    color: #C49C69;
  }

  .loginRight {
    /*margin-left: 10%;*/
  }

  .commentStatisticsRight {
    margin: 0 0.5rem;
    font-size: 150%;
    color: #C49C69;
    /*line-height: 3rem;*/
  }

  /*头部*/

  /*轮播图*/
  .ScrollPicture {
    background-color: #252628;
    width: 100%;
    height: 100%;
    margin-top: 15%;
  }

  .ScrollPicture img {
    height: 100%;
    width: 100%;
  }


</style>

