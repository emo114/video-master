<template>
  <div>
    <router-view/>
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import uuid from 'uuid'
  import Vue from 'vue'
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {authLogin} from './api'
  import {genLoginParams} from './utils/loginUtils'

  import {ToastPlugin} from 'vux'

  Vue.use(ToastPlugin)

  export default {
    components: {
      FooterGuide
    },
    mounted() {
      this.autoLogin();

    },
    methods: {
      /**
       * 自动登录
       */
      async autoLogin() {

        // 从localStore中查询是否存在uuid
        let deviceCode = localStorage.getItem('deviceCode');

        if (!deviceCode) {
          // 存入uuid
          deviceCode = uuid();
          localStorage.setItem('deviceCode', deviceCode);
        }

        const loginParams = genLoginParams(deviceCode);

        const result = await authLogin(loginParams);

        if (result.retCode === '1' && result.token) { // 保存token到store中

          this.$store.dispatch('saveUserToken',{token: result.token,loginType: result.loginType});

        } else { //提示错误信息
          this.$vux.toast.text(result.retMsg, 'bottom')
        }

      },

    }
  }
</script>

<style>

</style>
