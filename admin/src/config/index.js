/**
 * 包含应用中所有请求接口的函数 接口请求函数
 * 
 */

import ajax from './ajax';

// import qs from 'qs';

const BASE = '';

// 最简写法
export const reqLogin = (username, pwssword) = ajax.post(BASE + '/login', {username, pwssword});

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

 const name = 'admin',
 const pwd = '123';

 reqLogin(name, pwd).then(result => { // respon.data值
    // const result = response.data;
    console.log('请求成功', result);

 })