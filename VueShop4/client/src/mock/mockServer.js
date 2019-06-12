import Mock from "mockjs"
import data from "./data"

/*加载goods的商品信息*/
Mock.mock("/good",{code:0,data:data.goods})
/*加载info的商品信息*/
Mock.mock("/info",{code:0,data:data.info})
/*加载rating的商品信息*/
Mock.mock("/rating",{code:0,data:data.ratings})

/*注意：mockjs无需暴露任何方法 只需要在引入直接引入路径即可*/
