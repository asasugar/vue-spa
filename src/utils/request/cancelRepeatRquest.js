/*
 * @Description: 取消重复请求
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-21 19:05:32
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2021-06-22 16:14:03
 */
import Axios from 'axios';
import { generateReqKey } from '../commonFuns';
// TODO: 用于把当前请求信息添加到pendingRequest对象 中；
const pendingRequest = new Map(); // Map对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。
export function addPendingRequest(config) {
  if (config.cancelRequest) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
      config.cancelToken = new Axios.CancelToken(cancel => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(`${config.url} 请求已取消`);
      });
    } else {
      config.cancelToken =
        config.cancelToken ||
        new Axios.CancelToken(cancel => {
          pendingRequest.set(requestKey, cancel);
        });
    }
  }
}

// TODO：检查是否存在重复请求，若存在则取消已发的请求。
export function removePendingRequest(response) {
  if (response && response.config && response.config.cancelRequest) {
    const requestKey = generateReqKey(response.config);
    // 判断是否有这个 key
    if (pendingRequest.has(requestKey)) {
      const cancelToken = pendingRequest.get(requestKey);
      cancelToken(requestKey);
      pendingRequest.delete(requestKey);
    }
  }
}
