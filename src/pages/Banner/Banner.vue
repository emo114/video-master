<template>
  <div class="bannerContainer">
    <div class="header">

      <div class="headerMiddle">
        <div class="headerBottom">
          <tab>
            <tab-item style="background-color: #323232;" :selected="index === 1" v-for="(tagType,index) in tagTypes"
                      :key="index" v-if="tagType.id !== -1" @on-item-click="getTag(tagType.id)">
              <span>{{tagType.name}}</span>
            </tab-item>
          </tab>
        </div>
      </div>

    </div>

    <scroller lock-x scrollbar-y ref="scroller" style="margin-bottom: 6rem">
      <flexbox class="filmContainer" :gutter="0" wrap="wrap">
        <flexbox-item v-for="(item,index) in tags" :key="index" :span="1/3">
          <div class="film" @click="goto(item.id,item.name)">
            <a href="javaScript:">
              <img :src="item.picUrl">
              <span>{{item.name}}</span>
            </a>
          </div>
        </flexbox-item>
        <div class="blank"/>
      </flexbox>

    </scroller>


  </div>
</template>

<script>
  import {Scroller, XHeader,Tab, TabItem, Flexbox, FlexboxItem} from 'vux'
  import {Base64} from 'js-base64'

  import {getTagType, getTagByTagTypeId} from '../../api'

  export default {
    name: "Bannel",
    components: {
      Scroller,
      Tab,
      TabItem,
      Flexbox,
      XHeader,
      FlexboxItem
    }, data() {
      return {
        tagTypes: null,
        tags: null
      }
    },
    methods: {

      // 页面跳转
      goto(tagId,tagName){
        this.$router.push(`/movieTagList/${tagId}/${Base64.encode(tagName)}`)
      },
      /**
       * 查询标签类型
       * @returns {Promise<void>}
       */
      async getTagType() {
        const result = await getTagType();
        if (result.retCode === '1') {
          this.tagTypes = result.data;

          // 根据标签类型id查询对应的标签
          let tagTypeId = this.tagTypes[0].id === -1 && this.tagTypes.length > 0 ? this.tagTypes[1].id : this.tagTypes[0].id;
          this.getTag(tagTypeId);


        }
      },
      /**
       *
       * @param tagTypeId 根据标签类型获取数据
       */
      async getTag(tagTypeId) {

        this.$vux.loading.show({
          text: ''
        });

        const result = await getTagByTagTypeId(tagTypeId);

        if (result.retCode === '1') {
          this.tags = result.data;

          this.$vux.loading.hide();

          this.$nextTick(() => {
            this.$refs.scroller.reset({
              top: 0
            });
          })

        }

      },
      /**
       * 跳转电影搜索页面
       */
      toMovieSearPage(tagId) {
        console.log(tagId)
      }
    },
    mounted() {
      this.getTagType();
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

  .header .headerTop {
    width: 100%;
    height: 3.3rem;
    text-align: center;
  }

  .header .headerTop span {
    line-height: 3.3rem;
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
