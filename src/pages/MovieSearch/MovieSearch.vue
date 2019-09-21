<template>
  <div class="searchContainer">
    <div class="head">
      <div class="menu">
        <span  class="iconLeft iconfont  " >&#xe616;</span>
        <input v-model="searchName" @keyup.enter="search()" type="text" placeholder="输入关键词找查片源">
        <span  class="iconRight iconfont " @click="clearData()" >&#xe613;</span>
      </div>

      <sapn style="color:#C49C69;" @click="$router.back(-1)">取消</sapn>
    </div>
    <div v-if="!searchDataList.length">
      <div class="search">
        <span>热门搜索</span>
      </div>
      <div class="popularTitle" @click="search(item)" v-for="(item,index) in hotLabels" :key="index">
        <span>{{item}}</span>
      </div>
    </div>

    <div v-else class="translateContainer">
      <div v-for="(item,index) in searchDataList" @click="handleSearchSkip(item.id)" :key="index">
        <div class="translate">
          <img :src="item.cover" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>


  </div>

</template>

<script>

  import {getCaricatureHotLabel,getMovieHotLabel,searchVideo} from '../../api'


  export default {
    data(){
      return {
        hotLabels: [],
        isSearch: false,
        searchName: '', // 搜索名称
        searchDataList: [], //搜索数据
      }
    },
    methods: {
      // 处理搜索点击跳转
      handleSearchSkip(id){
        this.$router.push(`/video/${id}`);
      },
      clearData(){
        this.searchDataList = [];
        this.searchName = '';
      },
      back(){
        this.$router.back(-1);
      },
      async search(searchName){
        this.$vux.loading.show({
          text: ''
        });

        if(!searchName){
          searchName = this.searchName;
        }

        const result = await searchVideo(searchName);

        if(result.retCode === '1'){

            this.searchDataList = result.data.map(i => {
              return {name: i.videoName,cover: i.videoCover,id: i.id}
            })

            
        }else{
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

        this.$vux.loading.hide();


      },
      async getHotLabel(){

        const result = await getMovieHotLabel();

        if(result.retCode === '1'){
            this.hotLabels = result.data.map((item) => item.searchName);
        }else{
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

      }
    },
    mounted() {
      const {type} = this.$route.params;
      this.type = type;

      this.getHotLabel();
    }
  }

</script>
<style>

  input[type=text] {
    width: 70%;
    /*margin: 0.8rem  0;*/
    height: 2rem;
    border: 0 solid #f2f2f2;
    background: #EDEDED;
    color: #202124;
    font-size: 1rem;
    line-height: 3rem;
    border-radius: 1.5rem;
    /*background:url("../../img/Icon/all_classify.png");*/
  }
  input[type=text]:focus {
    outline: none;
    /*border-color: #000000;*/
    background-color: #EDEDED;
  }
  input[type=text]::selection{
    background:transparent;
    background-color: #fff;
  }
  input[type=text]::-moz-selection{
    background:transparent;
    background-color: #fff;
  }
  input[type=text]::-webkit-input-placeholder { /* WebKit browsers */
    color: #bababa;
  }
  input[type=text]:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #bababa;
  }
  input[type=text]::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #bababa;
  }
  input[type=text]:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #bababa;
  }

  .menu{
    width: 80%;
    background-color: #EDEDED;
    display: inline-block;
    border-radius: 1.5rem;
    margin: 0.5rem 0;
  }
  .head{
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    text-align: center;
    margin: 0 auto;
  }

  .searchContainer .search{
    margin: 4rem 1rem 1rem 1rem;
  }
  .searchContainer .search span{
    font-size: 1.5rem;
    color:#C49C69;
  }

  .searchContainer .popularTitle{
    margin: 0.8rem 0 0 1rem;
    display: inline-block;
    background-color: #EDEDED;
    padding: 0.7rem;

  }
  .searchContainer .popularTitle span{
    font-size: 0.8rem;

  }








  .translateContainer  {
   margin-top: 4rem;
  }
  .translate{
    width: 90%;
    height: 40%;
    margin: 1rem;
    text-align: center;
  }
  .translateContainer img{
    width: 100%;
    height: 12rem;
  }
</style>
