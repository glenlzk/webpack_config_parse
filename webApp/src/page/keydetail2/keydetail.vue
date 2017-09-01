<template>
    <div class="detailLayout">
      <head-top :head-title="'钥匙详情'" toPath="/key"></head-top>
      <div class="clearfix detailTop">
        <div class="roomNumber-title fl ac">
          {{keyInfo.roomNo}}
        </div>
        <div class="roomName-title fl ac">
          {{keyInfo.roomTypeName}}
        </div>
        <div class="roomInfo-dateTime">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-time"></use>
          </svg>
          <span>{{keyInfo.checkinTime}} - {{keyInfo.checkoutTime}}</span>
        </div>
        <div class="roomInfo-name">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hotel"></use>
          </svg>
          <span>{{keyInfo.hotelName}}</span>
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
      <div class="mid-registerContainer" v-if="keyInfo.orderStatus == 2 && keyInfo.wifiName != ''">
        <label>
          	开门密码
          <router-link :to="{path: 'howtoopen'}">
            <span class="openDoorLink fr">如何开门？</span>
          </router-link>
        </label>
        <label id="label-password" class="ac">
          {{keyInfo.userKey}}
        </label>
      </div>
      <div class="mid-registerContainer" v-else>
        <label>
          温馨提醒
        </label>
        <div class="tips-bottom">
          {{keyInfo.tips}}
        </div>
      </div>
      <!--身份验证信息 end-->
      <!--WIFI start-->
      <div class="wifiInfoContainer" v-if="keyInfo.orderStatus == 2 && keyInfo.wifiName != null">
        <label class="color-a9">
          WIFI
        </label>
        <label>
          网络名称
          <span>
								{{keyInfo.wifiName}}
							</span>
        </label>
        <label class="bb-none">
          网络密码
          <span>
								{{keyInfo.wifiPassword}}
							</span>
        </label>
      </div>
      <!--WIFI end-->
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
        stayId:''
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
            }
          });
      }else{
        getKeyCodeDetail(_self.stayId,
          {success: (data) => {
              _self.keyInfo = data;
            }
          });
      }
    },
    methods: {
      //电话号码拼接
      getCallHref:function(item){
        return 'tel:'+item;
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
    padding-bottom: 1.9rem;
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
    height: 110px;
    line-height: 110px;
    font-size: 40px;
    color: #ff6000;
    padding: 0;
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
    margin-left: 20px;
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
    padding: 10px 15px;
    text-align: left;
    color: #ff3e3e;
    font-size: 12px;
    padding-bottom: 12px;
  }
  .detailLayout{
    color: #a9a9a9;
  }
  .roomInfo-dateTime,
  .roomInfo-name,
  .roomInfo-address,
  .roomInfo-tel{
    padding: 4px 15px;
  }
  .roomInfo-tel{
    padding: 4px 15px 15px;
  }
  .roomInfo-dateTime span,
  .roomInfo-name span,
  .roomInfo-address span,
  .roomInfo-tel span{
    margin-left: 10px;
  }
  .roomInfo-tel span a{
    color: #a9a9a9;
  }
  .detailLayout .icon{
    background-color: initial;
  }
  .detailTop{
    background: #fff;
    margin-bottom: 15px;
    padding-top: 1.95rem;
  }
</style>
