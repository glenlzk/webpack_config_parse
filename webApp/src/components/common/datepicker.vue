 <template>
   <div class="datepicker">
     <header id='head_top'>
       <section class="head_goback">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="showDatepicker()">
           <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
         </svg>
       </section>
       <section class="title_head ellipsis">
         <span class="title_text">预订日期</span>
       </section>
     </header>
     <div class="pos-fixed bg-white" style="top:0;">
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
     <div style="margin-top: 50rem">
       <div v-for="dateItem in dateList" style="padding:30px 0">
         <div class="date-year-month" >{{dateItem.year}}年{{dateItem.month}}月</div>
         <div class="layout-flex row" style="flex-wrap: wrap;" v-for="itemWeek in dateItem.weeks">
           <div  :class="['date-day', item.class]"
                 style="width:40px;height:40px;"
                 v-for="item in itemWeek" @click="onPressDate(dateItem.year,dateItem.month,item.day)">
             {{item.day>0?item.day:''}}
           </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
    import Moment from '../../config/utils/Moment';
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
        props: ['checkinDate','checkoutDate'],
        computed: {
           /* checkInDate(val) {
                if(!val){
                    return Moment(new Date()).format('YYYY-MM-DD');
                }
            },
            checkOutDate(val) {
                if(!val){
                    return Moment(new Date()).add(1,'day').format('YYYY-MM-DD');
                }
            }*/
        },
        mounted(){
            this.checkInDate = this.checkinDate;
            this.checkOutDate = this.checkoutDate;
            //初始化数据
            this.createDateListData();
            if(this.checkInDate){
                var strs = this.checkInDate.split("-"); //字符分割
                this.onPressDate(strs[0],strs[1],strs[2]);
            }
            if(this.checkOutDate){
                var strs = this.checkOutDate.split("-"); //字符分割
                this.onPressDate(strs[0],strs[1],strs[2]);
            }
        },
        methods: {
            showDatepicker(){
                this.$emit('showDatepicker',false);
            },
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

                    this.$emit('showDatepicker',false);
                    this.$emit('changeDate',this.checkInDate,this.checkOutDate)
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
  #head_top{
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
  }
  .head_goback{
    left: 0.4rem;
    @include wh(0.6rem, 0.8rem);
    line-height: 2.2rem;
    margin-left: .4rem;
  }
  .head_login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
      color: #fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
  .title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
  .datepicker{
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
    margin:5px;
    text-align:center;
    justify-content: center;
    align-items: center;
  }
  .date-day.active{
    background: #FF9C01;
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
    margin:5px;
  }
  .week{
    color:#FF9C01;
  }
</style>
