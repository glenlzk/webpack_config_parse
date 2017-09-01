<template>
  <div style="height:100%;">
   <!-- <head-top headTitle="订房" toPath="search"></head-top>-->
    <div style="width:100%;height:100%;overflow-y: scroll;">
      <div class="hotel_list_container" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="5">
        <div>
          <div class="hotelInfoLayout" v-for="item in hotelList" v-if="hotelList.length != 0" >
            <router-link :to="{path: 'hoteldetail', query:{id: item.hotelId}}">
              <img alt="" v-if="item.hotelImgUrl" v-lazy="item.hotelImgUrl"/>
              <img src="../../images/defaultImg.png" alt="" v-else/>
              <div class="hotelName">
                {{item.hotelName}}
              </div>
              <div class="hotelAddress clearfix">
                <span class="fl">{{item.address}}</span>
                <span class="hotelPrice">
              <span>¥</span>
              <span class="hotelPriceNum">{{item.lowestPrice}}</span>&nbsp;起
          </span>
              </div>
            </router-link>
          </div>
        </div>
        <!--<loading v-show="isShowLoadingTips"></loading>-->
        <!--<p  v-show="isShowLoadingTips" class="ac">
          加载中...
        </p>-->
        <loadtips v-show="isShowLoadingTips"></loadtips>
        <none v-show="isShowLoadedTips&&hotelList.length != 0"></none>
      </div>
    </div>
    <!--v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" -->

    <!--暂无数据 start-->
    <div class="noData" v-if="isShowLoadedTips&&hotelList.length == 0">
      <img src="../../images/nodata.png" alt="暂无数据" />
    </div>
  </div>
</template>

<script>

    import {mapState,mapMutations} from 'vuex'
    import {pageForSale} from '../../service/getData'
    import headTop from '../../components/header/head'
    import loading from '../../components/common/loading.vue'
    import none from '../../components/common/none.vue'
    import loadtips from '../../components/common/loadtips.vue'


    export default {
        data(){
            return {
                isShowLoadingTips:false,
                isShowLoadedTips:false,
                queryData:null,
                timer: null,
            }
        },
        created(){
            this.INIT_HOTEL_LIST();
            var queryData = this.$route.query;
            queryData.pageSize = 3;
            queryData.pageNum = 0;
            this.queryData = queryData;
        },
        components: {
            headTop,
            loading,
            none,
            loadtips,
        },
        computed: {
            ...mapState([
                'hotelList'
            ])
        },
        methods:{
            ...mapMutations([
                'INIT_HOTEL_LIST','SAVE_HOTEL_LIST'
            ]),
            loadMore(elem) {
                var _self = this;
                _self.isShowLoadingTips=true;
                _self.isShowLoadedTips = false;
              /*_self.loading = true;
               console.log('加载...loading');*/
                _self.queryData.pageNum++;
                clearTimeout(_self.timer);
                _self.timer = setTimeout(function () {
                    console.log('走定时器');
                    pageForSale({data:_self.queryData,success:(data)=>{
                        _self.isShowLoadingTips = false;
                      /*console.log('data.list.length: ', data.list.length);
                       console.log('data: ', data);*/
                        if(data.list.length == 0){
                          /*_self.loading = false;*/
                            _self.isShowLoadedTips = true;
                            _self.queryData.pageNum--;
                            if (elem.scrollTop == elem.scrollHeight - elem.clientHeight) {
                                elem.scrollTop = elem.scrollTop - 10;
                            };
                        };
                        _self.SAVE_HOTEL_LIST({itemList:data.list});
                        console.log('hotelist:', _self.hotelList.length);
                    }});
                },1000);
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin.scss';
  .noData{
    padding: 100px 0;
    text-align: center;
  }
  .noData img{
    width: 150px;
    max-width: 150px;
  }
  .loading{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10000;
    width: 16px;
    height: 16px;
    margin: -16px 0 0 -16px;
  }

  /*订房 start*/
  .hotel_list_container{
   /* padding-top: 1.9rem;*/
    border-top: 0.025rem solid $bc;
    .shop_header{
      .shop_icon{
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;
        @include wh(0.6rem, 0.6rem);
      }
      .shop_header_title{
        color: #999;
        @include font(0.55rem, 1.6rem);
      }
    }
  }
  .hotelInfoLayout{
    background: #fff;
    margin:10px 0 15px;
    padding: 0 0 10px 0;
    position: relative;
  }
  .hotelInfoLayout img{
    width: 100%;
    max-width: 100%;
    max-height: 200px;
  }
  .swipeLayout{
    height: 175px;
  }
  .hotelInfoLayout .hotelName{
    padding-left: 15px;
    font-size: 0.7rem;
    color: #222;
  }
  .hotelInfoLayout .hotelAddress{
    margin-top: 5px;
    padding:0 15px;
    color: #696969;
    position: relative;
  }
  .hotelInfoLayout .hotelAddress .fl{
    display: inline-block;
    width: 75%;
  }
  .hotelInfoLayout .hotelName.detailAdd,
  .hotelInfoLayout .hotelAddress.detailAdd{
    width: 90%;
  }
  .hotelInfoLayout .toHomeBtn{
    width: 109px;
    position: absolute;
    right: 13px;
    bottom: 30px;
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
    color: #ff7e7e;
  }
  .hotelPrice .hotelPriceNum,
  .roomTypeInfo .hotelPriceNum{
    color: #ff5b45;
    font-size: 16px;
  }

</style>

