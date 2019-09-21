<template>
  <div class="bannerContainer">
    <div class="header">
      <x-header class="CartoonTop" style="background-color: #323232;" :left-options="{showBack: false}">
        漫画
        <a slot="left" @click="goto('/myCaricature')">
          书架
        </a>
        <a slot="right">
          <span  class="icon iconfont" @click="goto('/caricatureSearch')" style="font-size: 2rem;">&#xe65a;</span>
        </a>
      </x-header>

      <div class="headerMiddle">
        <div class="headerBottom">
          <tab >
            <tab-item :selected="orderTypeIndex === index" @on-item-click="getCartoonInfo(null,index)"
                      v-for="(item,index) in orderTypes" :key="index">{{item.name}}
            </tab-item>
          </tab>
          <tab>
            <tab-item :selected="classifyIndex === index" @on-item-click="getCartoonInfo(index,null)"
                      v-for="(item,index) in classifyList" :key="index">{{item.name}}
            </tab-item>
          </tab>
        </div>
      </div>

    </div>

    <scroller lock-x scrollbar-y ref="scroller" style="margin-bottom: 6rem">
      <flexbox class="filmContainer" :gutter="0" wrap="wrap">
        <flexbox-item v-for="(item,index) in caricatureList" :key="index" :span="1/3">
          <div class="film">
            <a href="javaScript:" @click="toDetailsPage(item.id)">
              <img :src="item.cover" alt="">
              <span>{{item.name}}</span>
            </a>
          </div>
        </flexbox-item>
        <div class="blank">

        </div>
      </flexbox>

    </scroller>


  </div>
</template>

<script>
  import {Scroller, XHeader,Tab, TabItem, Flexbox, FlexboxItem} from 'vux'

  import {getCartoonInfo} from '../../../api'

  export default {
    name: "Bannel",
    components: {
      Scroller,
      Tab,
      TabItem,
      Flexbox,
      XHeader,
      FlexboxItem
    },
    data(){
      return {
        orderTypes: [],
        classifyList: [],
        caricatureList: [],
        classifyIndex: 0,   //选中的是哪一个
        orderTypeIndex: 0,
      }
    },
    mounted() {
      this.getCartoonInfo()
    },
    methods: {
      // 路由跳转
      goto(path){
        this.$router.push(path);
      },

      // 跳转详情页面
      toDetailsPage(id){
        this.$router.push(`caricatureDetails/${id}`)
      },
      async getCartoonInfo(classifyIndex, orderTypeIndex) {

        this.$vux.loading.show({
          text: ''
        });

        const params = this.getReqParams(classifyIndex, orderTypeIndex);

        const result = await getCartoonInfo(params);

        if (result.retCode === '1') {
          this.orderTypes = result.data.orderTypes;
          this.classifyList = result.data.classifyList;
          this.caricatureList = result.data.caricatureList;


          this.$vux.loading.hide();

          this.$refs.scroller.reset({
            top: 0
          });
        }else{
          this.$vux.toast.text('出错了~', 'bottom')
        }
      },
      /**
       * 获取请求参数
       * @param classifyIndex
       * @param orderTypeIndex
       */
      getReqParams(classifyIndex, orderTypeIndex) {
        let params = {};
        // 防止为空
        if (classifyIndex == null) {
          classifyIndex = this.classifyIndex;
        }

        if (orderTypeIndex == null) {
          orderTypeIndex = this.orderTypeIndex;
        }

        const classify = this.classifyList[classifyIndex];
        const orderType = this.orderTypes[orderTypeIndex];

        params.classifyId = classify ? classify.id : '-1';

        params.orderType = orderType ? orderType.type : '0';

        // 保存搜索标识
        this.classifyIndex = classifyIndex;
        this.orderTypeIndex = orderTypeIndex;

        return params;

      }
    }
  }

</script>

<style scoped>
  body {
    width: 100%;
    height: 100%;
    /*background-color: #FFFFFF;*/
  }

  .bannerContainer {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  .header {
    background: #323232;
  }

  .header .CartoonTop {
    width: 100%;
    text-align: center;
  }

  .header .CartoonTop span {
  }


  .bannerContainer .filmContainer .film {
    width: 100%;
    height: 100%;
    /*float: left;*/

  }

  .bannerContainer .filmContainer .film img {
    width: 90%;
    height: 10rem;
    margin: 1rem 0.5rem 0 0.5rem;
  }

  .bannerContainer .filmContainer .film span {
    color: black;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
    display: inline-block;
    margin: 0 0.5rem;
  }

  .bannerContainer .blank {
    width: 100%;
    height: 2rem;
    margin-top: 5.2rem;
    background-color: #FFFFFF;
  }


</style>
