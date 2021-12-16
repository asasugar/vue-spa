/*
 * @Description: 自定义指令
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-23 10:23:06
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2021-06-23 10:41:26
 */
import { setupLoadingDirective } from './loading';
export function setupGlobDirectives(app) {
  setupLoadingDirective(app);
}