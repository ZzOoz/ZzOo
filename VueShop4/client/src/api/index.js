import ajax from "./ajax"
const BASE_URL = "/api"
/*根据经纬度获取位置详情根据经纬度获取位置详情*/
export const reqAddress = (geohash)=>ajax(`${BASE_URL}/position/${geohash}`)

/*获取食品分类列表*/
export const reqCatagorys = ()=>ajax(BASE_URL+`/index_category`)

/*根据经纬度获取商铺列表*/
export const reqShops = (longitude,latitude)=>ajax(BASE_URL+`/shops`,{longitude,latitude})

/*根据经纬度和关键字搜索商铺列表*/
export const reqSearchShop = (geohash,keyword)=>ajax(BASE_URL+`/search_shops`,{geohash,keyword})

// /*获取一次性图形验证码*/
// export const reqCaptcha = ()=>ajax(BASE_URL+`/captcha`)

/*用户名密码登陆*/
export const reqLogin = ({name,pwd,captcha})=>ajax(BASE_URL+`/login_pwd`,{name,pwd,captcha},"POST")

/*发送短信验证码*/
export const reqSendCode = (phone) =>ajax(BASE_URL+`/sendcode`,{phone})

/*手机号验证码登陆*/
export const reqLoginSms = (phone,code) =>ajax(BASE_URL+`/login_sms`,{phone,code},"POST")

/*9、根据会话获取用户信息*/
export const reqUserInfo = () =>ajax(BASE_URL+`/userinfo`,)

/*10、用户登出*/
export const reqLogout = () =>ajax(BASE_URL+`/logout`,)


/*下面是模拟数据mock的接口ajax请求*/

/*goods的商品信息*/
export const reqGood = ()=>ajax(`/good`)

/*info的信息*/
export const reqInfo = ()=>ajax(`/info`)

/*goods的商品信息*/
export const reqRating = ()=>ajax(`/rating`)

