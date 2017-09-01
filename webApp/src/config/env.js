/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl;
let routerMode;
let loginUrl;
let registerUrl;
const imgBaseUrl = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'development') {
  /*baseUrl = 'http://localhost:8088/yzlpms/';*/
  baseUrl = '/yzlpms/';
    loginUrl =  '/web/login';
    registerUrl =  '/web/register';
	routerMode = 'history'
}else{
	baseUrl = '/yzlpms/';
  	loginUrl =  '/web/login';
    registerUrl =  '/web/register';
	routerMode = 'history'
}

export {
	baseUrl,
	routerMode,
  	loginUrl,
    registerUrl,
	imgBaseUrl
}
