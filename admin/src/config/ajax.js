/**
 * ajax函数
 * 封装axios能发ajax函数
 * 1.解决post请求携带参数问题，默认是json需要转换成urlencode格式
 * 2.请求成功的结果不是response，而是直接数据response.data值
 * 3.统一处理所有的
 */

import axios from 'axios';
import {message} from 'antd';
import qs from 'qs';
// 添加请求拦截器，让post请求的数据格式体为urlencoded格式， a=1&b==2
// 真正发送请求前执行

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 得的请求方式请求体数据
    const { method, data} = config;
    // 处理post请求，将data对象格式转换成query参数格式字符串
    if(method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data);  // username=123
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });




/**
 * 添加响应拦截器
 * 在请求返回之后且在我们指定的请求回调函数之前
 * 功能1.直接是response.data 的值
 * 功能2：  
 */
axios.interceptors.response.use(function (response) {
    // 对响应数据就会交个指定的请求响应的回调
    return response.data;
  }, function (error) { // 统一处理所有请求的异常报错
    // 对响应错误做点什么
    // return Promise.reject(error);
    message.error('请求出错' + error.message);
    return new Promise(() => {});
  });




export default axios;