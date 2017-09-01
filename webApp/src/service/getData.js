import {
  baseUrl,
  loginUrl,
    registerUrl
} from '../config/env'
import axios from 'axios'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import Vue from 'vue'

const myFetch = (url = '', params = {},type = 'GET') => {
  var sessionId = localStorage.KKWEBAPP_sessionId;
  if(!sessionId){
      window.location = loginUrl;
  }
  Indicator.open({
    spinnerType: 'fading-circle'
  });
  var instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {'Accept': 'application/json','Content-Type': 'application/json','X-Requested-With':null,'X-WX-SESSIONID':sessionId}
  });
  instance({
    url: url,
    method: type,
    data: params.data || {}
  }).then((res)=>{
     Indicator.close();
    if(res.data.code == '6000') {
      Toast({
          message: res.data.msg,
          duration: 1000
      });
      setTimeout(() => {
          window.location = loginUrl;
      }, 1000);
    }else if(res.data.code == '4010') {
      Toast({
          message: res.data.msg,
          duration: 1000
      });
      setTimeout(() => {
          window.location = registerUrl;
      }, 1000);
     }else if(res.data.code != '0000'){
      Toast(res.data.msg);
      if(params.fail){
        params.fail(res.data);
      }
    }else{
      if(params.success){
        params.success(res.data.data);
      }
    }
  });
};

const myFetchNoLogin = (url = '', params = {}, type = 'GET') => {
    var instance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {'Accept': 'application/json','Content-Type': 'application/json','X-Requested-With':null}
    });
    Indicator.open({
        spinnerType: 'fading-circle'
    });
    instance({
      url: url,
      method: type,
      data: params.data || {}
    }).then((res)=>{
      Indicator.close();
      if(res.data.code != '0000'){
        Toast(res.data.msg);
        if(params.fail){
          params.fail(res.data);
        }
      }else{
        if(params.success){
          params.success(res.data.data);
        }
      }
    });
};

export const applyIdInfo = (params) => {
  return myFetch('webapp/api/j/applyIdInfo', params, 'POST');
};
export const getCode = (telNumber,params) => {
  return myFetchNoLogin('webapp/api/j/getCode/'+telNumber,params);
};
export const mobileLogin = (telNumber,verifyCode,params) => {
  return myFetchNoLogin('webapp/api/j/mobileLogin/'+telNumber+'/'+verifyCode,params);
};
export const getKeyCodeList = (params) => {
  return myFetch('webapp/api/j/getKeyCodeList',params);
};
export const getKeyCodeDetail = (stayId,params) => {
  return myFetch('webapp/api/j/getKeyCodeDetail/'+stayId,params);
};
export const getKeyCode = (lockCode,params) => {
  return myFetch('webapp/api/j/getKeyCode/'+lockCode,params);
};

export const pageForSale = (params) => {
    return myFetchNoLogin('hotel/j/pageForSale', params, 'POST');
};
export const pageForCoupon = (params) => {
    return myFetch('webapp/hotel/j/pageForCoupon', params, 'POST');
};
export const getOptionalCity = (params) => {
    return myFetchNoLogin('hotel/j/getOptionalCity',params);
};
export const hotelDetail = (params) => {
  return myFetchNoLogin('hotel/j/getForSale', params, 'POST');
};
export const getCoupon = (params) => {
  return myFetch('webapp/coupon/j/listForPay', params, 'POST');
};
export const addOrder = (params) => {
  return myFetch('webapp/order/j/add', params, 'POST');
};
export const addOrderAgain = (params) => {
  return myFetch('webapp/order/j/addAgain', params, 'POST');
};
export const getPaymentSign = (params) => {
    return myFetch('webapp/payment/getSign',params, 'POST');
};
export const getOrderDetail = (params) => {
    return myFetch('webapp/order/j/detail', params, 'POST');
};
export const getOrderList = (params) => {
    return myFetch('webapp/order/j/page', params, 'POST');
};
export const getUserInfo = (params) => {
    return myFetch('webapp/user/j/getUserInfo', params, 'POST');
};
export const getMyNum = (params) => {
    return myFetch('webapp/user/j/getMyNum', params, 'POST');
};
export const getCouponList = (params) => {
    return myFetch('webapp/coupon/j/list', params, 'POST');
};
export const deleteOrder = (params) => {
    return myFetch('webapp/order/j/delete', params, 'POST');
};
export const getqueryOrder = (params) => {
    return myFetch('webapp/order/j/queryOrder', params, 'POST');
};