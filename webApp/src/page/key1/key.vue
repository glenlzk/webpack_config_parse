<template>
  <div>
    <head-top :head-title="'钥匙'"></head-top>
      <div class="keyListLayoutBox">
        <div class="keyListLayout" v-for="item in keyList" v-if="keyList.length != 0">
          <router-link :to="{path: 'keydetail', query:{id: item.orderRoomStayId}}" tag='li' :key="item.orderRoomStaylId" class="shop_li">
            <div class="roomInfo-title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-juxingkaobei"></use>
              </svg>
              <span>{{item.roomTypeName}}{{item.roomNo}}</span>
            </div>
            <div class="roomInfo-date">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-juxingkaobei1"></use>
              </svg>
              <span>{{item.checkinTime}} - {{item.checkoutTime}}</span>
            </div>
            <div class="roomInfo-contain clearfix" v-if="item.orderStatus == 2">
              <span>开门密码</span>
              <span class="roomInfo-contain-r">{{item.userKey}}</span>
            </div>
            <div class="roomInfo-tips clearfix" v-else>
              <span>温馨提示</span>
              <span class="roomInfo-tips-r">{{item.tips}}</span>
            </div>
          </router-link>
        </div>
      </div>
      <!--暂无数据 start-->
      <div class="noData" v-if="keyList.length == 0">
        <img src="../../images/nodata.png" alt="暂无数据" />
      </div>
      <foot-guide></foot-guide>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {imgBaseUrl} from '../../config/env'
  import headTop from '../../components/header/head'
  import footGuide from '../../components/footer/footGuide'
  import {getKeyCodeList} from '../../service/getData'

  export default {
    data(){
      return {
        keyList:''
      }
    },
    components: {
      headTop,
      footGuide
    },
    mounted(){
      //获取数据
      this.initData();
    },
    methods:{
      initData(){
        var _self = this;
        getKeyCodeList({success:(data)=>{
          _self.keyList = data;
          _self.showLoading = false;
        }});
      }
    }
  }

</script>

<style lang="scss" scoped>
  .keyListLayoutBox{
    padding-top: 1.9rem;
    padding-bottom: 2.3rem;
  }
  .keyListMask{
    display: none;
  }
  .keyListLayout{
    width: 100%;
    margin-top: 15px;
    border: 1px solid #e6e6e6;
    background: #fff;
  }
  .roomInfo-title{
    padding: 15px 15px 5px;
  }
  .roomInfo-title span{
    margin-left: 55px;
  }
  .roomInfo-contain{
    padding: 5px 15px 7px;
    line-height: 34px;
    color: #999;
  }
  .roomInfo-contain span{
    float: left;
  }
  .roomInfo-contain .roomInfo-contain-r{
    padding-left: 20px;
    color: #ff6000;
    font-size: 22px;
    float: left;
  }
  .roomInfo-date{
    padding: 10px 15px 5px;
    color: #dadada;
  }
  .roomInfo-date span{
    padding-left: 55px;
    color: #696969;
    font-size: 12px;
  }
  .roomInfo-tips{
    padding: 8px 15px 15px;
    color: #999;
  }
  .roomInfo-tips span{
    float: left;
  }
  .roomInfo-tips .roomInfo-tips-r{
    float: left;
    color: #ff3e3e;
    font-size: 12px;
    margin-left:20px ;
    display: inline-block;
    width: 76%;
  }

  .noData{
    padding: 100px 0;
    text-align: center;
  }
  .noData img{
    width: 150px;
    max-width: 150px;
  }
  .mint-loadmore{
    overflow-y: auto;
    height: 100%;
  }
  .mint-popup-right{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #F3F4F5
  }

</style>
