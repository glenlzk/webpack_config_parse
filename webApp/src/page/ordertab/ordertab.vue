<template>
  <div class="meLayout" v-bind:class="[ordertabShowStatus?'show':'']">
    <head-top headTitle="订单" goBack="true"></head-top>
    <div class="orderTab">
         <ul>
             <li>
                 <i v-if="myNum.unpayNum != 0">{{myNum.unpayNum}}</i>
             </li>
            <li>
                 <i v-if="myNum.unLiveinNum != 0">{{myNum.unLiveinNum}}</i>
             </li>
            <li>
                 <i v-if="myNum.cancelNum != 0">{{myNum.cancelNum}}</i>
             </li>
            <li>
                 <span></span>
             </li>
         </ul>
     </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <order-list status="0" @freshList="freshList"></order-list>
      </swiper-slide>
      <swiper-slide>
        <order-list status="1" @freshList="freshList"></order-list>
      </swiper-slide>
      <swiper-slide>
        <order-list status="4" @freshList="freshList"></order-list>
      </swiper-slide>
      <swiper-slide>
        <order-list status="" @freshList="freshList"></order-list>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import headTop from '../../components/header/head'
  import {getMyNum} from '../../service/getData'
  import {getDateDiff} from '../../config/mUtils'
  import orderList from '../../components/common/orderlist'

  const TAB_NAME = ['待支付', '未入住', '已取消', '全部'];

  export default {
    data(){
      return {
        status:'0',
        myNum:{},
        swiperOption: null,
        ordertabShowStatus:false
      }
    },
    created(){
      var _self = this;
      this.swiperOption = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender(swiper, index, className) {
          return `<div class="${className} swiper-pagination-bullet-custom"><span>${TAB_NAME[index]}</span></div>`;
        }
      };
      if(this.$route.query){
        this.status = this.$route.query.orderStatus;
      }
    },
    //定义这个sweiper对象
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted(){
      //初始化数据
      if(this.status == '0'){
        this.swiper.slideTo(0, 0, false);
      }else if(this.status == '1'){
        this.swiper.slideTo(1, 0, false);
      }else if(this.status == '4'){
        this.swiper.slideTo(2, 0, false);
      }else if(this.status == ''){
        this.swiper.slideTo(3, 0, false);
      }
      this.initData();
    },
    components: {
      headTop,
      orderList,
      swiper,
      swiperSlide,
    },
    methods:{
      initData(){
        var _self = this;
        getMyNum({
          success:(data)=>{
            _self.myNum = data;
            _self.ordertabShowStatus = true;
          }
        });
      },
      freshList(){
        this.initData();
      }
    }
  }

</script>

<style lang="scss" scoped>
    @import '../../components/common/swipercss.css';
    @import '../../style/swiper.min.css';
  .meLayout{
    position: relative;
    height: 100%;
      display: none;
  }
  .swiper-container{
    height: 100%;
  }
  .orderTab{
    width: 100%;
    height: 1.9rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    pointer-events: none;
  }
  .orderTab ul{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 1.9rem;
    text-align: center;
    font-size: 0.7rem;
  }
  .orderTab ul li{
    flex: 1;
    position: relative;
  }
  .orderTab ul li span{
    color: #999;
    line-height: 1.9rem;
    display: inline-block;
    box-sizing: border-box;
  }
  .orderTab ul li i{
    font-size: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.9rem;
    display: inline-block;
    position: absolute;
    color: #fff;
    background-color: #ff7e7e;
    border-radius: 50%;
    top: -0.8rem;
    right: 0.3rem;
  }
  .orderTabContainStayInList{
    margin-top: 0.7rem;
    background-color: #fff;
  }
  .payLayoutLabel{
    line-height: 1.9rem;
    margin: 0 0.7rem;
    border-bottom: 1px solid #eee;
  }
  .my-ListLayout-last{
    border:none;
  }
  .payhotelList li{
    padding: 0 0.7rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .payhotelList li .payhotelListImg{
    width: 34%;
  }
  .hotelName{
    padding: 0.7rem 0;
  }
  .bdtl{
    border-top: 1px solid #eee;
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
    font-size: 13px;
  }
  .payhotelListRight .hotelPrice{
    width: 100%;
    line-height: 34px;
  }
  .btn-layout{
    margin: 0 0.7rem;
    padding: 0.3rem 0;
    background-color: #fff;
  }
  .btn-layout button{
    width: 4rem;
    height: 1.3rem;
    border-radius: 4px;
    border: 1px solid #ff7e7e;
    color: #ff7e7e;
    background-color: transparent;
    margin-right: 0.7rem;
  }

</style>
