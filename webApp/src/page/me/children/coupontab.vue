<template>
    <div class="meLayout">
        <head-top :head-title="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </head-top>
        <div class="orderTab">
            <ul>
                <li @click="changeTabunuse" :class="changeTabStatus == 0 ? 'active': ' '">
                    <span>未使用</span>
                </li>
                <li @click="changeTabalreadyuse" :class="changeTabStatus == 1 ? 'active': ' '">
                    <span>已使用</span>
                </li>
                <li @click="changeTabalreadypass" :class="changeTabStatus == 2 ? 'active': ' '">
                    <span>已过期</span>
                </li>
            </ul>
        </div>
        <div class="couponTabContain">
            <div class="couponTabContainUnuse">
                <div class="couponList">
                    <div class="couponDetailLayout" v-for="item in couponInfo">
                        <img src="../../../images/kaquan-bg.png" alt="">
                        <div class="couponDetailInfoLayout">
                            <div class="couponPrice fl">
                                {{item.couponValue}}
                            </div>
                            <div class="couponInfo fr">
                                <div class="couponTitle">
                                    {{item.couponName}}
                                </div>
                                <div class="couponUse">
                                    {{item.remark}}
                                    <span class="fr useNow">
                                        立即使用
                                    </span>
                                </div>
                                <div class="couponTime">
                                    <span>{{item.startTime}}</span>&nbsp;至
                                    <span>{{item.endTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapMutations} from 'vuex'
    import headTop from '../../../components/header/head'
    import {getCouponList} from '../../../service/getData'

    export default {
        data(){
            return {
                headTitle: '卡券', // msiet页面头部标题
                couponInfo:null,
                changeTabStatus:0,
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
                getCouponList({
                    data:{
                        status:0
                    },
                    success:(data)=>{
                        this.couponInfo = data.list;
                    }
                })
            },
            changeTabunuse(){
                if(this.changeTabStatus == 0){
                    return;
                }
                getCouponList({
                    data:{
                        status:0
                    },
                    success:(data)=>{
                        this.couponInfo = data.list;
                    }
                })
            },
            changeTabalreadyuse(){
                if(this.changeTabStatus == 1){
                    return;
                }
                getCouponList({
                    data:{
                        status:1
                    },
                    success:(data)=>{
                        this.couponInfo = data.list;
                    }
                })
            },
            changeTabalreadypass(){
                if(this.changeTabStatus == 2){
                    return;
                }
                getCouponList({
                    data:{
                        status:2
                    },
                    success:(data)=>{
                        this.couponInfo = data.list;
                    }
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
    .meLayout{
        position: relative;
    }
    .orderTab{
        height: 3.8rem;
        position: fixed;
    }
    .orderTab ul{
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
    .couponTabContain{

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
        padding: 0.3rem 0.6rem;
        padding-top: 0.6rem;
        font-size: 0.7rem;
    }
    .couponUse{
        padding: 0.4rem 0.6rem;
        text-align: left;
        color: #999;
    }
    .couponTime{
        padding: 0.2rem 0;
    }
    .couponTime span{
        color: #999;
        margin: 0 ;
    }
    .useNow{
        display: inline-block;
        margin-top: -5px;
        height: 1.1rem;
        line-height: 1.1rem;
        border: 1px solid #ff7e7e;
        border-radius: 16px;
        width: 2.8rem;
        text-align: center;
        color: #ff7e7e;
        font-size: 0.4rem;
    }
</style>
