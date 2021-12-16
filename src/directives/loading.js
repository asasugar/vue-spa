/*
 * @Description: 加载中指令
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-23 10:24:44
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2021-08-31 17:59:37
 */
import { createLoading } from '@/components/Loading';

const loadingDirective = {
  mounted(el, binding) {
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const size = el.getAttribute('loading-size');
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        tip,
        background,
        size: size || 'large',
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el
    );
    console.log(111, fullscreen)
    el.instance = instance;
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      if (binding.oldValue !== binding.value) {
        instance.setLoading?.(binding.value && !instance.loading);
      }
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;