 <template>
   <div class="orderTabContain">
     <div class="hotel_list_container" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <div class="couponList">
       <div class="couponDetailLayout" v-for="item in list">
           <span class="fr alreadyuse" v-if="status =='1'">
                    <img src="../../images/used-tab.png" alt="">
                </span>
           <span class="fr alreadyuse" v-if="status =='2'">
                <img src="../../images/time-out-tab.png" alt="">
            </span>
         <img src="../../images/kaquan-bg.png" alt="">
         <div class="couponDetailInfoLayout">
           <div class="couponPrice fl" :class="{colc2: status !='0'}">
             {{item.couponValue}}
               <span :class="{colc2: status !='0'}" v-if="item.couponType == 1">元</span>
               <span :class="{colc2: status !='0'}" v-else>折</span>
           </div>
           <div class="couponInfo fr">
             <div class="couponTitle" :class="{col69: status !='0'}">
               {{item.couponName}}
             </div>
             <div class="couponUse">
               &nbsp;{{item.remark}}
                 <router-link :to="{path: 'couponhotel',query:{userCouponId:item.userCouponId}}">
                     <span class="fr useNow" v-if="status =='0'">
                        立即使用
                    </span>
                 </router-link>
             </div>
             <div class="couponTime">
               <span>{{item.startTime}}</span>&nbsp;至
               <span>{{item.endTime}}</span>
             </div>
           </div>
         </div>
       </div>
         <div class="ac nodataLayout" v-bind:class="[list.length == 0 && noPicStatus?'show':'']">
             <img src="../../images/nodata.png" alt="">
         </div>
     </div>
        </div>
   </div>
</template>

 <script>
   import {getCouponList} from '../../service/getData'

   export default {
     data(){
       return {
           list:[],
         noPicStatus:false
       }
     },
     props:['status'],
     mounted(){
     },
     methods:{
       loadMore(id) {
         var _self = this;
         this.showLoading=true;
         this.loading = true;
         getCouponList({
           data:{
             status:this.status
           },
           success:(data)=>{
             _self.list = data.list;
             _self.showLoading=false;
             _self.loading = false;
             _self.noPicStatus=true;
           }
         });
       }
     }
   }

 </script>

 <style lang="scss" scoped>
   .couponList{
       margin-top: 1.9rem;
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
   .couponPrice span{
       color: #ff7e7e;
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
       padding-right: 2.8rem;
     text-align: left;
     color: #999;
     position: relative;
        font-size: 0.5rem;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
   }
   .alreadyuse{
       position: absolute;
       display: inline-block;
       width: 2.5rem;
       right: 0;
       top: 0.3rem;
   }
   .couponTime{
     padding: 0.2rem 0;
   }
   .couponTime span{
     color: #999;
     margin: 0 ;
   }
   .useNow{
       position: absolute;
       right: 0.3rem;
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
   .nodataLayout img{
       width: 6.5rem;
       margin-top: 5rem;
   }
   .btn-layout .mr30{
       margin-right: 4rem;
   }
     .colc2{
         color: #c2c2c2 !important;
     }
     .col69{
         color: #696969 !important;
     }
 </style>
