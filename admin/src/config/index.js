/**
 * 包含应用中所有请求接口的函数 接口请求函数
 * 
 */

// import ajax from './ajax';

import jsonp from 'jsonp';  // 发送jsonp请求
import { message } from 'antd';
// import qs from 'qs';

// const BASE = '';

// 最简写法
// export const reqLogin = (username, password) = ajax.post(BASE + '/login', {username, pwssword});

// 第二种写法
// export const reqLogin = (username, password) => (
//     ajax({ // 默认是使用json格式的请求体携带数据
//         method: 'post',
//         url: BASE + '/login',
//         data: {
//             username,
//             password
//         }
//        // data: qs.stringify({username, password})  // coded模式
//     })
// )


 // 请求登录 第一种写法
//  export function reqLogin(username, password){
//      return ajax({ // 默认是使用json格式的请求体携带数据
//          method: 'post',
//          url: BASE + '/login',
//          data: {
//              username,
//              password
//          }
//         // data: qs.stringify({username, password})  // coded模式
//      })
//  } 

//  const name = 'admin',
//  const pwd = '123';

//  reqLogin(name, pwd).then(result => { // respon.data值
//     // const result = response.data;
//     console.log('请求成功', result);

//  })


 // 发送jsonp请求得到天气信息
 export const reqWeather = (city) => {
    // 执行器函数： 内部去执行异步任务
    // 成功调用resolve(), 失败了不调用reject，直接提示错误
    return new Promise((resolve, reject) => {
       const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
       jsonp(url, {}, (error, data) => {
          if(!error && data.error === 0){
             const {weather, dayPictureUrl} = data.results[0].weather_data[0];
             resolve({weather, dayPictureUrl}); // 成功的
          }else { // 失败的
            message.error('调用天气信息失败');
          }
       }) 
      })
 }
