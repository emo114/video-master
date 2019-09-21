import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Banner from '../pages/Banner/Banner'
import User from '../pages/User/User'
import Star from '../pages/Star/Star'
import RankingList from '../pages/RankingList/RankingList'
import CaricatureList from '../pages/Caricature/CaricatureList/CaricatureList'
import Video from '../pages/Video/Video'
import Test from '../pages/Test/Test'
import MovieClassifyList from '../pages/MovieClassifyList/MovieClassifyList'
import MovieTagList from '../pages/MovieTagList/MoiveTagList'
import CaricatureChapterNum from '../pages/Caricature/CaricatureChapterNum/CaricatureChapterNum'
import CaricaturePictureList from '../pages/Caricature/CaricaturePictureList/CaricaturePictureList'
import CaricatureDetails from '../pages/Caricature/CaricatureDetails/CaricatureDetails'
import MovieSearch from '../pages/MovieSearch/MovieSearch'
import Login from '../pages/Login/Login'
import SetUp from '../pages/SetUp/SetUp'
import UserProtocol from '../pages/UserProtocol/UserProtocol'

import MyCaricature from '../pages/Caricature/MyCaricature/MyCaricature'
import ViewHistory from '../pages/ViewHistory/ViewHistory'
import MyCollections from '../pages/MyCollections/MyCollections'
import CaricatureSearch from '../pages/Caricature/CaricatureSearch/CaricatureSearch'
import VipInfoDetails from '../pages/VipInfoDetails/VipInfoDetails'

/*
* 个人中心
* */
import PersonalCenter from '../pages/PersonalCenter/PersonalCenter'

import AccountManage from '../pages/AccountManage/AccountManage'

import Register from '../pages/Register/Register'
import UpdatePwd from "../pages/UpdatePwd/UpdatePwd";



import ExtendUser from "../pages/ExtendUser/ExtendUser";
import Invitation from "../pages/Invitation/Invitation";

import Default from '../pages/Default/Default'


import store from "../store";

import uuid from 'uuid'
import {genLoginParams} from '../utils/loginUtils'


/**
 * 引入接口
 */
import {findIsOpenPay,getModuleSetting,authLogin} from '../api'

Vue.use(Router);

const router =new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/Banner',
      name: 'banner',
      component: Banner,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/star',
      name: 'star',
      component: Star,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/rankingList',
      name: 'rankingList',
      component: RankingList,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/caricatureList',
      name: 'caricatureList',
      component: CaricatureList,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/video/:videoId',
      name: 'video',
      component: Video,
     /* meta: {
        showFooter: true
      }*/
    },
    {
      path: '/movieClassifyList/:classifyId/:classifyIndex/:orderType',
      name: 'MovieClassifyList',
      component: MovieClassifyList
    },
    {
      path: '/movieTagList/:tagId/:tagName',
      name: 'MovieClassifyList',
      component: MovieTagList
    },
    {
      path: '/caricatureChapterNum/:id',
      name: 'CaricatureChapter',
      component: CaricatureChapterNum
    },
    {
      path: '/caricaturePictureList/:chapterId',
      name: 'caricaturePictureList',
      component: CaricaturePictureList
    },
    {
      path: '/caricatureDetails/:caricatureId',
      name: 'caricatureDetails',
      component: CaricatureDetails
    },
    {
      path: '/movieSearch',
      name: 'search',
      component: MovieSearch
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myCaricature',
      name: 'myCaricature',
      component: MyCaricature
    },
    {
      path: '/viewHistory',
      name: 'viewHistory',
      component: ViewHistory
    },
    {
      path: '/myCollections',
      name: 'myCollections',
      component: MyCollections
    },
    {
      path: '/setUp',
      name: 'setUp',
      component: SetUp
    },
    {
      path: '/userProtocol',
      name: 'userProtocol',
      component: UserProtocol
    },
    {
      path: '/caricatureSearch',
      name: 'caricatureSearch',
      component: CaricatureSearch
    },
    {
      path: '/vipInfoDetails/:showType',
      name: 'vipInfoDetails',
      component: VipInfoDetails
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: PersonalCenter,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/accountManage',
      name: 'accountManage',
      component: AccountManage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/invitation',
      name: 'Invitation',
      component: Invitation,
    },
    {
      path: '/updatePwd',
      name: 'updatePwd',
      component: UpdatePwd,
    },
    {
      path: '/extendUser',
      name: 'extendUser',
      component: ExtendUser,
    },
    {
      path: '*',
      name: 'default',
      component: Default,
    }
  ]
})

/**
 * 全局路由守卫
 */
router.beforeEach( async (to,from,next)=>{


  console.log(to.path)
  const path = to.path;
  const token = store.state.token
  const loginType = store.state.loginType;
  const resultSetting = await getModuleSetting()
  const resultOpenPay = await findIsOpenPay()



  /**
   * 没有token跳转到home页面
   */
  console.log('token---->'+token)
  if(token.length<=0||token===''){
    //自动登录
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

      store.dispatch('saveUserToken',{token: result.token,loginType: result.loginType});
    } else { //提示错误信息

    }
    next('/home');
    return
  }

  /**
   * 首页不做拦截
   */
  if(path==='/home'){
    next();    return
  }


  /**
   * 用户已经手机号登陆
   */
  if(path==='/login'&&loginType==='1'){
    next('/accountManage');
  }

  /**
   * 用户没有手机号登陆，点击账户管理跳转到登陆页面
   */
  if(path==='/accountManage'&&loginType!='1'){
    next('/login');
  }


  /**
   * 明星漫画页面做拦截处理
   */
  if(path === '/star' || path === '/caricatureList'){
    if(!resultSetting.data.caricatureModuleSetting||!resultSetting.data.starModuleSetting){ //不存在数据
      alert('功能未开放')
      next('/home');
      return
    }else{
      if(resultSetting.data.caricatureModuleSetting.isEnable==='1'&&path==='/caricatureList'){
       /* console.log('可以跳转到漫画页面')*/
        next();
        return
      }else if(resultSetting.data.starModuleSetting.isEnable==='1'&&path==='/star'){
       /* console.log('可以跳转到明星页面')*/
        next();
        return
      }else{
        alert('功能未开放')
        next('/home');
        return
      }
    }
  }


  /**
   * 点击vip后台校验是否有购买功能
   */
  if (path==='/vipInfoDetails/1'){

    if(!(loginType==='1')){
      next('/login')
      return
    }
    if(!resultOpenPay){
      next('/home')
      return
    } else if(resultOpenPay.isOpen==='0'){
      next('vipInfoDetails/2')
      return
    }
  }

  next()


});


export default router

