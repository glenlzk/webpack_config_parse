<template>
  <div class="meLayout" v-bind:class="[meshowStatus?'show':'']">
  <head-top headTitle="我"></head-top>
  <!--顶部end-->
  <div class="my-header clearfix">
    <!--<div class="my-headerL">-->
        <!--<img v-bind:src="userInfo.headImgUrl" alt="" v-if="userInfo.headImgUrl" />-->
        <!--<img src="../../images/mrtx.png" alt="" v-else/>-->
    <!--</div>-->
    <!--<div class="my-headerR">-->
        <!--<router-link :to="{path: 'register', query:{status: 2}}" v-if="userInfo.auditStatus == 1 || userInfo.auditStatus == 4">-->
          <!--<div class="pendingUser" >-->
              <!--<img src="../../images/去认证.png" alt="" v-show="userInfo.auditStatus == 1"/>-->
              <!--<img src="../../images/注册未通过.png" alt="" v-show="userInfo.auditStatus == 4"/>-->
          <!--</div>-->
        <!--</router-link>-->
      <!--<div class="qualificationInfo" v-else>-->
        <!--<div class="userName">-->
            <!--{{userInfo.userName}}-->
            <!--<span v-if="userInfo.sex == 1">先生</span>-->
            <!--<span v-else>女士</span>-->
        <!--</div>-->
        <!--<div class="kkNum">-->
          <!--KK号：&nbsp;-->
          <!--<span>{{userInfo.userAccount}}</span>-->
            <!--<span class="statusIcon" v-show="userInfo.auditStatus == 2"><img src="../../images/审核中.png" alt=""></span>-->
            <!--<span class="statusIcon" v-show="userInfo.auditStatus == 3"><img src="../../images/已经认证.png" alt=""></span>-->
        <!--</div>-->
        <!--<div class="userId">-->
          <!--身份证号码：&nbsp;{{userInfo.idNumber}}-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
      <div class="picLayout">
          <img src="../../images/mrtx.png" alt="">
      </div>
      <div class="ac white pb30">
          {{userInfo.mobile}}
      </div>
  </div>
  <div class="my-contain">
      <router-link :to="{path: 'ordertab', query:{orderStatus: ''}}">
          <div class="my-ListLayout">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-diangdan-all"></use>
              </svg>
              <span class="ml10">
              全部订单
        </span>
              <span class="fr">
          <svg class="icon icon-small" aria-hidden="true">
            <use xlink:href="#icon-juxingkaobei2"></use>
          </svg>
        </span>
          </div>
      </router-link>
    <router-link :to="{path: 'ordertab', query:{orderStatus: '0'}}">
      <div class="my-ListLayout">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-diangdan-dzf"></use>
        </svg>
        <span class="ml10">
              待支付
            </span>
        <span class="fr">
              <span class="red">{{myNum.unpayNum}}</span>
              <svg class="icon icon-small" aria-hidden="true">
                <use xlink:href="#icon-juxingkaobei2"></use>
              </svg>
            </span>
      </div>
    </router-link>
    <router-link :to="{path: 'ordertab', query:{orderStatus: '1'}}">
      <div class="my-ListLayout">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diangdan-wrz"></use>
          </svg>
          <span class="ml10">
                未入住
              </span>
          <span class="fr">
              <span class="red">{{myNum.unLiveinNum}}</span>
              <svg class="icon icon-small" aria-hidden="true">
                <use xlink:href="#icon-juxingkaobei2"></use>
              </svg>
          </span>
      </div>
    </router-link>
    <router-link :to="{path: 'ordertab', query:{orderStatus: '4'}}">
      <div class="my-ListLayout">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-diangdan-cancel"></use>
        </svg>
        <span class="ml10">
              已取消
            </span>
        <span class="fr">
          <span class="red">{{myNum.cancelNum}}</span>
          <svg class="icon icon-small" aria-hidden="true">
            <use xlink:href="#icon-juxingkaobei2"></use>
          </svg>
        </span>
      </div>
    </router-link>

  </div>
  <!--卡券-->
  <router-link :to="{path: 'coupontab', query:{status: '0'}}">
    <div class="couponsLayout">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-kaquan"></use>
      </svg>
      <span class="ml10">
            卡券
          </span>
      <span class="fr">
        <span class="grey">{{myNum.couponNum}}张</span>
        <svg class="icon icon-small" aria-hidden="true">
          <use xlink:href="#icon-juxingkaobei2"></use>
        </svg>
      </span>
    </div>
  </router-link>
    <foot-guide></foot-guide>
  </div>

</template>

<script>
  import {mapMutations} from 'vuex'
  import {imgBaseUrl} from '../../config/env'
  import headTop from '../../components/header/head'
  import footGuide from '../../components/footer/footGuide'
  import {getUserInfo,getMyNum} from '../../service/getData'

  export default {
    data(){
      return {
        userInfo:{},
        myNum:{},
        meshowStatus:false
      }
    },
    mounted(){
      //初始化数据
      this.initData();
    },
    components: {
      headTop,
      footGuide,
    },
    methods:{
        initData(){
            var _self = this;
            getUserInfo({
                success:(data)=>{
                  _self.userInfo = data;
                }
            });
            getMyNum({
                success:(data)=>{
                  _self.myNum = data;
                  _self.meshowStatus=true;
                }
            })
        }
    }
  }

</script>

<style lang="scss" scoped>
  .meLayout{
      display: none;
    /*padding-top: 1.9rem;*/
  }
  .my-header{
    background: #21bcf5;
  }
    .picLayout{
        margin: 2rem auto;
        margin-bottom: 1rem;
        width: 2.7rem;
        height: 2.7rem;
        border: 2px solid #fff;
        border-radius: 50%;
        overflow: hidden;
    }
  .picLayout img{
      max-width: 100%;
  }

  .my-contain,
  .couponsLayout{
    background: #FFF;
    padding-left:15px;
  }
  .couponsLayout{
    padding: 12px 15px;
  }
  .my-ListLayout{
    padding: 12px 15px 12px 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .my-ListLayout-last{
    border-bottom: none;
  }
  .kkNum{
      position: relative;
  }
    .kkNum .statusIcon{
        right: 0;
        top: -0.25rem;
        position: absolute;
        width: 4rem;
        display: inline-block;
    }
  .kkNum .statusIcon img{
      max-width: 100%;
  }
</style>
