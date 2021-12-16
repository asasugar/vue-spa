/*
 * @Description: axios请求封装
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-21 18:34:56
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2021-06-22 17:49:48
 */

// 使用方法
// import { getCurrentInstance } from 'vue';
// const { proxy } = getCurrentInstance();
// methods = {
//   middleViewData: proxy.$http.get("/api/simpleWeather/query", { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" } }), // 正常请求
//   cancelReq: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, cancelRequest: true }), // 测试取消请求
//   reqAgainSend: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, retry: 3, retryDelay: 1000 }), // 测试请求重发，除了原请求外还会重发3次
//   cacheEquList: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, cache: true, setExpireTime: 30000 }), // 测试缓存请求带参数：setExpireTime 为缓存有效时间ms
//   cacheEquListParams: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, cache: true }) // 测试缓存请求参数值不一样
// },
import Axios from 'axios';
// import { clearToken, getToken } from '../cookiesStorage.js'; 
import { addPendingRequest, removePendingRequest } from './cancelRepeatRquest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import { requestInterceptor as cacheReqInterceptor, responseInterceptor as cacheResInterceptor } from './requestCache';

// 返回结果处理
// 自定义约定接口返回{error_code: xxx, result: xxx, reason:'err message'},根据聚合api模拟，具体可根据业务调整
const responseHandle = {
  0: response => {
    return response.data.result;
  },
  201: response => {
    alert(response.data.reason);
    console.log(`参数异常:${response.data.reason}`);
  },
  10012: response => {
    alert(response.data.reason);
    console.log(response.data.reason);
  },
  10022: response => {
    alert(response.data.reason);
    console.log(response.data.reason);
    // clearToken();
  },
  default: response => {
    alert('操作失败');
    return Promise.reject(response);
  }
};

const axios = Axios.create({
  baseURL: import.meta.env.BASE_URL || '',
  timeout: 50000
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 请求头用于接口token 认证
    // getToken() && (config.headers['Authorization'] = getToken());

    if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put') {
      // 参数统一处理，请求都使用data传参
      config.data = config.data.data;
    } else if (config.method.toLocaleLowerCase() === 'get' || config.method.toLocaleLowerCase() === 'delete') {
      // 参数统一处理
      config.params = config.data;
    } else {
      alert('不允许的请求方法：' + config.method);
    }
    // pendding 中的请求，后续请求不发送（由于存放的peddingMap 的key 和参数有关，所以放在参数处理之后）
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    //  请求缓存
    cacheReqInterceptor(config, axios);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response);
    cacheResInterceptor(response);
    return (responseHandle[response.data.error_code] || responseHandle['default'])(response);
  },
  error => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});
    // 需要特殊处理请求被取消的情况
    if (!Axios.isCancel(error)) {
      // 请求重发
      againRequest(error, axios);
    }
    // 请求缓存处理方式
    if (Axios.isCancel(error) && error.message.data && error.message.data.config.cache) {
      return Promise.resolve(error.message.data.data.result); // 返回结果数据,根据实际业务配置
    }
    return Promise.reject(error);
  }
);
export default axios;

