<template>
  <div>
    <head-top :head-title="'钥匙'"></head-top>
    <!--<loading></loading>-->
    <div class="keyListLayoutBox">
      <div class="keyListLayout pb10" v-for="item in keyList" v-if="keyList.length != 0">
        <router-link :to="{path: 'keydetail', query:{id: item.orderRoomStayId}}" tag='li' :key="item.orderRoomStaylId" class="shop_li">
          <div class="roomInfo-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiudian"></use>
            </svg>
            <span>{{item.hotelName}}</span>
          </div>
          <div class="roomInfo-date">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bed"></use>
            </svg>
            <span>{{item.roomTypeName}}</span>
          </div>
          <div class="roomInfo-date">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-door1"></use>
            </svg>
            <span class="red">{{item.roomNo}}</span>
            <span class="fr blue">详情</span>
          </div>
        </router-link>
      </div>
      <div class="noData" v-bind:class="[keyList.length == 0 && keyList?'show':'']">
        <img src="../../images/welcome.png" alt="暂无数据" />
      </div>
    </div>
    <!--暂无数据 start-->
    <foot-guide></foot-guide>
  </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {imgBaseUrl} from '../../config/env'
    import headTop from '../../components/header/head'
    import footGuide from '../../components/footer/footGuide'
//    import loading from  '../../components/common/loading'
    import {getKeyCodeList} from '../../service/getData'

    export default {
        data(){
            return {
                keyList:''
            }
        },
        components: {
            headTop,
            footGuide,
//            loading
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
                    if(_self.keyList == ''){
                        _self.keyList = [];
                    }
                    _self.showLoading = false;
                }});
            }
        }
    }

</script>

<style lang="scss" scoped>
  .keyListLayoutBox{
    /*padding-top: 1.9rem;*/
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
    font-size: 12px;
    margin-left: 25px;
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
    padding: 12px 15px 6px;
    color: #dadada;
  }
  .roomInfo-date span{
    padding-left: 25px;
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
    text-align: center;
    display: none;
  }
  .noData img{
    width: 100%;
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
