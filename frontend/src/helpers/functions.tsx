import { useEffect, useRef } from 'react';

export function useEffectAfterMount(cb: any, dependencies = []) {
  const justMounted = useRef(true);

  useEffect(() => {
    if (!justMounted.current) {
      cb();
    }
  }, dependencies);
}
