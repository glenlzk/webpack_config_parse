 <template>
   <div class="datepicker">
     <head-top :head-title="'预订日期'" goBack="true">
     </head-top>
     <div class="pos-fixed bg-white" style="top:0;width:100%;padding-top: 0">
       <div class="layout-flex row padding20 fz15">
         <div class="ac flex-1 border-right">
           <span class="fz17">入住日期</span>
           <div>
             <span class="color:#ff9c01">{{checkInDate}}</span>
           </div>
         </div>
         <div class="ac flex-1">
           <span class="fz17">离店日期</span>
           <div>
             <span style="color:#ff9c01">{{checkOutDate}}</span>
           </div>
         </div>
       </div>
       <div class="layout-flex row" style="border-bottom:1px solid #eee;border-top:1px solid #eee;">
         <span class="date-week" style="width:100%;height:20px" v-for="item in weekStr" >
           <span v-if="item !=='日' && item !=='六'">{{item}}</span>
           <span v-if="item ==='日' || item ==='六'" class="week">{{item}}</span>
         </span>
       </div>
     </div>
     <div>
       <div style="margin-top: 5rem">
         <div v-for="dateItem in dateList" style="padding:30px 0">
           <div class="date-year-month" >{{dateItem.year}}年{{dateItem.month}}月</div>
           <div class="layout-flex row" style="flex-wrap: wrap;" v-for="itemWeek in dateItem.weeks">
             <div  :class="['date-day', item.class]"
                   style="width: 1.8rem;height: 1.8rem"
                   v-for="item in itemWeek" @click="onPressDate(dateItem.year,dateItem.month,item.day)">
               {{item.day>0?item.day:''}}
             </div>
           </div>
         </div>
       </div>
       </div>
   </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import Moment from '../../config/utils/Moment';
    import headTop from '../../components/header/head'

    var DATE_LIST = [];
    var DATE_YEAR = new Date().getFullYear();
    var DATE_MONTH = new Date().getMonth()+1;
    var DATE_DAY = new Date().getDate();
    var deepCopy = function(o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = deepCopy(o[i]);
            }
            return n;

        } else if (o instanceof Object) {
            var n = {}
            for (var i in o) {
                n[i] = deepCopy(o[i]);
            }
            return n;
        } else {
            return o;
        }
    };
    export default {
      data(){
          return{
              maxMonth:6, //最多渲染月数
              markcheckInDate:false, //标记开始时间是否已经选择
              markcheckOutDate:false,   //标记结束时间是否已经选择
              checkInDate:null,
              checkOutDate:null,
              dateList:null,
              weekStr:['日','一','二','三','四','五','六'],
              item:null,
              index:null
          }
        },
        created(){
            this.INIT_HOTEL_QUERY();
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
                'hotelQuery'
            ])
        },
        mounted(){
            //初始化数据
            this.createDateListData();
            if(this.hotelQuery.checkinDate){
                this.checkInDate = this.hotelQuery.checkinDate;
                var strs = this.checkInDate.split("-"); //字符分割
                this.markcheckInDate=true;
                this.renderPressStyle(strs[0],parseInt(strs[1]),strs[2]);
            }
            if(this.hotelQuery.checkoutDate){
                this.checkOutDate = this.hotelQuery.checkoutDate;
                var strs = this.checkOutDate.split("-"); //字符分割
                this.markcheckOutDate=true;
                this.renderPressStyle(strs[0],parseInt(strs[1]),strs[2]);
            }
        },
        methods: {
            ...mapMutations([
                'SAVE_HOTEL_QUERY','INIT_HOTEL_QUERY'
            ]),
            //初始化时获取基本数据
            createDateListData(){

                var dateList = [];
                var now = new Date();
              /*
               设置日期为 年-月-01,否则可能会出现跨月的问题
               比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
               原因是由于2月份没有31号，顺推下去变成了了03-03
               */
                now = new Date(now.getFullYear(),now.getMonth(),1);
                for(var i=0;i<this.maxMonth;i++){
                    var momentDate = Moment(now).add(this.maxMonth-(this.maxMonth-i),'month').date;
                    var year = momentDate.getFullYear();
                    var month = momentDate.getMonth()+1;

                    var weeks = [];
                    var days = [];
                    var totalDay = this.getTotalDayByMonth(year,month);
                    var week = this.getWeek(year,month,1);
                    //-week是为了使当月第一天的日期可以正确的显示到对应的周几位置上，比如星期三(week = 2)，
                    //则当月的1号是从列的第三个位置开始渲染的，前面会占用-2，-1，0的位置,从1开正常渲染
                    for(var j = -week+1;j<=totalDay;j++){
                        var tempWeek = -1;
                        if(j>0)
                            tempWeek = this.getWeek(year,month,j);
                        var clazz = '';
                        if(tempWeek == 0 || tempWeek == 6)
                            clazz = 'week'
                        if(j<DATE_DAY && year == DATE_YEAR && month == DATE_MONTH)
                        //当天之前的日期不可用
                            clazz = 'unavailable '+clazz;
                        else
                            clazz = 'nostate '+clazz;
                        days.push({day:j,class:clazz});
                        if(tempWeek == 6 || j==totalDay){
                            weeks.push(days);
                            days = [];
                        }
                    }
                    var dateItem = {
                        id:year+'-'+month,
                        year:year,
                        month:month,
                        weeks:weeks
                    }

                    dateList.push(dateItem);
                }
                this.dateList = dateList;
                DATE_LIST = deepCopy(dateList);
            },
          /*
           * 获取月的总天数
           */
            getTotalDayByMonth:function(year,month){
                month=parseInt(month,10);
                var d=new Date(year,month,0);
                return d.getDate();
            },
          /*
           * 获取月的第一天是星期几
           */
            getWeek:function(year,month,day){
                var d=new Date(year,month-1,day);
                return d.getDay();
            },
            /**
             * 点击日期事件
             */
            onPressDate:function(year,month,day){

                //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
                if((day<DATE_DAY && month == DATE_MONTH) || day<=0) return;

                var tempMonth = month;
                var tempDay = day;

                if(month<10) tempMonth='0'+month
                if(day <10) tempDay= '0'+day

                var date = year+'-'+tempMonth+'-'+tempDay;

                //如果点击选择的日期A小于入住时间，则重新渲染入住时间为A
                if((this.markcheckInDate && Moment(date).before(this.checkInDate)||this.checkInDate === date)){
                    this.markcheckInDate=false;
                    this.markcheckOutDate=false;
                    this.dateList=deepCopy(DATE_LIST);
                };
                //如果点击选择的日期A小于入住时间，则重新渲染入住时间为A
                if(this.markcheckInDate && this.markcheckOutDate){
                    this.markcheckInDate=false;
                    this.markcheckOutDate=false;
                    this.dateList=deepCopy(DATE_LIST);
                };

                if(!this.markcheckInDate){
                    this.checkInDate=date;
                    this.markcheckInDate=true;
                }else if(!this.markcheckOutDate){
                    this.checkOutDate=date;
                    this.markcheckOutDate=true;

                    this.SAVE_HOTEL_QUERY({
                        checkinDate:this.checkInDate,
                        checkoutDate:this.checkOutDate
                    });
                    this.$router.go(-1);
                }
                this.renderPressStyle(year,month,day);
            },
            renderPressStyle:function(year,month,day){
                var dateList = this.dateList;
                //渲染点击样式
                for(var i=0;i<dateList.length;i++){
                    var dateItem = dateList[i];
                    var id = dateItem.id;
                    if(id === year+'-'+month){
                        /*var days = dateItem.days;
                        for(var j=0;j<days.length;j++){
                            var tempDay = days[j].day;
                            if(tempDay == day){
                                days[j].class = days[j].class+' active';
                                break;
                            }
                        }
                        break;*/
                        var weeks = dateItem.weeks;
                        for(var j=0;j<weeks.length;j++){
                            for(var k=0;k<weeks[j].length;k++){
                                var tempDay = weeks[j][k].day;
                                if(tempDay == day){
                                    weeks[j][k].class = weeks[j][k].class+' active';
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                this.dateList=dateList
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .datepicker{
    /*padding-top: 1.9rem;*/
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    color:#333;
    font-size: 14px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .layout-flex{
    display:flex;
  }
  .layout-flex .row{
    flex-direction: row;
  }
  .layout-flex .column{
    flex-direction: column;
  }
  .align-center{
    align-items:center;
    justify-content: center;
  }

  .date-day{
    display: flex;
    margin:0.24rem;
    text-align:center;
    justify-content: center;
    align-items: center;
  }
  .date-day.active{
    background: $blue;
    color:#FFF;
    border-radius: 100%;
  }
  .date-day.unavailable{
    color:#aaa;
  }

  .date-week{
    display: flex;
    justify-content: center;
    align-content: center;
    margin:0.2rem;
  }
  .week{
    color:#FF9C01;
  }
  .date-year-month{
    padding:0 15px;
    font-size:17px;
  }
</style>
