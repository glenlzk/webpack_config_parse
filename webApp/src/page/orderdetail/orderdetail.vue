<template>
  <div class="roomDetailLayout">
    <head-top :head-title="headTitle" goBack="true">
      <span class="title_text">{{headTitle}}</span>
    </head-top>
    <!--顶部end-->
    <div class="payLayout">
      <div class="payhotelInfo">
        <div class="payLayoutLabel">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hotel"></use>
          </svg>
          &nbsp;&nbsp;{{orderDetail.hotelName}}
        </div>
        <div class="payLayoutLabel">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuoyuan"></use>
          </svg>
          &nbsp;&nbsp;{{orderDetail.address}}
        </div>
        <div class="payLayoutLabel">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-phone"></use>
          </svg>
          &nbsp;&nbsp;{{orderDetail.telephoneNo}}
        </div>
        <div class="my-ListLayout-last payLayoutLabel">
          <span>入住：</span>{{orderDetail.checkinDate}}
          &nbsp;&nbsp;<span class="ml10">离店：</span>{{orderDetail.checkoutDate}}
          <i class="fr">{{orderDetail.dateDiff}}晚</i>
        </div>
      </div>
      <div class="payhotelList">
        <ul>
          <li class="clearfix" v-for="iteml in orderDetail.orderRoomList">
            <div class="payhotelListImg fl">
              <img  v-bind:src="iteml.imgUrlList[0]" alt="" v-if="iteml.imgUrlList"/>
              <img  src="../../images/defaultImg.png" alt="" v-else/>
            </div>
            <div class="payhotelListRight">
              <div class="hotelName payLayoutLabel">
                {{iteml.roomTypeName}}
              </div>
              <div class="hotelPrice ">
                <span class="col999">单&nbsp;价:</span> &nbsp;¥{{iteml.price}}
                <span class="roomTime" @click="iteml.popupVisibleRoomTime = true"><img src="../../images/time.png" alt=""></span>
                <span class="fr">×{{iteml.orderRooms}}间</span>
              </div>
            </div>
            <!--弹出订房时间-->
            <mt-popup v-model="iteml.popupVisibleRoomTime" pop-transition="popup-fade">
              <div class="roomTimeLayout  payLayoutLabel">
                <div class="roomTimeName">{{iteml.roomTypeName}}</div>
                <div class="roomTimeContain clearfix">
                  <span class="fl">{{iteml.stayDatePriceList.length}}晚×{{iteml.orderRooms}}间</span>
                  <span class="fr">¥{{iteml.price}}</span>
                </div>
                <ul class="roompriceList">
                  <li class="clearfix" v-for="dayPrice in iteml.stayDatePriceList">
                    <span class="fl">{{dayPrice.day}}</span>
                    <span class="fr">¥{{dayPrice.price}}</span>
                  </li>
                </ul>
                <div class="popupVisibleRoomTimeClose" @click="iteml.popupVisibleRoomTime = false">关闭</div>
              </div>
            </mt-popup>
          </li>
        </ul>
      </div>
      <!--弹出订房时间-->
      <mt-popup v-model="popupVisibleCoupon" position="right">
        <coupon-list :my-message.sync="couponInfo" @transferUser="changePopupVisibleCoupon" @transferCoupon="transferCoupon"></coupon-list>
      </mt-popup>
      <div class="payhotelStatistics">
        <div class="payLayoutLabel">
          订单总额
          <span class="fr">¥{{orderDetail.totalPrice}}</span>
        </div>
        <div class="payLayoutLabel" v-if="couponInfo.length == 0">
          无可用优惠券
          <span class="fr" style="color: #FF7E7E">0</span>
        </div>
        <div class="payLayoutLabel couponLabel" v-else @click="popupVisibleCoupon = true">
          优惠券
          <span class="couponbox fz12">{{couponInfo.length}}张可用</span>
          <span class="fr">
              <span style="color: #FF7E7E" v-if="discountAmount != 0">-¥{{discountAmount}}</span>
              <span style="color: #FF7E7E" v-else>0</span>
              <svg class="icon icon-small" aria-hidden="true">
                <use xlink:href="#icon-juxingkaobei2"></use>
              </svg>
          </span>
        </div>
        <div class="payLayoutLabel">
          实付款
          <span class="fr">¥{{actualpayment}}</span>
        </div>
      </div>
      <!--<div class="payLaybel"><img src="../../images/zhifubiao.png" alt="">-->
        <!--<mt-radio-->
                <!--align="right"-->
                <!--v-model="payTypeValue"-->
                <!--:options="['　      支付宝']">-->
        <!--</mt-radio>
        </div>-->

      <div class="ac">
        <button class="btn-verify active"  @click="submitPay">下单</button>
      </div>
      <!--弹出支付方式-->
      <mt-popup v-model="popupPayment" position="bottom">
        <div class="payLaybel">
          <img src="../../images/wechat.png" alt="">
          <img class="alipayImg" src="../../images/zhifubiao.png" alt="">
            <mt-radio align="right" v-if="!isweixin()" v-model="payTypeValue" :options="[{label: '　      微信支付',value: 'wechat'},{label: '　      支付宝',value: 'alipay'}]">
          </mt-radio>
          <mt-radio align="right" v-else v-model="payTypeValue" :options="[{label: '　      微信支付',value: 'wechat'}]">
          </mt-radio>
          <div class="btn-toPay" @click="toPayment">去支付</div>
        </div>
      </mt-popup>
      <mt-popup v-model="popupPaymentDetail" position="right">
        <div id="payDetailLayout">

        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import loading from '../../components/common/loading'
    import {animate,getStore,accSubtr} from '../../config/mUtils'
    import headTop from '../../components/header/head'
    import {getCoupon,addOrder,getPaymentSign} from '../../service/getData'
    import couponList from '../coupon/coupon'
    import {baseUrl} from '../../config/env'
    export default {
        data(){
            return{
                hotelId: null, //商店id值
                headTitle:'订房',
                orderDetail:{},
                showLoading: true, //显示加载动画
                preventRepeatRequest: false,// 防止多次触发数据请求,
                payTypeValue:'alipay',
                totalCount:0,//总订房数
                totalPrice:0,//总价格
                couponInfo:'',
                popupVisibleCoupon:false,
                popupPayment:false,
                popupPaymentDetail:false,
                submitPayInfo:'',
                userCouponId:'',
                discountAmount:0,
                actualpayment:0,
                paymentSignInfo:{}
            }
        },
        mounted(){
            //初始化数据
            this.initData();
        },
        components: {
            headTop,
            loading,
            couponList
        },
        methods: {
            //初始化时获取基本数据
            initData(){
                var _self = this;
                let orderInfo = getStore('ORDER_INFO')
                if(orderInfo){
                  var orderDetail = JSON.parse(orderInfo);
                  for(var i=0;i<orderDetail.orderRoomList.length;i++){
                    orderDetail.orderRoomList[i].popupVisibleRoomTime=false;
                  }
                  this.orderDetail = orderDetail;
                }else{
                    return;
                }
                getCoupon({
                  data:{
                    hotelId:this.orderDetail.hotelId,
                    totalPrice:this.orderDetail.totalPrice
                  },
                  success:(data)=>{
                    if(data.list.length != 0){
                      for(var i=0; i<data.list.length; i++){
                        data.list[i].checkStatus = false;
                      }
                      data.list[0].checkStatus = true;
                      _self.discountAmount=data.list[0].discountAmount;
                      _self.userCouponId=data.list[0].userCouponId;
                    }
                    _self.couponInfo = data.list;
                    _self.actualpayment = accSubtr(_self.orderDetail.totalPrice,_self.discountAmount);
                    if(_self.actualpayment <= 0){
                        _self.actualpayment = 0;
                    }
                  }
                });
            },
            submitPay(){
              var _self = this;
              var orderRoomListTag = [];
              for(let i=0; i<this.orderDetail.orderRoomList.length; i++){
                  console.log(this.orderDetail.orderRoomList[i].roomTypeId);
                  orderRoomListTag.push({
                      'roomTypeId':this.orderDetail.orderRoomList[i].roomTypeId,
                      'roomTypeName':this.orderDetail.orderRoomList[i].roomTypeName,
                      'roomCount':this.orderDetail.orderRoomList[i].orderRooms,
                  });
              }
              console.log(orderRoomListTag);
              this.submitPayInfo = {
                  hotelId:this.orderDetail.hotelId,
                  checkinDate:this.orderDetail.checkinDate,
                  checkoutDate:this.orderDetail.checkoutDate,
                  userCouponId:this.userCouponId,
                  orderRoomList:orderRoomListTag,
              }
              addOrder({data:this.submitPayInfo,success:(data)=>{
                  if(data.orderPayAmount == 0){
                      _self.$router.push({path: 'ordersuccessdetail',query: { orderId: data.orderId }, replace: true});
                  }else{
                      this.popupPayment = true;
                      this.paymentSignInfo.hotelId = _self.orderDetail.hotelId;
                      this.paymentSignInfo.orderId = data.orderId;
                      this.paymentSignInfo.userCoupondId = _self.userCouponId;
                      this.paymentSignInfo.payTypeCode = _self.payTypeValue;
                  }
              }});
            },
            isweixin(){
              var ua = navigator.userAgent.toLowerCase();
              if(ua.match(/MicroMessenger/i)=="micromessenger") {
                  return true;
              } else {
                  return false;
              }
            },
            changePopupVisibleCoupon:function (status) {
                this.popupVisibleCoupon = status;
            },
            transferCoupon:function (userCouponId,price) {
                this.userCouponId = userCouponId;
                this.discountAmount = price;
                this.actualpayment = accSubtr(this.orderDetail.totalPrice,this.discountAmount);
                if(this.actualpayment <= 0){
                  this.actualpayment = 0;
                }
            },
            //支付提交
            toPayment () {
                getPaymentSign({data:this.paymentSignInfo,success:(data)=>{
                  var cont = document.getElementById('payDetailLayout');
                  cont.innerHTML = data.sign;
                  var oldScript = cont.getElementsByTagName('script')[0];
                  cont.removeChild(oldScript);
                  var scriptText = oldScript.innerHTML;
                  eval(scriptText);
                  this.popupPaymentDetail = true;
                }});
            }
        }
    }
