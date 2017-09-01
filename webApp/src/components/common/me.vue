<template>
  <div class="my-header clearfix">
    <div class="my-headerL">
      <img src="images/mrtx.png" alt="" />
    </div>
    <div class="my-headerR">
      <div class="pendingUser">
        <img src="images/去认证.png" alt="" />
      </div>
      <div class="qualificationInfo">
        <div class="userName">
          欧阳娜娜
          <span>女士</span>
        </div>
        <div class="kkNum">
          KK号：&nbsp;
          <span>1102</span>
        </div>
        <div class="userId">
          身份证号码：&nbsp;450521198909280016
        </div>
      </div>
    </div>
  </div>
  <div class="my-contain">
    <div class="my-ListLayout">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diangdan-all"></use>
      </svg>
      <span class="ml10">
						全部订单
					</span>
      <span class="fr">
						<span>6</span>
						<svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-juxingkaobei2"></use>
						</svg>
					</span>
    </div>
    <div class="my-ListLayout">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diangdan-dzf"></use>
      </svg>
      <span class="ml10">
						待支付
					</span>
      <span class="fr">
						<span></span>
						<svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-juxingkaobei2"></use>
						</svg>
					</span>
    </div>
    <div class="my-ListLayout">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diangdan-wrz"></use>
      </svg>
      <span class="ml10">
						未入住
					</span>
      <span class="fr">
						<span>3</span>
						<svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-juxingkaobei2"></use>
						</svg>
					</span>
    </div>
    <div class="my-ListLayout my-ListLayout-last">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diangdan-cancel"></use>
      </svg>
      <span class="ml10">
						已取消
					</span>
      <span class="fr">
						<span>12</span>
						<svg class="icon" aria-hidden="true">
						  <use xlink:href="#icon-juxingkaobei2"></use>
						</svg>
					</span>
    </div>
  </div>
  <!--卡券-->
  <div class="couponsLayout">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-kaquan"></use>
    </svg>
    <span class="ml10">
					卡券
				</span>
    <span class="fr">
					<span>3张</span>
					<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-juxingkaobei2"></use>
					</svg>
				</span>
  </div>
</template>

<script>

  import {mapState} from 'vuex'
  import {shopList} from '../../service/getData'
  import {showBack, animate} from '../../config/mUtils'
  import {loadMore, getImgPath} from './mixin'
  import loading from './loading'

  export default {
    data(){
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        hotelListInfo:[], // 店铺列表数据
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        showLoading: true, //显示加载动画
      }
    },
    async mounted(){
      //获取数据
      let result = await shopList('1');
      this.hotelListInfo = result.data.list;
      console.log(this.hotelListInfo);
      this.hideLoading();
      //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status;
      });
    },
    components: {
      loading
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mixins: [loadMore, getImgPath],
    computed: {
      ...mapState([
        'latitude','longitude'
      ])
    },
    methods: {
      //到达底部加载更多数据
      async loaderMore(){
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }

        this.preventRepeatReuqest = true;
        //数据的定位加20位
        this.offset += 20;
        this.showLoading = true;
        let res = await shopList();
        this.hotelListInfo = [...this.data.list, ...res];
        this.showLoading = false;
        //当获取数据小于20，说明没有更多数据，不需要再次请求数据
        if (res.length < 20) {
          return
        }
        this.preventRepeatReuqest = false;
      },
      //返回顶部
      backTop(){
        animate(document.body, {scrollTop: '0'}, 400,'ease-out');
      },
      //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
      async listenPropChange(){
        this.offset = 0;
        this.showLoading = true;
        this.hotelListInfo = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
        if (process.env.NODE_ENV !== 'development') {
          this.hotelListInfo = this.hotelListInfo.reverse();
        }
        this.hideLoading();
      },
      hideLoading(){
        if (process.env.NODE_ENV !== 'development') {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.showLoading = false;
          }, 1000)
        }else{
          this.showLoading = false;
        }
      },
    },
    watch: {
      //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
      restaurantCategoryIds: function (value){
        this.listenPropChange();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-header{
    padding: 13px 15px;
    background: #fff;
  }
  .my-headerL{
    float: left;
    width: 74px;
  }
  .my-headerL img{
    width: 100%;
  }
  .my-headerR{
    float: left;
    width: 70%;
    margin-left: 12px;
  }
  .my-headerR .pendingUser{
    width: 150px;
    height: 28px;
    margin: 22px auto;
    display: none;
  }
  .my-headerR .pendingUser img{
    width: 100%;
  }
  .my-headerR .qualificationInfo{
    color: #999;
    margin-top: 2px;
  }
  .my-headerR .qualificationInfo .userName{
    font-size: 16px;
    color: #222;
  }
  .my-headerR .qualificationInfo .userName span{
    margin-left: 10px;
    font-size: 12px;
    color: #999;
  }
  .my-headerR .qualificationInfo .kkNum,
  .my-headerR .qualificationInfo .userId{
    margin-top: 5px;
  }
  .my-headerR .qualificationInfo .kkNum span{
    font-size: 14px;
    color: #21BCF5;
  }

  .my-contain,
  .couponsLayout{
    background: #FFF;
    margin-top: 15px;
    padding-left:15px;
  }
  .couponsLayout{
    padding: 12px 15px;
  }
  .my-ListLayout{
    padding: 12px 15px 12px 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .my-ListLayout-last{
    border-bottom: none;
  }
</style>
