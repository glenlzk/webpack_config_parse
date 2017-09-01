<template>
    <div class="detailLayout ">
      <head-top :head-title="'详情'" toPath="key"></head-top>
      <div class="layoutHide" :class="layoutshow?'layoutShow':''">
        <div class="clearfix detailTop">
          <div class="ml15 pt10 pb10">
            {{keyInfo.hotelName}}
          </div>
          <div class="ml15 pb15">
            {{keyInfo.roomTypeName}}&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7e7e; font-size: 0.7rem">{{keyInfo.roomNo}}</span>
          </div>
          <div class="roomInfo-dateTime">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-time"></use>
            </svg>
            <span>{{keyInfo.checkinTime}} 至 {{keyInfo.checkoutTime}}</span>
          </div>
          <div class="roomInfo-address">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-daingwei1"></use>
            </svg>
            <span>{{keyInfo.address}}</span>
          </div>
          <div class="roomInfo-tel">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone"></use>
            </svg>
            <span><a :href="getCallHref(keyInfo.telephoneNo)">{{keyInfo.telephoneNo}}</a></span>
          </div>
        </div>
        <!--身份验证信息 start-->
        <div class="mid-registerContainer">
          <label>
            <span class="fl fz15" style="color: #999">开门密码</span>
            <router-link :to="{path: 'howtoopen',query:{tel:keyInfo.telephoneNo}}">
              <span class="openDoorLink fr fz15">如何开门？</span>
            </router-link>
          </label>
          <label id="label-password" class="ac" v-if="keyInfo.orderStatus == 2">
            {{keyInfo.userKey}}
          </label>
          <label id="label-password" class="ac" v-else>
            *&nbsp;*&nbsp;*&nbsp;*&nbsp;*&nbsp;*&nbsp;*&nbsp;*&nbsp;*
          </label>
          <div class="netLockBtn border-blue" @click="changeNetLockTipStatus(true)" v-if="keyInfo.lockType == 2">
            身份证开门
          </div>
          <div class="mid-registerContainer" v-if="keyInfo.orderStatus != 2">
            <label class="pl0 bdnone fb">
              温馨提示
            </label>
            <div class="tips-bottom">
              {{keyInfo.tips}}，电话<a :href="getCallHref(keyInfo.telephoneNo)">{{keyInfo.telephoneNo}}</a>
            </div>
          </div>
        </div>
        <mt-popup v-model="netLockTipStatus" popup-transition="popup-fade">
          <div class="netLockTipLayout ac clearfix bgc_blue">
            <div class="bgc_white">
              <div class="pt20 pb15 fz20">
                1.请触摸门锁键盘，唤醒门锁
              </div>
              <div class="wp70 m0 mt20 pb15">
                <img src="../../images/lock-pic.png" alt="" class="wp100">
              </div>
            </div>
            <div class="mt20 fz20 white">
              2.请将二代身份证靠近门锁
            </div>
            <div class="mt15 fz13 white lh24">
              听到门锁发出“吱”的一声后，请转动把手;<br/>
              下次开门，将身份证靠近门锁即可。
            </div>
          </div>
          <div class="netLockTipClose"  @click="changeNetLockTipStatus(false)">
            <img src="../../images/quit.png" alt="">
          </div>
        </mt-popup>
        <!--身份验证信息 end-->
        <!--WIFI start-->
        <div class="wifiInfoContainer" v-if="keyInfo.orderStatus == 2 && keyInfo.wifiName != null">
          <label class="color-a9 fz15">
            WIFI
          </label>
          <label class="color-a9 fz15">
            名称
            <span>
                {{keyInfo.wifiName}}
            </span>
          </label>
          <label class="bb-none color-a9 fz15">
            密码
            <span>
                {{keyInfo.wifiPassword}}
            </span>
          </label>
        </div>
        <!--WIFI end-->
      </div>
    </div>
</template>

