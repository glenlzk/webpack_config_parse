<template>
  <div class="roomDetailLayout">
    <head-top :head-title="'订房'"  goBack="true"></head-top>
      <!--顶部end-->
      <div class="hotelInfoLayout">
        <div class="swipeLayout">
          <swiper v-if="hotelDetailInfo.imgUrlList">
            <swiper-slide v-for="items in hotelDetailInfo.imgUrlList">
              <img v-lazy="items" alt="" />
            </swiper-slide>
          </swiper>
          <swiper v-else>
            <swiper-slide>
              <img src="../../images/defaultHotel.png"/>
            </swiper-slide>
          </swiper>
        </div>
        <div class="hotelName detailAdd">
          {{hotelDetailInfo.hotelName}}
          <a v-bind:href="hotelDetailInfo.website" class="toHomeBtn" v-if="hotelDetailInfo.website">
            <img src="../../images/酒店官网 - Assistor.png" alt="" />
          </a>
        </div>
        <div class="hotelAddress detailAdd clearfix" @click="showMap">
          <span class="fl">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuoyuan"></use>
            </svg>
            {{hotelDetailInfo.address}}
          </span>
        </div>
        <!--<span class="toHome">
          <img src="../../images/悬浮导航.png" alt="" />
        </span>-->
      </div>

      <!--预定房间日期选择start-->
      <router-link :to="{path: 'datepicker'}">
        <div class="dayPickerLayout clearfix">
        <span class="fl">
            入住时间：
            <span class="daytime">{{checkinDate}}</span>
        </span>
          <span class="fr">
            退房时间：
            <span class="daytime">{{checkoutDate}}</span>
            <svg class="icon icon-small" aria-hidden="true">
              <use xlink:href="#icon-juxingkaobei2"></use>
            </svg>
        </span>
        </div>
      </router-link>
      <!--预定房间日期选择end-->
      <!--预定房间列表start-->
      <div class="roomInfoContain">
        <div class="roomTypeLayout" v-for="(itemr, index) in hotelDetailInfo.roomTypeForSaleList">
          <div class="swipeLayout">
            <swiper v-if="itemr.imgUrlList">
              <swiper-slide v-for="items in itemr.imgUrlList">
                <img v-lazy="items" alt="" />
              </swiper-slide>
            </swiper>
            <swiper v-else>
              <swiper-slide>
                <img src="../../images/defaultImg.png"/>
              </swiper-slide>
            </swiper>
          </div>
          <div class="roomTypeTitle">
            {{itemr.roomTypeName}}
            <span class="searcMore" @click="moreDetail(itemr)">
            查看更多
            <svg class="icon icon-small" aria-hidden="true">
            <use xlink:href="#icon-juxingkaobei2"></use>
            </svg>
          </span>
          </div>
          <div class="roomTypeInfo">
              入住{{dateDiff}}晚 &nbsp; &nbsp;<i v-if="itemr.orderRooms == 0">单价：</i><i v-else>总价：</i>
              <span>
                CNY
                <span class="hotelPriceNum" v-if="itemr.orderRooms == 0">{{itemr.price}}</span>
                <span class="hotelPriceNum" v-else>{{itemr.sumPrice}}</span>
              </span>
              <img src="../../images/infor.png" alt=""  @click="itemr.popupVisibleRoomTime = true"/>
              <div class="addRoom">
                <span class="addRoomM fl" @click="minCount(itemr)">
                  <img src="../../images/btn-2.png" alt="" v-if="itemr.orderRooms <= 0"/>
                  <img src="../../images/btn-4.png" alt="" v-else/>
                </span>
                {{itemr.orderRooms}}间
                <span class="addRoomP fr" @click="addCount(itemr)">
                  <img src="../../images/btn-1.png" alt=""  v-if="itemr.orderRooms < itemr.count"/>
                  <img src="../../images/btn-3.png" alt=""  v-else/>
                </span>
              </div>
              <!--弹出订房时间-->
              <mt-popup v-model="itemr.popupVisibleRoomTime" popup-transition="popup-fade">
              <!--<div class="dialog" transition="dialog-fade" v-show="itemr.popupVisibleRoomTime" overlayOpacity="1">-->
                <div class="roomTimeLayout  payLayoutLabel">
                  <div class="roomTimeName">{{itemr.roomTypeName}}</div>
                  <div class="roomTimeContain clearfix">
                    <span class="fl">{{itemr.stayDatePriceList.length}}晚×{{itemr.orderRooms}}间</span>
                    <span class="fr">¥{{itemr.price*itemr.orderRooms}}</span>
                  </div>
                  <ul class="roompriceList">
                    <li class="clearfix" v-for="dayPrice in itemr.stayDatePriceList">
                      <span class="fl">{{dayPrice.day}}</span>
                      <span class="fr">¥{{dayPrice.price}}</span>
                    </li>
                  </ul>
                  <div class="popupVisibleRoomTimeClose" @click="itemr.popupVisibleRoomTime = false">关闭</div>
                </div>
              </mt-popup>
          </div>
        </div>
      </div>
      <!--预定房间列表end-->
      <!--预定房间酒店信息start-->
      <div class="roomIntroduce">
        <div class="roomIntroduceTitle">
          酒店简介
        </div>
        <div class="pb15">
          {{hotelDetailInfo.feature}}
        </div>
        <div class="roomIntroduceTime clearfix">
          <div class="roomIntroduceTimeList">
            <span>开业时间</span>
            {{hotelDetailInfo.openDate}}
          </div>
          <div class="roomIntroduceTimeList">
            <span>装修时间</span>
            {{hotelDetailInfo.decorateDate}}
          </div>
          <div class="roomIntroduceTimeList">
            <span>房间总数</span>
            {{hotelDetailInfo.roomTotal}}
          </div>
        </div>
        <div class="roomIntroduceTab">
          <ul class="clearfix">
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-park"></use>
              </svg>
              <div class="mt3">停车场</div>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wifi"></use>
              </svg>
              <div class="mt3">免费WIFI</div>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ticket"></use>
              </svg>
              <div class="mt3">提供发票</div>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bus"></use>
              </svg>
              <div class="mt3">接送服务</div>
            </li>
          </ul>
        </div>
      </div>
      <!--预定房间酒店信息end-->
      <!--预定房间联系方式start-->
      <div class="roomTypeContent">
        <div class="roomTypeContent-tel clearfix">
							<span class="fl">
								<svg class="icon" aria-hidden="true">
								  <use xlink:href="#icon-phone"></use>
								</svg>
								电话
							</span>
          <span class="fr col69">
								{{hotelDetailInfo.telephoneNo}}
							</span>
        </div>
        <div class="roomTypeContent-cz clearfix">
							<span class="fl">
								<svg class="icon" aria-hidden="true">
								  <use xlink:href="#icon-tax"></use>
								</svg>
								传真
							</span>
          <span class="fr col69">
								{{hotelDetailInfo.fax}}
							</span>
        </div>
      </div>
      <!--预定房间联系方式end-->
      <!--入店离店时间start-->
      <div class="roomTypeContent">
        <div class="roomTypeContent-tel clearfix">
							<span class="fl">
								入店时间
							</span>
          <span class="fr col69">
								{{hotelDetailInfo.checkinTime}}
							</span>
        </div>
        <div class="roomTypeContent-cz clearfix">
        <span class="fl">
          离店时间
        </span>
          <span class="fr col69">
          {{hotelDetailInfo.checkoutTime}}
        </span>
        </div>
      </div>
      <!--入店离店时间end-->
      <!--补充政策start-->
      <div class="roomIntroduce roomIntroducebottom">
        <div class="roomIntroduceTitle">
          补充政策
        </div>
        <div class="pb15">
          {{hotelDetailInfo.rule}}
        </div>
      </div>
      <!--补充政策end-->
      <div class="btn-verify btn-ratRoom active" v-if="totalCount <= 0">确定（{{totalCount}}间 ×{{dateDiff}}晚 共 {{totalPrice}}）</div>
      <router-link :to="{path: 'orderdetail'}" v-else>
        <div class="btn-verify btn-ratRoom addCount active">确定（{{totalCount}}间 ×{{dateDiff}}晚 共 {{totalPrice}}）</div>
      </router-link>
  </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {mapState, mapMutations} from 'vuex'
    import {hotelDetail} from '../../service/getData'
    import {animate,setStore,getDate,getNextDate,getDateDiff,accMul} from '../../config/mUtils'
    import headTop from '../../components/header/head'
    import Moment from '../../config/utils/Moment';
    export default {
        data(){
            return{
                hotelId: null, //商店id值
                dateDiff:null,
                hotelDetailInfo:{},//酒店订房信息
                checkinDate:null,
                checkoutDate:null,
                totalCount:0,//总订房数
                totalPrice:0,//总价格
                orderDetail:{}
            }
        },
        created(){
            this.INIT_HOTEL_QUERY();
            this.hotelId = this.$route.query.id;
        },
        mounted(){
            //初始化数据
            this.checkinDate = this.hotelQuery.checkinDate;
            this.checkoutDate = this.hotelQuery.checkoutDate;
            var day1 = Moment(this.checkinDate).date;
            var day2 = Moment(this.checkoutDate).date;
            this.dateDiff = parseInt(Math.abs(day2  -  day1)  /  1000  /  60  /  60  /24);
            //初始化数据
            this.initData();
        },
        components: {
          headTop,
          swiper,
          swiperSlide
        },
        computed: {
            ...mapState([
                'hotelQuery'
            ])
        },
//      mixins: [Popup],
      methods: {
            ...mapMutations([
                'INIT_HOTEL_QUERY','SAVE_ROOMTYPE_DETAIL'
            ]),
            // 响应 overlay事件
            overlayClick () {
              this.show = false
            },
            showMap(){
              this.$router.push({path: 'map', query:{hotelName:this.hotelDetailInfo.hotelName,latitude:this.hotelDetailInfo.latitude,longitude:this.hotelDetailInfo.longitude}});
            },
            //初始化时获取基本数据
            initData(){
                //获取商铺信息
                var _self = this;
                hotelDetail({
                  data:{
                    hotelId:this.hotelId,
                    checkinDate:this.checkinDate,
                    checkoutDate:this.checkoutDate
                  },
                  success:(data)=>{
                    var hotelDetailData = data;
                    for(var i=0;i<hotelDetailData.roomTypeForSaleList.length;i++) {
                      var itemRooms = hotelDetailData.roomTypeForSaleList[i];
                      hotelDetailData.roomTypeForSaleList[i].popupVisibleRoomTime = false;
                      itemRooms.orderRooms = 0;
                      itemRooms.sumPrice = 0;
                    }
                    if(hotelDetailData.imgUrlList){
                      for(var i=0;i<hotelDetailData.imgUrlList.length;i++) {
                        var item = hotelDetailData.imgUrlList[i];
                        var obj = {
                          src:item,
                          error:require('../../images/defaultHotel.png'),
                          loading:require('../../images/defaultHotel.png')
                        }
                        hotelDetailData.imgUrlList[i]=obj;
                      }
                    }
                    _self.hotelDetailInfo = hotelDetailData;
                    var orderDetail = {};
                    orderDetail.hotelId=hotelDetailData.hotelId;
                    orderDetail.hotelName=hotelDetailData.hotelName;
                    orderDetail.address=hotelDetailData.address;
                    orderDetail.telephoneNo=hotelDetailData.telephoneNo;
                    orderDetail.checkinDate = this.checkinDate;
                    orderDetail.checkoutDate = this.checkoutDate;
                    orderDetail.dateDiff = this.dateDiff;
                    orderDetail.orderRoomList = [];
                    orderDetail.totalCount=0;
                    orderDetail.totalPrice=0;
                    _self.orderDetail=orderDetail;
                  }
                });
            },
            //minCount
            minCount(itemr){
                if (itemr.orderRooms <= 0) {
                    itemr.orderRooms = 0;
                    return;
                };
                itemr.orderRooms -= 1;
                this.calcuSumPrice(itemr);
            },
            //addCount
            addCount(itemr){
                if (itemr.orderRooms >= itemr.count) {
                    itemr.orderRooms = itemr.count;
                    return;
                };
                itemr.orderRooms += 1;
                this.calcuSumPrice(itemr);
            },
            calcuSumPrice (item) {
                item.sumPrice = accMul(item.orderRooms,item.price);
                this.totalCount = 0;
                this.totalPrice = 0;
                this.orderDetail.orderRoomList = [];
                for(var i=0; i<this.hotelDetailInfo.roomTypeForSaleList.length; i++){
                    var roomTypeItem =  this.hotelDetailInfo.roomTypeForSaleList[i]
                    this.totalCount += roomTypeItem.orderRooms;
                    this.totalPrice += roomTypeItem.sumPrice,this.dateDiff;
                    if(roomTypeItem.orderRooms>0){
                        this.orderDetail.orderRoomList.push(roomTypeItem);
                    }
                }
                this.orderDetail.totalCount = this.totalCount;
                this.orderDetail.totalPrice = this.totalPrice;
                setStore('ORDER_INFO',this.orderDetail);
            },
            moreDetail(item){
                this.SAVE_ROOMTYPE_DETAIL({hotelId:this.hotelDetailInfo.hotelId,
                  roomTypeId:item.roomTypeId,
                  roomTypeName:item.roomTypeName,
                  bedType:item.bedType,
                  floor:item.floor,
                  houseType:item.houseType,
                  imgUrlList:item.imgUrlList,
                  roomArea:item.roomArea,
                  wifiSupport:item.wifiSupport,});
              this.$router.push({path: 'roomtypedetail', query:{hotelId:this.hotelDetailInfo.hotelId,roomTypeId:item.roomTypeId}});
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  @import '../../style/swiper.min.css';
  .dialog {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    width: 90%;
    z-index: 99999;
  }

  .dialog-content {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
  }

  .dialog-fade-transition {
    transition: opacity .3s linear;
  }

  .dialog-fade-enter,
  .dialog-fade-leave {
    opacity: 0;
  }
  .hotelInfoLayout{
    /*padding-top: 1.9rem;*/
    background: #fff;
    position: relative;
  }
  .hotelInfoLayoutfixed{
    height: 100%;
    max-height: 100%;
    overflow: hidden;
  }
  .hotelInfoLayout img{
    width: 100%;
    max-width: 100%;
  }
  .swipeLayout{
    overflow: hidden;
    height:8.8rem;
  }
  .hotelInfoLayout .hotelName{
    padding-left: 15px;
    font-size: 0.65rem;
    color: #222;
    position: relative;
  }
  .hotelInfoLayout .hotelAddress{
    margin-top: 10px;
    padding:0 15px;
    padding-bottom:0.5rem;
    color: #696969;
  }
  .hotelInfoLayout .hotelName.detailAdd{
    width: 90%;
    padding-right: 3.2rem;
  }
  .hotelInfoLayout .hotelAddress.detailAdd{
     width: 75%;
   }
  .hotelInfoLayout .toHomeBtn{
    width: 4.2rem;
    position: absolute;
    right: -1.2rem;
    top: 0;
  }
  .hotelInfoLayout .toHome img{
    width: 30px;
    position: absolute;
    left: 15px;
    top: 20px;
  }
  .hotelPrice{
    margin-top: -4px;
    float: right;
    color: #222;
    font-size: 13px;
  }
  .hotelPrice span,
  .roomTypeInfo span{
    margin-right: 3px;
    color: #ff7e7e;
  }
  .hotelPrice .hotelPriceNum,
  .roomTypeInfo .hotelPriceNum{
    color: #ff5b45;
    font-size: 0.6rem;
  }
  .roomDetailLayout{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  .dayPickerLayout{
    padding: 12px 15px;
    margin-top: 15px;
    background: #fff;
    color: #222;
    font-size: 0.5rem;
  }
  .dayPickerLayout .daytime{
    color: #696969;
  }
  .roomInfoContain{
    padding:0 12px;
    margin-top: 15px;
    background: #fff;
  }
  .roomTypeLayout{
    padding-top: 15px;
  }
  .roomTypeLayout img{
    width: 100%;
    max-width: 100%;
  }
  .roomTypeLayout .roomTypeTitle{
    margin-top: 10px;
    color: #222;
    font-size: 0.6rem;
    text-align: center;
    position: relative;
  }
  .roomTypeLayout .roomTypeTitle .searcMore{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.6rem;
    color: #696969;
  }
  .roomTypeInfo{
    color: #696969;
    margin-top: 12px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  .roomTypeInfo img{
    width: 0.6rem;
    margin: -3px 0 0 3px;
  }
  .addRoom{
    float: right;
    margin-top: 0.2rem;
    line-height: 0.6rem;
  }
  .mint-swipe{
    width: 100%;
  }
  .addRoom span img{
    width: 0.8rem;
  }
  .roomIntroduce{
    margin-top: 15px;
    padding: 15px 12px;
    color: #696969;
    background: #fff;
  }
  .roomIntroducebottom{
    padding-bottom:3rem;
  }
  .roomIntroduce .roomIntroduceTitle,
  .roomIntroduce span{
    color: #222;
  }
  .roomIntroduce .roomIntroduceTitle{
    padding-bottom: 10px;
  }
  .roomIntroduceTime{
    border-top: 1px solid #eee;
    padding:0 0 15px 0;
  }
  .roomIntroduceTime .roomIntroduceTimeList{
    padding-top: 15px;
    width: 50%;
    float: left;
  }
  .roomIntroduceTime .roomIntroduceTimeList span{
    margin-right: 10px;
  }
  .roomIntroduceTab{
    border-top: 1px solid #eee;
    padding-top: 15px;
  }
  .roomIntroduceTab ul{
    width: 100%;
  }
  .roomIntroduceTab ul li{
    width: 20%;
    float: left;
    text-align: center;
    color: #999;
  }
  .roomIntroduceTab ul li svg{
    font-size: 24px;
  }
  .roomTypeContent{
    margin-top: 15px;
    background: #fff;
    color: #222;
  }
  .roomTypeContent div{
    margin-left: 15px;
    padding: 15px 15px 15px 0;
    border-bottom: 1px solid #eee;
  }
  .btn-verify {
    width: 92%;
    margin: 20px auto;
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    border-radius: 4px;
    color: #fffefe;
    border: 1px solid #d5d5d5;
    background: #dbdcdd;
    text-align: center;
  }
  .btn-ratRoom{
    position: fixed;
    bottom: 0px;
    left: 50%;
    margin-left: -46%;
    z-index: 999;
    opacity: 0.4;
  }

  .btn-verify.active {
    border: 1px solid #00a1dd;
    background: #21bcf5;
  }
  .addCount{
    opacity: 1;
  }
  /*订房时间价格列表弹窗*/
  .roomTimeLayout{
    border-radius: 4px;
    background-color: #fff;
    margin: 0 auto;
    text-align: center;
    max-height: 80%;
    overflow-y: auto;
  }
  .roomTimeLayout .roompriceList{
    max-height: 15rem;
    overflow-y: auto;
  }
  .roomTimeLayout .roomTimeName{
    font-size: 18px;
    color: #222;
    height: 36px;
    line-height: 36px;
  }
  .roomTimeLayout .roomTimeContain{
    border-bottom: 1px solid #dadada;
  }
  .roomTimeLayout .roomTimeContain span{
    display: inline-block;
    width: 50%;
    color: #ff7e7e;
    font-size: 13px;
    margin: 0;
    padding: 10px 0;
  }
  .roomTimeLayout ul li{
    margin: 0 15px;
    padding: 3px 0;
    border-bottom:  1px solid #eaeaea;
  }
  .roomTimeLayout ul li span{
    display: inline-block;
    padding: 10px 0;
    width: 50%;
    color: #999;
    margin: 0;
  }
  .roomTimeLayout .popupVisibleRoomTimeClose{
    height: 44px;
    line-height: 44px;
    color: #fff;
    background-color: #ff7e7e;
    font-size: 18px;
    border-radius: 0 0 4px 4px;
  }
</style>
