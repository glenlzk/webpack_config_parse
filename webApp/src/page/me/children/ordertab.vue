<template>
    <div class="meLayout">
        <head-top headTitle="订单" goBack="true"></head-top>
        <div class="orderTab">
            <ul>
                <li class="active">
                    <span>待入住</span>
                    <i>6</i>
                </li>
                <li>
                    <span>未入住</span>
                    <i>3</i>
                </li>
                <li>
                    <span>已取消</span>
                    <i>2</i>
                </li>
                <li>
                    <span>全部</span>
                </li>
            </ul>
        </div>
        <div class="orderTabContain">
            <div class="orderTabContainStayIn">
                <div class="orderTabContainStayInList" v-for="item in orderList">
                    <div class="payLayoutLabel">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-hotel"></use>
                        </svg>
                        {{item.hotelName}}
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-juxingkaobei2"></use>
                        </svg>
                        <span class="fr">待支付</span>
                    </div>
                    <div class="my-ListLayout-last payLayoutLabel">
                        <span>入住：</span>{{item.checkinDate}}
                        <span class="ml10">离店：</span>{{item.checkoutDate}}
                        <i class="fr">{{item.dateDiff}}晚</i>
                    </div>
                    <div class="payhotelList">
                        <ul>
                            <li class="clearfix" v-for="iteml in item.orderRoomTypeList">
                                <div class="payhotelListImg fl">
                                    <img  v-bind:src="iteml.roomTypeImgUrl" alt="" v-if="iteml.roomTypeImgUrl"/>
                                    <img  src="../../../images/defaultImg.png" alt="" v-else/>
                                </div>
                                <div class="payhotelListRight">
                                    <div class="hotelName">
                                        {{iteml.roomTypeName}}
                                        <span class="col999 fr">¥{{iteml.totalPrice}}</span>
                                    </div>
                                    <div class="hotelPrice ">
                                        <span class="fr">×{{iteml.roomCount}}间</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="payLayoutLabel my-ListLayout-last">
                        共计{{item.roomTotalCount}}间房
                        <span class="fr">订单总费用：¥{{item.orderAmount}}</span>
                    </div>
                    <div class="btn-layout bdtl clearfix">
                        <button class="fr" v-if="item.orderStatus == 0">去支付</button>
                        <button class="fr" v-if="item.orderStatus == 4">删除</button>
                        <button class="fr" v-if="item.orderStatus == 4">重新下单</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapMutations} from 'vuex'
    import headTop from '../../../components/header/head'
    import {getOrderList} from '../../../service/getData'
    import {getDateDiff} from '../../../config/mUtils'

    export default {
        data(){
            return {
              orderList:null,
            }
        },
        mounted(){
            //初始化数据
            this.initData();
        },
        components: {
            headTop,
        },
        methods:{
            initData(){
                var _self = this;
                getOrderList({
                    data:{
                        orderStatus:4
                    },
                    success:(data)=>{
                        let orderData = data.list;
                        for(let i=0; i<orderData.length; i++){
                            orderData[i].dateDiff = getDateDiff(orderData[i].checkinDate,orderData[i].checkoutDate);
                        }
                        _self.orderList = orderData;
                    }
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
    .orderTab ul{
        margin-top: 1.9rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 1.9rem;
        background-color: #fff;
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
    .orderTab ul li.active span{
        color: #21BCF5;
        border-bottom:1px solid #21BCF5;
    }
    .orderTab ul li i{
        font-size: 0.3rem;
        width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        display: inline-block;
        position: absolute;
        color: #fff;
        background-color: #ff7e7e;
        border-radius: 50%;
        top: 0.25rem;
        right: 0.14rem;
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
