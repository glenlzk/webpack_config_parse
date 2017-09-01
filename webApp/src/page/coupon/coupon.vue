<template>
  <div class="couponLayout">
    <header id='head_top'>
      <section class="head_goback">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="changePopupVisibleCoupon">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <section class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>
    </header>
    <div class="nouseLayout" @click="changeCheckStatus">
      不使用优惠券
      <span class="fr nouseCheckbox">
        <img src="../../images/xuanzhong.png" v-if="checkStatus == true">
        <img src="../../images/weixuanzhong.png" v-else>
      </span>
    </div>

    <div class="couponList">
      <div class="couponDetailLayout" v-for="itemz in coupopLists" @click="changeCheckStatusList(itemz)"  v-model="itemz.checkStatus">
        <img src="../../images/kaquan-bg.png" alt="">
        <div class="couponDetailInfoLayout">
          <div class="couponPrice fl">
            {{itemz.couponValue}}
          </div>
          <div class="couponInfo fr">
            <div class="couponTitle">
              {{itemz.couponName}}
            </div>
            <div class="couponUse">
              &nbsp;{{itemz.remark}}
              <span class="fr nouseCheckbox">
                <img src="../../images/xuanzhong.png" alt="" v-if="itemz.checkStatus == true">
                <img src="../../images/weixuanzhong.png" alt="" v-else>
              </span>
            </div>
            <div class="couponTime">
              <span>{{itemz.startTime}}</span>至
              <span>{{itemz.endTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {imgBaseUrl} from '../../config/env'
    import headTop from '../../components/header/head'
    import {getKeyCodeList} from '../../service/getData'

    export default {
        data(){
            return {
                headTitle: '卡券', // msiet页面头部标题
                popupVisibleCoupon:false,
                checkStatus:false,
                coupopLists: this.myMessage
            }
        },
        components: {
            headTop,
        },
        props:['myMessage'],
        watch: {
            myMessage: function (newVal) {
                this.coupopLists = newVal;
            }
        },
        methods: {
            changePopupVisibleCoupon:function () {
                this.$emit('transferUser',this.opupVisibleCoupon)
            },
            changeCheckStatus:function () {
                this.checkStatus = true;
                this.$emit('transferCoupon',null,0);
                this.changePopupVisibleCoupon();
                for(var i=0; i<this.myMessage.length; i++){
                    this.myMessage[i].checkStatus = false;
                };
            },
            changeCheckStatusList:function (itemStatus) {
                this.checkStatus = false;
                for(var i=0; i<this.myMessage.length; i++){
                    this.myMessage[i].checkStatus = false;
                };
                itemStatus.checkStatus = true;
                this.$emit('transferCoupon',itemStatus.userCouponId,itemStatus.discountAmount)
                this.changePopupVisibleCoupon();
            }
        }
    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  #head_top{
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
  }
  .head_goback{
    left: 0.4rem;
    @include wh(0.6rem, 0.8rem);
    line-height: 2.2rem;
    margin-left: .4rem;
  }
  .head_login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
      color: #fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
  .title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
  .couponLayout{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .nouseLayout{
    margin: 0.1rem 0;
    margin-top: 2.5rem;
    padding: 10px 15px;
    background-color: #fff;
  }
  .nouseLayout span{
    display: inline-block;
    width: 1.0rem;
  }
  .nouseLayout span img{
    width: 100%;
    position: absolute;
    left: 0;
    top:-4px;
  }
  .nouseLayout span input{
    width: 100%;
    height: 1.0rem;
    position: absolute;
    left: 0;
    top:-4px;
    z-index: 2;
    opacity: 0;
  }
  .nouseCheckbox{
    position: absolute;
    width: 1.0rem;
    top:0.4rem;
    right: 0.3rem;
  }
  .nouseCheckbox img{
    width: 100%;
    position: absolute;
    left: 0;
    top:-4px;
  }
  .nouseCheckbox input{
    width: 100%;
    height: 1.0rem;
    position: absolute;
    left: 0;
    top:-4px;
    z-index: 2;
    opacity: 0;
  }
  .couponList{
    padding: 0.2rem 0.4rem;
  }
  .couponDetailLayout{
    padding: 0.3rem 0;
    width: 100%;
    position: relative;
  }
  .couponDetailLayout img{
    width: 100%;
  }
  .couponDetailInfoLayout{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .couponPrice{
    font-size: 1.2rem;
    color: #ff7e7e;
    font-weight: 500;
    width: 32%;
    text-align: center;
    line-height: 4.8rem;
  }
  .couponInfo{
    width: 68%;
    text-align: center;
  }
  .couponTitle{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    padding: 0 0.6rem;
    padding-top: 0.6rem;
    font-size: 0.7rem;
  }
  .couponUse{
    position: relative;
    padding: 0.4rem 15px;
    padding-right: 1rem;
    text-align: left;
    color: #999;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .couponTime{
    padding:  0 0 0.2rem;
  }
  .couponTime span{
    color: #999;
    margin: 0 ;
  }
</style>
