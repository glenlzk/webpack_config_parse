<template>
    <div>
        <head-top :head-title="'房间详情'"  goBack="true"></head-top>
        <!--顶部end-->
        <div class="roomtypedetailLayout">
            <div class="roomtypedetailTop">
                <div class="swipeLayout">
                  <swiper  v-if="roomTypeDetail.imgUrlList">
                    <swiper-slide v-for="items in roomTypeDetail.imgUrlList">
                      <img v-lazy="items" alt="" />
                    </swiper-slide>
                  </swiper>
                  <swiper  v-else>
                    <swiper-slide v-for="items in roomTypeDetail.imgUrlList">
                      <img src="../../../images/defaultImg.png"/>
                    </swiper-slide>
                  </swiper>
                </div>
                <div>{{roomTypeDetail.roomTypeName}}</div>
            </div>
            <div class="roomtypedetailBottom">
                <div class="payLayoutLabel">
                    户型
                    <span class="fr">{{roomTypeDetail.houseType}}</span>
                </div>
                <div class="payLayoutLabel">
                    面积
                    <span class="fr">{{roomTypeDetail.roomArea}}</span>
                </div>
                <div class="payLayoutLabel">
                    所处楼层
                    <span class="fr">{{roomTypeDetail.floor}}</span>
                </div>
                <div class="payLayoutLabel">
                    景观
                    <span class="fr">{{roomTypeDetail.landscaped}}</span>
                </div>
                <div class="payLayoutLabel">
                    床型
                    <span class="fr">{{roomTypeDetail.bedType}}</span>
                </div>
                <div class="payLayoutLabel">
                    wifi
                    <span class="fr">{{roomTypeDetail.wifiSupport}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from '../../../components/header/head'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        data(){
            return{
                hotelId:null,
                toPath:null
            }
        },
        created(){
            this.hotelId = this.$route.query.hotelId;
            this.INIT_ROOMTYPE_DETAIL();

        },
        mounted(){
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
            'roomTypeDetail'
          ])
        },
        methods: {
            ...mapMutations([
                'INIT_ROOMTYPE_DETAIL'
            ]),
            //初始化时获取基本数据
            initData(){
                if(this.hotelId){
                  this.toPath = '/hotelDetail?id='+this.hotelId;
                }else{
                  this.toPath = '/hotelDetail?id='+this.roomTypeDetail.hotelId;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/mixin';
    .roomtypedetailTop{
        margin-top: 1.9rem;
        text-align: center;
        font-size: 0.8rem;
        background-color: #fff;
        padding-bottom: 0.3rem;
    }

    .roomtypedetailTop img{
        width: 100%;
    }
    .roomtypedetailBottom{
        font-size: 0.6rem;
        margin-top: 0.5rem;
        background-color: #fff;
    }
    .roomtypedetailBottom .payLayoutLabel{
        padding: 0.6rem 0.55rem;
        border-bottom: 1px solid #eee;
    }
    .payLayoutLabel{
        color: #999;
    }
    .payLayoutLabel span{
        color: #222;
    }
    .swipeLayout{
        height:9.8rem;
    }
</style>
