<template>
  <div class="bgcolor-layout" id="app">
    <div class="verify-title al">
      <div>温馨提示</div>
      <div>按公安部门要求，入住酒店客人需进行实名登记，请您填写真实的姓名和二代身份证号码，以便完成入住登记。</div>
      <div>特别提示：没有二代身份证件的港、澳、台、外籍等人士，请与酒店联系并办理入住登记</div>
    </div>
    <!--身份验证信息 start-->
    <div class="mid-registerContainer">
      <label for="userName">
        姓名
        <input class="ml65" v-on:focus="changeStaticStatus" v-on:blur="changeStaticStatus" v-model="userName" id="userName" type="text" placeholder="请输入姓名"/>
      </label>
      <label for="userCode" id="label-userCode">
        身份证号码
        <input id="userCode" v-on:focus="changeStaticStatus" v-on:blur="changeStaticStatus" v-model="userCode" type="text" placeholder="请输入二代身份证号码"/>
      </label>
    </div>
    <!--身份验证信息 end-->
    <!--拍照上传 start-->
    <!--<div class="uploadimage clearfix">-->
      <!--<div class="uploadimage-left">-->
        <!--<div>-->
          <!--1.请勿戴帽-->
        <!--</div>-->
        <!--<div>-->
          <!--2.请勿戴眼镜-->
        <!--</div>-->
        <!--<div>-->
          <!--3.正面平视-->
        <!--</div>-->
        <!--<div>-->
          <!--4.光线充足-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="uploadimage-right fr">-->
        <!--<img :src="imgSrc" alt=""/>-->
        <!--<span>{{uploadText}}</span>-->
        <!--<input type="file" accept="image/*" capture="camera" v-on:change="uploadimgChange($event)">-->
      <!--</div>-->
    <!--</div>-->
    <!--拍照上传 end-->
    <!--确认按钮 start-->
    <div class="ac registerSubmitBtn" v-bind:class="[submitBtnStaticStatus ? 'registerSubmitBtnStatic' : '','ac registerSubmitBtn']">
      <button class="btn-sure" :disabled="submitBtnStatus" v-bind:class="[!submitBtnStatus ? 'active' : '','btn-sure']" @click="submitUserInfo">确定</button>
    </div>
    <!--确认按钮 end-->
  </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {mapState, mapMutations} from 'vuex'
    import {applyIdInfo} from '../../service/getData'
    import EXIF from '../../config/exif';

    const path = require('path');
    //对图片旋转处理 added by lzk
    function rotateImg(img, direction,canvas) {
      //alert(img);
      //最小与最大旋转方向，图片旋转4次后回到原方向
      var min_step = 0;
      var max_step = 3;
      //var img = document.getElementById(pid);
      if (img == null)return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      var height = img.height;
      var width = img.width;
      //var step = img.getAttribute('step');
      var step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //img.setAttribute('step', step);
      /*var canvas = document.getElementById('pic_' + pid);
       if (canvas == null) {
       img.style.display = 'none';
       canvas = document.createElement('canvas');
       canvas.setAttribute('id', 'pic_' + pid);
       img.parentNode.appendChild(canvas);
       }  */
      //旋转角度以弧度值为参数
      var degree = step * 90 * Math.PI / 180;
      var ctx = canvas.getContext('2d');
      switch (step) {
        case 0:
          canvas.width = width*2;
          canvas.height = height*2;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height*2;
          canvas.height = width*2;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height*2);
          break;
        case 2:
          canvas.width = width*2;
          canvas.height = height*2;
          ctx.rotate(degree);
          ctx.drawImage(img, -width*2, -height*2);
          break;
        case 3:
          canvas.width = height*2;
          canvas.height = width*2;
          ctx.rotate(degree);
          ctx.drawImage(img, -width*2, 0);
          break;
      }
    }
    export default {
        data(){
            return {
              headTitle:'登录',
              userName:'',
              uploadText:'点击拍照',
              userCode:'',
              submitBtnStatus:true,
              showSubmitBtnStatus:true,
              uploadImgStatus:false,
              uploadImgUrl:'',
              imgSrc:require('../../images/sysimg.png'),
              submitBtnStaticStatus:false,
              queryData:''
            }
        },
        created(){
            this.queryData = this.$route.query;
        },
        components: {
            headTop
        },
        watch:{
          uploadImgStatus(newVal){
            var _self = this;
            if(_self.userName != '' && _self.userCode != '' && _self.uploadImgStatus == true){
              _self.submitBtnStatus = false;
            }
          },
          userCode(newVal){
            var _self = this;
            if(_self.userName != '' && _self.userCode.length == 18 && _self.uploadImgStatus == true){
              _self.submitBtnStatus = false;
            }
          }
        },
        created() {
        },
        methods: {
          submitUserInfo(){
            var _self = this;
            var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if(_self.userName == ''){
              _self.$toast('姓名不能为空！');
            }else if(_self.userCode == ''){
              _self.$toast('身份证不能为空！');
            }else if(!regIdCard.test(_self.userCode)){
              _self.$toast('身份证格式或长度不符合要求！');
            }else{
              applyIdInfo({
                data:{
                  realName:_self.userName,
                  idNumber:_self.userCode
                },
                success:()=>{
                    if(_self.status == 1){
                        _self.$router.push({path: '/', replace: true});
                    }else if(_self.status == 2){
                        _self.$router.push({path: '/me', replace: true});
                    }

                }
              });
            }
          },
          //input监听
          uploadimgChange:function(event){
            var _self = this;
            var reader = new FileReader();
            var Orientation = null;
            //获取照片方向角属性，用户旋转控制
            EXIF.getData(event.target.files[0], function() {
              // alert(EXIF.pretty(this));
              EXIF.getAllTags(this);
              //alert(EXIF.getTag(this, 'Orientation'));
              Orientation = EXIF.getTag(this, 'Orientation');
              //return;
            });
            reader.onload = function (e) {

              //调用图片压缩方法：compress();
              _self.compress(e.target.result,fileSize,Orientation)
            };
            reader.readAsDataURL(event.target.files[0]);

            var fileSize = Math.round( event.target.files[0].size/1024/1024) ; //以M为单位
            //this.files[0] 该信息包含：图片的大小，以byte计算 获取size的方法如下：this.files[0].size;
          },
          //压缩图片
          //1、设置压缩后的最大宽度 or 高度；
          //2、设置压缩比例，根据图片的不同size大小，设置不同的压缩比。
          compress:function(res,fileSize,Orientation){
            var _self = this;
            var img = new Image(),
              maxW = 640; //设置最大宽度

            img.onload = function () {
              var cvs = document.createElement( 'canvas'),
                ctx = cvs.getContext( '2d');

              if(img.width > maxW) {
                img.height *= maxW / img.width;
                img.width = maxW;
              }

              cvs.width = img.width;
              cvs.height = img.height;

              ctx.clearRect(0, 0, cvs.width, cvs.height);
              ctx.drawImage(img, 0, 0, img.width, img.height);

              var compressRate = _self.getCompressRate(1,fileSize);
              var base64 = null;
              //修复ios
              if (navigator.userAgent.match(/iphone/i)) {
                console.log('iphone');
                //alert(expectWidth + ',' + expectHeight);
                //如果方向角不为1，都需要进行旋转 added by lzk
                if(Orientation != "" && Orientation != 1){
                  switch(Orientation){
                    case 6://需要顺时针（向左）90度旋转
                      rotateImg(this,'left',cvs);
                      break;
                    case 8://需要逆时针（向右）90度旋转
                      rotateImg(this,'right',cvs);
                      break;
                    case 3://需要180度旋转
                      rotateImg(this,'right',cvs);//转两次
                      rotateImg(this,'right',cvs);
                      break;
                  }
                }

                /*var mpImg = new MegaPixImage(image);
                 mpImg.render(canvas, {
                 maxWidth: 800,
                 maxHeight: 1200,
                 quality: 0.8,
                 orientation: 8
                 });*/
                base64 = cvs.toDataURL("image/jpeg", compressRate);
               /* $('.uploadimage-right span').css('width','120px');
                $('.uploadimage-right img').css({'top':'-20px','left':'15px'});
                $('.uploadimage-right').css('width','120px');*/
              }else if (navigator.userAgent.match(/Android/i)) {// 修复android
//	                    var encoder = new JPEGEncoder();
//	                    base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                /*$('.uploadimage-right img').css('top','-10px');*/
                base64 = cvs.toDataURL("image/jpeg", compressRate);
              }else{
                //alert(Orientation);
                if(Orientation != "" && Orientation != 1){
                  //alert('旋转处理');
                  switch(Orientation){
                    case 6://需要顺时针（向左）90度旋转
                      rotateImg(this,'left',canvas);
                      break;
                    case 8://需要逆时针（向右）90度旋转
                      rotateImg(this,'right',canvas);
                      break;
                    case 3://需要180度旋转
                      rotateImg(this,'right',canvas);//转两次
                      rotateImg(this,'right',canvas);
                      break;
                  }
                }

                base64 = canvas.toDataURL("image/jpeg", compressRate);
              }
              _self.uploadImgUrl = base64;
              _self.imgSrc = base64;
              _self.uploadText='重新拍照';
              _self.uploadimgStatusChange();
            }

            img.src = res;
          },
          //计算压缩比率，size单位为MB
          getCompressRate:function(allowMaxSize,fileSize){
            var compressRate = 1;

            if(fileSize/allowMaxSize > 4){
              compressRate = 0.5;
            } else if(fileSize/allowMaxSize >3){
              compressRate = 0.6;
            } else if(fileSize/allowMaxSize >2){
              compressRate = 0.7;
            } else if(fileSize > allowMaxSize){
              compressRate = 0.8;
            } else{
              compressRate = 0.9;
            }
            return compressRate;
          },
          //改变图片上传状态
          uploadimgStatusChange:function(){
            var _self = this;
            _self.uploadImgStatus = true;
          },
          //隐藏/显示 提交按钮
          changeStaticStatus:function(){
            var _self = this;
            if(_self.submitBtnStaticStatus == true){
              _self.submitBtnStaticStatus =false;
            }else{
              _self.submitBtnStaticStatus =true;
            }
          }
        }
    }

