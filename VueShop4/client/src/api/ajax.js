// import axios from "axios"
//
// export default function ajax(url,data={},type="GET") {
//   return new Promise(function (resolve, reject) {
//       let promise
//       if(type==="GET"){
//         let dataStr = ""
//         Object.keys(data).forEach(key=>{    //Object.key方法一个表示给定对象的所有可枚举属性的字符串数组。
//             dataStr += key + "=" + data[key] + "&";
//         })
//         if(dataStr!==""){
//             dataStr = dataStr.substring(0,dataStr.lastIndexOf("&"))
//             url = url + "?" + dataStr
//         }
//
//         promise = axios.get(url)
//       }else{
//         promise = axios.post(url,data)
//       }
//
//       promise
//         .then(function (response) {
//           resolve(response.data)
//       })
//         .catch(function (error) {
//           reject(error)
//         })
//
//   })
//
//
// }




// import axios from "axios"
// export default function ajax(url,data={},type="GET") {
//   return new Promise(function (resolve,reject) {   //多包裹了一层promise 返回的不再是response 而是response.data
//     let promise;
//     if(type ==="GET"){
//       let dataStr = "";
//       Object.keys(data).forEach(key=>{
//         dataStr += key + "=" + data[key] + "&"
//       })
//       if(dataStr !== ''){
//         dataStr = dataStr.substring(0,dataStr.lastIndexOf("&"))
//         url = url + '?'+dataStr
//       }
//       promise = axios.get(url)
//     }else{
//       promise = axios.post(url,data)
//     }
//
//     promise.then(function (response) {
//       resolve(response.data)     //这里返回的是response.data
//     }).catch(function (error) {
//       reject(error)
//     })
//   })
// }


import axios from 'axios'
export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
