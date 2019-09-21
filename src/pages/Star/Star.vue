<template>
  <div class="ActressContainer">
    <div class="header">
      <div class="headerTop">
        <x-header style="background-color: #323232;" :left-options="{showBack: false}"><span>女优</span></x-header>

      </div>
      <div class="headerMiddle">
        <div class="headerBottom">
          <tab v-model="selectClassIfyIndex" :line-width="1">
            <tab-item @on-item-click="getStarList(index,null)" v-for="(item,index) in selectClassifyList" :key="index">
              {{item.name}}
            </tab-item>
          </tab>
        </div>
        <div class="headerBottom">
          <tab v-model="cupIndex" bar-active-color="#668599" :line-width="1">
            <tab-item @on-item-click="getStarList(null,index)" v-for="(item,index) in cupList" :key="index">
              {{item.value === '-1'?'全部':item.value}}
            </tab-item>
          </tab>

        </div>
      </div>

    </div>

    <scroller lock-x scrollbar-y ref="contentScroller" @on-scroll-bottom="pageQuery" :scroll-bottom-offst="200">

      <flexbox class="starContainer" :gutter="0" wrap="wrap" style="background-color:#FFFFFF;">

        <flexbox-item :span="1/3" v-if="item.headpic" v-for="(item,index) in starList" :key="index">
          <div class="star">
            <div class="starTop">
              <img :src="item.headpic" onerror="this.onerror='';this.src='http://114.29.253.178:8888/group1/M00/00/0C/ch39sl12MCOAZgHpAAUjmeyUf1Y238.png'"  >
              <span>{{item.name}}</span>
            </div>
            <div class="starMiddle">
              <span v-for="(i,index) in 5" :key="index">{{(i<(item.heat))?'♥':'♡'}}</span>
            </div>
            <div class="starBottom" @click="saveMemberCollect(item.id,item.isCollect)">
              <span v-if="item.isCollect == '1'" class="iconfont" style="color: red ;font-size: 2rem" >&#xe600;</span>
              <span v-else class="iconfont" style="color:#FFFFFF  ;font-size: 2rem"> &#xe601;</span>
              <span class="span1">{{item.isCollect == 1?'已收藏':'收藏'}}</span>
            </div>
          </div>
        </flexbox-item>
        <div class="blank"></div>
      </flexbox>

    </scroller>



  </div>
</template>