</script>

<style lang="scss" scoped>
  /*登记入住start*/
  .verify-title{
    padding:20px 0 10px 15px;
    font-size: 14px;
    color: #999;

  }
  .mid-registerContainer{
    background: #fff;
    overflow: hidden;
  }
  .mid-registerContainer label{
    width: 100%;
    padding: 0 15px;
    line-height: 44px;
    height: 44px;
    display: inline-block;
    border-bottom: 1px solid #e6e6e6;
  }
  .mid-registerContainer #label-verifyCode,
  .mid-registerContainer #label-userCode{
    border-bottom: none;
  }
  .mid-registerContainer input{
    border: none;
    margin-left: 30px;
  }
  .mid-registerContainer button,
  .mid-registerContainer button:focus{
    width: 90px;
    height: 28px;
    border-radius: 4px;
    text-align: center;
    background: #fff;
    color: #e6e6e6;
    margin: 8px 30px 0 0;
    border: 1px solid #e6e6e6;
  }
  .mid-registerContainer button.active,
  .mid-registerContainer button.active:focus{
    color: #37c3f6;
    border: 1px solid #21bcf5;
  }
  .btn-sure{
    width: 92%;
    margin: 20px auto;
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    border-radius: 4px;
    color: #fffefe;
    border: 1px solid #d5d5d5;
    background: #dbdcdd;
  }
  .btn-sure.active{
    border: 1px solid #00a1dd;
    background: #21bcf5;
  }
  .ml65{
    margin-left: 65px !important;
  }
  .uploadimage{
    margin-top: 13%;
  }
  .uploadimage-left{
    color: #bfbfbf;
    margin-left: 8%;
    margin-top: 20px;
    line-height: 20px;
    float: left;
  }
  .uploadimage-right{
    width: 120px;
    height: 140px;
    margin-right: 8%;
    position: relative;
    overflow: hidden;
  }
  .uploadimage-right img{
    max-width: 120px;
    /* width: 140px; */
    /* height: auto; */
    /* position: absolute; */
    /* pointer-events: none; */
    /* right: 0;
    top: 0;*/
  }
  .uploadimage-right span{
    position: absolute;
    display: inline-block;
    width: 100%;
    line-height: 28px;
    bottom: 0;
    color: #fff;
    text-align: center;
    background: rgba(0,0,0,0.5);
    pointer-events:none;
  }
  .uploadimage-right input{
    width: 137px;
    height: 140px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .registerSubmitBtn{
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
  }
  .registerSubmitBtnStatic{
    position: static;
  }
</style>
