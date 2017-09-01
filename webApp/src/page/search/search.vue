<template>
  <div>
    <head-top :head-title="'订房'">
    </head-top>
    <div class="hotelsearch-wrapper" v-bind:class="[searchshowStatus?'show':'']">
      <div class="searchcity-wrapper bg-white pl15">
        <div class="searchcity-title fb pt15 pb10 border-bottom">城市</div>
        <div class="city-list ac clearfix">
          <div class="per-city mt20" v-for="item in cityList" @click="chooseCity(item)">
            <span :class="['city-name',item.isSelected ? 'border-blue' : '']">{{item.name}}</span>
          </div>
        </div>
      </div>
      <router-link :to="{path: 'datepicker'}">
        <div class="checkin-checkout-wrapper bg-white mt15 pl15">
          <div class="checkin-checkout-title fb pt15 pb10 border-bottom">日期</div>
          <div class="checkin-checkout-picker ac flex-row-start-center">
            <div class="checkin-date pt20 flex-1">
              <div class="city-box grey">入住日期</div>
              <div class="day-box blue">{{queryData.checkinDate}}</div>
              <div class="date-box black mt10">{{queryData.checkinDate|showWeek}}</div>
            </div>
            <div class="checkout-date pt20 flex-1">
              <div class="city-box grey">退房日期</div>
              <div class="day-box blue">{{queryData.checkoutDate}}</div>
              <div class="date-box black mt12">{{queryData.checkoutDate|showWeek}}</div>
            </div>
          </div>
        </div>
      </router-link>
      <div class="pb30 bottom-btn wp100 ac">
        <button class="btn-valid wp80" @click="searchHotel()">搜索</button>
      </div>
    </div>
    <foot-guide></foot-guide>
  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getOptionalCity} from '../../service/getData'
  import {animate,setStore,getDate,getNextDate,getDateDiff} from '../../config/mUtils'
  import headTop from '../../components/header/head'
  import footGuide from '../../components/footer/footGuide'
  import Moment from '../../config/utils/Moment';
  var week ={
    "0" : "周日",
    "1" : "周一",
    "2" : "周二",
    "3" : "周三",
    "4" : "周四",
    "5" : "周五",
    "6" : "周六"
  };
  export default {
    data(){
      return{
          searchshowStatus:false,
        cityList:null,
        queryData:{
          cityId:null,
          checkinDate:null,
          checkoutDate:null
        }
      }
    },
    created(){
        this.INIT_HOTEL_QUERY();
    },
    mounted(){
      //初始化数据
      this.queryData = this.hotelQuery;
      this.initData();
    },
    components: {
      headTop,
      footGuide
    },
    computed: {
        ...mapState([
            'hotelQuery'
        ])
    },
    filters: {
      showWeek(val) {
        var day = Moment(val).date.getDay();
        return week[day];
      }
    },
    methods: {
        ...mapMutations([
            'INIT_HOTEL_QUERY','CLEAR_HOTEL_LIST','SAVE_HOTEL_QUERY'
        ]),
      //初始化时获取基本数据
      initData(){
        //获取商铺信息
        var _self = this;
        getOptionalCity({
          success:(data)=>{
            if(_self.queryData.cityId == null){
              _self.queryData.cityId = data[0].code;
            }
            for(var i = 0;i<data.length;i++ ){
              if(_self.queryData.cityId == data[i].code){
                data[i].isSelected = true;
              }else{
                data[i].isSelected = false;
              }
            }
            _self.cityList = data;
              _self.searchshowStatus=true;
          }
        });
      },
      chooseCity(item){
          for(var i = 0;i<this.cityList.length;i++ ){
              this.cityList[i].isSelected = false;
          }
          this.queryData.cityId = item.code;
          item.isSelected = true;
          this.SAVE_HOTEL_QUERY(this.queryData);
      },
      searchHotel(){
          this.CLEAR_HOTEL_LIST();
          this.$router.push({path: 'hotellist', query:this.queryData});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .datepickerLayout{
    width:100%;
    height:100%;
  }
  .hotelsearch-wrapper{
    /*padding-top: 1.9rem;*/
    padding-bott: 1.9rem;
    overflow-y: auto;
  }

  .searchcity-wrapper .city-list {
    width: 100%;
    padding-bottom: 20px;
  }
  .border-bottom {
    border-bottom:1px solid #e5e5e5;
  }
  .city-list .per-city {
    width: 33.33333%;
    float: left;
    border-right:1px solid #dadada;
    box-sizing: border-box;
  }
  .city-list .per-city:nth-of-type(3n),
  .city-list .per-city:last-of-type {
    border-right: none;
  }
  .city-list .city-name {
    padding: 0 18px;
    min-width: 2.4rem;
    line-height: 1.45rem;
    display: inline-block;
    border-radius: 2px;
    box-sizing: border-box;
    color: #999;
    border: 1px solid transparent;
  }
  .city-list .city-name.border-blue {
    border: 1px solid #21bcf5;
    color: #21bcf5;
  }
  .checkin-checkout-picker .checkin-date,
  .checkin-checkout-picker .checkout-date {
    padding-bottom: 20px;
  }
  .checkin-checkout-picker .checkin-date {
    border-right: 1px solid #dadada;
  }
  .checkin-date .day-box,
  .checkout-date .day-box {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 500;
  }
  .checkin-checkout-title,
  .searchcity-title{
    font-size: 0.62rem;
  }
  .bottom-btn {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
  .flex-row-start-center {
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
  }
  .flex-1 {
    flex:1;
  }
  .btn-valid {
    background-color:#35c1f5;
    color:#fff;
    height: 2rem;
    border-radius: 4px;
    width: 92%;
    font-size: 0.7rem;
  }
  .mint-popup-right{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #F3F4F5
  }
</style>
