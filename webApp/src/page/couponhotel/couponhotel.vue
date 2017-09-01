<template>
    <div>
        <head-top headTitle="订房" goBack="true"></head-top>
        <div class="hotel_list_container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <router-link :to="{path: 'datepicker'}">
                <div class="dayPickerLayout clearfix">
                    <span class="fl">
                        <span class="daytime">{{checkinDate}}&nbsp;入住、{{dateDiff}}晚</span>
                    </span>
                    <svg class="icon fr" aria-hidden="true">
                      <use xlink:href="#icon-juxingkaobei2"></use>
                    </svg>
                </div>
            </router-link>
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
            <loading v-show="isShowLoadingTips"></loading>
            <none v-show="isShowLoadedTips"></none>
        </div>
        <!--暂无数据 start-->
        <div class="noData" v-if="hotelList.length == 0">
            <img src="../../images/nodata.png" alt="暂无数据" />
        </div>
    </div>
</template>

<script>

    import {mapState,mapMutations} from 'vuex'
    import {pageForCoupon} from '../../service/getData'
    import {getDate,getNextDate,getDateDiff} from '../../config/mUtils'
    import Moment from '../../config/utils/Moment'
    import headTop from '../../components/header/head'
    import loading from '../../components/common/loading.vue'
    import none from '../../components/common/none.vue'
    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        data(){
            return {
                isShowLoadingTips:false,
                isShowLoadedTips:false,
                checkinDate:'',
                checkoutDate:'',
                dateDiff:'',
                queryData:''
            }
        },
        created(){
            this.INIT_HOTEL_QUERY();
            //获取数据
            var _self = this;
            _self.checkinDate = getDate();
            _self.checkoutDate = getNextDate(_self.checkinDate);
            _self.queryData = {
                checkinDate: _self.checkinDate,
                checkoutDate:_self.checkoutDate
            }
            _self.queryData.userCouponId = this.$route.query.userCouponId;
            _self.queryData.pageSize = 2;
            _self.queryData.pageNum = 1;
        },
        mounted(){
            //初始化数据
            this.checkinDate = this.hotelQuery.checkinDate;
            this.checkoutDate = this.hotelQuery.checkoutDate;
            var day1 = Moment(this.checkinDate).date;
            var day2 = Moment(this.checkoutDate).date;
            this.dateDiff = parseInt(Math.abs(day2  -  day1)  /  1000  /  60  /  60  /24);
        },
        components: {
            headTop,
            infiniteScroll,
            loading,
            none,
        },
        computed: {
            ...mapState([
                'hotelList','hotelQuery'
            ])
        },
        methods:{
            ...mapMutations([
                'INIT_HOTEL_LIST','SAVE_HOTEL_LIST','INIT_HOTEL_QUERY'
            ]),
            loadMore(id) {
                var _self = this;
                this.isShowLoadingTips=true;
                this.loading = true;
                pageForCoupon({data:this.queryData,success:(data)=>{
                    this.isShowLoadingTips = false;
                    if(data.list.length==0){
                        this.loading = false;
                        this.isShowLoadedTips = true;
                    }else{
                        this.queryData.pageNum = this.queryData.pageNum+1;
                        _self.SAVE_HOTEL_LIST({itemList:data.list});
                    }
                }});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .dayPickerLayout{
        padding: 12px 15px;
        margin-top: 12px;
        background: #fff;
        color: #222;
        font-size: 0.5rem;
    }
    .dayPickerLayout .daytime{
        font-size: 12px;
        color: #696969;
    }
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
        padding-top: 1.9rem;
        height:100%;
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

