import App from '../App'
import NotFoundComponent from '../NotFoundComponent'

const key = r => require.ensure([], () => r(require('../page/key/key')), 'key')
const hotellist = r => require.ensure([], () => r(require('../page/hotellist/hotellist')), 'hotellist')
const keydetail = r => require.ensure([], () => r(require('../page/keydetail/keydetail')), 'keydetail')
const hoteldetail = r => require.ensure([], () => r(require('../page/hoteldetail/hoteldetail')), 'hoteldetail')
const orderdetail = r => require.ensure([], () => r(require('../page/orderdetail/orderdetail')), 'orderdetail')
const coupon = r => require.ensure([], () => r(require('../page/coupon/coupon')), 'coupon')
const me = r => require.ensure([], () => r(require('../page/me/me')), 'me')
const ordertab = r => require.ensure([], () => r(require('../page/ordertab/ordertab')), 'ordertab')
const ordertabdetail = r => require.ensure([], () => r(require('../page/ordertabdetail/ordertabdetail')), 'ordertabdetail')
const coupontab = r => require.ensure([], () => r(require('../page/coupontab/coupontab')), 'coupontab')
const couponhotel = r => require.ensure([], () => r(require('../page/couponhotel/couponhotel')), 'couponhotel')
const register = r => require.ensure([], () => r(require('../page/register/register')), 'register')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const datepicker = r => require.ensure([], () => r(require('../page/datepicker/datepicker')), 'datepicker')
const map = r => require.ensure([], () => r(require('../page/map/map')), 'map')
const ordersuccessdetail = r => require.ensure([], () => r(require('../page/ordersuccessdetail/ordersuccessdetail')), 'ordersuccessdetail')
const roomtypedetail = r => require.ensure([], () => r(require('../page/hoteldetail/children/roomtypedetail')), 'roomtypedetail')
const howtoopen = r => require.ensure([], () => r(require('../page/howtoopen/howtoopen')), 'howtoopen')
const agreement = r => require.ensure([], () => r(require('../page/agreement/agreement')), 'agreement')

const root = '/web';
export default [
  { path: '*', component: NotFoundComponent },{
    path: '/web',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
          path: '',
          redirect: root+'/key'
        },
        {
          path: root+'/key',
          component: key
        },
        {
          path: root+'/map',
          component: map
        },
        {
            path: root+'/keydetail',
            component: keydetail
        },
        {
            path: root+'/datepicker',
            component: datepicker
        },
        {
          path: root+'/hotellist',
          component: hotellist
        },
      {
        path: root+'/hoteldetail',
        component: hoteldetail
      },
      {
          path: root+'/search',
          component: search
        },
      {
        path: root+'/me',
        component: me
      },
      {
        path: root+'/register',
        component: register
      },
      {
        path: root+'/orderdetail',
        component: orderdetail
      },
      {
        path: root+'/coupon',
        component: coupon
      },
        {
        path: root+'/ordersuccessdetail',
        component: ordersuccessdetail
        },
        {
            path: root+'/roomtypedetail',
            component: roomtypedetail
        },
        {
            path: root+'/howtoopen',
            component: howtoopen
        },
        {
            path: root+'/agreement',
            component: agreement
        },
        {
            path: root+'/ordertab',
            component: ordertab
        },
        {
            path: root+'/coupontab',
            component: coupontab
        },
        {
            path: root+'/ordertabdetail',
            component: ordertabdetail
        },
        {
            path: root+'/couponhotel',
            component: couponhotel
        },
      //登陆注册页
      {
          path: root+'/login',
          component: login
      }
    ]
}]
