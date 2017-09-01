<template>
  <div class="bgcolor-layout" id="app">
    <head-top headTitle="入住登记"  goBack="true"></head-top>
    <div class="verify-titleLayout al">
      <div class="verify-title">温馨提示</div>
      <div class="pb10">按公安部门要求，入住酒店客人需进行实名登记，请您填写真实的姓名和二代身份证号码，以便完成入住登记。</div>
      <div>特别提示：没有二代身份证件的港、澳、台、外籍等人士，请与酒店联系并办理入住登记</div>
    </div>
    <!--身份验证信息 start-->
    <div class="mid-registerContainer">
      <label for="userName">
        姓名
        <input class="ml70" v-on:focus="changeStaticStatus" v-on:blur="changeStaticStatus" v-model="userName" id="userName" type="text" placeholder="请输入姓名"/>
      </label>
      <label for="userCode" id="label-userCode">
        身份证号码
        <input id="userCode" v-on:focus="changeStaticStatus" v-on:blur="changeStaticStatus" v-model="userCode" type="text" placeholder="请输入二代身份证号码"/>
      </label>
    </div>
    <!--身份验证信息 end-->
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

    export default {
        data(){
            return {
              userName:'',
              userCode:'',
              submitBtnStatus:true,
              showSubmitBtnStatus:true,
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
            if(_self.userName != '' && _self.userCode != ''){
              _self.submitBtnStatus = false;
            }
          },
          userCode(newVal){
            var _self = this;
            if(_self.userName != '' && _self.userCode.length == 18){
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
                    _self.$router.push({path: 'key', replace: true});
                }
              });
            }
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
  .verify-titleLayout{
    margin: 0.7rem;
    padding:0.6rem;
    margin-top: 1.5rem;
    font-size: 0.5rem;
    color: #696969;
    border-radius: 5px;
    background-color: #FFFBDE;
  }
  .verify-title{
    color: #222;
    font-size: 0.7rem;
    padding-bottom: 0.4rem;
    text-align: center;
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
    margin-left: 1.4rem;
    font-size: 0.6rem;
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
  .ml70{
    margin-left: 3.2rem !important;
  }

  .registerSubmitBtn{
    width: 100%;
  }
  .registerSubmitBtnStatic{
    position: static;
  }
</style>
