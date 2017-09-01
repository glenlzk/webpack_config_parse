<template>
  <div class="bgcolor-layout clearfix" id="app">
    <head-top :head-title="'登录'"  goBack="true"></head-top>
    <!--KK开门Logo start-->
    <div class="logo-contain ac" v-show="LogoCtnStatus == 1">
      <img src="../../images/login-icon.png" alt="KK开门" />
      <div>
        KK开门
      </div>
    </div>
    <!--KK开门Logo end-->
    <!--手机验证信息 start-->
    <div class="mid-container fl">
      <label for="telNumber">
        手机号
        <input v-on:focus="hideLogoCtn" v-model="telNumber" id="telNumber" type="telephone" placeholder="请输入手机号" maxlength="11"/>
      </label>
      <label for="verifyCode" id="label-verifyCode">
        验证码
        <input id="verifyCode" type="text" v-model="VerifyCode" placeholder="请输入验证码"/>
        <button class="fr btn-getCode" :disabled="getVerifyCodeStatus" v-bind:class="[!getVerifyCodeStatus ? 'active' : '','fr']" @click="getVerifyCode">{{btnText}}</button>
      </label>
    </div>
    <!--手机验证信息 end-->
    <!--协议 start-->
    <div class="agreementLaout fl">
        <span @click="changeCheckStatus">
            <svg class="icon" aria-hidden="true" v-if="checkStatus">
              <use xlink:href="#icon-yuansu_gouxuankuang_yigouxuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else>
              <use xlink:href="#Rectangle"></use>
            </svg>
            <span>
                我已阅读并同意
                <router-link :to="{path: 'agreement'}" >
                    <a href="javascript:;">《用户注册协议》</a>
                </router-link>
            </span>
        </span>
    </div>
    <!--协议 end-->
    <!--验证按钮 start-->
    <div class="ac">
      <button class="btn-verify" :disabled="VerifyStatus" v-bind:class="[!VerifyStatus ? 'active' : '','btn-verify']" @click="submitInfo">验证</button>
    </div>
    <!--验证按钮 end-->
  </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {mapState, mapMutations} from 'vuex'
    import {mobileLogin,getCode} from '../../service/getData'

    function scrollToTop(){
      window.scrollTo(0,44);
    };
    export default {
        data(){
            return {
              LogoCtnStatus:1,
              telNumber:'',
              VerifyCode:'',
              getVerifyCodeStatus:true,
              checkStatus:true,
              VerifyStatus:true,
              btnText:'获取验证码',
              onceGetTime:30
            }
        },
        components: {
            headTop
        },
        watch:{
          telNumber(newVal) {
            var _self = this;
            if(newVal.length == 11){
              _self.getVerifyCodeStatus = false;
            }else{
              _self.getVerifyCodeStatus = true;
            }
          },
          VerifyCode(newVal){
            var _self = this;
            if(newVal.length >= 1 && _self.telNumber.length == 11 && _self.checkStatus){
              _self.VerifyStatus = false;
            }
          },
          checkStatus(newVal){
            var _self = this;
            if(_self.VerifyCode.length >= 1 && _self.telNumber.length == 11 && _self.checkStatus){
              _self.VerifyStatus = false;
            }else{
              _self.VerifyStatus = true;
            }
          }
        },
        methods: {
          //隐藏Logo
          hideLogoCtn:function(){
            var _self = this;
            _self.LogoCtnStatus = 0;
            //setTimeout("scrollToTop()",250);
            scrollToTop()
          },
          //获取验证码
          getVerifyCode(){
            var _self = this;
            _self.getVerifyCodeStatus = true;
            getCode(_self.telNumber,{success:()=>{
                _self.sendCode();
              },fail:()=>{
                _self.getVerifyCodeStatus = false;
            }
            });
          },
          //改变checkbox选中状态
          changeCheckStatus:function(){
            var _self = this;
            if(_self.checkStatus){
              _self.checkStatus = false;
            }else{
              _self.checkStatus = true;
            }
          },
          //提交身份信息
          submitInfo(){
            var _self = this;
            if(_self.checkStatus != true){
              this.$toast('请先勾选同意用户协议');
              return
            }else{
              mobileLogin(_self.telNumber,_self.VerifyCode,
                {success:(data)=>{
                  localStorage.KKWEBAPP_sessionId=data.sessionId; // 存入一个值
                  _self.$router.push({path: 'key', replace: true});
                }
              });
            }
          },
          //倒计时
          sendCode:function(){
            var _self = this;
            var num = 30;
            var timer = null;

            timer = setInterval(function () {
              --num;
              _self.getVerifyCodeStatus = true;
              _self.btnText=num+'s后重发';
              if (num <= 0) {
                clearInterval(timer);
                _self.getVerifyCodeStatus = false;
                _self.btnText="重发验证码";
              };
            }, 1000);
          }
        }
    }

</script>

<style lang="scss" scoped>
  .logo-contain{
    padding-top: 3rem;
    font-size: 16px;
    color: #000;
  }
  .logo-contain img{
    width: 72px;
    max-width: 72px;
  }
  .mid-container{
    width: 100%;
    margin-top: 4rem;
    border: 1px #e6e6e6 solid;
    background: #fff;
  }
  .mid-container label{
    box-sizing: border-box;
    width: 100%;
    padding: 0 15px;
    line-height: 44px;
    height: 44px;
    display: inline-block;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
  }
  .mid-container #label-verifyCode,
  .mid-container #label-userCode{
    border-bottom: none;
  }
  .mid-container input{
    width: 75%;
    border: none;
    font-size: 0.6rem;
    margin-left: 25px;
  }
  .mid-container button,
  .mid-container button:focus{
    position: absolute;
    right: 15px;
    top: 0;
    width: 80px;
    height: 28px;
    border-radius: 2px;
    text-align: center;
    background: #fff;
    color: #e1e1e1;
    margin: 8px 0 0 0;
    border: 1px solid #e6e6e6;
  }
  .mid-container button.active,
  .mid-container button.active:focus{
    color: #37c3f6;
    border: 1px solid #21bcf5;
  }
  .agreementLaout{
    padding: 10px 15px;
  }
  .agreementLaout a{
    color: #21bcf5;
  }
  .btn-verify{
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
  .btn-verify.active{
    border: 1px solid #00a1dd;
    background: #21bcf5;
  }
</style>
