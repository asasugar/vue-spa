import { unref } from 'vue';
import { createLoading } from './createLoading';


export function useLoading(opt) {
  let props;
  let target = document.body;

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    const options = opt;
    props = options.props || {};
    target = options.target || document.body;
  } else {
    props = opt;
  }

  const instance = createLoading(props, undefined, true);

  const open = () => {
    const t = unref(target);
    if (!t) return;
    instance.open(t);
  };

  const close = () => {
    instance.close();
  };

  return [open, close];
}