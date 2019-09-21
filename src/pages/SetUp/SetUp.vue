<template>
  <div class="myset">
    <x-header :left-options="{backText: ''}" title="设置"></x-header>

    <group>
      <cell title="账户管理" is-link link="/accountManage">
      </cell>
      <cell title="清理缓存" value="90.58Mb" is-link></cell>
      <cell title="最新版本" value="最新" is-link></cell>
      <cell title="用户协议" link="/userProtocol" is-link></cell>
    </group>

  </div>
</template>

<script>
  import { XHeader, Group, Cell, CellBox } from 'vux'

  export default {
    components: {

      XHeader,
      Group,
      Cell,
      CellBox
    },
    methods: {
      goto(type){

        let path = '';

        switch (type) {
          case 1: {

            // todo 需要查看当前用户是否登录
            path = '/countManager'; // 用户管理



            break;
          }
          case 2: {
            path = '/userProtocol' // 用户协议
          }
        }

        this.$router.push(path)

      }
    }
  }
</script>

<style scoped lang="less">


</style>