<script>
  import {msiteAdress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from '../../service/getData'
  import {animate} from '../../config/mUtils'
  import headTop from '../../components/header/head'
  import {getKeyCodeDetail,getKeyCode} from '../../service/getData'
  export default {
    data(){
      return {
        keyInfo:'',
        lockCode:'',
        stayId:'',
        layoutshow:false,
        netLockTipStatus:false
      }
    },
    created(){
      if(this.$route.query.p){
        this.lockCode = this.$route.query.p;
      }else{
        this.stayId = this.$route.query.id;
      }
    },
    components: {
      headTop,
    },
    mounted(){
      var _self = this;
      //获取数据
      let result;
      if(_self.lockCode){
        getKeyCode(_self.lockCode,
          {success: (data) => {
            _self.keyInfo = data;
            this.layoutshow = true;
            }
          });
      }else{
        getKeyCodeDetail(_self.stayId,
          {success: (data) => {
              _self.keyInfo = data;
              this.layoutshow = true;
            },fail:()=>{
            _self.$router.push({path: 'key', replace: true});
          }
          });
      }
    },
    methods: {
      //电话号码拼接
      getCallHref:function(item){
        return 'tel:'+item;
      },
      //控制网络锁提示展示隐藏
        changeNetLockTipStatus:function (status) {
            var _self = this;
            _self.netLockTipStatus = status;
        }
    }
  }
</script>

<style lang="scss" scoped>
  .roomNumber-title{
    width: 100%;
    margin-top: 15px;
    font-size: 20px;
    color: #333;
    font-weight: 700;
  }
  .roomName-title{
    width: 100%;
    padding: 5px 0 12px;
    font-size: 12px;
  }
  .openDoorLink{
    margin-right: 30px;
    color: #21bcf5;
  }
  .mid-registerContainer{
    background: #fff;
    overflow: hidden;
    padding-bottom: 0.5rem;
    text-align: center;
  }
  .mid-registerContainer label{
    width: 100%;
    padding: 0 15px;
    line-height: 44px;
    height: 44px;
    display: inline-block;
    border-bottom: 1px solid #e6e6e6;
  }
  #label-password{
    border-bottom: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0;
    font-size: 40px;
    color: #ff6000;
  }
  .wifiInfoContainer{
    margin-top: 15px;
    background: #fff;
  }
  .wifiInfoContainer label{
    width: 100%;
    box-sizing: border-box;
    padding-left:15px;
    line-height: 44px;
    height: 44px;
    display: inline-block;
    border-bottom: 1px solid #e6e6e6;
  }
  .wifiInfoContainer span{
    margin-left: 50px;
    color: #000;
  }
  .wifiInfoContainer .bb-none{
    border-bottom: none;
  }
  .color-a9{
    color: #a9a9a9;
  }
  .tips-up{
    line-height: 16px;
    color: #222;
    font-size: 16px;
    padding: 20px 0;
  }
  .tips-bottom{
    line-height: 26px;
    padding: 0 0.7rem;
    text-align: left;
    color: #ff3e3e;
  }
  .tips-bottom a{
    color: #007aff;
  }
  .detailLayout{
    font-size: 12px;
    color: #a9a9a9;
  }
  .roomInfo-dateTime,
  .roomInfo-name,
  .roomInfo-address,
  .roomInfo-tel{
    padding: 5px 15px;
  }
  .roomInfo-tel{
    padding: 4px 15px 15px;
  }
  .roomInfo-tel a{
    color: #BBA7A5
  }
  .roomInfo-dateTime span,
  .roomInfo-name span,
  .roomInfo-address span,
  .roomInfo-tel span{
    margin-left: 10px;
  }
  .detailLayout .icon{
    background-color: initial;
  }
  .detailLayout .detailTop{
    background: #fff;
    margin-bottom: 15px;
    padding-top: 1.95rem;
  }
  .detailTop div,
  .detailTop div span{
    color: #BBA7A5;
  }
  .layoutHide{
    display: none;
  }
  .layoutShow{
    display: block;
  }
  .netLockTipLayout{
    width: 100%;
    height: 15rem;
    border-radius: 8px;
    overflow: hidden;
  }
  .netLockBtn{
    margin: 10px auto;
    width: 4.5rem;
    height: 1.5rem;
    line-height: 1.4rem;
    border-radius: 0.8rem;
    color: #21bcf5;
    font-size: 0.6rem;
  }
  .netLockTipClose{
    position: absolute;
    left: 50%;
    bottom: -4rem;
    margin-left: -1rem;
    width: 2rem !important;
  }
  .netLockTipClose img{
    max-width: 100%;
  }
</style>
