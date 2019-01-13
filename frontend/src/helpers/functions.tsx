import React, { useEffect, useRef } from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from 'react-testing-library';

export function useEffectAfterMount(cb: any, dependencies = []) {
  const justMounted = useRef(true);

  useEffect(() => {
    if (!justMounted.current) {
      cb();
    }
  }, dependencies);
}

export function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) },
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}