<script>
  import Vue from 'vue'
  import {Tab, Flexbox, LoadMore, Scroller, FlexboxItem, TabItem, Tabbar, TabbarItem, Rater,XHeader } from 'vux'

  import {getStarList, saveMemberCollect, delMemberCollect} from '../../api'

  export default {
    name: "Actress",
    components: {
      Tab,
      TabItem,
      Tabbar,
      TabbarItem,
      Rater,
      Scroller,
      Flexbox,
      FlexboxItem,
      LoadMore,
      XHeader
    },
    data() {
      return {
        starList: [],
        cupList: [], //分类数据
        selectClassifyList: [],
        selectClassIfyIndex: 0,
        cupIndex: 0, //默认为查询全部
        heat: 0, //热度
        onFetching: false, //分页查询上锁
        pageNum: 1, //分页记录数
        dataOnNull: false,
        pageParams: {
          pageNum: 1,
          orderStr: null, //排序标识
          cup: null
        }
      }
    },
    methods: {
      // 分页查询
      async pageQuery() {
        if (this.onFetching) {
        } else {
           this.onFetching = true;
          if(this.dataOnNull){
            this.$vux.toast.text('没有更多数据', 'bottom');
            return ;
          }
          // 查询数据
          let params = this.getStarListReqParams(null,null);

          //添加分页数
          params.pageNum = this.pageParams.pageNum + 1;

          const result = await getStarList(params);

          if (result.retCode === '1') {
            let starList = result.data;

            if(starList.length <= 0){ //标识无数据
                this.dataOnNull = true;
            }


            this.starList = this.starList.concat(starList);
            this.onFetching = false;

            this.pageParams.pageNum = this.pageParams.pageNum + 1;

            this.$nextTick(() => {
              this.$refs.contentScroller.reset()
            });
          }else {
            this.$vux.toast.text(result.retMsg, 'bottom')
          }



        }

      },
      // 收藏明星
      async saveMemberCollect(id, isCollect) {

        let result = null;
        // 如果已收藏则取消收藏
        if (isCollect == '1') {
          result = await delMemberCollect(id);
        } else { //收藏
          result = await saveMemberCollect(id);
        }

        if (result.retCode === '1') {
          //修改状态
          this.updateCollectState(id, isCollect);


        } else {
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

      },
      updateCollectState(id, isCollect) {
        // 根据id找到对应的元素
        let starList = this.starList;

        let index = starList.findIndex((star) => star.id === id);
        let star = starList[index];
        star.isCollect = isCollect == '1' ? 0 : 1;


        Vue.set(this.starList, index, star)
      },
      async getStarList(selectClassIndex, cupIndex) {

        this.$vux.loading.show({
          text: ''
        });

        // 重置分页参数
        this.dataOnNull = false;
        this.onFetching = false;
        this.pageParams.pageNum = 1;

        // 请求参数
        let params = this.getStarListReqParams(selectClassIndex, cupIndex);
        const result = await getStarList(params);

        if (result.retCode === '1') {
          this.cupList = result.cupList;
          this.starList = result.data;
          this.$vux.loading.hide();
          this.$nextTick(() => {
            this.$refs.contentScroller.reset({top: 0})
          });
        }

      },

      /**
       * 获取请求参数
       */
      getStarListReqParams(selectClassIndex, cupIndex) {
        let params = {};
        // 防止为空
        if (!selectClassIndex) {
          selectClassIndex = this.selectClassIfyIndex
        }

        if (!cupIndex) {
          cupIndex = this.cupIndex;
        }

        const selectClassType = this.selectClassifyList[selectClassIndex].type;
        const cup = this.cupList[cupIndex];

        if (cup) {
          params.cup = cup.value === '-1' ? '' : cup.value;
        }

        if (selectClassType) {

          switch (selectClassType) {
            case 1: {
              params.newData = '1';
              this.pageParams.orderStr = 'newData';
              break;
            }
            case 2: {
              params.newVideo = '1';
              this.pageParams.orderStr = 'newVideo';
              break;
            }
            case 3: {
              params.videoNum = '1';
              this.pageParams.orderStr = 'videoNum';
              break;
            }
          }

        }

        // 添加分页数据
        params.pageNum = this.pageParams.pageNum;
        this.pageParams.cup = params.cup;

        // 保存搜索标识
        this.selectClassIfyIndex = selectClassIndex;
        this.cupIndex = cupIndex;

        return params;
      }
    },
    mounted() {
      this.selectClassifyList = [{name: '最新数据', type: 1}, {name: '人气最高', type: 2}, {name: '电影最多', type: 3}]

      this.getStarList();
    }

  }
</script>

<style>
  body {
    width: 100%;
    height: 100%;
    /*background-color: #FFFFFF;*/
  }

  .ActressContainer {
    height: 100%;
    background-color: #FFFFFF;
  }

  .header {
    width: 100%;
    background: #323232;
  }

  .header .headerTop {
    background-color: #000000;
    width: 100%;
    text-align: center;
  }

  .header .headerTop span {
    color: #ffffff;
  }


   .starContainer .star {
    width: 95%;
    height: 40%;
    background-color: #DDDDDD;
    margin: 0.5rem 0.2rem;
    text-align: center;
    display: inline-block;
    border-radius: 1rem;
  }
  .starContainer .star .starTop{
    width: 100%;
  }

   .starContainer .star .starTop img {
    display: block;
    width: 60%;
    height: 10%;
    border-radius: 50%;
    margin: 1rem auto;
  }

.starContainer .star .starTop span {
    font-size: 130%;
    color: #929292;

  }

   .starContainer .star .starMiddle {
    width: 100%;
    height: 2rem;
    text-align: center;
  }

   .starContainer .star .starMiddle span {
    color: #929292;
    font-size: 0.8rem;
    line-height: 2rem;
  }
 .starContainer .star .starBottom {
    width: 80%;
    height: 2.5rem;
    background-color: #252628;
    margin: 1rem auto;
    text-align: center;
    border-radius: 1rem;
  }

 .starContainer .starBottom .span1 {
    position: relative;
    bottom: 0.4rem;
    left: -0.5rem;
    line-height: 2.5rem;
    font-size: 1rem;
    color: #ffffff;
    margin-left: 5%;
  }
  .blank{
    width: 100%;
    height: 13rem;
    margin-bottom: 2rem;
    background-color: #FFFFFF;
  }


</style>
