<template>
    <div class="meLayout">
        <head-top headTitle="卡券" goBack="true"></head-top>
        <!--<div class="orderTab">-->
            <!--<ul>-->
                <!--<li @click="changeTab('0')" :class="{ active: status==='0'}">-->
                    <!--<span>未使用</span>-->
                <!--</li>-->
                <!--<li @click="changeTab('1')" :class="{ active: status==='1'}">-->
                    <!--<span>已使用</span>-->
                <!--</li>-->
                <!--<li @click="changeTab('2')" :class="{ active: status==='2'}">-->
                    <!--<span>已过期</span>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <div class="couponTabContain">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide>
                    <coupon-list :status="0"></coupon-list>
                </swiper-slide>
                <swiper-slide>
                    <coupon-list :status="1"></coupon-list>
                </swiper-slide>
                <swiper-slide>
                    <coupon-list :status="2"></coupon-list>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import headTop from '../../components/header/head'
    import couponList from '../../components/common/couponlist'

    const TAB_NAME = ['未使用', '已使用', '已过期'];
    export default {
        data(){
            return {
            }
        },
        created(){
            var _self = this;
            this.swiperOption = {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                paginationBulletRender(swiper, index, className) {
                    return `<div class="${className} swiper-pagination-bullet-custom"><span>${TAB_NAME[index]}</span></div>`;
                },
                onSlideChangeEnd: function(swiper){
                    if(swiper.activeIndex == 0){
                        _self.changeTab('0');
                    }else if(swiper.activeIndex == 1){
                        _self.changeTab('1');
                    }else if(swiper.activeIndex == 2){
                        _self.changeTab('2');
                    }
                }
            };
            if(this.$route.query){
                this.status = this.$route.query.status;
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
            this.initData();
        },
        components: {
            headTop,
            couponList,
            swiper,
            swiperSlide,
        },
        methods:{
            initData(){
                this.changeTab('0');
            },
            changeTab(status){
                var _self = this;
                this.status = status;
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
    }
    .orderTab{
        width: 100%;
        height: 1.9rem;
        position: fixed;
        left: 0;
        top: 1.9rem;
        z-index: 3;
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
        overflow-y: hidden;
        height: 100%;
    }
  .orderTabContain{
      overflow-y: scroll;
      height: 100%;
  }
  .swiper-container{
      height: 100%;
  }
    .swiper-slide{
        height: 100%;
    }
</style>