</script>

<style lang="scss" scoped>
  .payLayout{
    width: 100%;
    height: 100%;
  }
  .payLayout .payLayoutLabel{
    line-height: 34px;
  }
  .payhotelInfo{
    background: #fff;
    /*padding-top: 45px;*/
    font-size: 0.55rem;
  }

  .payhotelStatistics div,
  .payhotelInfo div{
    padding: 5px 15px;
    border-bottom: 1px solid #eee;
  }
  .payhotelInfo div span{
    color: #999;
  }
  .payhotelInfo div i{
    color: #000;
  }
  .payhotelList li{
    margin-top: 15px;
    background: #fff;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .payhotelList li .payhotelListImg{
    width: 34%;
  }
  .payhotelList li .payhotelListImg img{
    width: 100%;
    border-radius: 6px;
    max-width: 100%;
    vertical-align: middle;
  }
  .payhotelList li .payhotelListRight{
    margin-left: 10px;
    flex:1;
  }
  .payhotelList li .payhotelListRight span{
    color: #000;
  }
  .payhotelListRight .hotelName{
    color: #000;
  }
  .payhotelListRight .hotelPrice{
    width: 100%;
    line-height: 34px;
  }
  .payhotelStatistics{
    background: #fff;
    margin-top: 15px;
  }
  .btn-verify {
    width: 92%;
    margin: 20px auto;
    height: 44px;
    line-height: 44px;
    font-size: 0.7rem;
    border-radius: 4px;
    color: #fffefe;
    border: 1px solid #d5d5d5;
    background: #dbdcdd;
    text-align: center;
  }
  .btn-verify.active {
    border: 1px solid #00a1dd;
    background: #21bcf5;
  }
  .roomTime{
    display: inline-block;
    width: 22px;
    margin: 5px 0 0 10px;
    vertical-align: middle;
  }
  .roomTime img{
    width: 100%;
  }
  .col999{
    color: #999 !important;
  }
  /*订房时间价格列表弹窗*/
  .roomTimeLayout{
    border-radius: 4px;
    background-color: #fff;
    margin: 0 auto;
    text-align: center;
  }
  .roomTimeLayout .roomTimeName{
    font-size: 18px;
    color: #222;
    height: 36px;
    line-height: 36px;
  }
  .roomTimeLayout .roompriceList{
    max-height: 15rem;
    overflow-y: auto;
  }
  .roomTimeLayout .roomTimeContain span{
    display: inline-block;
    width: 50%;
    color: #ff7e7e;
    font-size: 13px;
    border-bottom: 1px solid #dadada;
  }
  .roomTimeLayout ul li{
    margin: 0 15px;
    padding: 3px 0;
    border-bottom:  1px solid #eaeaea;
  }
  .roomTimeLayout ul li span{
    display: inline-block;
    width: 50%;
    color: #999;
  }
  .roomTimeLayout .popupVisibleRoomTimeClose{
    height: 44px;
    line-height: 44px;
    color: #fff;
    background-color: #ff7e7e;
    font-size: 18px;
    border-radius: 0 0 4px 4px;
  }
  .payLaybel{
    position: relative;
  }
  .payLaybel img{
    position: absolute;
    left: 18px;
    top:12px;
    width: 22px;
    z-index: 99;
  }
  .payLaybel .alipayImg{
    top:60px;
  }
  .couponLabel .couponbox{
    background-color: #ff7e7e;
    display: inline-block;
    padding: 0.1rem 0.2rem;
    margin-left: 0.3rem;
    line-height:normal;
    border-radius: 4px;
    color: #fff;
  }
  .couponLabel span a{
    color: #ff7e7e;
  }
  .payLaybel .btn-toPay{
    width: 100%;
    height: 44px;
    margin-top: 10px;
    line-height: 44px;
    font-size: 18px;
    color: #ff7e7e;
    text-align: center;
    background: #fff;
  }
    .mint-popup-right{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #F3F4F5
  }
  #payDetailLayout{
    width: 100%;
    background-color: #fff;
  }
</style>
